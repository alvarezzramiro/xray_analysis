from fastapi import FastAPI

from app.db.init_db import init_db
from app.api.routes.xray_routes import router as xray_router

app = FastAPI()

@app.on_event("startup")
def on_startup():
    init_db()

@app.get("/health")
def health():
    return {"status": "ok"}

app.include_router(xray_router)