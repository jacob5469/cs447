const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        // Needed to fix a problem with the heatmap plugin
        leaflet: path.join(__dirname, 'node_modules/leaflet'),
      },
    },
  },
};