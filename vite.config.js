import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function inlineCssPlugin() {
  return {
    name: 'inline-css-for-github-pages',
    apply: 'build',
    enforce: 'post',
    generateBundle(_, bundle) {
      const cssAssets = Object.values(bundle).filter(
        (item) => item.type === 'asset' && item.fileName.endsWith('.css')
      );

      if (!cssAssets.length) {
        return;
      }

      const css = cssAssets.map((item) => String(item.source)).join('\n');

      for (const item of Object.values(bundle)) {
        if (item.type === 'asset' && item.fileName.endsWith('.html')) {
          item.source = String(item.source).replace(/<link rel="stylesheet"[^>]*>/g, `<style>${css}</style>`);
        }
      }

      for (const item of cssAssets) {
        delete bundle[item.fileName];
      }
    },
  };
}

export default defineConfig({
  base: '/Tartelier-Reposter-a-Artesanal/',
  build: {
    outDir: 'docs',
  },
  plugins: [react(), inlineCssPlugin()],
});
