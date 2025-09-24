'use client'

import { ReactNode } from 'react'

interface CardProps {
    title: string
    children: ReactNode
}

export default function Card({ title, children }: CardProps) {
    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                {title}
            </h2>
            <div>{children}</div>
        </div>
    )
}
