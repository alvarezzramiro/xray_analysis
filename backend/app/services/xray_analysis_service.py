from app.models.xray_analysis import XRayAnalysis


def save_analysis(
    db,
    image_name,
    model_version,
    detections,
    processing_time_ms
):
    analysis = XRayAnalysis(
        image_name=image_name,

        model_version=model_version,

        fracture_detected=len(detections) > 0,

        detections=detections,

        processing_time_ms=processing_time_ms
    )

    db.add(analysis)

    db.commit()

    db.refresh(analysis)

    return analysis