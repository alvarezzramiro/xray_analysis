from pydantic import BaseModel
from uuid import UUID
from datetime import datetime


class Detection(BaseModel):
    class_id: int
    confidence: float
    bbox: dict


class XRayAnalysisResponse(BaseModel):
    id: UUID

    image_name: str

    model_version: str

    fracture_detected: bool

    detections: list[Detection]

    processing_time_ms: int

    created_at: datetime