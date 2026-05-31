from sqlalchemy import Column, ForeignKey, Boolean, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.db.session import Base

import uuid

class TrainingCandidate(Base):

    __tablename__ = "training_candidates"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    feedback_id = Column(
        UUID(as_uuid=True),
        ForeignKey("analysis_feedback.id"),
        nullable=False,
        unique=True
    )

    exported = Column(
        Boolean,
        nullable=False,
        default=False
    )

    used_for_training = Column(
        Boolean,
        nullable=False,
        default=False
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    feedback = relationship(
        "AnalysisFeedback",
        back_populates="training_candidate"
    )