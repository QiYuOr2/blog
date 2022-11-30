import path from 'path';
import fs from 'fs';

export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook('render:html', (html) => {
    const __NUXT__ = html.bodyAppend[0].replace(/<\/?script>/g, '');
    const __NUXTPath = `/_nuxt/append.${Date.now()}.js`;

    fs.writeFileSync(path.join(process.cwd(), '.vercel/output/functions/__nitro.func/chunks/app', __NUXTPath), __NUXT__);

    html.bodyAppend[0] = `<script type="module" src="${__NUXTPath}" crossorigin></script>`;
  });
});
