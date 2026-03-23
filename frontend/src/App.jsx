import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Hero from './components/Hero';
import UploadSection from './components/UploadSection';
import ResultDisplay from './components/ResultDisplay';
import SegmentationVisualizer from './components/SegmentationVisualizer';
import EEGPanel from './components/EEGPanel';
import AlzheimersRiskPanel from './components/AlzheimersRiskPanel';
import StrokeTypePanel from './components/StrokeTypePanel';
const API_BASE_URL = "http://localhost:8000";

function App() {
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [strokeAnalysis, setStrokeAnalysis] = useState(null);
  const [segmentationMask, setSegmentationMask] = useState(null);
  const [error, setError] = useState(null);

  const handleImageUpload = async (file) => {
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setIsProcessing(true);
    setPredictionResult(null);
    setStrokeAnalysis(null);
    setSegmentationMask(null);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      // 1. Get Classification
      const predResponse = await axios.post(`${API_BASE_URL}/predict`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setPredictionResult(predResponse.data);

      if (predResponse.data.prediction === 'Stroke') {
        try {
          const analyzeResponse = await axios.post(`${API_BASE_URL}/stroke-type`, {
            prediction: predResponse.data.prediction,
            confidence: predResponse.data.confidence
          });
          setStrokeAnalysis(analyzeResponse.data);
        } catch (err) {
          console.error("Failed to analyze stroke type", err);
        }
      }

      // 2. Fetch Segmentation Mask
      const segResponse = await axios.post(`${API_BASE_URL}/segment`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSegmentationMask(segResponse.data.mask_base64);

    } catch (err) {
      console.error(err);
      setError("Failed to analyze image. Please ensure the backend is running.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setImageFile(null);
    setPreviewUrl(null);
    setPredictionResult(null);
    setStrokeAnalysis(null);
    setSegmentationMask(null);
    setError(null);
  }

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-6xl mx-auto px-4">
        {!previewUrl ? (
          <>
            <Hero />
            <UploadSection onImageUpload={handleImageUpload} isUploading={isProcessing} />
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pt-10"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                Analysis <span className="text-primary">Dashboard</span>
              </h2>
              <button
                onClick={handleReset}
                className="px-4 py-2 border border-gray-700 hover:bg-gray-800 rounded-lg text-sm font-medium transition"
              >
                Upload New Scan
              </button>
            </div>

            {error && (
              <div className="p-4 bg-danger/20 border border-danger/50 rounded-lg text-red-200 mb-8 border-l-4">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

              {/* Left Column: Original CT Scan */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col items-center mt-8 w-full max-w-2xl mx-auto"
              >
                <div className="relative w-full aspect-square md:aspect-video rounded-xl overflow-hidden border border-gray-800 bg-black mb-4">
                  <img src={previewUrl} alt="Original CT Scan" className="absolute inset-0 w-full h-full object-contain" />
                </div>
                <p className="text-xs font-semibold text-center text-gray-400 mt-2 uppercase tracking-wider">Original Source Scan</p>
              </motion.div>

              {/* Center Column: Mask Overlay */}
              <div>
                <SegmentationVisualizer
                  originalImage={previewUrl}
                  segmentationMask={segmentationMask}
                />
              </div>

              {/* Right Column: Prediction Results & Insights */}
              <div className="space-y-4 pt-8">
                {isProcessing && !predictionResult ? (
                  <div className="p-12 border border-gray-800 rounded-2xl flex flex-col items-center justify-center space-y-4">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin glow-primary"></div>
                    <p className="text-gray-400 font-medium">AI is analyzing the scan...</p>
                  </div>
                ) : (
                  <>
                    <ResultDisplay result={predictionResult} />
                    {predictionResult && (
                      <>
                        <StrokeTypePanel analysis={strokeAnalysis} />
                        <EEGPanel isAbnormal={predictionResult.eeg_anomaly} />
                        <AlzheimersRiskPanel riskPercentage={predictionResult.alzheimers_risk} />
                        <div className="p-4 bg-gray-900 border border-gray-800 text-center rounded-2xl mt-4">
                          <button
                            onClick={() => alert("Multi-Modal Clinical Report generated!")}
                            className="w-full py-3 bg-secondary/20 text-secondary border border-secondary/50 rounded-lg text-sm font-medium hover:bg-secondary/30 transition-colors"
                          >
                            Download Full Clinical Report (PDF)
                          </button>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default App;
