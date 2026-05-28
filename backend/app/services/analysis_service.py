import time

from app.models.xray_analysis import XRayAnalysis
from app.services.detectors import fracture_detector
from app.services.overlay_service import generate_overlay_image

MODEL_VERSION = "fracture-v1"

def analyze_xray(db, image_id, image_path):

    start_time = time.time()

    try:

        detection_result = (fracture_detector.detect(image_path))

        detections = (detection_result["detections"])

        results = (detection_result["results"])

        fracture_detected = (len(detections) > 0)

        annotated_image_path = None

        if results:

            annotated_image_path = (generate_overlay_image(results, image_path))

        processing_time_ms = int((time.time() - start_time) * 1000)

        max_confidence = None

        if detections:
            max_confidence = max(
                detection["confidence"]
                for detection in detections
            )

        analysis = XRayAnalysis(
            image_id=image_id,
            model_version=MODEL_VERSION,
            fracture_detected=fracture_detected,
            detections=detections,
            detection_count=len(detections),
            max_confidence=max_confidence,
            annotated_image_path=annotated_image_path,
            processing_time_ms=processing_time_ms,
            status="completed",
            error_message=None
        )

        db.add(analysis)
        db.commit()
        db.refresh(analysis)

        return analysis
    
    except Exception as e:
        
        processing_time_ms = int((time.time() - start_time) * 1000)

        analysis = XRayAnalysis(
            image_id=image_id,
            model_version=MODEL_VERSION,
            fracture_detected=False,
            detections=[],
            detection_count=0,
            max_confidence=None,
            annotated_image_path=None,
            processing_time_ms=processing_time_ms,
            status="failed",
            error_message=str(e)
        )

        db.add(analysis)
        db.commit()

        raise e