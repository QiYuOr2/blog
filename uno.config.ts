import {
  defineConfig,
  presetAttributify, 
  transformerVariantGroup, 
  transformerDirectives,
  presetTypography,
  presetWind3
} from 'unocss'

export default defineConfig({
  shortcuts:[
    { 
      'footer-link': "relative after:content-[''] after:absolute after:-bottom-[1px] after:left-0 after:right-0 after:h-[1px] after:bg-[#ececec]" ,
    }
  ],
  rules: [
    ['custom-bg-radial', { 'background': 'radial-gradient(19px at 0%, var(--un-gradient-from) 100%, var(--un-gradient-to) 100%)'}]
  ],
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
          'background-color': 'var(--blockquote-bg)',
        },
        pre: {
          'background-color': 'var(--pre-bg) !important',
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