
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				wiggle: {
					'0%, 100%': { transform: 'rotate(-3deg)' },
					'50%': { transform: 'rotate(3deg)' },
				},
				shake: {
					'0%, 100%': { transform: 'translateX(0)' },
					'10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-10px)' },
					'20%, 40%, 60%, 80%': { transform: 'translateX(10px)' },
				},
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-20px)' },
				},
				spin: {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'pulse-fast': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' },
				},
				'background-shift': {
					'0%': { backgroundColor: '#FF5555' },
					'25%': { backgroundColor: '#FFAA00' },
					'50%': { backgroundColor: '#00AAFF' },
					'75%': { backgroundColor: '#FF00FF' },
					'100%': { backgroundColor: '#FF5555' },
				},
				'bounce-around': {
					'0%': { transform: 'translate(0, 0)' },
					'25%': { transform: 'translate(100px, 50px)' },
					'50%': { transform: 'translate(-50px, 100px)' },
					'75%': { transform: 'translate(-100px, -50px)' },
					'100%': { transform: 'translate(0, 0)' },
				},
				'violent-shake': {
					'0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
					'10%': { transform: 'translate(-10px, -5px) rotate(-2deg)' },
					'20%': { transform: 'translate(10px, 5px) rotate(2deg)' },
					'30%': { transform: 'translate(-10px, 5px) rotate(-2deg)' },
					'40%': { transform: 'translate(10px, -5px) rotate(2deg)' },
					'50%': { transform: 'translate(-5px, -10px) rotate(-1deg)' },
					'60%': { transform: 'translate(5px, 10px) rotate(1deg)' },
					'70%': { transform: 'translate(-5px, 10px) rotate(-1deg)' },
					'80%': { transform: 'translate(5px, -10px) rotate(1deg)' },
					'90%': { transform: 'translate(-10px, -5px) rotate(-2deg)' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'wiggle': 'wiggle 1s ease-in-out infinite',
				'shake': 'shake 0.5s ease-in-out infinite',
				'violent-shake': 'violent-shake 0.3s ease-in-out infinite',
				'float': 'float 3s ease-in-out infinite',
				'spin': 'spin 3s linear infinite',
				'pulse-fast': 'pulse-fast 0.5s ease-in-out infinite',
				'background-shift': 'background-shift 5s ease infinite',
				'bounce-around': 'bounce-around 10s ease-in-out infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
