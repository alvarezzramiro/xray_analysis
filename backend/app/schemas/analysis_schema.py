from pydantic import BaseModel
from uuid import UUID


class AnalysisResponse(BaseModel):
    id: UUID
    image_id: UUID

    bone: str
    injury_type: str
    confidence: float

    bbox_x1: int
    bbox_y1: int
    bbox_x2: int
    bbox_y2: int