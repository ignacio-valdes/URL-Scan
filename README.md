# URL-Scan

Chrome browser extension for URL scanning and security analysis using VirusTotal API.

## 🎯 Features

- ✅ Automatic URL analysis on page load
- ✅ Visual badge with security status
- ✅ Detailed popup information
- ✅ Single request per page (smart caching)
- ✅ Low resource consumption
- ✅ Modern interface with TailwindCSS

## 📋 Requirements

- Node.js 18+ (frontend)
- Python 3.8+ (backend)
- [VirusTotal](https://www.virustotal.com/) account with API Key

## 🚀 Local Installation

### Backend (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env with your VIRUSTOTAL_API_KEY

# Start server
uvicorn app.main:app --reload
```

API will be available at `http://127.0.0.1:8000`

### Frontend (Chrome Extension)

```bash
cd frontend
npm install
npm run build
```

### Load Extension in Chrome

1. Open `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the `frontend/dist` folder

## 📦 Project Structure

```
.
├── backend/               # FastAPI backend
│   ├── app/
│   │   ├── main.py       # Main endpoint
│   │   └── services/
│   │       └── virustotal.py  # VirusTotal integration
│   ├── requirements.txt
│   └── .env.example
├── frontend/             # Chrome extension
│   ├── src/
│   │   └── App.jsx      # Popup component
│   ├── public/
│   │   ├── manifest.json
│   │   └── background.js # Service worker
│   └── package.json
└── DEPLOYMENT.md        # Deployment guide
```

## 🔒 Security in Production

Before publishing, review [DEPLOYMENT.md](./DEPLOYMENT.md):

- [ ] API Key in environment variables
- [ ] CORS restricted to specific domain
- [ ] HTTPS enabled
- [ ] URL validation implemented
- [ ] Rate limiting configured

## 📊 Security Status Indicators

- 🟢 **OK**: Safe
- 🔴 **MAL**: Malicious
- 🟠 **?**: Unclassified
- ⚫ **ERR**: Connection error

## 🛠 API Endpoints

### POST `/analizar-url`
Analyze a URL

**Request:**
```json
{"url": "https://example.com"}
```

**Response:**
```json
{
  "status": "found",
  "stats": {
    "malicious": 0,
    "sospechoso": 0,
    "no_clasificado": 0,
    "seguro": 85
  }
}
```

### GET `/health`
Health check endpoint

## 📝 License

MIT

## 👨‍💻 Author

Developed as an educational project.

---

For deployment information, see [DEPLOYMENT.md](./DEPLOYMENT.md)
