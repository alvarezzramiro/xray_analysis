from app.db.session import engine, Base

from app.models.xray_image import XRayImage
from app.models.xray_analysis import XRayAnalysis
from app.models.user import User

def init_db():
    Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    init_db()