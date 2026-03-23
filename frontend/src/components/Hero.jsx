import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

export default function Hero() {
    return (
        <div className="w-full py-16 flex flex-col items-center justify-center text-center px-4 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent -z-10 rounded-full blur-3xl opacity-30 transform scale-150"></div>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex items-center gap-3 mb-6"
            >
                <div className="p-3 bg-secondary/20 rounded-xl relative">
                    <Activity className="w-8 h-8 text-primary" />
                    <div className="absolute inset-0 bg-primary opacity-20 blur-md rounded-xl"></div>
                </div>
                <h2 className="text-primary font-semibold tracking-wider uppercase text-sm">Neuro AI Lab</h2>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
            >
                Brain Stroke <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Detection & Analysis</span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-gray-400 max-w-2xl text-lg md:text-xl"
            >
                Upload a CT scan image to instantly detect ischemic strokes and visualize lesion boundaries using advanced deep learning models.
            </motion.p>
        </div>
    );
}
