from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.db.session import Base

import uuid

class ModelVersion(Base):

    __tablename__ = "model_versions"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    version = Column(
        String,
        nullable=False,
        unique=True
    )

    model_path = Column(
        String,
        nullable=False
    )

    dataset_size = Column(
        Integer,
        nullable=False
    )

    precision = Column(
        Float,
        nullable=True
    )

    recall = Column(
        Float,
        nullable=True
    )

    map50 = Column(
        Float,
        nullable=True
    )

    map50_95 = Column(
        Float,
        nullable=True
    )

    is_active = Column(
        Boolean,
        nullable=False,
        default=False
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    analyses = relationship(
        "XRayAnalysis",
        back_populates="model"
    )