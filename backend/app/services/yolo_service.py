from ultralytics import YOLO

model = YOLO("yolov8n.pt")

def run_yolo_inference(image_path):
    results = model(image_path)

    return results