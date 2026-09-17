import { fetchUserData } from './api.js';
import { renderDashboard, showLoading, showError } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
  const usernameInput = document.getElementById('username-input');
  const searchBtn = document.getElementById('search-btn');

  // Evento de clic en el botón
  searchBtn.addEventListener('click', () => handleSearch(usernameInput, searchBtn));

  // Evento de tecla Enter en el input
  usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleSearch(usernameInput, searchBtn);
    }
  });
});

async function handleSearch(inputElement, btnElement) {
  const username = inputElement.value.trim();
  if (!username) return;

  // Estado visual de carga y bloqueo temporal del botón
  btnElement.disabled = true;
  btnElement.style.opacity = '0.7';
  btnElement.style.cursor = 'not-allowed';
  
  showLoading();

  const result = await fetchUserData(username);

  if (result.success) {
    renderDashboard(result.data);
  } else {
    showError(result.error);
  }

  // Restaurar el botón tras recibir la respuesta
  btnElement.disabled = false;
  btnElement.style.opacity = '1';
  btnElement.style.cursor = 'pointer';
}
