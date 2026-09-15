# GitHub Profile Finder

Aplicacion web para buscar perfiles de GitHub y consultar sus estadisticas publicas, lenguajes mas usados y repositorios destacados.

## Tecnologias

- Frontend: HTML, CSS y JavaScript ES Modules.
- Backend: Python, FastAPI y HTTPX.
- Datos: API publica de GitHub.
- Graficos: Chart.js.

## Requisitos

- Python 3.10 o superior.
- Conexion a internet para consultar GitHub.

## Instalacion

Desde la carpeta `backend`, instala las dependencias:

```powershell
cd backend
python -m pip install -r requirements.txt
```

## Ejecucion en la terminal

Inicia el backend desde la carpeta `backend`:
de ahi en la terminal debes poner ----------> uvicorn main:app --reload --port 8000

```powershell
uvicorn main:app --reload --port 8000
```

Abre la aplicacion en:

```text
http://127.0.0.1:8000/
```

FastAPI sirve el frontend y la API desde el mismo puerto. No es necesario iniciar un segundo servidor para la carpeta `frontend`.

## Endpoints

- `GET /`: interfaz web.
- `GET /health`: comprobacion del estado del backend.
- `GET /api/user/{username}`: perfil, lenguajes y repositorios destacados de un usuario.

## Variables de entorno

El proyecto funciona sin variables de entorno porque usa la API publica de GitHub. Si mas adelante se configura un token, debe guardarse en `.env` y nunca publicarse:

```env
GITHUB_TOKEN=tu_token_de_github
```

## Estructura

```text
backend/
	github_service.py  # Consulta y transforma los datos de GitHub
	main.py            # API FastAPI y servidor del frontend
	requirements.txt   # Dependencias Python
frontend/
	index.html         # Interfaz principal
	css/               # Estilos
	js/                # Logica, API y graficos
```

## Limitaciones

La API publica de GitHub tiene limites de consultas. Para un uso frecuente o una aplicacion desplegada conviene configurar autenticacion mediante un token.
