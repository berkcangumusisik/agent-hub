/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0d1117",
        ink2: "#11161d",
        card: "#161b22",
        edge: "#30363d",
        mut: "#8b949e",
        txt: "#e6edf3",
        cyan: "#22d3ee",
        violet: "#818cf8",
        purple: "#c084fc",
        grn: "#3fb950",
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
