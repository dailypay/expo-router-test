type PrimaryBlue60 = '#146CF0';
type PrimaryBlue40 = '#D0E2FC';
type PrimaryBlue20 = '#F1F6FE';
type FriBlueBorder = '#BCD0EC';
type Green60 = '#178746';
type Green40 = '#D1E7DA';
type Green20 = '#F1F8F4';
type Navy60 = '#04143A';
type Navy40 = '#CDD0D8';
type Gold60 = '#F39C1E';
type Gold40 = '#FDEBD2';
type BrandOrange60 = '#FF4C00';
type BrandOrange40 = '#FFDBCC';
type BrandOrange20 = '#146CF0';
type Red60 = '#E90606';
type Red40 = '#FBCDCD';
type Red20 = '#FEF0F0';
type DarkBrown60 = '#231F20';
type DarkBrown40 = '#CDD0D8';
type BaseGray100 = '#383D4A';
type BaseGray80 = '#676B75';
type BaseGray40 = '#C6C7CA';
type BaseGray20 = '#E1E4E5';
type BaseGray10 = '#F5F5F5';
type BaseWarning = '#FDCA40';
type BaseWhite = '#ffffff';
type LightRed = '#E906060F';
type LightOrange = '#FF4C000F';
type LightBlue = '#146CF010';
type LightGreen = '#1787460F';
type LightGrey = '#04143A0F';

export interface ColorPalette {
  primaryBlue20: PrimaryBlue20;
  primaryBlue40: PrimaryBlue40;
  primaryBlue60: PrimaryBlue60;
  friBlueBorder: FriBlueBorder;
  green60: Green60;
  green40: Green40;
  green20: Green20;
  navy60: Navy60;
  navy40: Navy40;
  gold40: Gold40;
  gold60: Gold60;
  brandOrange60: BrandOrange60;
  brandOrange40: BrandOrange40;
  brandOrange20: BrandOrange20;
  red60: Red60;
  red40: Red40;
  red20: Red20;
  darkBrown60: DarkBrown60;
  darkBrown40: DarkBrown40;
  baseGray100: BaseGray100;
  baseGray80: BaseGray80;
  baseGray40: BaseGray40;
  baseGray20: BaseGray20;
  baseGray10: BaseGray10;
  baseWarning: BaseWarning;
  baseWhite: BaseWhite;
  lightRed: LightRed;
  lightOrange: LightOrange;
  lightBlue: LightBlue;
  lightGreen: LightGreen;
  lightGrey: LightGrey;
}

export interface FridayAppTheme {
  Success: Green60;
  Error: Red60;
  Warning: BaseWarning;
  Primary: {
    brand: PrimaryBlue60;
    main: BaseWhite;
  };
  Secondary: {
    brand: BaseWhite;
    main: PrimaryBlue60;
  };
  Text: {
    primary: Navy60;
    main: BaseGray100;
    secondary: BaseGray80;
    light: BaseWhite;
    info: PrimaryBlue60;
    success: Green60;
    disabled: BaseGray40;
    error: Red60;
    orange: BrandOrange60;
  };
  Link: PrimaryBlue60;
  Background: {
    main: BaseGray10;
    primary: BaseWhite;
    lightBlue: PrimaryBlue20;
    secondary: PrimaryBlue60;
    orange: BrandOrange60;
    info: LightBlue;
    baseGray20: BaseGray20;
    baseGray100: BaseGray100;
  };
  colorCombinations: {
    orange: {
      background: LightOrange;
      text: BrandOrange60;
    };
    red: {
      background: LightRed;
      text: Red60;
    };
    blue: {
      background: LightBlue;
      text: PrimaryBlue60;
    };
    green: {
      background: LightGreen;
      text: Green60;
    };
    grey: { background: LightGrey; text: Navy60 };
  };
  BoxShadow: {
    light: BaseGray40;
    dark: string;
    navBar: BaseGray100;
  };
  Icons: {
    friPrimary: PrimaryBlue60;
    primaryBlue40: PrimaryBlue40;
    friBlueBorder: FriBlueBorder;
    friDecorativeOne: Navy60;
    friDecorativeTwo: BrandOrange60;
    baseWarning: BaseWarning;
    baseSuccess: Green60;
    baseWhite: BaseWhite;
    baseError: Red60;
    baseGray100: BaseGray100;
    baseGray80: BaseGray80;
    baseGray40: BaseGray40;
    baseGray20: BaseGray20;
    baseGray10: BaseGray10;
    lightRed: LightRed;
    lightOrange: LightOrange;
    lightBlue: LightBlue;
    lightGreen: LightGreen;
    green40: Green40;
    lightGrey: LightGrey;
    gold60: Gold60;
    gold40: Gold40;
  };
  Lines: {
    baseGray10: BaseGray10;
    divider: BaseGray20;
    input: BaseGray40;
    friBlueBorder: FriBlueBorder;
  };
}
