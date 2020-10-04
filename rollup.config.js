import babel from '@rollup/plugin-babel';

export default {
    input: 'app.js',
    output: {
      file: 'bundle.js',
      format: 'cjs'
    },
    plugins: [
        babel({ babelHelpers: 'bundled' })
      ]
  };