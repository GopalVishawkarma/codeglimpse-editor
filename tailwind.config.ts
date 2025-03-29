
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
				editor: {
					background: '#1e1e1e',
					foreground: '#d4d4d4',
					lineHighlight: '#2a2d2e',
					selection: '#264f78',
					inactiveSelection: '#3a3d41',
					selectionHighlight: '#add6ff26',
					findMatch: '#515c6a',
					findMatchHighlight: '#ea5c0055',
					lineNumber: '#858585',
					activeLineNumber: '#c6c6c6',
				},
				sidebar: {
					background: '#252526',
					foreground: '#cccccc',
					active: '#1e1e1e',
					border: '#383838',
					hoverBackground: '#2a2d2e',
				},
				activityBar: {
					background: '#333333',
					foreground: '#ffffff',
					activeBorder: '#0078d4',
					inactiveForeground: '#ffffff80',
				},
				statusBar: {
					background: '#0078d4',
					foreground: '#ffffff',
					noFolderBackground: '#68217a',
					noFolderForeground: '#ffffff',
				},
				tab: {
					activeBackground: '#1e1e1e',
					inactiveBackground: '#2d2d2d',
					activeForeground: '#ffffff',
					inactiveForeground: '#ffffff80',
					border: '#252526',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
