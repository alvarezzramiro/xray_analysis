from app.db.session import engine, Base

from app.models.xray_image import XRayImage
from app.models.analysis_result import AnalysisResult


def init_db():
    Base.metadata.create_all(bind=engine)