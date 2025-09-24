// File: /app/policy-management/create/components/sections/AttachmentsSection.tsx

import React, { useRef } from 'react';
import { PolicyAttachment } from '../../types/policy-create.types';

interface AttachmentsSectionProps {
    attachments: PolicyAttachment[];
    onChange: (attachments: PolicyAttachment[]) => void;
}

const mockAttachments: PolicyAttachment[] = [
    {
        id: '1',
        name: 'Security_Procedures_v2.1.pdf',
        size: '2.3 MB',
        type: 'pdf',
        uploadedAt: '2 hours ago'
    },
    {
        id: '2',
        name: 'Risk_Assessment_Matrix.xlsx',
        size: '1.8 MB',
        type: 'excel',
        uploadedAt: 'yesterday'
    }
];

export const AttachmentsSection: React.FC<AttachmentsSectionProps> = ({
    attachments,
    onChange
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const displayAttachments = attachments.length > 0 ? attachments : mockAttachments;

    const handleFileSelect = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newAttachments: PolicyAttachment[] = Array.from(files).map((file, index) => ({
                id: `new-${Date.now()}-${index}`,
                name: file.name,
                size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
                type: getFileType(file.name),
                uploadedAt: 'just now'
            }));
            onChange([...attachments, ...newAttachments]);
        }
    };

    const getFileType = (fileName: string): PolicyAttachment['type'] => {
        const extension = fileName.split('.').pop()?.toLowerCase();
        switch (extension) {
            case 'pdf': return 'pdf';
            case 'xlsx': case 'xls': return 'excel';
            case 'doc': case 'docx': return 'word';
            case 'jpg': case 'jpeg': case 'png': case 'gif': return 'image';
            default: return 'other';
        }
    };

    const getFileIcon = (type: PolicyAttachment['type']) => {
        switch (type) {
            case 'pdf': return 'fa-solid fa-file-pdf text-red-600';
            case 'excel': return 'fa-solid fa-file-excel text-green-600';
            case 'word': return 'fa-solid fa-file-word text-blue-600';
            case 'image': return 'fa-solid fa-file-image text-purple-600';
            default: return 'fa-solid fa-file text-gray-600';
        }
    };

    const handleRemoveAttachment = (attachmentId: string) => {
        onChange(attachments.filter(att => att.id !== attachmentId));
    };

    return (
        <section className="mb-8">
            <div className="border border-gray-300 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Attachments & Supporting Evidence</h2>
                
                <div className="space-y-4">
                    <div 
                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-qireon-400 hover:bg-qireon-50 transition-colors"
                        onClick={handleFileSelect}
                    >
                        <i className="fa-solid fa-cloud-upload-alt text-3xl text-gray-400 mb-3"></i>
                        <p className="text-gray-600 mb-2">Drag and drop files here or click to browse</p>
                        <button 
                            type="button"
                            className="bg-qireon-600 text-white px-4 py-2 rounded-lg hover:bg-qireon-700 transition-colors"
                        >
                            Choose Files
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            className="hidden"
                            onChange={handleFileChange}
                            accept=".pdf,.doc,.docx,.xlsx,.xls,.jpg,.jpeg,.png,.gif"
                        />
                    </div>
                    
                    {displayAttachments.length > 0 && (
                        <div className="space-y-3">
                            {displayAttachments.map((attachment) => (
                                <div key={attachment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center">
                                        <i className={`${getFileIcon(attachment.type)} mr-3 text-xl`}></i>
                                        <div>
                                            <p className="font-medium text-gray-900">{attachment.name}</p>
                                            <p className="text-sm text-gray-600">{attachment.size} • Uploaded {attachment.uploadedAt}</p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => handleRemoveAttachment(attachment.id)}
                                        className="text-gray-400 hover:text-red-600 transition-colors"
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );