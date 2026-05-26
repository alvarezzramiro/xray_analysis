import time

from app.models.xray_analysis import XRayAnalysis
from app.services.detectors import fracture_detector
from app.services.overlay_service import generate_overlay_image

MODEL_VERSION = "fracture-v1"

def analyze_xray(db, image_id, image_name, image_path):

    start_time = time.time()

    detection_result = (fracture_detector.detect(image_path))

    detections = (detection_result["detections"])

    results = (detection_result["results"])

    annotated_image = None

    if results:

        annotated_image = (generate_overlay_image(results, image_path))

    processing_time_ms = int((time.time() - start_time) * 1000)

    fracture_detected = (len(detections) > 0)

    analysis = XRayAnalysis(
        image_id=image_id,
        image_name=image_name,
        model_version=MODEL_VERSION,
        fracture_detected=fracture_detected,
        detections=detections,
        processing_time_ms=processing_time_ms
    )

    db.add(analysis)
    db.commit()
    db.refresh(analysis)

    return {
        "analysis_id": str(analysis.id),

        "fracture_detected": fracture_detected,

        "detections": detections,

        "annotated_image": annotated_image,

        "processing_time_ms": processing_time_ms,

        "model_version": MODEL_VERSION
    }