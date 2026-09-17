let chartInstance = null;

export function renderLanguagesChart(languagesData) {
  const canvas = document.getElementById('languagesChart');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');

  // Destruye la instancia previa para evitar superposición
  if (chartInstance) {
    chartInstance.destroy();
  }

  const labels = Object.keys(languagesData);
  const values = Object.values(languagesData);

  // Paleta neón brillante acorde al tema futurista
  const neonColors = [
    '#38bdf8', // Sky Blue
    '#818cf8', // Indigo
    '#c084fc', // Purple
    '#f472b6', // Pink
    '#34d399', // Emerald
    '#fbbf24'  // Amber
  ];

  chartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: values,
        backgroundColor: neonColors,
        borderColor: '#111827', // Hace juego con el fondo de la tarjeta
        borderWidth: 3,
        hoverOffset: 8 // Efecto de elevación al pasar el cursor o pulsar
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false, // Permite que el contenedor controle el alto en móviles
      animation: {
        animateScale: true,
        animateRotate: true,
        duration: 1000,
        easing: 'easeOutQuart'
      },
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#f8fafc',
            font: {
              size: 12,
              family: 'system-ui, -apple-system, sans-serif',
              weight: '500'
            },
            padding: 15,
            usePointStyle: true,
            pointStyle: 'circle'
          }
        },
        tooltip: {
          backgroundColor: '#0b0f19',
          titleColor: '#38bdf8',
          bodyColor: '#f8fafc',
          borderColor: '#1e293b',
          borderWidth: 1,
          padding: 10,
          boxPadding: 6,
          usePointStyle: true
        }
      },
      cutout: '68%' // Da un aspecto de anillo delgado y moderno
    }
  });
}
