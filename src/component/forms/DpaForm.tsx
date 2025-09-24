'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Loader2, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

// Custom Checkbox Component for consistent styling
const CustomCheckbox = ({ id, label, description, checked, onChange }: { id: string, label: string, description: string, checked: boolean, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
    <label htmlFor={id} className="flex items-start p-4 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input 
            id={id}
            type="checkbox" 
            className="h-5 w-5 mt-1 mr-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 shrink-0"
            checked={checked}
            onChange={onChange}
        />
        <div>
            <p className="font-medium text-gray-800">{label}</p>
            <p className="text-sm text-gray-500">{description}</p>
        </div>
    </label>
);

export default function DpaForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    
    const [dataTypes, setDataTypes] = useState({
        masterData: true,
        communicationData: true,
        contractualData: false,
        logData: true,
        paymentData: false,
    });

    const [peopleTypes, setPeopleTypes] = useState({
        customers: false,
        employees: true,
    });

    const [agreementConfirmed, setAgreementConfirmed] = useState(false);

    const handleDataTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDataTypes({ ...dataTypes, [e.target.name]: e.target.checked });
    };

    const handlePeopleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPeopleTypes({ ...peopleTypes, [e.target.name]: e.target.checked });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!agreementConfirmed) {
            alert("Please confirm the agreement to continue.");
            return;
        }
        setIsLoading(true);
        // Simulate API call to save DPA selections
        setTimeout(() => {
            router.push('/legal/dpa-review'); // Final step, navigate to the dashboard
        }, 2000);
    };

    const isContinueDisabled = !agreementConfirmed || isLoading;

    return (
        <div className="w-full bg-white/90 backdrop-blur-sm rounded-lg shadow-lg">
            <div className="p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Create Your Data Processing Agreement (DPA)
                </h1>
                <p className="text-gray-600">
                    In accordance with Article 28 of the GDPR, please confirm your details and define the scope of your data processing activities on the Qireon platform.
                </p>
            </div>
            <div className="px-8">
            {/* Organization Details */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Organization's Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-500">Organization</label>
                        <p className="text-gray-900 font-semibold">Acme Corporation Ltd.</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-500">Email address</label>
                        <p className="text-gray-900 font-semibold">admin@acmecorp.com</p>
                    </div>
                    <div className="mt-2">
                        <label className="block text-sm font-medium text-gray-500">Client number</label>
                        <p className="text-gray-900 font-semibold">QIR-23786-AC</p>
                    </div>
                </div>
            </div></div>

            <form onSubmit={handleSubmit}>
                <div className='px-8'>
                {/* Type of Data */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Type of Data</h2>
                    <p className="text-sm text-gray-600 mb-4">Select the types of data you will be processing through the Qireon platform.</p>
                    <div className="space-y-2 rounded-lg border border-gray-200 p-2">
                        <CustomCheckbox id="masterData" name="masterData" label="Personal master data (e.g., employee names)" description="Basic information that identifies individuals within your organization." checked={dataTypes.masterData} onChange={handleDataTypeChange} />
                        <CustomCheckbox id="communicationData" name="communicationData" label="Communication data (e.g., emails uploaded as evidence)" description="Correspondence or communication records between parties." checked={dataTypes.communicationData} onChange={handleDataTypeChange} />
                        <CustomCheckbox id="contractualData" name="contractualData" label="Contractual master data" description="Information related to contracts and agreements." checked={dataTypes.contractualData} onChange={handleDataTypeChange} />
                        <CustomCheckbox id="logData" name="logData" label="Log data (e.g., system logs uploaded as evidence)" description="Technical records generated by systems or applications." checked={dataTypes.logData} onChange={handleDataTypeChange} />
                        <CustomCheckbox id="paymentData" name="paymentData" label="Contract invoicing and payment data" description="Financial information related to billing and payments." checked={dataTypes.paymentData} onChange={handleDataTypeChange} />
                    </div>
                </div>

                {/* Type of People Affected */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Type of People Affected</h2>
                    <p className="text-sm text-gray-600 mb-4">Select the categories of individuals whose data will be processed.</p>
                    <div className="space-y-2 rounded-lg border border-gray-200 p-2">
                        <CustomCheckbox id="customers" name="customers" label="The Client's customers and interested parties" description="People who purchase or have shown interest in your products/services." checked={peopleTypes.customers} onChange={handlePeopleTypeChange} />
                        <CustomCheckbox id="employees" name="employees" label="The Client's employees" description="Internal staff members of your organization." checked={peopleTypes.employees} onChange={handlePeopleTypeChange} />
                    </div>
                </div>

                {/* Confirmation */}
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
                     <CustomCheckbox 
                        id="agreementConfirmed"
                        name="agreementConfirmed"
                        label="I confirm the selections above are accurate and agree to the terms of the Qireon Data Processing Agreement on behalf of my company."
                        description="By checking this box, you acknowledge that you have the authority to enter into this agreement."
                        checked={agreementConfirmed}
                        onChange={(e) => setAgreementConfirmed(e.target.checked)}
                    />
                </div>

                </div>

                <div className="flex flex-col-reverse sm:flex-row justify-center items-center gap-4 p-6 bg-gray-100 rounded-b-lg border-t border-gray-300">
                <Button 
                    type="submit"
                    disabled={isContinueDisabled}
                    className="w-auto"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="animate-spin" size={20} />
                            <span>Processing...</span>
                        </>
                    ) : (
                        <>
                            Review and Download Agreement <ArrowRight size={20} />
                        </>
                    )}
                </Button>
                </div>
            </form>
        </div>
    );
}
