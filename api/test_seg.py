import sys
import traceback

def test():
    try:
        from PIL import Image
        import numpy as np
        from ml_models import MockLesionSegmenter

        img = Image.new('RGB', (100, 100))
        seg = MockLesionSegmenter()
        mask = seg.segment(img)
        print("Success! Mask shape:", mask.size)
    except Exception as e:
        print("Error encountered:")
        traceback.print_exc()

if __name__ == "__main__":
    test()
