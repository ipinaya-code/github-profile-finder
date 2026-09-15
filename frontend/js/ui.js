import { renderLanguagesChart } from './chart.js';

const statusMessage = document.getElementById('status-message');
const dashboard = document.getElementById('dashboard');

export function renderDashboard(data) {
  statusMessage.classList.add('hidden');
  dashboard.classList.remove('hidden');

  const { profile, languages, top_repos } = data;

  // Renderizar Perfil
  document.getElementById('avatar').src = profile.avatar_url;
  document.getElementById('name').textContent = profile.name;
  document.getElementById('username').textContent = `@${profile.login}`;
  document.getElementById('username').href = profile.html_url;
  document.getElementById('bio').textContent = profile.bio;
  document.getElementById('repos').textContent = profile.public_repos;
  document.getElementById('followers').textContent = profile.followers;
  document.getElementById('following').textContent = profile.following;

  // Renderizar Repositorios Top
  const reposList = document.getElementById('repos-list');
  reposList.innerHTML = top_repos.map(repo => `
    <li style="display:flex; justify-between; align-items:center; padding: 0.5rem; border-bottom: 1px solid #1e293b;">
      <div>
        <a href="${repo.html_url}" target="_blank" style="color:#38bdf8; font-weight:bold;">${repo.name}</a>
        <span style="display:block; font-size: 0.8rem; color:#94a3b8;">${repo.language}</span>
      </div>
      <div style="font-size:0.8rem; color:#94a3b8;">⭐ ${repo.stargazers_count}</div>
    </li>
  `).join('');

  // Renderizar Gráfico
  renderLanguagesChart(languages);
}

export function showLoading() {
  dashboard.classList.add('hidden');
  statusMessage.className = 'status-box loading';
  statusMessage.textContent = 'Procesando datos en FastAPI...';
}

export function showError(message) {
  dashboard.classList.add('hidden');
  statusMessage.className = 'status-box error';
  statusMessage.textContent = message;
}