// Endpoint del backend FastAPI en Render
const API_BASE_URL = 'https://github-profile-finder-y54z.onrender.com/api/user';

/**
 * Consulta los datos del perfil de GitHub desde el backend.
 * @param {string} username - Nombre de usuario de GitHub.
 * @returns {Promise<{success: boolean, data?: object, error?: string}>}
 */
export async function fetchUserData(username) {
  try {
    // Controller para cancelar la petición si sobrepasa los 12 segundos
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const response = await fetch(`${API_BASE_URL}/${username}`, {
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || 'Ocurrió un error al consultar el perfil.');
    }

    return { success: true, data };
  } catch (error) {
    if (error.name === 'AbortError') {
      return { 
        success: false, 
        error: 'La consulta tardó demasiado. El servidor de Render se está iniciando, reintenta en unos segundos.' 
      };
    }
    return { success: false, error: error.message };
  }
}
