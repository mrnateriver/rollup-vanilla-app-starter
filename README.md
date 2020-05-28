# Template for web apps

Basic template for creating "vanilla" (almost) web applications using TypeScript and Rollup for bundling.

At its core is Rollup config, which:
 1. Creates one IIFE bundle;
 2. Outputs build progress ([rollup-plugin-progress](https://github.com/jkuri/rollup-plugin-progress));
 3. Clears output directory before building ([rollup-plugin-delete](https://github.com/vladshcherbin/rollup-plugin-delete));
 4. Resolves imports from `node_modules` ([@rollup/plugin-node-resolve](https://github.com/rollup/plugins/tree/master/packages/node-resolve));
 5. Transforms CJS modules into ES ones ([@rollup/plugin-commonjs](https://github.com/rollup/plugins/tree/master/packages/commonjs));
 6. Compiles TypeScript ([rollup-plugin-typescript2](https://github.com/ezolenko/rollup-plugin-typescript2));
 7. Replaces `process.env.NODE_ENV` expression in source code to a constant value, taken from environment during build for elimination of dead branches ([rollup-plugin-replace](https://github.com/rollup/plugins/tree/master/packages/replace));
 8. In production build, removes all `console.*` and `assert.*` calls ([@rollup/plugin-strip](https://github.com/rollup/plugins/tree/master/packages/strip));
 9. In production build, minifies and compresses the output, mangles all property names starting with `_`, removes comments ([rollup-plugin-terser](https://github.com/TrySound/rollup-plugin-terser));
 10. Injects links to build artifacts into a template file (`src/index.html`) and outputs it in destination directory ([rollup-plugin-html2](https://github.com/mentaljam/rollup-plugin-html2));
 11. In development mode, injects special JS code into the bundle for automatically reloading browser page on rebuild ([rollup-plugin-livereload](https://github.com/thgh/rollup-plugin-livereload));
 12. And finally, in development mode, starts a web server for serving build artifacts, as well as static assets from `static` directory ([rollup-plugin-serve](https://github.com/thgh/rollup-plugin-serve)).

That particular plugin for TypeScript is used due to [this bug](https://github.com/rollup/plugins/issues/418) and [that bug](https://github.com/rollup/plugins/issues/272) in core Rollup plugin.

TypeScript compilation is configured relatively liberally, and set for `esnext` target. This means that projects created from this template will only work in bleeding edge browsers, but we all should move with the times anyway.

Apart from basic configuration, this template also includes:
 1. [ESLint](https://github.com/eslint/eslint) setup for linting TS/JS files ([@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint));
 2. [Prettier](https://github.com/prettier/prettier) for autoformatting and linting code style (done via ESLint using [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier) and [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier));
 3. `.editorconfig` file with pretty common params (4 spaces for tabs, 120 line length);
 4. Workspace preferences for [Visual Studio Code](https://code.visualstudio.com) matching tooling settings, including extensions recommendations.

[lit-html](https://lit-html.polymer-project.org) is used for UI development.

This template is far from being comprehensive. TBD:
 1. Styling solutions;
 2. Routing;
 3. Testing;
 4. Dependency injection (why not);
 5. Development pipeline optimizations.

To test this template (basic "hello world"), run:
```
yarn install && yarn run dev
```
