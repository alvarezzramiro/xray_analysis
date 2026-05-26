from pathlib import Path

from PIL import Image, ImageDraw

import os
import cv2

ANNOTATED_DIR = "annotated"

os.makedirs(ANNOTATED_DIR, exist_ok=True)

def generate_overlay_image(results, original_iamge_path):
    
    annotated_filename = None

    for result in results:

        annotated_frame = result.plot()

        filename = os.path.basename(original_iamge_path)

        name, ext = os.path.splitext(filename)

        annotated_filename = (f"{name}_annotated{ext}")

        annotated_name = os.path.join(ANNOTATED_DIR, annotated_filename)

        cv2.imwrite(annotated_name, annotated_frame)

    return annotated_filename