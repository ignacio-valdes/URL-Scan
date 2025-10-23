import os
import httpx
import base64
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("VIRUSTOTAL_API_KEY")
BASE_URL = "https://www.virustotal.com/api/v3"


async def get_url(url: str):

    url_base64 = base64.urlsafe_b64encode(url.encode()).decode().strip("=")

    endpoint = f"{BASE_URL}/urls/{url_base64}"
    headers = {"accept": "application/json", "X-Apikey": API_KEY}
    async with httpx.AsyncClient() as client:
        response = await client.get(endpoint, headers=headers)
        response.raise_for_status()
        data = response.json()

        stats = data.get("data", {}).get("attributes", {}).get("last_analysis_stats", {})

        if stats:
            return {"status": "encontrado", "stats": stats}
        else:
            return {"status": "sin-stats", "message": "No se encontraron estadísticas para la URL proporcionada."}
