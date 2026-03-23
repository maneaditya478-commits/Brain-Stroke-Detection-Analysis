import torch
import torch.nn as nn
from torchvision import transforms, models
import numpy as np
import cv2
from PIL import Image

class MockStrokeClassifier:
    """Mock PyTorch classification model (e.g., ResNet) returning realistic probabilities."""
    def __init__(self):
        # In a real scenario, you would load model weights here:
        # self.model = models.resnet18(pretrained=False)
        # self.model.fc = nn.Linear(self.model.fc.in_features, 2)
        # self.model.load_state_dict(torch.load('stroke_model.pth'))
        # self.model.eval()
        self.classes = ['Normal', 'Stroke']

    def predict(self, image: Image.Image):
        """Simulates prediction behavior."""
        # Preprocessing that would typically happen
        preprocess = transforms.Compose([
            transforms.Resize(256),
            transforms.CenterCrop(224),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
        ])
        input_tensor = preprocess(image).unsqueeze(0)

        # Mock inference result based on image mean pixel intensity as a deterministic proxy
        img_array = np.array(image.convert("L"))
        mean_intensity = np.mean(img_array)
        
        # If dark or extremely bright, bias towards Stroke, else Normal. Just a dummy metric.
        if 80 < mean_intensity < 160:
            stroke_prob = 0.85 + (mean_intensity % 10) * 0.01
        else:
            stroke_prob = 0.15 - (mean_intensity % 10) * 0.01

        normal_prob = 1.0 - stroke_prob

        confidence = max(normal_prob, stroke_prob)
        prediction = self.classes[1] if stroke_prob > normal_prob else self.classes[0]

        # Multi-Modal Simulated Insights
        eeg_anomaly = True if stroke_prob > 0.6 else False
        alzheimers_risk = min(0.95, (stroke_prob * 0.4) + ((mean_intensity % 20) * 0.02))

        return {
            'prediction': prediction,
            'confidence': float(confidence),
            'probabilities': {
                'Normal': float(normal_prob),
                'Stroke': float(stroke_prob)
            },
            'eeg_anomaly': eeg_anomaly,
            'alzheimers_risk': float(alzheimers_risk)
        }


class MockLesionSegmenter:
    """Mock PyTorch segmentation model (e.g., U-Net) for lesion overlay."""
    def __init__(self):
        # Real model setup:
        # self.model = torch.hub.load('mateuszbuda/brain-segmentation-pytorch', 'unet', in_channels=3, out_channels=1, init_features=32, pretrained=True)
        pass

    def segment(self, image: Image.Image):
        """Generates a dummy segmentation mask focusing on higher intensity anomalies."""
        try:
            from PIL import ImageDraw
            # Convert to grayscale numpy array safely
            img_array = np.array(image.convert("L"))
            
            # Create a completely transparent RGBA mask
            mask_rgba = np.zeros((*img_array.shape, 4), dtype=np.uint8)
            
            # Find bright pixels
            thresh_mask = img_array > 180
            mask_rgba[thresh_mask] = [255, 0, 0, 128] # Semi-transparent red
            
            mask_image = Image.fromarray(mask_rgba, 'RGBA')
            
            # If nothing was bright, draw a fallback circle in the center
            if not np.any(thresh_mask):
                 draw = ImageDraw.Draw(mask_image)
                 h, w = img_array.shape
                 cx, cy = w // 2, h // 2
                 draw.ellipse((cx - 40, cy - 40, cx + 40, cy + 40), fill=(255, 0, 0, 128))
            
            return mask_image
        except Exception as e:
            # Fallback to an empty mask if any error occurs
            print("Segmentation failed:", str(e))
            return Image.new("RGBA", image.size, (0, 0, 0, 0))
