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
                conf=0.10,
                verbose=True
            )

            detections = []

            annotated_image_path = None

            for result in results:

                for box in result.boxes:

                    x1, y1, x2, y2 = box.xyxy[0].tolist()
                    confidence = float(box.conf[0])
                    class_id = int(box.cls[0])

                    detections.append({
                        "class_id": class_id,
                        "confidence": confidence,
                        "bbox": {
                            "x1": int(x1),
                            "y1": int(y1),
                            "x2": int(x2),
                            "y2": int(y2),
                        }
                    })

                annotated_frame = result.plot()

                filename = os.path.basename(image_path)
                name, ext = os.path.splitext(filename)

                annotated_filename = f"{name}_annotated{ext}"

                annotated_image_path = (f"/code/annotated/{annotated_filename}")

                cv2.imwrite(annotated_image_path, annotated_frame)

            return {
                "detections": detections,
                "annotated_image": annotated_filename
            }

        except Exception as e:
            print(f"Detection error: {e}")
            return {
                "detections": [],
                "annotated_image": None
            }