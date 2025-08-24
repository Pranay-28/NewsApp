/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        paper: "#e8c9b8",
        ink: "#2b241f",
        inkSoft: "#4f433c",
        accent: "#e07a57",
        accentDark: "#c46445",
        stroke: "#b79482",
        pill: "#f0d5c7",
        muted: "#8a7a71",
      },
      fontFamily: {
        serif2: ["Source Serif 4", "serif"],
        spectral: ["Spectral", "serif"],
        libre: ["Libre Baskerville", "serif"],
        plex: ["IBM Plex Sans", "sans-serif"],
      },
      lineClamp: {
        2: '2',
        3: '3',
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.line-clamp-2': {
          display: '-webkit-box',
          '-webkit-line-clamp': '2',
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
        },
        '.line-clamp-3': {
          display: '-webkit-box',
          '-webkit-line-clamp': '3',
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
        },
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      }
      addUtilities(newUtilities)
    }
  ],
}

