from sqlalchemy import Column, String, Boolean, Integer, DateTime, Float, ForeignKey
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func

from app.db.session import Base

import uuid

class XRayAnalysis(Base):
    __tablename__ = "xray_analysis"

    id = Column(
        UUID(as_uuid=True), 
        primary_key=True, 
        default=uuid.uuid4
    )

    image_id = Column(
        UUID(as_uuid=True),
        ForeignKey("xray_images.id"),
        nullable=False
    )

    model_version = Column(String, nullable=False)

    fracture_detected = Column(Boolean, nullable=False)

    detections = Column(JSONB, nullable=False)

    detections_count = Column(Integer, nullable=False, default=0)

    max_confidence = Column(Float, nullable=False)

    annotated_image_path = Column(String, nullable=False)

    processing_time_ms = Column(Integer, nullable=False)

    status = Column(String, nullable=False, default="completed")

    error_message = Column(String, nullable=True)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )