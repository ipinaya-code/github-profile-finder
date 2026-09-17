# 🚀 GitHub Profile Analytics 3D

Una aplicación web full-stack, modular y totalmente responsive con estética **3D Neón**, diseñada para buscar perfiles de GitHub, analizar estadísticas públicas de usuarios, calcular la distribución de lenguajes de programación en tiempo real y listar repositorios destacados.

---

## 🌐 Enlaces de Despliegue

- **Frontend (GitHub Pages):** [https://ipinaya-code.github.io/github-profile-finder/frontend/](https://ipinaya-code.github.io/github-profile-finder/frontend/)
- **Backend API (Render):** `https://github-profile-finder-y54z.onrender.com/api/user/{username}`

---

## ✨ Características Principales

- **Diseño Neón 3D Adaptativo:** Interfaz construida con capas de profundidad (`box-shadow`), efectos de iluminación neón (`linear-gradient`) y animaciones fluidas (`.animate-appear`).
- **100% Mobile-First & Responsive:** Adaptación automática para pantallas móviles, tablets y monitores mediante CSS Grid y Flexbox sin deformar componentes.
- **Gráficos Interactivos (Chart.js):** Gráfico tipo dona (*doughnut*) con paleta neón brillante, bordes adaptados al fondo y destrucción de instancias previas para evitar superposiciones de canvas.
- **Backend Optimizado con FastAPI:** Consumo asíncrono de la API pública de GitHub mediante HTTPX con cálculo de lenguajes de programación.
- **Autenticación mediante Token (`GITHUB_TOKEN`):** Extensión del límite de tasa de la API de GitHub de **60 a 5,000 peticiones por hora**.
- **Manejo Robusto de Errores y Carga:** Interfaz interactiva con estados de carga (*loading*), deshabilitación temporal de botones durante peticiones y banners de error estilizados.

---

## 🛠️ Tecnologías Utilizadas

### **Backend**
- **Lenguaje:** Python 3.10+
- **Framework:** FastAPI
- **Servidor ASGI:** Uvicorn
- **Cliente HTTP:** HTTPX / Requests

### **Frontend**
- **Estructura:** HTML5 Semántico
- **Estilos:** CSS3 Modular (Variables CSS, Flexbox, CSS Grid)
- **Lógica:** JavaScript ES6 (Módulos nativos `import` / `export`)
- **Librería de Gráficos:** Chart.js v4 (CDN)

### **Infraestructura & CI/CD**
- **Hosting Frontend:** GitHub Pages
- **Hosting Backend:** Render (Web Service Python)
- **Control de Versiones:** Git / GitHub

---

## 📁 Estructura del Proyecto

```text
github-profile-finder/
│
├── backend/
│   ├── github_service.py     # Lógica de consulta a la API de GitHub y agregación de lenguajes
│   ├── main.py               # Servidor FastAPI, manejo de CORS, endpoints y archivos estáticos
│   └── requirements.txt      # Dependencias de Python (fastapi, uvicorn, httpx, python-dotenv)
│
├── frontend/
│   ├── index.html            # Estructura principal y contenedores del Dashboard
│   ├── css/
│   │   ├── base.css          # Reset global, variables de color neón y tipografía
│   │   ├── components.css    # Estilos de tarjetas 3D, botones, inputs y rejilla
│   │   ├── utilities.css     # Clases utilitarias y animaciones (.animate-appear, .hidden)
│   │   └── main.css         # Archivo maestro de importación CSS
│   └── js/
│       ├── api.js            # Comunicación con el backend FastAPI y manejo de timeouts
│       ├── chart.js          # Configuración y renderizado del gráfico Chart.js
│       ├── ui.js             # Manipulación del DOM, inyección de datos y animaciones
│       └── main.js           # Orquestador principal de eventos del DOM
│
└── README.md                 # Documentación técnica del proyecto
