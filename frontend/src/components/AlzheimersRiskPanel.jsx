import { motion } from 'framer-motion';
import { BrainCircuit, Info } from 'lucide-react';

export default function AlzheimersRiskPanel({ riskPercentage }) {
    // Risk percentage is between 0 and 1
    const riskValue = Math.round(riskPercentage * 100);

    // Determine color based on risk level
    let riskColor = "text-success";
    let glowColor = "bg-success";
    if (riskValue > 40) {
        riskColor = "text-yellow-400";
        glowColor = "bg-yellow-400";
    }
    if (riskValue > 70) {
        riskColor = "text-danger";
        glowColor = "bg-danger";
    }

    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (riskPercentage * circumference);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full relative rounded-2xl p-5 border border-gray-800 bg-gray-900 mt-4 overflow-hidden"
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <BrainCircuit className="w-6 h-6 text-primary" />
                    <div>
                        <h3 className="font-semibold text-gray-200 uppercase tracking-widest text-sm">Future AI Module</h3>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider">Alzheimer's Prediction (Prototype)</p>
                    </div>
                </div>
                <Info className="w-5 h-5 text-gray-600" />
            </div>

            <div className="flex items-center gap-6 mt-6">
                {/* Circular Progress Indicator */}
                <div className="relative w-24 h-24 flex items-center justify-center">
                    {/* Glowing shadow behind the circle */}
                    <div className={`absolute inset-0 ${glowColor} blur-[20px] opacity-20 rounded-full`}></div>

                    <svg className="w-full h-full transform -rotate-90">
                        {/* Background track */}
                        <circle
                            cx="48"
                            cy="48"
                            r={radius}
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            className="text-gray-800"
                        />
                        {/* Animated progress track */}
                        <motion.circle
                            cx="48"
                            cy="48"
                            r={radius}
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            strokeDasharray={circumference}
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset }}
                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                            className={`${riskColor}`}
                            strokeLinecap="round"
                        />
                    </svg>

                    {/* Centered Percentage */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-xl font-bold text-gray-100">{riskValue}%</span>
                    </div>
                </div>

                {/* Risk Explanation */}
                <div className="flex-1 space-y-2">
                    <h4 className="text-sm font-semibold text-gray-300">Brain Health Indicator</h4>
                    <p className="text-xs text-gray-400">
                        Analyzing micro-intensity variations across the subcortical regions suggests a
                        <span className={`font-semibold ml-1 ${riskColor}`}>{riskValue}%</span> probability of developing neurodegenerative patterns over the next 5 years.
                    </p>
                    <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden mt-3">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${riskPercentage * 100}%` }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                            className={`h-full ${glowColor}`}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
