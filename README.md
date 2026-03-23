# AI Brain Stroke Detection System

A complete web application consisting of a **FastAPI** backend and a **React+Vite** frontend spanning modern UI design (TailwindCSS, Framer Motion) to perform AI brain stroke detection and lesion segmentation visualization.

## 🚀 Folder Structure

```
├── backend/
│   ├── main.py            # FastAPI entry point & API endpoints
│   ├── ml_models.py       # PyTorch mock models for Classification & Segmentation
│   └── requirements.txt   # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable React components (Hero, UploadSection, etc.)
│   │   ├── App.jsx        # Main dashboard logic handling API requests
│   │   ├── index.css      # Tailind styles + custom glowing visuals
│   │   └── main.jsx       # Vite React entry point
│   ├── package.json       # Node dependencies
│   └── tailwind.config.js # Custom dark mode + neon colors
└── README.md              # You are here!
```

## 🧠 Backend Setup & Run

The backend simulates PyTorch Deep Learning models. 
It analyzes the CT scan intensity to provide realistic pseudo-probabilities and highlights anomalous regions as a mock segmentation mask.

1. **Open a terminal in the `backend` folder**:
   ```bash
   cd backend
   ```
2. **(Optional) Create a virtual environment**:
   ```bash
   python -m venv venv
   # On Windows:
   .\venv\Scripts\activate
   # On Mac/Linux:
   source venv/bin/activate
   ```
3. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```
4. **Run the FastAPI Server**:
   ```bash
   uvicorn main:app --reload
   ```
   *The API will start on `http://127.0.0.1:8000`*
   *You can visit the Swagger UI at `http://127.0.0.1:8000/docs`*

---

## 🎨 Frontend Setup & Run

The frontend provides an interactive, medical-themed AI dashboard with File Drag & Drop, API loading states, smooth transitions, and image mask overlay.

1. **Open a new terminal in the `frontend` folder**:
   ```bash
   cd frontend
   ```
2. **Install Node Dependencies**:
   ```bash
   npm install
   ```
3. **Run the Vite Dev Server**:
   ```bash
   npm run dev
   ```
   *The UI will start on `http://localhost:5173` (or the port shown in your terminal)*

---

## 🔬 How to Test (End-to-End)

1. Ensure **both** the FastAPI terminal and the Vite terminal are running simultaneously.
2. Open your web browser to the Vite frontend URL (`http://localhost:5173`).
3. Drag and drop any image (preferably a brain CT scan, but any image will work to see the mock logic) into the upload area.
4. The frontend will hit the `/predict` and `/segment` endpoints.
5. Watch the dashboard spring to life with confidence bars, stroke detection probability, and an overlaid red segmentation mask detailing the detected lesion!

## 🧩 Dropping in Real AI Models

To integrate your actual PyTorch `.pth` files:
1. Open `backend/ml_models.py`.
2. Inside `MockStrokeClassifier` and `MockLesionSegmenter` `__init__` functions, initialize your real architectures (e.g., `torchvision.models.resnet18` or `unet`).
3. Load your state dicts: `model.load_state_dict(torch.load('my_weights.pth'))`.
4. Replace the internal `.predict()` and `.segment()` logic with an actual `model(tensor)` forward pass.
