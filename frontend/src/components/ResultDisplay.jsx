import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle } from 'lucide-react';

export default function ResultDisplay({ result }) {
    if (!result) return null;

    const isStroke = result.prediction === 'Stroke';
    const confidencePercent = (result.confidence * 100).toFixed(1);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`w-full max-w-lg mx-auto mt-8 relative rounded-2xl p-6 border overflow-hidden
        ${isStroke ? 'border-danger/50 bg-danger/5' : 'border-success/50 bg-success/5'}
      `}
        >
            {/* Background glowing effect */}
            <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-20 ${isStroke ? 'bg-danger' : 'bg-success'}`}></div>

            <div className="flex items-center gap-4 mb-6">
                {isStroke ? (
                    <AlertTriangle className="w-10 h-10 text-danger" />
                ) : (
                    <CheckCircle className="w-10 h-10 text-success" />
                )}
                <div>
                    <h3 className="text-sm text-gray-400 uppercase tracking-widest font-semibold">Diagnosis</h3>
                    <p className={`text-3xl font-bold ${isStroke ? 'text-danger' : 'text-success'}`}>
                        {result.prediction}
                    </p>
                </div>
            </div>

            <div className="space-y-2 relative z-10">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Model Confidence</span>
                    <span className="font-bold">{confidencePercent}%</span>
                </div>

                <div className="h-3 w-full bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${confidencePercent}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-full rounded-full ${isStroke ? 'bg-danger glow-danger' : 'bg-success glow-success'}`}
                    />
                </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-800 flex justify-between gap-4 text-sm text-gray-400">
                <div>
                    <span className="block text-xs uppercase opacity-70">Normal Prob</span>
                    <span className="font-mono text-gray-300">{(result.probabilities.Normal * 100).toFixed(2)}%</span>
                </div>
                <div>
                    <span className="block text-xs uppercase opacity-70">Stroke Prob</span>
                    <span className="font-mono text-gray-300">{(result.probabilities.Stroke * 100).toFixed(2)}%</span>
                </div>
            </div>
        </motion.div>
    );
}
