/* eslint-disable import/no-unresolved */
import * as radix from "@radix-ui/colors"
import tailwindForms from "@tailwindcss/forms"
import plugin from "tailwindcss/plugin"
import tailwindAnimations from "tailwindcss-animate"

const spacing = {
  0: 0,
  1: rem(4),
  2: rem(8),
  3: rem(12),
  4: rem(16),
  5: rem(24),
  6: rem(32),
  7: rem(40),
  8: rem(64),
  9: rem(80),
  10: rem(160),
}

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.tsx"],
  theme: {
    colors: {
      ...fromRadix(radix.slateDark, "base"),
      ...fromRadix(radix.slateDarkA, "base-a"),
      ...fromRadix(radix.skyDark, "accent"),
      ...fromRadix(radix.skyDarkA, "accent-a"),
      ...fromRadix(radix.greenDark, "success"),
      ...fromRadix(radix.greenDarkA, "success-a"),
      ...fromRadix(radix.redDark, "error"),
      ...fromRadix(radix.redDarkA, "error-a"),
    },
    spacing,
    minWidth: spacing,
    minHeight: spacing,
    fontSize: {
      1: rem(12),
      2: rem(14),
      3: rem(16),
      4: rem(18),
      5: rem(20),
      6: rem(24),
      7: rem(28),
      8: rem(35),
      9: rem(60),
    },
    letterSpacing: {
      1: "0.0025em",
      2: "0em",
      3: "0em",
      4: "-0.0025em",
      5: "-0.005em",
      6: "-0.00625em",
      7: "-0.0075em",
      8: "-0.01em",
      9: "-0.025em",
    },
    lineHeight: {
      1: rem(16),
      2: rem(20),
      3: rem(24),
      4: rem(26),
      5: rem(28),
      6: rem(30),
      7: rem(36),
      8: rem(40),
      9: rem(68),
    },
  },
  plugins: [
    tailwindAnimations,
    tailwindForms,
    plugin(function colorsToVars({ addBase, theme }) {
      function extractColorVars(colorObj, colorGroup = "") {
        return Object.keys(colorObj).reduce((vars, colorKey) => {
          const value = colorObj[colorKey]

          return {
            ...vars,
            ...(typeof value === "string"
              ? { [`--color${colorGroup}-${colorKey}`]: value }
              : extractColorVars(value, `-${colorKey}`)),
          }
        }, {})
      }

      addBase({ ":root": extractColorVars(theme("colors")) })
    }),
    plugin(function typographyStyles({ matchUtilities, theme }) {
      matchUtilities(
        {
          typography: (value) => {
            return {
              fontSize: theme(`fontSize.${value}`),
              lineHeight: theme(`lineHeight.${value}`),
              letterSpacing: theme(`letterSpacing.${value}`),
            }
          },
        },
        {
          values: Object.keys(theme("fontSize")).reduce((acc, i) => ({ ...acc, [i]: i }), {}),
          variants: ["responsive"],
        },
      )
    }),
    plugin(function textColors({ addUtilities, theme }) {
      addUtilities({
        ".text-base": { color: theme("colors.base-12") },
        ".text-dimmed": { color: theme("colors.base-11") },
        ".text-extradimmed": { color: theme("colors.base-10") },
        ".text-contrast": { color: theme("colors.base-1") },
        ".text-accent": { color: theme("colors.accent-11") },
      })
    }),
  ],
}

function rem(from) {
  return `${from / 16}rem`
}

function fromRadix(palette = {}, name = "") {
  return Object.values(palette).reduce((palette, color, i) => ({ ...palette, [`${name}-${i + 1}`]: color }), {})
}
