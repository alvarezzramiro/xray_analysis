import time

from app.models.xray_analysis import XRayAnalysis
from app.services.detectors import fracture_detector
from app.services.overlay_service import generate_overlay_image
from app.services.model_version_service import get_active_model
from app.core.exceptions import NoActiveModelError

def analyze_xray(db, image_id, image_path):
    
    active_model = get_active_model(db)

    if not active_model:
        raise NoActiveModelError(
            "No active model configured"
        )

    existing_analysis = (
        db.query(XRayAnalysis)
        .filter(
            XRayAnalysis.image_id == image_id,
            XRayAnalysis.model_version == active_model.version
        )
        .first()
    )

    if existing_analysis:
        return existing_analysis

    start_time = time.time()

    try:

        detection_result = fracture_detector.detect(image_path)

        detections = detection_result["detections"]

        results = detection_result["results"]

        fracture_detected = len(detections) > 0

        annotated_image_path = None

        if results:

            annotated_image_path = generate_overlay_image(results, image_path)

        processing_time_ms = int((time.time() - start_time) * 1000)

        max_confidence = None

        if detections:
            max_confidence = max(
                detection["confidence"]
                for detection in detections
            )

        analysis = XRayAnalysis(
            image_id=image_id,

            model_id=active_model.id,
            model_version=active_model.version,
            
            fracture_detected=fracture_detected,
            detections=detections,
            detections_count=len(detections),
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
            
            model_id=active_model.id,
            model_version=active_model.version,

            fracture_detected=False,
            detections=[],
            detections_count=0,
            max_confidence=None,
            annotated_image_path=None,
            processing_time_ms=processing_time_ms,
            status="failed",
            error_message=str(e)
        )

        db.add(analysis)
        db.commit()

        raise e
    
def build_analysis_response(
    analysis,
    image
):

    return {

        "id": analysis.id,

        "image_id": analysis.image_id,

        "model_version":
            analysis.model_version,

        "fracture_detected":
            analysis.fracture_detected,

        "detections_count":
            analysis.detections_count,

        "max_confidence":
            analysis.max_confidence,

        "detections":
            analysis.detections,

        "original_image_url":
            f"http://localhost:8000/uploads/{image.filename}",

        "annotated_image_url":
            (
                f"http://localhost:8000/annotated/{analysis.annotated_image_path}"
                if analysis.annotated_image_path
                else None
            ),

        "processing_time_ms":
            analysis.processing_time_ms,

        "status":
            analysis.status,

        "error_message":
            analysis.error_message,

        "created_at":
            analysis.created_at
    }