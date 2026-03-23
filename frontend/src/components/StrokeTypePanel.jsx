import { motion } from 'framer-motion';
import { Stethoscope, AlertCircle, Info } from 'lucide-react';

export default function StrokeTypePanel({ analysis }) {
    if (!analysis) return null;

    let colorTheme = "text-primary";
    let bgColor = "bg-primary";
    let iconColor = "text-primary";

    if (analysis.category === "Hemorrhagic") {
        colorTheme = "text-danger";
        bgColor = "bg-danger";
        iconColor = "text-danger";
    } else if (analysis.category === "Ischemic") {
        colorTheme = "text-orange-400";
        bgColor = "bg-orange-500";
        iconColor = "text-orange-400";
    } else if (analysis.category === "Transient" || analysis.category === "Venous") {
        colorTheme = "text-yellow-400";
        bgColor = "bg-yellow-500";
        iconColor = "text-yellow-400";
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            className="w-full relative rounded-2xl p-5 border border-gray-800 bg-gray-900 mt-4 overflow-hidden"
        >
            <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full blur-[60px] opacity-10 ${bgColor}`}></div>

            <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="flex items-center gap-3">
                    <Stethoscope className={`w-6 h-6 ${iconColor}`} />
                    <div>
                        <h3 className="font-semibold text-gray-200 uppercase tracking-widest text-sm">Stroke Analyzer</h3>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider">AI Subtype Classification</p>
                    </div>
                </div>
            </div>

            <div className="space-y-3 relative z-10">
                {/* Category */}
                <div className="flex justify-between items-center bg-black/40 p-3 rounded-lg border border-gray-800/50">
                    <span className="text-sm text-gray-400">Category</span>
                    <span className={`font-bold ${colorTheme}`}>{analysis.category}</span>
                </div>

                {/* Subtype */}
                <div className="flex justify-between items-center bg-black/40 p-3 rounded-lg border border-gray-800/50 relative overflow-hidden group">
                    <span className="text-sm text-gray-400">Predicted Subtype</span>
                    <span className="font-bold text-gray-200">{analysis.subtype}</span>

                    {/* Tooltip on hover */}
                    <div className="absolute inset-0 bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center text-[10px] text-gray-300">
                        Detailed sub-classification based on confidence threshold heuristics.
                    </div>
                </div>

                {/* Risk Level */}
                <div className="flex justify-between items-center bg-black/40 p-3 rounded-lg border border-gray-800/50 relative overflow-hidden">
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${bgColor}`}></div>
                    <span className="text-sm text-gray-400 pl-2">Risk Level</span>
                    <div className="flex items-center gap-2">
                        {analysis.risk_level === 'High' && <AlertCircle className="w-4 h-4 text-danger animate-pulse" />}
                        <span className={`font-bold ${analysis.risk_level === 'High' ? 'text-danger glow-danger' :
                                analysis.risk_level === 'Medium' ? 'text-orange-400' : 'text-success'
                            }`}>
                            {analysis.risk_level}
                        </span>
                    </div>
                </div>
            </div>

            <div className="mt-5 pt-4 border-t border-gray-800 relative z-10">
                <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                    <p className="text-[10px] text-gray-500 uppercase leading-relaxed text-opacity-80">
                        Disclaimer: Stroke subtype classification is an AI-assisted estimation for demonstration purposes only. Always consult clinical metrics.
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
