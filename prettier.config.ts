import { type Config } from 'prettier';

const config: Config = {
  singleQuote: true,
  bracketSameLine: true,
  printWidth: 140,
  quoteProps: 'consistent',

  overrides: [
    {
      files: '*.vue',
      options: {
        printWidth: 200,
        singleAttributePerLine: false,
        // htmlWhitespaceSensitivity: 'ignore',
      },
    },
  ],
};

export default config;
