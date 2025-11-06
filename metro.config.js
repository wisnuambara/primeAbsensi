// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);
  // Tambahkan support untuk modul .cjs
  config.resolver.sourceExts.push('cjs');
  // Nonaktifkan penegakan package.json exports untuk keperluan Firebase
  config.resolver.unstable_enablePackageExports = false;
  return config;
})();
