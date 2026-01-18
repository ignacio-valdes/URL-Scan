import os
from pydantic import BaseModel, HttpUrl
from app.services.virustotal import get_url
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException

app = FastAPI(
    title="URL-Scan API",
    description="API for URL analysis and threat detection",
    version="1.0.0"
)

# CORS configuration (environment-based)
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://127.0.0.1:8000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["Content-Type"],
)

# Request schema for URL validation
class URLRequest(BaseModel):
    url: HttpUrl

@app.post("/analizar-url", tags=["Analysis"])
async def analizar_url(request: URLRequest):
    """Analyze a URL using VirusTotal API"""
    url = str(request.url)
    
    try:
        report = await get_url(url)
        return report
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing URL: {str(e)}")

@app.get("/health", tags=["Health"])
async def health_check():
    """Health check endpoint"""
    return {"status": "ok", "service": "URL-Scan API"}