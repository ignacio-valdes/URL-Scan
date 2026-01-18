# URL-Scan - DEPLOYMENT GUIDE

## Production - FastAPI Backend

### 1. Configure environment variables

```bash
cp backend/.env.example backend/.env
# Edit backend/.env with your real values
export VIRUSTOTAL_API_KEY=your_api_key
export ALLOWED_ORIGINS=https://your-domain.com
```

### 2. Install dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 3. Run with Gunicorn (recommended for production)

```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:8000 app.main:app --worker-class uvicorn.workers.UvicornWorker
```

### 4. Or run uvicorn in background

```bash
nohup uvicorn app.main:app --host 0.0.0.0 --port 8000 > app.log 2>&1 &
```

---

## Production - Chrome Extension Frontend

### 1. Update manifest.json

```json
{
  "host_permissions": [
    "https://your-api-domain.com/*"
  ]
}
```

### 2. Build the extension

```bash
cd frontend
npm run build
```

### 3. Package for Chrome Web Store

```bash
cd dist
zip -r url-scan.zip .
```

### 4. Publish to Chrome Web Store
- Go to https://chrome.google.com/webstore/developer/dashboard
- Upload the .zip file
- Fill in extension information
- Wait for approval (2-3 days)

---

## Security Checklist

- [ ] API Key stored in environment variables
- [ ] CORS restricted to specific domain
- [ ] HTTPS enabled on production
- [ ] URL validation implemented
- [ ] Logs configured correctly
- [ ] Database (if applicable) is secure

---

## Monitoring

### Backend
```bash
# View logs in real-time
tail -f app.log

# Check API health
curl http://your-domain.com:8000/health
```

### Extension
- Monitor Chrome Web Store reviews
- Check logs in Chrome DevTools (Extensions → Inspect)

---

## Support

For more information:
- FastAPI Docs: https://fastapi.tiangolo.com/
- Chrome Extension Docs: https://developer.chrome.com/docs/extensions/
