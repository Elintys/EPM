module.exports = {
  presets: ['module:@react-native/babel-preset'],
  // presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env', // chemin du fichier d'environnement
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: true,
      },
      'react-native-worklets/plugin',
    ],
  ],
};
