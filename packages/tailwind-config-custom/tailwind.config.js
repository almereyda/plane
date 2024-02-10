import colors from "tailwindcss/colors";

const generateColorShades = (color) => ({
  page: {
    ...(color === "neutral"
      ? { "surface-default": `var(--color-${color}-0)` }
      : {}),
    "surface-light": `var(--color-${color}-10)`,
    "surface-medium": `var(--color-${color}-20)`,
  },
  component: {
    "surface-light": `var(--color-${color}-30)`,
    "surface-medium": `var(--color-${color}-40)`,
    "surface-dark": `var(--color-${color}-50)`,
  },
  border: {
    subtle: `var(--color-${color}-60)`,
    medium: `var(--color-${color}-70)`,
    strong: `var(--color-${color}-80)`,
  },
  solid: `var(--color-${color}-90)`,
  "solid-hover": `var(--color-${color}-100)`,
  text: {
    subtle: `var(--color-${color}-100)`,
    medium: `var(--color-${color}-110)`,
    strong: `var(--color-${color}-120)`,
  },
  10: `var(--color-${color}-10)`,
  20: `var(--color-${color}-20)`,
  30: `var(--color-${color}-30)`,
  40: `var(--color-${color}-40)`,
  50: `var(--color-${color}-50)`,
  60: `var(--color-${color}-60)`,
  70: `var(--color-${color}-70)`,
  80: `var(--color-${color}-80)`,
  90: `var(--color-${color}-90)`,
  100: `var(--color-${color}-100)`,
  110: `var(--color-${color}-110)`,
  120: `var(--color-${color}-120)`,
  DEFAULT: `var(--color-${color}-90)`,
});

const generateSidebarColorShades = (color) => ({
  page: {
    ...(color === "neutral"
      ? { "surface-default": `var(--color-sidebar-${color}-0)` }
      : {}),
    "surface-light": `var(--color-sidebar-${color}-10)`,
    "surface-medium": `var(--color-sidebar-${color}-20)`,
  },
  component: {
    "surface-light": `var(--color-sidebar-${color}-30)`,
    "surface-medium": `var(--color-sidebar-${color}-40)`,
    "surface-dark": `var(--color-sidebar-${color}-50)`,
  },
  border: {
    subtle: `var(--color-sidebar-${color}-60)`,
    medium: `var(--color-sidebar-${color}-70)`,
    strong: `var(--color-sidebar-${color}-80)`,
  },
  solid: `var(--color-sidebar-${color}-90)`,
  "solid-hover": `var(--color-sidebar-${color}-100)`,
  text: {
    subtle: `var(--color-sidebar-${color}-100)`,
    medium: `var(--color-sidebar-${color}-110)`,
    strong: `var(--color-sidebar-${color}-120)`,
  },
  10: `var(--color-sidebar-${color}-10)`,
  20: `var(--color-sidebar-${color}-20)`,
  30: `var(--color-sidebar-${color}-30)`,
  40: `var(--color-sidebar-${color}-40)`,
  50: `var(--color-sidebar-${color}-50)`,
  60: `var(--color-sidebar-${color}-60)`,
  70: `var(--color-sidebar-${color}-70)`,
  80: `var(--color-sidebar-${color}-80)`,
  90: `var(--color-sidebar-${color}-90)`,
  100: `var(--color-sidebar-${color}-100)`,
  110: `var(--color-sidebar-${color}-110)`,
  120: `var(--color-sidebar-${color}-120)`,
  DEFAULT: `var(--color-sidebar-${color}-90)`,
});

const generateSaturatedColorShades = (color) => ({
  10: `var(--color-${color}-10)`,
  20: `var(--color-${color}-20)`,
  30: `var(--color-${color}-30)`,
  40: `var(--color-${color}-40)`,
  50: `var(--color-${color}-50)`,
  60: `var(--color-${color}-60)`,
  70: `var(--color-${color}-70)`,
  80: `var(--color-${color}-80)`,
  90: `var(--color-${color}-90)`,
  100: `var(--color-${color}-100)`,
  110: `var(--color-${color}-110)`,
  120: `var(--color-${color}-120)`,
  DEFAULT: `var(--color-${color}-90)`,
});

const SPACING_SCALE = {
  0: "0",
  0.5: "0.1125rem",
  1: "0.225rem",
  1.5: "0.3375rem",
  2: "0.45rem",
  2.5: "0.5625rem",
  3: "0.675rem",
  3.5: "0.7875rem",
  4: "0.9rem",
  5: "1.125rem",
  6: "1.35rem",
  7: "1.575rem",
  8: "1.8rem",
  9: "2.025rem",
  10: "2.25rem",
  11: "2.475rem",
  12: "2.7rem",
  16: "3.6rem",
  20: "4.5rem",
  24: "5.4rem",
  32: "7.2rem",
  40: "9rem",
  48: "10.8rem",
  56: "12.6rem",
  64: "14.4rem",
  72: "16.2rem",
  80: "18rem",
  96: "21.6rem",
};

/** @type {import('tailwindcss').Config} */
export const darkMode = "class";
export const content = {
  relative: true,
  files: [
    "./components/**/*.tsx",
    "./constants/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.tsx",
    "./pages/**/*.tsx",
    "./ui/**/*.tsx",
    "../packages/ui/**/*.{js,ts,jsx,tsx}",
    "../packages/editor/**/src/**/*.{js,ts,jsx,tsx}",
  ],
};
export const theme = {
  boxShadow: {
    "custom-shadow-2xs": "var(--color-shadow-2xs)",
    "custom-shadow-xs": "var(--color-shadow-xs)",
    "custom-shadow-sm": "var(--color-shadow-sm)",
    "custom-shadow-rg": "var(--color-shadow-rg)",
    "custom-shadow-md": "var(--color-shadow-md)",
    "custom-shadow-lg": "var(--color-shadow-lg)",
    "custom-shadow-xl": "var(--color-shadow-xl)",
    "custom-shadow-2xl": "var(--color-shadow-2xl)",
    "custom-shadow-3xl": "var(--color-shadow-3xl)",
    "custom-shadow-4xl": "var(--color-shadow-4xl)",
    "custom-sidebar-shadow-2xs": "var(--color-sidebar-shadow-2xs)",
    "custom-sidebar-shadow-xs": "var(--color-sidebar-shadow-xs)",
    "custom-sidebar-shadow-sm": "var(--color-sidebar-shadow-sm)",
    "custom-sidebar-shadow-rg": "var(--color-sidebar-shadow-rg)",
    "custom-sidebar-shadow-md": "var(--color-sidebar-shadow-md)",
    "custom-sidebar-shadow-lg": "var(--color-sidebar-shadow-lg)",
    "custom-sidebar-shadow-xl": "var(--color-sidebar-shadow-xl)",
    "custom-sidebar-shadow-2xl": "var(--color-sidebar-shadow-2xl)",
    "custom-sidebar-shadow-3xl": "var(--color-sidebar-shadow-3xl)",
    "custom-sidebar-shadow-4xl": "var(--color-sidebar-shadow-4xl)",
    "onboarding-shadow-sm": "var(--color-onboarding-shadow-sm)",
  },
  colors: {
    inherit: colors.inherit,
    current: colors.current,
    transparent: colors.transparent,
    black: colors.black,
    white: colors.white,
    primary: generateColorShades("primary"),
    neutral: generateColorShades("neutral"),
    success: generateColorShades("success"),
    warning: generateColorShades("warning"),
    danger: generateColorShades("danger"),
    info: generateColorShades("info"),
    orange: generateSaturatedColorShades("orange"),
    pink: generateSaturatedColorShades("pink"),
    purple: generateSaturatedColorShades("purple"),
    violet: generateSaturatedColorShades("violet"),
    sidebar: {
      neutral: generateSidebarColorShades("neutral"),
    },
  },
  extend: {
    keyframes: {
      "bar-loader": {
        from: { left: "-100%" },
        to: { left: "100%" },
      },
    },
    typography: () => ({
      brand: {
        css: {
          "--tw-prose-body": "--color-neutral-120",
          "--tw-prose-p": "--color-neutral-120",
          "--tw-prose-headings": "--color-neutral-120",
          "--tw-prose-lead": "--color-neutral-120",
          "--tw-prose-links": "--color-primary-90",
          "--tw-prose-bold": "--color-neutral-120",
          "--tw-prose-counters": "--color-neutral-120",
          "--tw-prose-bullets": "--color-neutral-120",
          "--tw-prose-hr": "--color-neutral-120",
          "--tw-prose-quotes": "--color-neutral-120",
          "--tw-prose-quote-borders": "--color-neutral-70",
          "--tw-prose-code": "--color-neutral-120",
          "--tw-prose-pre-code": "--color-neutral-120",
          "--tw-prose-pre-bg": "--color-neutral-30",
          "--tw-prose-th-borders": "--color-neutral-70",
          "--tw-prose-td-borders": "--color-neutral-70",
        },
      },
    }),
    screens: {
      "3xl": "1792px",
    },
    // scale down font sizes to 90% of default
    fontSize: {
      xs: "0.675rem",
      sm: "0.7875rem",
      base: "0.9rem",
      lg: "1.0125rem",
      xl: "1.125rem",
      "2xl": "1.35rem",
      "3xl": "1.6875rem",
      "4xl": "2.25rem",
      "5xl": "2.7rem",
      "6xl": "3.375rem",
      "7xl": "4.05rem",
      "8xl": "5.4rem",
      "9xl": "7.2rem",
    },
    // scale down spacing to 90% of default
    padding: SPACING_SCALE,
    margin: SPACING_SCALE,
    space: SPACING_SCALE,
    gap: SPACING_SCALE,
    backgroundImage: {
      "onboarding-gradient-100": "var( --gradient-onboarding-100)",
      "onboarding-gradient-200": "var( --gradient-onboarding-200)",
      "onboarding-gradient-300": "var( --gradient-onboarding-300)",
    },
  },
  fontFamily: {
    custom: ["Inter", "sans-serif"],
  },
};

export const plugins = [
  require("tailwindcss-animate"),
  require("@tailwindcss/typography"),
];
