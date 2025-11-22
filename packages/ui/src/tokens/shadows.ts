/**
 * Design Tokens - Shadow System
 *
 * Elevation system using shadows for depth perception.
 * Multiple layers for natural shadow casting.
 *
 * @module tokens/shadows
 */

export const shadows = {
  /**
   * Named shadow presets
   */
  presets: {
    none: 'none',

    // Subtle shadow for minimal elevation
    subtle: '0 1px 3px 0 rgb(0 0 0 / 0.05), 0 1px 2px -1px rgb(0 0 0 / 0.05)',

    // Soft shadow for cards and surfaces
    soft: '0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.06)',

    // Medium shadow for elevated elements
    medium: '0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.06)',

    // Strong shadow for dropdowns and popovers
    strong: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.08)',

    // Extra strong shadow for modals
    'extra-strong': '0 25px 50px -12px rgb(0 0 0 / 0.15)',

    // Inner shadow for pressed states
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.06)',

    // Focus ring shadow
    focus: '0 0 0 3px rgb(59 130 246 / 0.5)',

    // Colored shadows for emphasis
    'primary-glow': '0 0 20px 0 rgb(59 130 246 / 0.35)',
    'success-glow': '0 0 20px 0 rgb(34 197 94 / 0.35)',
    'warning-glow': '0 0 20px 0 rgb(251 146 60 / 0.35)',
    'error-glow': '0 0 20px 0 rgb(239 68 68 / 0.35)',
  },

  /**
   * Elevation levels (following Material Design principles)
   */
  elevation: {
    0: 'none',
    1: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    2: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px 0 rgb(0 0 0 / 0.06)',
    3: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -1px rgb(0 0 0 / 0.06)',
    4: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05)',
    5: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)',
    6: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  },
} as const;

export type ShadowPreset = keyof typeof shadows.presets;
export type ElevationLevel = keyof typeof shadows.elevation;
