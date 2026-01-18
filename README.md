# URL-Scan

Extensión de navegador Chrome para escaneo y análisis de URLs usando VirusTotal API.

## 🎯 Características

- ✅ Análisis automático de URLs al cargar páginas
- ✅ Badge visual con estado de seguridad
- ✅ Popup con información detallada
- ✅ Una solicitud por página (caching inteligente)
- ✅ Bajo consumo de recursos
- ✅ Interfaz moderna con TailwindCSS

## 📋 Requisitos

- Node.js 18+ (frontend)
- Python 3.8+ (backend)
- Cuenta en [VirusTotal](https://www.virustotal.com/) con API Key

## 🚀 Instalación Local

### Backend (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tu VIRUSTOTAL_API_KEY

# Iniciar servidor
uvicorn app.main:app --reload
```

El API estará en `http://127.0.0.1:8000`

### Frontend (Extensión Chrome)

```bash
cd frontend
npm install
npm run build
```

### Cargar extensión en Chrome

1. Abre `chrome://extensions/`
2. Activa "Modo de desarrollador"
3. Click "Cargar extensión sin empaquetar"
4. Selecciona la carpeta `frontend/dist`

## 📦 Estructura

```
.
├── backend/               # API FastAPI
│   ├── app/
│   │   ├── main.py       # Endpoint principal
│   │   └── services/
│   │       └── virustotal.py  # Integración VirusTotal
│   ├── requirements.txt
│   └── .env.example
├── frontend/             # Extensión Chrome
│   ├── src/
│   │   └── App.jsx      # Componente popup
│   ├── public/
│   │   ├── manifest.json
│   │   └── background.js # Service worker
│   └── package.json
└── DEPLOYMENT.md        # Guía de producción
```

## 🔒 Seguridad en Producción

Antes de publicar, revisa [DEPLOYMENT.md](./DEPLOYMENT.md):

- [ ] API Key en variables de entorno
- [ ] CORS restringido a dominio específico
- [ ] HTTPS habilitado
- [ ] Validación de URLs
- [ ] Rate limiting configurado

## 📊 Estados de Seguridad

- 🟢 **OK**: Seguro
- 🔴 **MAL**: Malicioso
- 🟠 **?**: No clasificado
- ⚫ **ERR**: Error de conexión

## 🛠 API Endpoints

### POST `/analizar-url`
Analiza una URL

**Request:**
```json
{"url": "https://example.com"}
```

**Response:**
```json
{
  "status": "encontrado",
  "stats": {
    "malicioso": 0,
    "sospechoso": 0,
    "no_clasificado": 0,
    "seguro": 85
  }
}
```

### GET `/health`
Verifica estado del API

## 📝 Licencia

MIT

## 👨‍💻 Autor

Desarrollado como proyecto educativo.

---

Para información de deployment, ver [DEPLOYMENT.md](./DEPLOYMENT.md)
