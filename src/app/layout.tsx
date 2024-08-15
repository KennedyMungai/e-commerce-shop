import { Toaster } from '@/components/ui/sonner'
import QueryProvider from '@/providers/query-provider'
import { ThemeProvider } from '@/providers/theme-provider'
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Poppins as FontSans } from 'next/font/google'
import './globals.css'

const font = FontSans({ subsets: ['latin'], weight: ['200', '400', '700'] })

export const metadata: Metadata = {
	title: 'E Commerce Shop',
	description: 'A simple e-commerce application'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<ClerkProvider>
			<html lang='en'>
				<body className={font.className}>
					<ThemeProvider>
						<QueryProvider>
							<Toaster />
							{children}
						</QueryProvider>
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	)
}
