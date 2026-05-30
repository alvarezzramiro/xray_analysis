from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import Optional

class FeedbackCreate(BaseModel):
    analysis_id: UUID
    feedback_type: str
    comment: Optional[str] = None

class FeedbackResponse(BaseModel):
    id: UUID
    user_id: UUID
    analysis_id: UUID
    feedback_type: str
    comment: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True

class FeedbackStatsResponse(BaseModel):
    correct: int
    false_positive: int
    false_negative: int
    bad_localization: int
    other: int