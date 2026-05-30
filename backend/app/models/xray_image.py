import uuid

from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.db.session import Base


class XRayImage(Base):
    __tablename__ = "xray_images"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    filename = Column(String, nullable=False)

    filepath = Column(String, nullable=False)

    status = Column(String, nullable=False, default="uploaded")

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)

    user = relationship("User")