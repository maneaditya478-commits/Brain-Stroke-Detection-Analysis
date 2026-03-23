import { motion } from 'framer-motion';
import { Activity, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function EEGPanel({ isAbnormal }) {
    // Generate a basic repeating heartbeat/brainwave SVG path
    const wavePath = "M0 50 L20 50 L30 20 L40 80 L50 50 L70 50 L80 10 L90 90 L100 50 L120 50 L130 30 L140 70 L150 50 L170 50";

    // Duplicate it multiple times to allow infinite scrolling
    const fullPath = Array.from({ length: 15 }).map((_, i) => `M${i * 170} 50 L${i * 170 + 20} 50 L${i * 170 + 30} 20 L${i * 170 + 40} 80 L${i * 170 + 50} 50 L${i * 170 + 70} 50 L${i * 170 + 80} 10 L${i * 170 + 90} 90 L${i * 170 + 100} 50 L${i * 170 + 120} 50 L${i * 170 + 130} 30 L${i * 170 + 140} 70 L${i * 170 + 150} 50 L${i * 170 + 170} 50`).join(" ");

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`w-full relative rounded-2xl p-5 border overflow-hidden mt-4
            ${isAbnormal ? 'border-danger/40 bg-gray-900/80' : 'border-success/40 bg-gray-900/80'}
            `}
        >
            <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="flex items-center gap-3">
                    <Activity className={`w-6 h-6 ${isAbnormal ? 'text-danger animate-pulse' : 'text-primary'}`} />
                    <h3 className="font-semibold text-gray-200 uppercase tracking-widest text-sm">EEG Integration</h3>
                </div>
                {isAbnormal ? (
                    <AlertTriangle className="w-5 h-5 text-danger" />
                ) : (
                    <CheckCircle2 className="w-5 h-5 text-success" />
                )}
            </div>

            {/* Glowing background */}
            <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[50px] opacity-10 ${isAbnormal ? 'bg-danger' : 'bg-primary'}`}></div>

            {/* Waveform Visualization */}
            <div className="relative h-24 w-full bg-black/50 rounded-lg overflow-hidden border border-gray-800">
                {/* Horizontal grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between py-2 opacity-20">
                    <div className="w-full border-t border-primary/30"></div>
                    <div className="w-full border-t border-primary/30"></div>
                    <div className="w-full border-t border-primary/30"></div>
                    <div className="w-full border-t border-primary/30"></div>
                </div>

                <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                    <motion.path
                        d={fullPath}
                        fill="none"
                        className={isAbnormal ? "stroke-danger" : "stroke-primary"}
                        strokeWidth={isAbnormal ? "3" : "2"}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        animate={{ x: [0, -1700] }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: isAbnormal ? 12 : 25 // Slower, smoother animation
                        }}
                    />
                </svg>

                {/* Fade overlays for edges */}
                <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black/80 to-transparent"></div>
                <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black/80 to-transparent"></div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-800/80 text-sm">
                <p className={`font-medium ${isAbnormal ? 'text-danger' : 'text-gray-400'}`}>
                    {isAbnormal
                        ? 'System Insight: Irregular brainwave activity detected. Strong correlation with ischemic event.'
                        : 'System Insight: Normal alpha and beta rhythm patterns observed.'}
                </p>
                <p className="text-xs text-gray-600 mt-1 uppercase tracking-wider">Simulated Multi-Modal Sensor Data</p>
            </div>
        </motion.div>
    );
}
