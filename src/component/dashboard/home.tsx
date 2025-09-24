'use client'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/Button'
import FeatureListItem from '../pages/signup/FeatureListItem'

export default function DashboardPage() {
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        router.push('/compliance-setup')
    }

    return (
        <div className="flex items-center justify-center bg-gray-50 p-6">
            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden grid md:grid-cols-2">
                <div className="p-8 flex flex-col justify-center">
                    <h2 className="text-xl font-bold mb-2">
                        🚀 Welcome to your new workspace at Acme!
                    </h2>
                    <div>
                    <span className="inline-block text-xs bg-blue-100 text-blue-700 font-medium px-3 py-1 rounded-full mb-6">
                        Free for 14 Days
                    </span>
                    </div>
                    <h2 className="text-lg font-bold mb-2">
                    Let&apos;s set up your Information Security Environment
                    </h2>
                    <p className="mb-6">
                   In the next 5 minutes, we&apos;ll ask a few key questions about your organization and its scope.
                    </p>
                    <p className="mb-6">
                    This foundational information will allow our AI to tailor your entire ISO 27001 compliance journey, from risk assessments to policy generation.
                    </p>
                    <ul className="space-y-4">
                            <FeatureListItem> Define your business context.</FeatureListItem>
                            <FeatureListItem>Establish your ISMS scope.</FeatureListItem>
                            <FeatureListItem>Identify your most critical assets.</FeatureListItem>
                        </ul>

                   

                    

                    
<div className='pt-8'>

<Button
                            onClick={handleSubmit}
                            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition">
                            Get Started
                        </Button>
                        </div>    
                </div>

                <div className="bg-gradient-to-br from-green-600 to-blue-600 text-white p-8 flex flex-col justify-between">
                    <div>
                        <p className="text-sm opacity-80">Your trial ends on</p>
                        <h3 className="text-lg font-semibold">May 13, 2026</h3>
                        <p className="text-xs opacity-80 mt-1">
                            You’ll need a mandate before your trial ends. No
                            charges will be made without your consent.
                        </p>
                    </div>

                    <div className="flex justify-center my-6">
                        <img
                            src="/triallogo.png"
                            alt="Pro Trial Illustration"
                            className="max-h-48"
                        />
                    </div>

                    <div className="bg-white/20 rounded-xl p-4 flex items-center gap-3">
                        <img
                            src="/triallogo.png"
                            alt="Sarah Johnson"
                            className="w-10 h-10 rounded-full border-2 border-white"
                        />
                        <div>
                            <p className="font-medium">Sarah Johnson</p>
                            <p className="text-xs opacity-90">
                                Meetown Team Lead
                            </p>
                            <p className="text-xs opacity-80 mt-1">
                                Qireon gets smarter as you use it. The more data
                                and activity you add, the more powerful your AI
                                insights become.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
