from app.services.virustotal import get_url
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI

origins = ["*"]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analizar-url")
async def analizar_url(data: dict):
    url = data.get("url")
    print("Analizando la URL:", url)
    reporte = await get_url(url)
    return reporte