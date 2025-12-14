import type { UserConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development'
  let build: UserConfig['build'] | undefined
  let esbuild: UserConfig['esbuild'] | undefined
  let defineVar: UserConfig['define'] | undefined

  if (isDev) {
    build = {
      minify: false,
      sourcemap: true,
      rollupOptions: { output: { manualChunks: undefined } },
    }

    esbuild = { jsxDev: true, keepNames: true, minifyIdentifiers: false }

    defineVar = { 'process.env.NODE_ENV': '"development"', '__DEV__': 'true' }
  }

  return {
    plugins: [
      react(),
      ...(!isDev
        ? [
            VitePWA({
              registerType: 'autoUpdate',
              includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
              workbox: {
                maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
                cleanupOutdatedCaches: true,
                skipWaiting: true,
                clientsClaim: true,
                navigateFallback: '/',
                runtimeCaching: [
                  {
                    urlPattern: /^https:\/\/preview--.*\\.lumi\\.[^\/]+\/assets\/.*/i,
                    handler: 'NetworkFirst',
                    options: {
                      cacheName: 'assets-cache',
                      expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 },
                      cacheableResponse: { statuses: [0, 200] },
                      networkTimeoutSeconds: 10,
                    },
                  },
                ],
              },
              manifest: {
                name: 'Body Titan Fitness',
                short_name: 'BodyTitan',
                description: 'Application de coaching en musculation par TitanGryx',
                theme_color: '#111827',
                background_color: '#111827',
                display: 'standalone',
                orientation: 'portrait',
                scope: '/',
                start_url: '/',
                icons: [
                  { src: 'https://cdn-static-lumi.artvibe.ai/6f/6f50c10f0ae40e645c931731d43e00c9.webp', sizes: '192x192', type: 'image/webp' },
                  { src: 'https://cdn-static-lumi.artvibe.ai/6f/6f50c10f0ae40e645c931731d43e00c9.webp', sizes: '512x512', type: 'image/webp' },
                ],
              },
            }),
          ]
        : []),
    ],

    build: {
      ...build,
      rollupOptions: {
        ...build?.rollupOptions,
        output: { ...build?.rollupOptions?.output, manualChunks(id) { if (id.includes('node_modules')) return 'vendor' } },
      },
    },

    esbuild,
    define: defineVar,

    resolve: { alias: { '@': '/src' } },
    optimizeDeps: { exclude: ['lucide-react'] },
  }
})
