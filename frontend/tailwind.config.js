/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#000000',
        'surface-soft': '#0d0d0d',
        'surface-card': '#141414',
        'surface-elevated': '#1f1f1f',
        ink: '#ffffff',
        'body-color': '#cccccc',
        'body-strong': '#e6e6e6',
        muted: '#999999',
        'muted-soft': '#666666',
        hairline: '#262626',
        'hairline-strong': '#3a3a3a',
        'on-dark': '#ffffff',
        link: '#c3d9f3',
        warning: '#d4a017',
        success: '#5fa657',
      },
      fontFamily: {
        display: ['"Bugatti Display"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        body: ['"Bugatti Text Regular"', 'Georgia', '"Times New Roman"', 'serif'],
        mono: ['"Bugatti Monospace"', '"Courier New"', 'Courier', 'monospace'],
      },
    },
  },
  plugins: [],
}
