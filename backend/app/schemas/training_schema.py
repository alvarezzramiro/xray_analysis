# schemas/training_schema.py

from uuid import UUID
from pydantic import BaseModel

class TrainingCandidateResponse(BaseModel):
    
    id: UUID
    feedback_id: UUID
    exported: bool
    used_for_training: bool

    class Config:
        from_attributes = True

class ExportResponse(BaseModel):

    exported_candidates: int

class TrainingStatsResponse(BaseModel):

    pending_candidates: int
    exported_candidates: int
    used_for_training: int
    total_candidates: int