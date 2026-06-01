from fastapi import FastAPI

from app.db.init_db import init_db
from app.api.routes.auth_routes import router as auth_router
from app.api.routes.xray_routes import router as xray_router
from app.api.routes.analysis_routes import router as analysis_router
from app.api.routes.user_routes import router as user_router
from app.api.routes.feedback_routes import router as feedback_router
from app.api.routes.training_routes import router as training_router
from app.api.routes.admin_routes import router as admin_router
from app.api.routes.dashboard_routes import router as dashboard_router
from app.api.routes.model_version_routes import router as model_version_router

app = FastAPI()

@app.on_event("startup")
def on_startup():
    init_db()

app.include_router(auth_router)
app.include_router(xray_router)
app.include_router(analysis_router)
app.include_router(user_router)
app.include_router(feedback_router)
app.include_router(training_router)
app.include_router(admin_router)
app.include_router(dashboard_router)
app.include_router(model_version_router)