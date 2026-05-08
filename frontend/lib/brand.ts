/**
 * Ricrene Brand Colors — single source of truth.
 * Import from here in any component that needs brand colors.
 *
 * Primary brand:  #44B6E8  (Ricrene Sky Blue)
 */

export const brand = {
  /** Primary brand blue */
  DEFAULT: "#44B6E8",
  /** Darker shade for hover states */
  dark:    "#2A9FD4",
  /** Deeper shade for pressed/active */
  deeper:  "#1A7FAA",
  /** Very light tint for backgrounds */
  light:   "#D6F0FB",
  /** Pale tint for hover backgrounds */
  pale:    "#EBF8FD",
} as const;

export type BrandKey = keyof typeof brand;