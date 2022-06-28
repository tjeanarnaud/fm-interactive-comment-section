module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'soft-red': 'hsl(358, 79%, 66%)',
        'pale-red': 'hsl(357, 100%, 86%)',
        'dark-blue': 'hsl(212, 24%, 26%)',
        'grayish-blue': 'hsl(211, 10%, 45%)',
        'moderate-blue': 'hsl(238, 40%, 52%)',
        'light-grayish-blue': 'hsl(239, 57%, 85%)',
        'light-gray': 'hsl(223, 19%, 93%)',
        'very-light-gray': 'hsl(228, 33%, 97%)',
        google: 'hsl(217, 89%, 61%)',
      },
      fontFamily: {
        rubik: ['"Rubik", sans-serif'],
      },
      screens: {
        xs: '375px',
      },
    },
  },
  plugins: [],
}
