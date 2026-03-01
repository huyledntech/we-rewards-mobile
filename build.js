import { build } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import fg from 'fast-glob';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, resolve, relative } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const OUT_DIR = 'dist';

// ── Auto-discovery for HTML pages ───────────────────────────────────────────
const input = fg.sync('src/pages/**/*.html').reduce((acc, file) => {
  const name = relative('src/pages', file).replace(/\.html$/, '');
  acc[name] = resolve(__dirname, file);
  return acc;
}, {});

// ── Custom Plugin: Asset Copy & HTML Flattening ─────────────────────────────
function postBuildSetup() {
  return {
    name: 'post-build-setup',
    closeBundle: async () => {
      const destDir = resolve(__dirname, OUT_DIR);
      
      // 1. Copy Assets from src/assets to dist-app/assets
      const srcAssets = resolve(__dirname, 'src/assets');
      const destAssets = resolve(__dirname, OUT_DIR + '/assets');
      if (fs.existsSync(srcAssets)) {
        const files = fg.sync('**/*', { cwd: srcAssets });
        for (const file of files) {
          const srcPath = path.join(srcAssets, file);
          const destPath = path.join(destAssets, file);
          fs.mkdirSync(dirname(destPath), { recursive: true });
          fs.copyFileSync(srcPath, destPath);
        }
      }

      // 2. Flatten HTML: Move dist-app/pages/*.html -> dist-app/*.html
      const pagesDir = path.join(destDir, 'pages');
      if (fs.existsSync(pagesDir)) {
        const htmlFiles = fg.sync('**/*.html', { cwd: pagesDir });
        for (const file of htmlFiles) {
          const srcHtml = path.join(pagesDir, file);
          const destHtml = path.join(destDir, file); // Root of dist-app
          fs.renameSync(srcHtml, destHtml);
        }
        // Remove the newly empty pages/ directory
        fs.rmSync(pagesDir, { recursive: true, force: true });
      }
    }
  };
}

const config = {
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
        }
      }
    }),
    postBuildSetup()
  ],
  build: {
    outDir: resolve(__dirname, OUT_DIR),
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
};

(async () => {
  try {
    console.log('Starting custom build script...');
    await build(config);
    console.log('Build completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Build failed:', err);
    process.exit(1);
  }
})();
