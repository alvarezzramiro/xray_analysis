from datetime import datetime

from pydantic import BaseModel
from uuid import UUID
from typing import List, Optional

class BoundingBox(BaseModel):
    x1: int
    y1: int
    x2: int
    y2: int

class Detection(BaseModel):
    class_id: int
    class_name: str
    confidence: float
    bbox: BoundingBox

class AnalysisResponse(BaseModel):
    id: UUID
    image_id: UUID
    model_version: str
    fracture_detected: bool
    detections_count: int
    max_confidence: Optional[float]
    detections: List[Detection]
    original_image_url: Optional[str]
    annotated_image_url: Optional[str]
    processing_time_ms: int
    status: str
    error_message: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True