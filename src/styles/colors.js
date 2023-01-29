const AppColorsDark = {
  transparent: 'transparent',
  app: '#221f3a',
  'app-2': '#292452',
  white: '#ffffff',
  black: '#0d0d0d',
  blue: '#7598ec',
  pink: '#fb73a3',
  purple: '#6359d9',
  yellow: '#FFC700',
  grey: '#999999',
  'blue-2': '#597df5',
  'light-blue': '#dceaff',
  'light-blue-1': '#f2f6ff',
  'light-blue-3': '#554cff',
  'blue-1': '#0084f4',
  'green-1': '#04b800 ',
  'green-light': '#f1ffef',
  'green-light-1': '#e3f7df',
  'pink-1': '#ff0366',
  'pink-2': '#ffcdea',
  'pink-3': '#8438ff',
  'pink-4': '#dfa1ed',
  'purple-2': '#b147f8',
  'purple-3': '#9822F46B',
  'orange-1': '#fc9d00',
  'orange-light': '#fff1e3',
  'orange-light-1': '#ffe2c5',
  'yellow-1': '#ffdf00',
  'yellow-light': '#fffce6',
  'yellow-light-1': '#fff6b4',
  'grey-1': '#d1d1d1',
  'grey-2': '#ededf0',
  'grey-3': '#d3d7db',
  'grey-4': '#3f3d66',
  'grey-5': '#667386',
  'light-blue-2': '#15B3C9',

  // Theme
  // 'theme-base': 'rgb(var(--bg-app-t) / <alpha-value>)'
};

const AppColorsLight = {
  //   //background
  transparent: 'transparent',
  app: '#221f3a',
  'app-2': '#ffffff',
  white: '#ffffff',
  black: '#0d0d0d',
  blue: '#7598ec',
  pink: '#fb73a3',
  purple: '#6359d9',
  yellow: '#FFC700',
  grey: '#999999',
  'blue-2': '#597df5',
  'light-blue': '#dceaff',
  'light-blue-1': '#f2f6ff',
  'light-blue-3': '#554cff',
  'blue-1': '#0084f4',
  'green-1': '#04b800 ',
  'green-light': '#f1ffef',
  'green-light-1': '#e3f7df',
  'pink-1': '#ff0366',
  'pink-2': '#ffcdea',
  'pink-3': '#8438ff',
  'pink-4': '#dfa1ed',
  'purple-2': '#b147f8',
  'purple-3': '#9822F46B',
  'orange-1': '#fc9d00',
  'orange-light': '#fff1e3',
  'orange-light-1': '#ffe2c5',
  'yellow-1': '#ffdf00',
  'yellow-light': '#fffce6',
  'yellow-light-1': '#fff6b4',
  'grey-1': '#d1d1d1',
  'grey-2': '#ededf0',
  'grey-3': '#d3d7db',
  'grey-4': '#3f3d66',
  'grey-5': '#667386',

  // Theme
  // 'theme-base': 'rgb(var(--bg-app-t) / <alpha-value>)'
};

// const theme = true;
const AppColors = true ? AppColorsLight : AppColorsDark;

const AppGradColors = {
  'gradient-blue-1': `linear-gradient(24.94deg, #554cff -1.3%, #66b5f8 100.42%)`,
  'gradient-orange-1': `linear-gradient(24.94deg, ${AppColors['orange-1']} -1.3%, #fcec7c 100.42%)`,
  'gradient-green-1': `linear-gradient(24.94deg, #66b5f8 -1.3%, #4fd143 100.42%)`,
  'gradient-1': `linear-gradient(267.74deg, ${AppColors['purple']} -4.45%, ${AppColors['purple-2']} 105.31%)`,
  'purple-linear': `linear-gradient(267.74deg, ${AppColors['purple']} -4.45%, ${AppColors['purple-2']} 105.31%)`,
  'gradient-2':
    'radial-gradient(72.53% 113.81% at 88.58% 24.1%,#7388ff 0%,#ca73ff 50.34%,#ff739d 100%)',
  'gradient-3':
    'linear-gradient(154.58deg,rgba(41, 36, 82, 0.5) -31.43%,rgba(99, 89, 217, 0) 109.66%)',

  'blue-gradient': `linear-gradient(82.36deg, #8279e3 38.7%, ${AppColors['pink-2']} 76.51%)`,
  'purple-gradient': 'linear-gradient(82.36deg, #0014ff 38.7%, #ff2cdf 76.51%)',

  'shadow-header': `linear-gradient(356.37deg, #1d1d1d -2.75%, rgba(104, 104, 104, 0) 106.82%`,
};

const AppBgImage = {
  'em-brand': `url('@assets/images/my-acc-brand.png')`,
  'user-balance': `url('@assets/images/user/balance_thumb.png')`,
  'user-save': `url('@assets/images/user/save_money_thumb.png')`,
};

const TextColor = { ...AppColors };
const BgColor = { ...AppColors, ...AppGradColors };

module.exports = {
  AppColors,
  AppBgImage,
  AppGradColors,
  TextColor,
  BgColor,
};
