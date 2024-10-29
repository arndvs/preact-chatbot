const { sentryWebpackPlugin } = require('@sentry/webpack-plugin');

const path = require('path');
const { VanillaExtractPlugin } = require('@vanilla-extract/webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { DefinePlugin } = require('webpack');
const IslandFileSizePlugin = require('./src/utils/IslandFileSizePlugin');
const glob = require('glob');

/**
 * @returns {Array.<{import: string, name: string, layer: string, elementName: string}>}
 */
const getIslands = () => {
  const paths = glob.sync('./src/islands/**/*.island.{ts,tsx}');

  return paths.map((path) => {
    const name = path
      .split('/')
      .pop()
      .replace(/.island.(tsx|ts)/g, '');

    let elementName = `${name}-island`;
    /**
     * If you want to name your web component something different than the filename of the island (not
     * recommended). Please override them here.
     */
    // if (name === 'call-to-action') {
    //   elementName = 'something-else'
    // }

    return {
      path,
      name,
      elementName,
      layer: name
    };
  });
};

const islands = getIslands();

// This builds the entry points for all of your islands.
const buildEntryPoints = () => {
  const entryPoints = {};

  islands.forEach((island) => {
    entryPoints[island.name] = {
      import: island.path,
      layer: island.layer
    };
  });

  return entryPoints;
};

const buildCssLayersFromEntryPoints = () => {
  return islands.map(({ layer, elementName }) => {
    return {
      issuerLayer: layer,
      use: [
        {
          loader: 'style-loader',
          options: {
            injectType: 'singletonStyleTag',
            attributes: {
              'data-style-for': elementName
            },
            insert: (styleTag) => {
              var styleTarget = styleTag.dataset.styleFor;

              if (!styleTarget) {
                console.error(
                  'Did not get a style target in the insert command from the style loader. No styles will be inserted. Did you override something in getIslands incorrectly?'
                );
                return;
              }

              // Reset all font-related CSS custom properties and add strict font controls
              styleTag.textContent =
                `
                /* Root level reset */
                :host {
                  all: initial !important;
                  contain: content !important;
                  display: block !important;
                  font: initial !important;
                  font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
                  font-size: 16px !important;
                  line-height: 1.5 !important;
                  box-sizing: border-box !important;
                }

                /* Aggressive reset for all child elements */
                :host > * {
                  all: revert !important;
                  font-size: 16px !important;
                  line-height: 1.5 !important;
                  font-family: inherit !important;
                  box-sizing: border-box !important;
                }

                /* Force proper font scaling for rem units */
                :host {
                  font-size: 16px !important;
                }

                /* Reset for all elements */
                :host *,
                :host *::before,
                :host *::after {
                  box-sizing: border-box !important;
                  font-family: inherit !important;
                  font-size: 16px !important;
                  line-height: 1.5 !important;
                  text-size-adjust: none !important;
                  -webkit-text-size-adjust: none !important;
                }

                /* Text size classes */
                :host .text-xs, :host [class*="!text-xs"] { font-size: 12px !important; }
                :host .text-sm, :host [class*="!text-sm"] { font-size: 14px !important; }
                :host .text-base, :host [class*="!text-base"] { font-size: 16px !important; }
                :host .text-lg, :host [class*="!text-lg"] { font-size: 18px !important; }
                :host .text-xl, :host [class*="!text-xl"] { font-size: 20px !important; }
                :host .text-2xl, :host [class*="!text-2xl"] { font-size: 24px !important; }

                /* Reset custom properties */
                :host {
                  --font-body-scale: none !important;
                  --base-font-size: none !important;
                  --text-base-size: none !important;
                  --font-size-root: none !important;
                  --font-size-base: none !important;
                  --rem-base: 16 !important;
                }
              ` + styleTag.textContent;

              window.addEventListener('web-component-mount', (e) => {
                if (
                  styleTarget !== e.detail.target &&
                  styleTarget !== e.detail.parent
                ) {
                  return;
                }

                var target = document.querySelector(e.detail.target).shadowRoot;

                if (!target) {
                  console.error(
                    `Could not find a web component query selector target for "${styleTarget}". No styles will be appended.`
                  );
                  return;
                }

                // Insert a style reset before any other styles
                const resetStyles = document.createElement('style');
                resetStyles.textContent = `
                  :host {
                    all: initial !important;
                    display: block !important;
                    contain: content !important;
                    font-size: 16px !important;
                  }

                  * {
                    font-size: 16px !important;
                    line-height: 1.5 !important;
                  }
                `;

                target.prepend(resetStyles);
                target.prepend(styleTag.cloneNode(true));
              });
            }
          }
        },
        'css-loader',
        'postcss-loader'
      ]
    };
  });
};

module.exports = ({ dev, prod }) => {
  const isDev = dev === true;
  const isProd = prod === true;

  if (isDev) {
    console.log(
      "Stubbing environmental variables for development from './env.local'"
    );
    require('dotenv').config({ path: './.env.local' });
  }

  /** @type { import('webpack').Configuration } */
  const config = {
    mode: isProd ? 'production' : 'development',
    target: 'web',
    resolve: {
      extensions: ['.js', '.json', '.ts', '.tsx'],
      /**
       * From the docs to make Webpack compile Preact:
       * https://preactjs.com/guide/v10/getting-started#aliasing-in-webpack
       */
      alias: {
        src: path.resolve(__dirname, 'src'),
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat', // Must be below test-utils
        'react/jsx-runtime': 'preact/jsx-runtime'
      }
    },
    devServer: {
      port: 7777,
      hot: false
    },
    devtool: isDev ? 'eval' : false,
    entry: buildEntryPoints(),
    output: {
      path: path.join(__dirname, 'dist/islands'),
      filename: '[name].island.umd.js',
      libraryTarget: 'umd'
    },
    module: {
      rules: [
        {
          test: /\.(js|ts|tsx)$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                presets: [
                  '@babel/preset-typescript',
                  ['@babel/preset-react', { runtime: 'automatic' }],
                  [
                    '@babel/preset-env',
                    { targets: { node: 16 }, modules: false }
                  ]
                ],
                plugins: ['@vanilla-extract/babel-plugin']
              }
            }
          ]
        },
        {
          test: /\.css$/i,
          oneOf: buildCssLayersFromEntryPoints()
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader'
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        templateContent: ({ htmlWebpackPlugin }) => `
        <html>
          <head>
          <meta charset="utf-8" />
          <title>Islands</title>
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <style>
            body {
              font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI',
                Roboto, 'Helvetica Neue', Arial, sans-serif;
            }

            .preview {
              width: 100%;
              max-width: 1100px;
              margin: 80px auto;
              border: 1px dashed rgba(0, 0, 0, 0.2);
              position: relative;
            }

            .preview::before {

                content: '';
              position: absolute;
              display: block;
              top: -18px;
              font-size: 11px;
              color: rgba(0, 0, 0, 0.5);
            }
          </style>
            ${htmlWebpackPlugin.tags.headTags}
          </head>
            <body>
        ${islands
          .map((island) => {
            return `<div class="preview">
              <${island.elementName}></${island.elementName}>
              <span style="position: absolute; top: -25px; font-size: 18px; font-weight: bold, color: rgba(0, 0, 0, 0.5);">${island.name}.island</span>
            </div>`;
          })
          .join('')}

        ${htmlWebpackPlugin.tags.bodyTags}
      </body>
        </html>
      `,
        /**
         * Islands are served from /islands in dist so we don't pollute the root domain since these islands are
         * embedded into websites we do not control.
         *
         * In dev mode, we serve islands and the index.html from the root since it's dev mode. For production,
         * the index.html file is served from the root.
         */
        publicPath: isDev ? '/' : '/islands',
        filename: isDev ? 'index.html' : '../index.html'
      }),
      new VanillaExtractPlugin(),
      /**
       * Define environmental variables here that you need for the islands to function.
       * EVERY ENV VARIABLE MUST BE DEFINED HERE OR IT WILL NOT BE AVAILABLE IN THE ISLANDS.
       */
      new DefinePlugin({
        ISLAND_API_URL: JSON.stringify(process.env.ISLAND_API_URL),
        'process.env.PUSHER_KEY': JSON.stringify(process.env.PUSHER_KEY),
        'process.env.PUSHER_CLUSTER': JSON.stringify(
          process.env.PUSHER_CLUSTER
        ),
        'process.env.PUSHER_AUTH_ENDPOINT': JSON.stringify(
          process.env.PUSHER_AUTH_ENDPOINT
        ),
        'process.env.CHAT_API_URL': JSON.stringify(process.env.CHAT_API_URL),
        'process.env.SENTRY_DSN': JSON.stringify(process.env.SENTRY_DSN),
        'process.env.SENTRY_AUTH_TOKEN': JSON.stringify(
          process.env.SENTRY_AUTH_TOKEN
        )
      }),

      //   sentryWebpackPlugin({
      //     org: 'ripemetrics',
      //     project: 'preact',
      //     authToken: process.env.SENTRY_AUTH_TOKEN,
      //     release: process.env.npm_package_version,
      //     include: './dist',
      //     ignore: ['node_modules', 'webpack.config.js']
      //   }),
      ...(isProd ? [new IslandFileSizePlugin()] : [])
    ],
    // devtool: 'source-map', // Source map generation must be turned on
    stats: 'errors-warnings',
    experiments: {
      layers: true
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()]
    }
  };

  return config;
};
