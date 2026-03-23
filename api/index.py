import io
import base64
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from PIL import Image

from ml_models import MockStrokeClassifier, MockLesionSegmenter

app = FastAPI(title="Brain Stroke Detection API", root_path="/api")

# Setup CORS to allow React frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For dev only, use specific domains in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

classifier = MockStrokeClassifier()
segmenter = MockLesionSegmenter()

@app.get("/")
def root():
    return {"message": "Stroke API is running"}

@app.post("/predict")
async def predict_stroke(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        return JSONResponse(status_code=400, content={"error": "Invalid file type. Please upload an image."})

    image_data = await file.read()
    image = Image.open(io.BytesIO(image_data)).convert('RGB')
    
    # Perform prediction
    results = classifier.predict(image)
    return results

@app.post("/segment")
async def segment_lesion(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        return JSONResponse(status_code=400, content={"error": "Invalid file type. Please upload an image."})

    image_data = await file.read()
    image = Image.open(io.BytesIO(image_data)).convert('RGB')
    
    # Perform segmentation
    mask_img = segmenter.segment(image)
    
    # Convert mask image to base64 so frontend can overlay it
    buffered = io.BytesIO()
    mask_img.save(buffered, format="PNG")
    mask_base64 = base64.b64encode(buffered.getvalue()).decode("utf-8")
    
    return {"mask_base64": mask_base64}

class StrokeTypeRequest(BaseModel):
    prediction: str
    confidence: float

@app.post("/stroke-type")
async def analyze_stroke_type(request: StrokeTypeRequest):
    if request.prediction != "Stroke":
        return {"category": "Normal", "subtype": "None", "risk_level": "Low"}
    
    # Rule-based stroke inference based on mock confidence score
    if request.confidence > 0.90:
        return {"category": "Hemorrhagic", "subtype": "Intracerebral (ICH)", "risk_level": "High"}
    elif request.confidence > 0.80:
        return {"category": "Hemorrhagic", "subtype": "Subarachnoid (SAH)", "risk_level": "High"}
    elif request.confidence > 0.65:
        return {"category": "Ischemic", "subtype": "Embolic", "risk_level": "Medium"}
    elif request.confidence > 0.50:
        return {"category": "Ischemic", "subtype": "Thrombotic", "risk_level": "Medium"}
    elif request.confidence > 0.45:
        return {"category": "Venous", "subtype": "CVST", "risk_level": "Medium"}
    else:
        return {"category": "Transient", "subtype": "TIA", "risk_level": "Low"}
