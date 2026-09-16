from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import httpx

from github_service import get_github_profile


app = FastAPI(title="GitHub Profile Finder API")

FRONTEND_DIR = Path(__file__).resolve().parent.parent / "frontend"
app.mount("/frontend", StaticFiles(directory=FRONTEND_DIR), name="frontend")

# Configuración de CORS permitiendo GitHub Pages y desarrollo local
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5500",
        "http://127.0.0.1:5500",
        "https://ipinaya-code.github.io",
        "https://ipinaya-code.github.io/",
    ],
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)


@app.get("/")
def frontend_index():
    return FileResponse(FRONTEND_DIR / "index.html")


@app.get("/api/user/{username}")
async def get_user(username: str):
    try:
        return await get_github_profile(username)
    except ValueError as error:
        raise HTTPException(status_code=404, detail=str(error)) from error
    except httpx.HTTPStatusError as error:
        raise HTTPException(
            status_code=502,
            detail="GitHub no pudo responder a la consulta.",
        ) from error
    except httpx.RequestError as error:
        raise HTTPException(
            status_code=503,
            detail="No se pudo conectar con GitHub.",
        ) from error


@app.get("/health")
def health_check():
    return {"status": "ok"}
