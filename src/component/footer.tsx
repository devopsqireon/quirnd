import React from 'react'

const Footer = () => {
    return (
        <div className="mt-4 md:mt-6 pt-4 border-t border-gray-200 ">
            <div className="flex flex-wrap justify-center space-x-3 md:space-x-4 text-xs text-gray-500">
                <a href="#" className="hover:text-gray-700">
                    Privacy & Terms
                </a>
                <a href="#" className="hover:text-gray-700">
                    Contact us
                </a>
                <div className="flex items-center space-x-1">
                    <span>🌍</span>
                    <span>Change Region</span>
                    <svg
                        className="w-3 h-3 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </div>
            </div>
            <div className="text-center text-xs text-gray-400 mt-2">
                © 2025 Qireon Ltd. All rights reserve.
            </div>
        </div>
    )
}

export default Footer
