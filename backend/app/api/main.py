from fastapi import FastAPI
from .routes.health_check import router as health_check_router
from fastapi.middleware.cors import CORSMiddleware
from .routes.process import router as process_router

app = FastAPI()

# Allow CORS for all origins (you can restrict this to specific origins)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the health check route
app.include_router(health_check_router)
app.include_router(process_router)

# You can add more routes here as needed
