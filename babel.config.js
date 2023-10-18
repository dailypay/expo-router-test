const root = './src';

let babelEnvVars = [];
try {
  babelEnvVars = require('./babel-env-vars').babelEnvVars || [];
} catch (e) {
  // no-op
}

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['expo-router/babel'],
      [
        '@babel/plugin-proposal-unicode-property-regex',
        { useUnicodeFlag: false },
      ],
      ['react-native-reanimated/plugin'],
      ['@babel/plugin-transform-named-capturing-groups-regex'],
      ['@babel/plugin-proposal-async-generator-functions'],
      [
        'transform-inline-environment-variables',
        {
          include: [...babelEnvVars],
        },
      ],
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: [
            '.ios.ts',
            '.android.ts',
            '.ts',
            '.ios.tsx',
            '.android.tsx',
            '.tsx',
            '.jsx',
            '.js',
            '.json',
          ],
          alias: {
            assets: './assets',
            actions: `${root}/actions`,
            components: `${root}/components`,
            constants: `${root}/constants`,
            services: `${root}/services`,
            containers: `${root}/containers`,
            hooks: `${root}/hooks`,
            navig: `${root}/navig`,
            screens: `${root}/screens`,
            types: `${root}/types`,
            analytics: `${root}/services/analytics`,
            state: `${root}/state`,
            core: `${root}/core`,
            interfaces: `${root}/interfaces`,
            lib: `${root}/lib`,
            navigators: `${root}/navigators`,
            utils: `${root}/utils`,
            'dp-constants': `${root}/dp-constants`,
            '@app': `${root}/app`,
            android: './android',
            ios: './ios',
          },
        },
      ],
    ],
  };
};
