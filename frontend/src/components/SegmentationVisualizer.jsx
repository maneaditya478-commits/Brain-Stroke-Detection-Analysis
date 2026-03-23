import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers } from 'lucide-react';

export default function SegmentationVisualizer({ originalImage, segmentationMask }) {
    const [showMask, setShowMask] = useState(true);

    if (!originalImage) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl mx-auto mt-8 flex flex-col items-center"
        >
            <div className="relative w-full aspect-square md:aspect-video rounded-xl overflow-hidden border border-gray-800 bg-black mb-4">
                {/* Original Image */}
                <img
                    src={originalImage}
                    alt="Original CT Scan"
                    className="absolute inset-0 w-full h-full object-contain"
                />

                {/* Segmentation Mask Overlay */}
                <AnimatePresence>
                    {showMask && segmentationMask && (
                        <motion.img
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            src={`data:image/png;base64,${segmentationMask}`}
                            alt="Segmentation Mask"
                            className="absolute inset-0 w-full h-full object-contain mix-blend-screen"
                        />
                    )}
                </AnimatePresence>

                {/* Loading placeholder if mask is still building */}
                {!segmentationMask && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-2"></div>
                            <p className="text-primary text-sm font-medium">Generating Segmentation...</p>
                        </div>
                    </div>
                )}
            </div>

            <button
                onClick={() => setShowMask(!showMask)}
                disabled={!segmentationMask}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${showMask
                        ? 'bg-primary text-black hover:bg-primary/90 glow-primary'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
                <Layers className="w-5 h-5" />
                {showMask ? 'Hide Lesion Mask' : 'Show Lesion Mask'}
            </button>

            {segmentationMask && (
                <p className="text-xs text-center text-gray-500 mt-4 max-w-md">
                    The highlighted areas indicate regions with anomalous intensity typical of ischemic stroke lesions.
                </p>
            )}
        </motion.div>
    );
}
