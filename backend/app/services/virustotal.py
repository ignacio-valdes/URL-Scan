import os
import requests
import base64
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("VIRUSTOTAL_API_KEY")
BASE_URL = "https://www.virustotal.com/api/v3"


def get_url(url: str):

    url_base64 = base64.urlsafe_b64encode(url.encode()).decode().strip("=")

    endpoint = f"{BASE_URL}/urls/{url_base64}"
    headers = {"accept": "application/json", "X-Apikey": API_KEY}

    response = requests.get(endpoint, headers=headers)

    print(response.text)