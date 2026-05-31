from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import Optional

class AnnotationCreate(BaseModel):
    class_name: str
    x1: int
    y1: int
    x2: int
    y2: int

class AnnotationResponse(BaseModel):
    id: UUID
    class_name: str
    x1: int
    y1: int
    x2: int
    y2: int

    class Config:
        from_attributes = True

class FeedbackCreate(BaseModel):
    analysis_id: UUID
    feedback_type: str
    comment: Optional[str] = None
    annotations: list[AnnotationCreate] = []

class FeedbackResponse(BaseModel):
    id: UUID
    user_id: UUID
    analysis_id: UUID
    feedback_type: str
    comment: Optional[str]
    created_at: datetime
    annotations: list[AnnotationCreate]

    class Config:
        from_attributes = True

class FeedbackStatsResponse(BaseModel):
    correct: int
    false_positive: int
    false_negative: int
    bad_localization: int
    multiple_errors: int
    other: int