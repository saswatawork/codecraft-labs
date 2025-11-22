/**
 * Design Tokens - Color System
 *
 * Centralized color palette for consistent theming across the design system.
 * Uses HSL color space for better manipulation and alpha channel support.
 *
 * @module tokens/colors
 */

export const colors = {
  /**
   * Semantic color roles
   * These map to functional uses in the UI
   */
  semantic: {
    primary: {
      DEFAULT: '221.2 83.2% 53.3%',
      foreground: '210 40% 98%',
      hover: '221.2 83.2% 45%',
      active: '221.2 83.2% 40%',
    },
    secondary: {
      DEFAULT: '210 40% 96%',
      foreground: '222.2 84% 4.9%',
      hover: '210 40% 92%',
      active: '210 40% 88%',
    },
    success: {
      DEFAULT: '142.1 76.2% 36.3%',
      foreground: '210 40% 98%',
      hover: '142.1 76.2% 30%',
      active: '142.1 76.2% 25%',
    },
    warning: {
      DEFAULT: '47.9 95.8% 53.1%',
      foreground: '222.2 84% 4.9%',
      hover: '47.9 95.8% 45%',
      active: '47.9 95.8% 40%',
    },
    error: {
      DEFAULT: '0 84.2% 60.2%',
      foreground: '210 40% 98%',
      hover: '0 84.2% 52%',
      active: '0 84.2% 45%',
    },
    info: {
      DEFAULT: '199 89% 48%',
      foreground: '210 40% 98%',
      hover: '199 89% 40%',
      active: '199 89% 35%',
    },
  },

  /**
   * Contextual tones for components
   * Provides lighter, softer variations for backgrounds and accents
   */
  tones: {
    blue: {
      50: '214 95% 96%',
      100: '214 95% 93%',
      200: '213 97% 87%',
      300: '212 96% 78%',
      400: '213 94% 68%',
      500: '217 91% 60%',
      600: '221 83% 53%',
      700: '224 76% 48%',
      800: '226 71% 40%',
      900: '224 64% 33%',
      950: '226 57% 21%',
    },
    purple: {
      50: '270 100% 98%',
      100: '269 100% 95%',
      200: '269 100% 92%',
      300: '269 97% 85%',
      400: '270 95% 75%',
      500: '270 91% 65%',
      600: '271 81% 56%',
      700: '272 72% 47%',
      800: '273 67% 39%',
      900: '274 66% 32%',
      950: '275 79% 21%',
    },
    green: {
      50: '138 76% 97%',
      100: '141 84% 93%',
      200: '141 79% 85%',
      300: '142 77% 73%',
      400: '142 69% 58%',
      500: '142 71% 45%',
      600: '142 76% 36%',
      700: '142 72% 29%',
      800: '143 64% 24%',
      900: '144 61% 20%',
      950: '145 79% 11%',
    },
    orange: {
      50: '33 100% 96%',
      100: '34 100% 92%',
      200: '32 98% 83%',
      300: '31 97% 72%',
      400: '27 96% 61%',
      500: '25 95% 53%',
      600: '21 90% 48%',
      700: '17 88% 40%',
      800: '15 79% 34%',
      900: '15 75% 28%',
      950: '13 81% 15%',
    },
    red: {
      50: '0 86% 97%',
      100: '0 93% 94%',
      200: '0 96% 89%',
      300: '0 94% 82%',
      400: '0 91% 71%',
      500: '0 84% 60%',
      600: '0 72% 51%',
      700: '0 74% 42%',
      800: '0 70% 35%',
      900: '0 63% 31%',
      950: '0 75% 16%',
    },
  },

  /**
   * Gradient presets
   * Pre-defined gradient combinations for consistent visual effects
   */
  gradients: {
    primary: 'linear-gradient(135deg, hsl(221 83% 53%) 0%, hsl(271 81% 56%) 100%)',
    success: 'linear-gradient(135deg, hsl(142 76% 36%) 0%, hsl(142 71% 45%) 100%)',
    warning: 'linear-gradient(135deg, hsl(47 96% 53%) 0%, hsl(27 96% 61%) 100%)',
    error: 'linear-gradient(135deg, hsl(0 84% 60%) 0%, hsl(0 72% 51%) 100%)',
    info: 'linear-gradient(135deg, hsl(199 89% 48%) 0%, hsl(217 91% 60%) 100%)',
    blue: 'linear-gradient(135deg, hsl(217 91% 60%) 0%, hsl(271 81% 56%) 100%)',
    purple: 'linear-gradient(135deg, hsl(271 81% 56%) 0%, hsl(221 83% 53%) 100%)',
    sunset: 'linear-gradient(135deg, hsl(47 96% 53%) 0%, hsl(0 84% 60%) 100%)',
    ocean: 'linear-gradient(135deg, hsl(199 89% 48%) 0%, hsl(142 76% 36%) 100%)',
  },

  /**
   * Neutral gray scale
   */
  gray: {
    50: '210 40% 98%',
    100: '210 40% 96%',
    200: '214 32% 91%',
    300: '213 27% 84%',
    400: '215 20% 65%',
    500: '215 16% 47%',
    600: '215 19% 35%',
    700: '215 25% 27%',
    800: '217 33% 17%',
    900: '222 47% 11%',
    950: '229 84% 5%',
  },
} as const;

export type SemanticColor = keyof typeof colors.semantic;
export type Tone = keyof typeof colors.tones;
export type GradientPreset = keyof typeof colors.gradients;
