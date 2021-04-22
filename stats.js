const labels = xlabel;
  const data = {
    labels: labels,
    datasets: [
        {
          label: 'mean time of the generation',
          data: meanTime,
          backgroundColor: 'rgba(255, 99, 132, 0.3)',
          borderColor: 'rgb(255, 99, 132)',
        },
        {
          label: 'top score of all time',
          data: bestScore,
          backgroundColor: 'rgba(99, 132, 255, 0.2)',
          borderColor: 'rgb(99, 132, 255)',
        }
      ]
  };
  const config = {
    type: 'line',
    data: data,
    options: {
      responsive: false,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Statistics'
        }
      }
    },
  };
let ctx = document.getElementById('myChart').getContext('2d');
let chart = new Chart(ctx, config);
chart.canvas.parentNode.style.height = '450px';
chart.canvas.parentNode.style.width = '450px';
