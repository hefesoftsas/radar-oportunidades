import {defineConfig} from 'vite';
import path from 'node:path';
export default defineConfig({define:{'process.env.NODE_ENV':JSON.stringify('production')},build:{outDir:path.resolve('../dist'),emptyOutDir:false,cssCodeSplit:false,lib:{entry:path.resolve('src/main.jsx'),formats:['es'],fileName:()=> 'ui-components.js'},rollupOptions:{output:{inlineDynamicImports:true,assetFileNames:'ui-components[extname]'}}}});
