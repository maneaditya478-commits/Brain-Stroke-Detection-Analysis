import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { UploadCloud, Image as ImageIcon } from 'lucide-react';

export default function UploadSection({ onImageUpload, isUploading }) {
    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            onImageUpload(acceptedFiles[0]);
        }
    }, [onImageUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
        multiple: false
    });

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl mx-auto mt-8"
        >
            <div
                {...getRootProps()}
                className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300
          ${isDragActive ? 'border-primary bg-primary/10 glow-primary' : 'border-gray-700 hover:border-primary/50 hover:bg-white/5'}
          ${isUploading ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
            >
                <input {...getInputProps()} />

                <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="p-4 bg-gray-800 rounded-full text-primary">
                        {isDragActive ? (
                            <UploadCloud className="w-10 h-10 animate-bounce" />
                        ) : (
                            <ImageIcon className="w-10 h-10" />
                        )}
                    </div>

                    <div>
                        <p className="text-xl font-medium text-gray-200">
                            {isDragActive ? "Drop the CT scan here..." : "Drag & drop CT scan here"}
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            Supports JPG, JPEG, PNG
                        </p>
                    </div>

                    <button className="px-6 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg font-medium transition-colors border border-primary/50">
                        Browse Files
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
