import { fileURLToPath } from 'url';
import { dirname, resolve, relative } from 'path';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import fg from 'fast-glob';
import fs from 'fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ── Auto-discovery for HTML pages ───────────────────────────────────────────
const input = fg.sync(['src/*.html']).reduce((acc, file) => {
  const name = relative('src/pages', file).replace(/\.html$/, '');
  acc[name] = resolve(__dirname, file);
  return acc;
}, {});

// ── Inline Plugin for Asset Copying ─────────────────────────────────────────
// Preserves src/assets/ structure in dist/assets/ without external dependencies
function copyAssets() {
  return {
    name: 'copy-src-assets',
    closeBundle: async () => {
      const srcDir = resolve(__dirname, 'src/assets');
      const destDir = resolve(__dirname, 'dist/assets');
      if (!fs.existsSync(srcDir)) return;
      
      const files = fg.sync('**/*', { cwd: srcDir });
      for (const file of files) {
        const srcPath = path.join(srcDir, file);
        const destPath = path.join(destDir, file);
        fs.mkdirSync(dirname(destPath), { recursive: true });
        fs.copyFileSync(srcPath, destPath);
      }
    }
  };
}

export default defineConfig({
  root: resolve(__dirname, 'src'),
  publicDir: resolve(__dirname, 'public'),

  plugins: [
    handlebars({
      partialDirectory: [
        resolve(__dirname, 'src/layouts'),
        resolve(__dirname, 'src/components'),
      ],
      helpers: {
        eq: (v1, v2) => v1 === v2,
        range: (from, to) => {
          const result = [];
          for (let i = from; i <= to; i++) result.push(i);
          return result;
        },
        list: (...args) => args.slice(0, -1),
        object: ({ hash }) => hash
      }
    }),
    copyAssets()
  ],

  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    minify: false,
    cssMinify: false,
    rollupOptions: {
      input,
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
});
