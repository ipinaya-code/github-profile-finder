import { fetchUserData } from './api.js';
import { renderDashboard, showLoading, showError } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
  const usernameInput = document.getElementById('username-input');
  const searchBtn = document.getElementById('search-btn');

  searchBtn.addEventListener('click', () => handleSearch(usernameInput.value));
  usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch(usernameInput.value);
  });
});

async function handleSearch(query) {
  const username = query.trim();
  if (!username) return;

  showLoading();

  const result = await fetchUserData(username);

  if (result.success) {
    renderDashboard(result.data);
  } else {
    showError(result.error);
  }
}