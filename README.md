# URL-Scan

Bienvenido al repositorio de **URL-Scan**. Este proyecto es una **extensión de navegador** diseñada para el escaneo y análisis de URLs.

## Estructura del Proyecto

El repositorio contiene la siguiente estructura principal:

- **frontend/**: La interfaz de usuario de la aplicación, construida utilizando [Vite](https://vitejs.dev/) y [React](https://react.dev/).
- **backend/**: El servidor API, construido con [FastAPI](https://fastapi.tiangolo.com/) y Python.

## Comenzando

Sigue estas instrucciones para configurar y ejecutar el proyecto en tu entorno local.

### Prerrequisitos

Asegúrate de tener instalado:
- [Node.js](https://nodejs.org/) (versión LTS recomendada)
- npm (normalmente incluido con Node.js)
- [Python](https://www.python.org/) (versión 3.8 o superior)

### Configuración del Frontend

1. **Navega al directorio del frontend:**

   ```bash
   cd frontend
   ```

2. **Instala las dependencias:**

   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo:**

   ```bash
   npm run dev
   ```

   La aplicación debería estar corriendo en `http://localhost:5173` (o el puerto que indique la consola).

### Configuración del Backend

1. **Navega al directorio del backend:**

   ```bash
   cd backend
   ```

2. **Crea y activa un entorno virtual:**

   ```bash
   python -m venv venv
   source venv/bin/activate  # En Windows: venv\Scripts\activate
   ```

3. **Instala las dependencias:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Configura las variables de entorno:**

   Crea un archivo `.env` dentro de la carpeta `backend/` y agrega tu API Key de VirusTotal:

   ```env
   VIRUSTOTAL_API_KEY=tu_api_key_aqui
   ```

5. **Inicia el servidor:**

   ```bash
   uvicorn app.main:app --reload
   ```

   El servidor estará escuchando en `http://127.0.0.1:8000`.

## Construcción para Producción

Para generar los archivos optimizados para producción, ejecuta:

```bash
npm run build
```
