import { renderLanguagesChart } from './chart.js';

const statusMessage = document.getElementById('status-message');
const dashboard = document.getElementById('dashboard');

export function renderDashboard(data) {
  statusMessage.classList.add('hidden');
  
  // Reinicia la animación de entrada 3D para la nueva búsqueda
  dashboard.classList.remove('hidden', 'animate-appear');
  void dashboard.offsetWidth; // Trigger reflow para reiniciar la animación CSS
  dashboard.classList.add('animate-appear');

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

  // Renderizar Repositorios Top con diseño responsivo y separado
  const reposList = document.getElementById('repos-list');
  reposList.innerHTML = top_repos.map(repo => `
    <li style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 0.5rem; border-bottom: 1px solid var(--border-color, #1e293b); gap: 0.5rem;">
      <div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
        <a href="${repo.html_url}" target="_blank" style="color: var(--accent-color, #38bdf8); font-weight: 600; text-decoration: none;">${repo.name}</a>
        <span style="display: block; font-size: 0.8rem; color: var(--text-muted, #94a3b8); margin-top: 0.2rem;">${repo.language}</span>
      </div>
      <div style="font-size: 0.85rem; color: var(--text-muted, #94a3b8); white-space: nowrap; font-weight: 500;">
        ⭐ ${repo.stargazers_count}
      </div>
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
