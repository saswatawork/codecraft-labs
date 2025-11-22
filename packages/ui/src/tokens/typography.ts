/**
 * Design Tokens - Typography System
 *
 * Type scale, font families, and text utilities.
 * Follows modular scale with 1.25 ratio for harmonious progression.
 *
 * @module tokens/typography
 */

export const typography = {
  /**
   * Font families
   */
  fontFamily: {
    sans: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif',
    ],
    mono: [
      'JetBrains Mono',
      'Fira Code',
      'SF Mono',
      'Monaco',
      'Consolas',
      'Liberation Mono',
      'Courier New',
      'monospace',
    ],
  },

  /**
   * Font sizes with corresponding line heights
   */
  fontSize: {
    xs: {
      size: '0.75rem', // 12px
      lineHeight: '1rem', // 16px
      letterSpacing: '0.025em',
    },
    sm: {
      size: '0.875rem', // 14px
      lineHeight: '1.25rem', // 20px
      letterSpacing: '0',
    },
    base: {
      size: '1rem', // 16px
      lineHeight: '1.5rem', // 24px
      letterSpacing: '0',
    },
    lg: {
      size: '1.125rem', // 18px
      lineHeight: '1.75rem', // 28px
      letterSpacing: '-0.01em',
    },
    xl: {
      size: '1.25rem', // 20px
      lineHeight: '1.75rem', // 28px
      letterSpacing: '-0.015em',
    },
    '2xl': {
      size: '1.5rem', // 24px
      lineHeight: '2rem', // 32px
      letterSpacing: '-0.02em',
    },
    '3xl': {
      size: '1.875rem', // 30px
      lineHeight: '2.25rem', // 36px
      letterSpacing: '-0.025em',
    },
    '4xl': {
      size: '2.25rem', // 36px
      lineHeight: '2.5rem', // 40px
      letterSpacing: '-0.03em',
    },
    '5xl': {
      size: '3rem', // 48px
      lineHeight: '1.15', // Relative
      letterSpacing: '-0.035em',
    },
    '6xl': {
      size: '3.75rem', // 60px
      lineHeight: '1.1', // Relative
      letterSpacing: '-0.04em',
    },
    '7xl': {
      size: '4.5rem', // 72px
      lineHeight: '1.05', // Relative
      letterSpacing: '-0.045em',
    },
    '8xl': {
      size: '6rem', // 96px
      lineHeight: '1', // Relative
      letterSpacing: '-0.05em',
    },
    '9xl': {
      size: '8rem', // 128px
      lineHeight: '1', // Relative
      letterSpacing: '-0.055em',
    },
  },

  /**
   * Font weights
   */
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },

  /**
   * Line height scale
   */
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },

  /**
   * Letter spacing scale
   */
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const;

export type FontSize = keyof typeof typography.fontSize;
export type FontWeight = keyof typeof typography.fontWeight;
export type LineHeight = keyof typeof typography.lineHeight;
export type LetterSpacing = keyof typeof typography.letterSpacing;
