// Si en FastAPI la ruta es /users/{username}:
const API_BASE_URL = 'https://github-profile-finder-y64z.onrender.com/api/user';

export async function fetchUserData(username) {
  try {
    const response = await fetch(`${API_BASE_URL}/${username}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || 'Ocurrió un error al consultar.');
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
