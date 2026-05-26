from pydantic import BaseModel

class BoundingBoxResponse(BaseModel):
    x1: int
    y1: int
    x2: int
    y2: int

class DetectionResponse(BaseModel):
    class_id: int
    class_name: str
    confidence: float

    bbox: BoundingBoxResponse

from pydantic import BaseModel
from typing import List

class AnalysisResponse(BaseModel):

    analysis_id: str

    fracture_detected: bool

    detections: List[DetectionResponse]

    annotated_image: str | None

    processing_time_ms: int

    model_version: str