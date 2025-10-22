from app.services.virustotal import get_url
from fastapi import FastAPI
import requests

app = FastAPI()
url = "https://www.google.com/"

app.post("/Analizar_URL")
def analizar_url(data: dict):
    url = data.get("url")
    print("Analizando la URL:", url)
    get_url(url)
    

analizar_url({"url": url})