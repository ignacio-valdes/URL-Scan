import os
import httpx
import base64
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("VIRUSTOTAL_API_KEY")
BASE_URL = "https://www.virustotal.com/api/v3"


async def get_url(url: str):
    if not API_KEY:
        print("❌ Error: VIRUSTOTAL_API_KEY environment variable not found")
        return {"status": "error", "message": "Server configuration incomplete (Missing API Key)."}

    url_base64 = base64.urlsafe_b64encode(url.encode()).decode().strip("=")

    endpoint = f"{BASE_URL}/urls/{url_base64}"
    headers = {"accept": "application/json", "X-Apikey": API_KEY}
    async with httpx.AsyncClient() as client:
        response = await client.get(endpoint, headers=headers)
        
        if response.status_code == 404:
            return {"status": "not-found", "message": "This URL has not been analyzed by VirusTotal previously."}
            
        response.raise_for_status()
        data = response.json()

        stats = data.get("data", {}).get("attributes", {}).get("last_analysis_stats", {})

        if stats:
            return {"status": "found", "stats": stats}
        else:
            return {"status": "no-stats", "message": "No statistics found for the provided URL."}
