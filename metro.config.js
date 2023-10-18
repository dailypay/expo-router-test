// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

// resolvers
defaultConfig.resolver.assetExts = defaultConfig.resolver.assetExts.filter(
  (ext) => ext !== 'svg'
);
defaultConfig.resolver.sourceExts.push('svg');
defaultConfig.resolver.sourceExts.push('tsx');
defaultConfig.resolver.sourceExts.push('js');
defaultConfig.resolver.sourceExts.push('ts');
defaultConfig.resolver.sourceExts.push('jsx');
defaultConfig.resolver.sourceExts.push('cjs');
defaultConfig.resolver.sourceExts.push('mjs');

// transformers
defaultConfig.transformer.assetPlugins = ['expo-asset/tools/hashAssetFiles'];
defaultConfig.transformer.babelTransformerPath = require.resolve(
  'react-native-svg-transformer'
);
defaultConfig.transformer.minifierConfig = {
  keep_classnames: true, // Preserve class names
  keep_fnames: true, // Preserve function names
  mangle: {
    keep_classnames: true, // Preserve class names
    keep_fnames: true, // Preserve function names
  },
};

module.exports = defaultConfig;
