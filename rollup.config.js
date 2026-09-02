import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss'
import url from '@rollup/plugin-url';
import svgr from '@svgr/rollup'
import {defineConfig} from "rollup";
import terser from "@rollup/plugin-terser";
import { dts } from "rollup-plugin-dts";

import packageJson from './package.json' with { type: 'json' };;


export default defineConfig([
  {
    input: 'src/index.ts',
    output: [
      {
        dir: 'dist',
        format: 'cjs',
        entryFileNames: 'cjs/[name].js',
        exports: 'named'
      },
      {
        dir: 'dist',
        format: 'esm',
        entryFileNames: 'esm/[name].js'
      }
    ],
    external: ['react'],
    plugins: [
      // minimize
      terser(),
      // ts compile
      typescript({
        tsconfig: 'tsconfig.json',
        declaration: true,
        declarationDir: 'dist/types'
      }),
      // module scss compile
      postcss({
        plugins: [],
        extract: 'index.css',
        modules: true,
        use: ["sass"],
        minimize: true
      }),
      // url paths
      url(),
      // jsx icons
      svgr({
        icon: true
      })
    ]
  },
  {
    input: 'dist/types/index.d.ts',
    output: [
      {
        file: packageJson.types,
        format: 'esm'
      }
    ],
    external: [/\.(css|scss)$/gm],
    plugins: [dts()]
  }

]);
