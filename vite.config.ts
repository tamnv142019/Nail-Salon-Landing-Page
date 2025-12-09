
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react-swc';
  import path from 'path';

  export default defineConfig({
    plugins: [react()],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        'figma:asset/9bec472ae90f90102b38538430cb42ea555b4e96.png': path.resolve(__dirname, './src/assets/9bec472ae90f90102b38538430cb42ea555b4e96.png'),
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'esnext',
      outDir: 'build',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
        format: {
          comments: false,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom'],
            'vendor-ui': [
              '@radix-ui/react-accordion',
              '@radix-ui/react-alert-dialog',
              '@radix-ui/react-aspect-ratio',
              '@radix-ui/react-avatar',
              '@radix-ui/react-checkbox',
              '@radix-ui/react-collapsible',
              '@radix-ui/react-context-menu',
              '@radix-ui/react-dialog',
              '@radix-ui/react-dropdown-menu',
            ],
            'vendor-icons': ['lucide-react'],
            'vendor-other': ['recharts', 'sonner', 'cmdk'],
          },
        },
      },
      chunkSizeWarningLimit: 500,
      cssCodeSplit: true,
      sourcemap: false,
    },
    server: {
      port: 3000,
      open: true,
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'lucide-react',
        '@radix-ui/react-dialog',
      ],
    },
  });