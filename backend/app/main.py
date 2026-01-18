import os
from pydantic import BaseModel, HttpUrl
from app.services.virustotal import get_url
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException

app = FastAPI(
    title="URL-Scan API",
    description="API para análisis de URLs",
    version="1.0.0"
)

# CORS: Configurar según ambiente
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://127.0.0.1:8000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["Content-Type"],
)

# Esquema de validación
class URLRequest(BaseModel):
    url: HttpUrl

@app.post("/analizar-url", tags=["Analysis"])
async def analizar_url(request: URLRequest):
    """Analizar una URL utilizando VirusTotal API"""
    url = str(request.url)
    
    try:
        reporte = await get_url(url)
        return reporte
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al analizar URL: {str(e)}")

@app.get("/health", tags=["Health"])
async def health_check():
    """Health check endpoint"""
    return {"status": "ok", "service": "URL-Scan API"}