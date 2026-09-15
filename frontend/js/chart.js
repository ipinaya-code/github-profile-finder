let chartInstance = null;

export function renderLanguagesChart(languagesData) {
  const ctx = document.getElementById('languagesChart').getContext('2d');
  
  if (chartInstance) {
    chartInstance.destroy();
  }

  const labels = Object.keys(languagesData);
  const values = Object.values(languagesData);

  chartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: values,
        backgroundColor: ['#38bdf8', '#818cf8', '#c084fc', '#f472b6', '#34d399', '#fbbf24'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: '#94a3b8', font: { size: 11 } }
        }
      }
    }
  });
}