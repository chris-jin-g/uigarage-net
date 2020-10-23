module.exports = {
  purge: ['./components/**/*.js', './pages/**/*.js'],
  theme: {
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
    },
    fontSize: {
      base: ['14px', '24px'],
    },
    extend: {
      colors: {
        "ui-dark": "#272727",

        "grey-100": "#F9F9F9",
        "grey-400": "#505050",
        "grey-500": "#949494",
        "grey-blue": "#dee2e6",
      },
    },
  },
  variants: {},
  plugins: [],
};
