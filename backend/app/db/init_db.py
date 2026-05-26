from app.db.session import engine, Base

from app.models.xray_image import XRayImage
from app.models.xray_analysis import XRayAnalysis

def init_db():
    Base.metadata.create_all(bind=engine)