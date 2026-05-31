from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.db.session import Base

import uuid

class FeedbackAnnotation(Base):

    __tablename__ = "feedback_annotations"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    feedback_id = Column(
        UUID(as_uuid=True),
        ForeignKey("analysis_feedback.id"),
        nullable=False
    )

    class_id = Column(
        Integer,
        nullable=False,
        default=0
    )

    class_name = Column(
        String,
        nullable=False
    )

    x1 = Column(Integer, nullable=False)
    y1 = Column(Integer, nullable=False)

    x2 = Column(Integer, nullable=False)
    y2 = Column(Integer, nullable=False)

    feedback = relationship(
        "AnalysisFeedback",
        back_populates="annotations"
    )