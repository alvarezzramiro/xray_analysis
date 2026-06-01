from uuid import UUID
from datetime import datetime

from pydantic import BaseModel


class ModelVersionCreate(BaseModel):

    version: str
    model_path: str

    dataset_size: int

    precision: float | None = None
    recall: float | None = None

    map50: float | None = None
    map50_95: float | None = None


class ModelVersionResponse(BaseModel):

    id: UUID

    version: str
    model_path: str

    dataset_size: int

    precision: float | None
    recall: float | None

    map50: float | None
    map50_95: float | None

    is_active: bool

    created_at: datetime

    class Config:
        from_attributes = True