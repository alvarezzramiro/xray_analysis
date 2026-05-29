from ultralytics import YOLO
import cv2
import os

class FractureDetector:

    def __init__(self):
        self.model = YOLO("runs/detect/train/weights/best.pt")

    def detect(self, image_path):

        try:
            results = self.model(
                image_path,
                conf=0.2,
                verbose=True
            )

            detections = []

            for result in results:

                for box in result.boxes:

                    x1, y1, x2, y2 = (box.xyxy[0].tolist())
                    confidence = float(box.conf[0])
                    class_id = int(box.cls[0])
                    class_name = (result.names[class_id])

                    detections.append({
                        "class_id": class_id,
                        "class_name": class_name,
                        "confidence": confidence,
                        "bbox": {
                            "x1": int(x1),
                            "y1": int(y1),
                            "x2": int(x2),
                            "y2": int(y2),
                        }
                    })

            return {
                "detections": detections,
                "results": results
            }

        except Exception as e:
            print(f"Detection error: {e}")
            return {
                "detections": [],
                "results": None
            }