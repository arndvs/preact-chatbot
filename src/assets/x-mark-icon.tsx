import { SvgProps } from 'src/types/svg';

export function XMarkIcon(props: SvgProps) {
  return (
    <svg
      {...props}
      fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
      style="width: 1.5rem; height: 1.5rem;"
    >
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />

    </svg>
  );
}
