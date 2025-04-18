import {
  defineConfig,
  presetAttributify, 
  transformerVariantGroup, 
  transformerDirectives,
  presetTypography,
  presetWind3
} from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify(),
    presetWind3(),
    presetTypography({
      cssExtend: {
        '.toc a, .paginations a': {
          'text-decoration': 'none',
        },
        blockquote: {
          'font-style': 'unset',
          padding: '0.4em 1.75em',
          'background-color': '#f9f9f9',
        },
        pre: {
          'background-color': '#fafafa !important',
        },
        ':not(pre) > code::before,:not(pre) > code::after': {
          content: 'none',
        },
        ':not(pre) > code': {
          'background-color': 'var(--un-prose-bg-soft)',
          padding: '0.1em 0.3em',
        },
      }
    })
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup()
  ],
})