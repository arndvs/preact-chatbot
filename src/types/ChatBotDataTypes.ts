import { createContext } from 'react';

export interface AddressType {
  city: string;
  country: string;
  line1: string;
  line2: string;
  postal_code: string;
  state: string;
}

export interface DealType {
  id: number;
  ulid: string | null;
  store_id: number;
  user_id: number;
  sequence: number;
  created_at: string;
  updated_at: string;
  product_menu_url: string;
  img_url: string;
  product_name: string;
  product_price: string;
  product_brand_name: string;
  product_category_name: string | null;
  product_description: string;
  product_id: string | null;
}

export interface ProductType {
  id: number;
  ulid: string | null;
  name: string;
  created_at: string;
  updated_at: string;
  store_id: number;
  data_source_id: number | null;
  api_product_id: string | null;
  api_category_id: string | null;
  unit_price_in_cents: number | null;
  weight_per_unit: number | null;
  cannabis_type: string | null;
  wm_category: string | null;
  shopify_category: string | null;
  brand_id: number | null;
  api_brand_id: string | null;
  ignored_at: string | null;
  cached_at: string;
  total_sales: string;
  units_sold: string;
  gross_profit: string;
  total_sales_0: number;
  units_sold_0: number;
  gross_profit_0: number;
  delta_0: number;
  is_active: boolean;
  image_url: string | null;
  product_description: string;
  is_purchasable: boolean;
  metrics_updated_at: string | null;
  shopify_id: number;
  shopify_status: string | null;
  category: string;
  cost_of_goods_in_cents: number | null;
  brand_name: string | null;
  product_menu_url: string;
  product_price: string;
}

export interface StoreType {
  id: number;
  ulid: string | null;
  organization_id: number;
  name: string;
  description: string;
  short_name: string;
  is_development: number;
  is_beta: number;
  is_demo: number;
  street_address: string;
  street_address_2: string;
  city: string;
  state: string;
  zipcode: string;
  country_code: string;
  billing_address: string | AddressType;
  show_business_address: number;
  phone: string;
  brand_color: string;
  timezone: string;
  logo_url: string;
  last_api_at: string;
  enable_chatbot: number;
  thumbnail_path: string | null;
  deals_of_the_month: DealType[];
  email: string;
  url_menu: string;
  subdomain: string;
  hours_mon_open: string;
  hours_mon_close: string;
  hours_tue_open: string;
  hours_tue_close: string;
  hours_wed_open: string;
  hours_wed_close: string;
  hours_thu_open: string;
  hours_thu_close: string;
  hours_fri_open: string;
  hours_fri_close: string;
  hours_sat_open: string;
  hours_sat_close: string;
  hours_sun_open: string;
  hours_sun_close: string;
}

export interface BotDataType {
  store?: StoreType;
  customer?: any;
  best_sellers: ProductType[];
  new_products: ProductType[];
  recommended_products?: any;
  request_session: string;
  greeting: { message: string; context: string };
  context: string;
}

export const defaultBotData: BotDataType = {
  store: undefined,
  customer: undefined,
  best_sellers: [],
  new_products: [],
  recommended_products: undefined,
  request_session: '',
  greeting: { message: '', context: '' },
  context: ''
};

export interface ChatBotContextType {
  botData: BotDataType;
  setBotData: (
    newData: BotDataType | ((prevState: BotDataType) => BotDataType)
  ) => void;
}
