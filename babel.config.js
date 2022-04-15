const { paramCase } = require('change-case');

module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      'transform-imports',
      {
        // transform e.g. ShoppingCart into shopping-cart
        'tabler-icons-react': {
          transform: (name) => `tabler-icons-react/dist/icons/${paramCase(name)}`,
        },
      },
    ],
  ],
};
