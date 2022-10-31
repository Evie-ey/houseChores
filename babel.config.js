module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    env: {
      production: {
        pugins: ['react-native-paper/babel']
      }
    }
  };
};
