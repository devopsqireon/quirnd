'use client'

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    LabelList,
} from 'recharts'
import { Lightbulb, Info } from 'lucide-react'

interface ChartData {
    name: string
    maturity: number
    color: string
}

const data: ChartData[] = [
    { name: 'Access Control', maturity: 1, color: '#ef4444' },
    { name: 'Information Security Policies', maturity: 2, color: '#f97316' },
    { name: 'Asset Management', maturity: 2, color: '#22c55e' },
    { name: 'Human Resources Security', maturity: 3, color: '#3b82f6' },
    { name: 'Physical Security', maturity: 4, color: '#9333ea' },
    { name: 'Operations Security', maturity: 2, color: '#ef4444' },
    { name: 'Communications Security', maturity: 3, color: '#f97316' },
    { name: 'Supplier Relationships', maturity: 1, color: '#22c55e' },
]

const maturityLevels = [
    {
        level: 'Initial (0-1)',
        description: 'Ad-hoc or undocumented',
        color: '#ef4444',
    },
    {
        level: 'Managed (2)',
        description: 'Documented but inconsistent',
        color: '#f97316',
    },
    {
        level: 'Defined (3)',
        description: 'Standardized processes',
        color: '#3b82f6',
    },
    {
        level: 'Measured (4)',
        description: 'Monitored and measured',
        color: '#9333ea',
    },
    {
        level: 'Optimized (5)',
        description: 'Continuous improvement',
        color: '#10b981',
    },
]

const getBarColor = (name: string): string => {
    const item = data.find((d) => d.name === name)
    return item ? item.color : '#e5e7eb'
}

export function ISOMaturityChart() {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto font-sans">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                    ISO 27001 Control Maturity Breakdown
                </h2>
                <p className="text-gray-600 text-sm">
                    Domain-by-Domain Analysis
                </p>
            </div>

            <div className="flex items-center mb-6 p-4 bg-blue-50 rounded-lg text-sm text-gray-700">
                <Lightbulb className="w-5 h-5 text-blue-500 mr-3" />
                <span>
                    AI has analyzed your responses to assess your
                    organization&apos;s maturity level across key ISO 27001
                    control domains.
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            layout="vertical"
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <XAxis
                                type="number"
                                domain={[0, 5]}
                                tickCount={6}
                                orientation="bottom"
                                stroke="#6b7280"
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                dataKey="name"
                                type="category"
                                tickLine={false}
                                axisLine={false}
                                className="text-sm"
                                stroke="#6b7280"
                            />
                            <Tooltip
                                cursor={{ fill: '#f3f4f6' }}
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        const dataPoint = payload[0]
                                            .payload as ChartData
                                        return (
                                            <div className="bg-white p-2 border border-gray-200 rounded-md shadow-md text-sm">
                                                <p className="font-semibold text-gray-900">
                                                    {dataPoint.name}
                                                </p>
                                                <p className="text-gray-700">
                                                    Maturity:{' '}
                                                    {dataPoint.maturity}
                                                </p>
                                            </div>
                                        )
                                    }
                                    return null
                                }}
                            />
                            <Bar dataKey="maturity" fill="#e5e7eb" barSize={30}>
                                {data.map((entry, index) => (
                                    <Bar
                                        key={`bar-${index}`}
                                        dataKey="maturity"
                                        fill={getBarColor(entry.name)}
                                    />
                                ))}
                                <LabelList
                                    dataKey="maturity"
                                    position="right"
                                    className="text-gray-900 font-semibold text-sm"
                                />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                    <p className="text-center text-sm text-gray-600 mt-2">
                        Maturity Level
                    </p>
                </div>

                <div className="md:col-span-1 space-y-6">
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-2">
                            Maturity Levels
                        </h3>
                        <ul className="space-y-2 text-sm">
                            {maturityLevels.map((level, index) => (
                                <li key={index} className="flex items-center">
                                    <div
                                        className="w-3 h-3 rounded-full mr-2"
                                        style={{ backgroundColor: level.color }}
                                    ></div>
                                    <span className="font-medium text-gray-900">
                                        {level.level}:
                                    </span>
                                    <span className="text-gray-600 ml-1">
                                        {level.description}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center mb-2">
                            <Info className="w-5 h-5 text-blue-500 mr-2" />
                            <h3 className="font-semibold text-gray-900">
                                AI Insight
                            </h3>
                        </div>
                        <p className="text-sm text-blue-700 mb-2">
                            Your{' '}
                            <span className="font-bold">Access Control</span>{' '}
                            maturity is at level 1, compared to industry average
                            of level 3. This is a key area for improvement.
                        </p>
                        <p className="text-sm text-blue-700">
                            Your{' '}
                            <span className="font-bold">Physical Security</span>{' '}
                            maturity exceeds the industry average, indicating
                            strong practices in this area.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ISOMaturityChart
