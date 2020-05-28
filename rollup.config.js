import { terser } from 'rollup-plugin-terser';
import del from 'rollup-plugin-delete';
import html2 from 'rollup-plugin-html2';
import serve from 'rollup-plugin-serve';
import strip from '@rollup/plugin-strip';
import replace from 'rollup-plugin-replace';
import progress from 'rollup-plugin-progress';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import typescript from 'rollup-plugin-typescript2';

const production = process.env.NODE_ENV === 'production';
const development = process.env.NODE_ENV === 'development';

export default {
    input: 'src/index.ts',
    output: {
        sourcemap: true,
        format: 'iife',
        dir: 'dist',
        entryFileNames: 'bundle.[hash].js',
        chunkFileNames: 'chunk.[hash].js',
    },
    plugins: [
        // Outputs current build progress
        progress({ clearLine: true }),

        // Removes files from destination directory before build
        del({ targets: 'dist/*' }),

        // Allows resolving external dependencies in `node_modules`
        resolve(),

        // Transform CommonJS external modules into ES modules for tree-shaking
        commonjs(),

        // Transpiles TypeScript
        typescript(),

        // Replaces accessor of current environment with a static string, which allows for dead code elimination in conditions
        replace({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) }),

        // Removes console.* and assert.* calls from code in production
        production && strip(),

        // Minifies output in production build
        production &&
            terser({
                output: { comments: false },
                mangle: {
                    toplevel: true,
                    properties: {
                        regex: /^_\w/,
                    },
                },
            }),

        // Injects links to build artifacts into template and outputs it in destination directory
        html2({ template: 'src/index.html' }),

        // Provides automatic page refresh on changes in development environment
        development && livereload('dist'),

        // Serves build artifacts by HTTP in development mode
        development && serve({ historyApiFallback: true, contentBase: ['dist', './'] }),
    ],
};
