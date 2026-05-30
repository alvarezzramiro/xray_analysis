from sqlalchemy import Column, String, Boolean, Integer, DateTime, Float, ForeignKey
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func

from app.db.session import Base

import uuid

class AnalysisFeedback(Base):

    __tablename__ = "analysis_feedback"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    user_id = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id"),
        nullable=False
    )

    analysis_id = Column(
        UUID(as_uuid=True),
        ForeignKey("xray_analysis.id"),
        nullable=False
    )

    feedback_type = Column(
        String,
        nullable=False
    )

    comment = Column(
        String,
        nullable=True
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )