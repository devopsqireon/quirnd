import React from 'react'

const RightSpace = () => {
    return (
        <div className="flex-1 bg-gradient-to-br from-[#031431] to-[#00327E] p-6 md:p-8 lg:p-12 flex items-center justify-center text-white relative overflow-hidden min-h-[400px] lg:min-h-full">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute bottom-16 md:bottom-32 right-8 md:right-16 w-16 md:w-32 h-16 md:h-32 border border-white rounded-full"></div>
                <div className="absolute top-1/2 left-1/4 w-12 md:w-24 h-12 md:h-24 border border-white rounded-full"></div>
            </div>

            <div className="relative z-10 max-w-sm md:max-w-md lg:max-w-lg text-center lg:text-left">
                {/* Orange accent line */}
                <div className="w-12 md:w-16 h-1 bg-orange-400 mb-4 md:mb-8 mx-auto lg:mx-0"></div>

                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 leading-tight">
                    Built for the Teams
                    <br />
                    That Make Trust Possible
                </h2>

                <p className="text-sm md:text-base lg:text-lg text-gray-300 mb-6 md:mb-8 leading-relaxed">
                    Simplify complex frameworks, close gaps with confidence, and
                    create a culture of continuous assurance — powered by
                    intelligence, not overwhelm.
                </p>

                <div className="flex flex-wrap justify-center lg:justify-start items-center space-x-2 md:space-x-4 text-sm md:text-base lg:text-lg">
                    <span className="font-semibold">Clarity.</span>
                    <span className="font-semibold">Confidence.</span>
                    <span>Continuous</span>
                    <span className="font-semibold">Compliance.</span>
                </div>
            </div>
        </div>
    )
}

export default RightSpace
