import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
})

export const metadata: Metadata = {
    title: 'Qireon | Start Free. Start Secure. ISO 27001 Compliance, Automated',
    description: 'Qireon is a secure compliance automation platform designed for ISO 27001:2022. Streamline risk management, policies, and audits with AI-powered workflows—all in one place.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={`${inter.variable} antialiased`}>{children}</body>
        </html>
    )
}
