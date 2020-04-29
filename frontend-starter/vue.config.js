const path = require("path");

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        leaflet: path.join(__dirname, 'node_modules/leaflet')
      }
    }
  },
  transpileDependencies: ["vuetify"]
};
