'use strict';

module.exports = () => {
  const config = (exports = {});
  config.assets = {
    devServer: {
      debug: true,
      autoPort: true,
    },
    dynamicLocalIP: false,
  };
  return config;
};
