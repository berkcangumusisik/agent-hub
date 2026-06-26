/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0a0b0f",
        ink2: "#0e0f14",
        card: "#101218",
        edge: "#1d1f26",
        edge2: "#2b2f3a",
        mut: "#9aa0ad",
        txt: "#f2f2f7",
        // single refined accent (soft indigo-blue) + one secondary; old names
        // remapped so existing classes pick up the new palette.
        cyan: "#8ab4ff",
        violet: "#8ab4ff",
        purple: "#a78bfa",
        acc: "#8ab4ff",
        grn: "#5ed68a",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        display: ['"Space Grotesk"', "Inter", "ui-sans-serif", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
    },
  },
  plugins: [],
};
