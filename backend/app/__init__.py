from fastapi import FastAPI
from .api.routes.health_check import router as health_check_router

app = FastAPI()

# Include the health check route
app.include_router(health_check_router)
