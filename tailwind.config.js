/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundColor: {
        background: "#F9FAFB", // Off-White
      },
      colors: {
        // Design System Colors
        primary: "#F59E0B", // Amber Gold
        "primary-dark": "#D97706", // Darker Amber Gold for hover states
        secondary: "#0EA5E9", // Sky Blue
        "secondary-dark": "#0284C7", // Darker Sky Blue for hover states
        accent: "#6366F1", // Indigo
        "accent-dark": "#4F46E5", // Darker Indigo for hover states
        background: "#F9FAFB", // Off-White
        neutral: "#475569", // Slate Gray
        
        // shadcn/ui system colors (keeping for compatibility)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        // Design System Typography
        body: ["Inter", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
      },
      fontSize: {
        // Design System Typography sizes
        base: ['16px', { lineHeight: '1.5' }],
        'base-mobile': ['14px', { lineHeight: '1.5' }],
        'heading-1': ['2.5rem', { lineHeight: '1.2' }],
        'heading-2': ['2rem', { lineHeight: '1.2' }],
        'heading-3': ['1.5rem', { lineHeight: '1.2' }],
        'heading-mobile-1': ['1.875rem', { lineHeight: '1.2' }],
        'heading-mobile-2': ['1.5rem', { lineHeight: '1.2' }],
        'heading-mobile-3': ['1.125rem', { lineHeight: '1.2' }],
      },
      spacing: {
        // Design System Spacing (8px base unit)
        1: "8px",
        2: "16px",
        3: "24px",
        4: "32px",
      },
      boxShadow: {
        // Design System shadows
        'card-sm': '0 2px 4px rgba(0,0,0,0.1)',
        'card-md': '0 4px 6px rgba(0,0,0,0.1)',
        'card-lg': '0 10px 15px rgba(0,0,0,0.1)',
      },
      borderRadius: {
        // Design System border radius
        DEFAULT: '8px',
        lg: '12px',
        md: '8px',
        sm: '4px',
      },
      maxWidth: {
        // Design System max width
        layout: '1280px',
      },
      gridTemplateColumns: {
        // Design System grid
        'auto-fill-card': 'repeat(auto-fill, minmax(280px, 1fr))',
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "fade-in": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        "scale-in": {
          from: { opacity: 0, transform: 'scale(0.95)' },
          to: { opacity: 1, transform: 'scale(1)' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
