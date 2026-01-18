# URL-Scan - DEPLOYMENT GUIDE

## Producción - Backend FastAPI

### 1. Configurar variables de entorno

```bash
cp backend/.env.example backend/.env
# Editar backend/.env con tus valores reales
export VIRUSTOTAL_API_KEY=tu_api_key
export ALLOWED_ORIGINS=https://tu-dominio.com
```

### 2. Instalar dependencias

```bash
cd backend
pip install -r requirements.txt
```

### 3. Ejecutar con Gunicorn (recomendado para producción)

```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:8000 app.main:app --worker-class uvicorn.workers.UvicornWorker
```

### 4. O con uvicorn en background

```bash
nohup uvicorn app.main:app --host 0.0.0.0 --port 8000 > app.log 2>&1 &
```

---

## Producción - Frontend (Extensión Chrome)

### 1. Actualizar manifest.json

```json
{
  "host_permissions": [
    "https://tu-api-domain.com/*"
  ]
}
```

### 2. Construir la extensión

```bash
cd frontend
npm run build
```

### 3. Empaquetar para Chrome Web Store

```bash
cd dist
zip -r url-scan.zip .
```

### 4. Publicar en Chrome Web Store
- Ir a https://chrome.google.com/webstore/developer/dashboard
- Subir el archivo .zip
- Llenar información de la extensión
- Esperar aprobación (2-3 días)

---

## Verificaciones de Seguridad

- [ ] API Key guardado en variables de entorno
- [ ] CORS restringido a dominio específico
- [ ] HTTPS habilitado en producción
- [ ] Validación de URLs implementada
- [ ] Logs configurados correctamente
- [ ] Rate limiting considerado
- [ ] Base de datos (si aplica) segura

---

## Monitoreo

### Backend
```bash
# Ver logs en tiempo real
tail -f app.log

# Verificar salud del API
curl http://tu-dominio.com:8000/health
```

### Extensión
- Monitorear Chrome Web Store reviews
- Logs en Chrome DevTools (Extensiones → Inspeccionar)

---

## Soporte

Para más información:
- FastAPI Docs: https://fastapi.tiangolo.com/
- Chrome Extension Docs: https://developer.chrome.com/docs/extensions/
