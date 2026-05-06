import type { Preview } from '@storybook/react'
import { withThemeByClassName } from '@storybook/addon-themes'
import '../src/index.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile 390',
          styles: { width: '390px', height: '844px' },
        },
        tablet: {
          name: 'Tablet 768',
          styles: { width: '768px', height: '1024px' },
        },
        desktop: {
          name: 'Desktop 1440',
          styles: { width: '1440px', height: '900px' },
        },
      },
    },
    backgrounds: {
      default: 'background',
      values: [
        { name: 'background', value: '#f9fafb' },
        { name: 'surface', value: '#ffffff' },
        { name: 'dark', value: '#111928' },
      ],
    },
    layout: 'padded',
  },
  decorators: [
    withThemeByClassName({
      defaultTheme: 'light',
      themes: {
        light: '',
        dark: 'dark',
      },
    }),
  ],
}

export default preview
