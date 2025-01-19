module.exports = {
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: 'asset/resource', // Webpack 5 way of handling static assets
        },
      ],
    },
  };
  