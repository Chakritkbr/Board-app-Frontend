import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'green-500': '#243831',
        'green-100': '#D8E9E4',
        'grey-600': '#5B5B5B',
        'grey-100': '#BBC2C0',
        'black-110': '#191919',

        success: '#49a569',
        white: '#fff',
        'text-default-subheader': '#3c3c3c',
        'color-grey-grey-50': '#f9f9f9',
        'border-default-default': '#dadada',
        darkgray: '#a0afba',
        'text-default-header': '#1c1c1c',
        'green-300': '#2b5f44',
        blueviolet: '#9747ff',
        'surface-primary-default': '#00c5b8',
      },
      fontFamily: {
        'ibm-plex-semibold-sm': "'IBM Plex Sans Thai'",
        castoro: 'Castoro',
        inter: 'Inter',
      },
    },
  },
  plugins: [],
};
export default config;
