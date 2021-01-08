import path from 'path';
import webpack from 'webpack';
import memoryfs from 'memory-fs';

import MyExamplePlugin from './plugin';

export default (fixture, options = {}) => {
  const compiler = webpack({
    mode: 'production',
    context: __dirname,
    // entry: `./${fixture}`,
    entry: `./example.txt`,
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.txt$/,
          use: {
            loader: path.resolve(__dirname, '../webpack_utils/loader.js'),
            options: {
              name: 'Alice',
            },
          },
        },
      ],
    },
    plugins: [new MyExamplePlugin({ options: true })],
  });

  compiler.outputFileSystem = new memoryfs();
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err);
      resolve(stats);
    });
  });
};
