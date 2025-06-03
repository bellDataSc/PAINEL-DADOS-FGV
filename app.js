// Data from the analysis
const dados = {
  cbo_info: {
    codigo: "212415",
    descricao: "Analista de sistemas de automação",
    categoria: "Profissionais da Informática"
  },
  salario_minimo_2024: 1412.00,
  periodo_analise: "2024",
  dados_parte1: [
    {competencia: 202401, mes_ano: "Jan/2024", qtd_registros: 185, valor_medio: 4250.75},
    {competencia: 202402, mes_ano: "Fev/2024", qtd_registros: 203, valor_medio: 4180.30},
    {competencia: 202403, mes_ano: "Mar/2024", qtd_registros: 198, valor_medio: 4320.85},
    {competencia: 202404, mes_ano: "Abr/2024", qtd_registros: 215, valor_medio: 4275.60},
    {competencia: 202405, mes_ano: "Mai/2024", qtd_registros: 208, valor_medio: 4380.25},
    {competencia: 202406, mes_ano: "Jun/2024", qtd_registros: 192, valor_medio: 4420.90},
    {competencia: 202407, mes_ano: "Jul/2024", qtd_registros: 220, valor_medio: 5115.45},
    {competencia: 202408, mes_ano: "Ago/2024", qtd_registros: 187, valor_medio: 4890.20},
    {competencia: 202409, mes_ano: "Set/2024", qtd_registros: 205, valor_medio: 4750.35},
    {competencia: 202410, mes_ano: "Out/2024", qtd_registros: 195, valor_medio: 4680.80},
    {competencia: 202411, mes_ano: "Nov/2024", qtd_registros: 210, valor_medio: 4820.15},
    {competencia: 202412, mes_ano: "Dez/2024", qtd_registros: 218, valor_medio: 4950.60}
  ],
  dados_parte2: [
    {competencia: 202402, mes_ano: "Fev/2024", variacao_percentual: -1.65},
    {competencia: 202403, mes_ano: "Mar/2024", variacao_percentual: 3.36},
    {competencia: 202404, mes_ano: "Abr/2024", variacao_percentual: -1.05},
    {competencia: 202405, mes_ano: "Mai/2024", variacao_percentual: 2.44},
    {competencia: 202406, mes_ano: "Jun/2024", variacao_percentual: 0.93},
    {competencia: 202407, mes_ano: "Jul/2024", variacao_percentual: 15.71},
    {competencia: 202408, mes_ano: "Ago/2024", variacao_percentual: -4.40},
    {competencia: 202409, mes_ano: "Set/2024", variacao_percentual: -2.86},
    {competencia: 202410, mes_ano: "Out/2024", variacao_percentual: -1.46},
    {competencia: 202411, mes_ano: "Nov/2024", variacao_percentual: 2.98},
    {competencia: 202412, mes_ano: "Dez/2024", variacao_percentual: 2.71}
  ],
  maior_variacao: {
    competencia: 202407,
    mes_ano: "Jul/2024",
    variacao_percentual: 15.71,
    valor_atual: 5115.45,
    valor_anterior: 4420.90
  },
  resultado_parte3: {
    competencia: 202407,
    mes_ano: "Jul/2024",
    quantidade_registros: 220,
    distribuicao_salarial: {
      acima_salario_minimo: 195,
      abaixo_salario_minimo: 25,
      percentual_acima: 88.6
    }
  }
};

// Chart colors
const chartColors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B'];

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  initTabNavigation();
  populateTables();
  createCharts();
  updateStatistics();
});

// Tab Navigation
function initTabNavigation() {
  const tabButtons = document.querySelectorAll('.nav-tab');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');
      
      // Remove active class from all tabs and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked tab and corresponding content
      button.classList.add('active');
      document.getElementById(targetTab).classList.add('active');
    });
  });
}

// Populate tables with data
function populateTables() {
  populateTable1();
  populateTable2();
}

function populateTable1() {
  const tbody = document.getElementById('table1-body');
  tbody.innerHTML = '';
  
  dados.dados_parte1.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="font-mono">${item.competencia}</td>
      <td>${item.mes_ano}</td>
      <td>${item.qtd_registros}</td>
      <td>${formatCurrency(item.valor_medio)}</td>
    `;
    tbody.appendChild(row);
  });
}

function populateTable2() {
  const tbody = document.getElementById('table2-body');
  tbody.innerHTML = '';
  
  // Add first month (no variation)
  const firstMonth = dados.dados_parte1[0];
  const firstRow = document.createElement('tr');
  firstRow.innerHTML = `
    <td>${firstMonth.mes_ano}</td>
    <td>${formatCurrency(firstMonth.valor_medio)}</td>
    <td>-</td>
    <td><span class="status status--info">Base</span></td>
  `;
  tbody.appendChild(firstRow);
  
  // Add remaining months with variations
  dados.dados_parte2.forEach((item, index) => {
    const valorAtual = dados.dados_parte1[index + 1].valor_medio;
    const row = document.createElement('tr');
    const variationClass = item.variacao_percentual > 0 ? 'variation-positive' : 
                          item.variacao_percentual < 0 ? 'variation-negative' : 'variation-neutral';
    const statusClass = item.variacao_percentual > 0 ? 'status--success' : 
                       item.variacao_percentual < 0 ? 'status--error' : 'status--info';
    const statusText = item.variacao_percentual > 0 ? 'Crescimento' : 
                      item.variacao_percentual < 0 ? 'Queda' : 'Estável';
    
    row.innerHTML = `
      <td>${item.mes_ano}</td>
      <td>${formatCurrency(valorAtual)}</td>
      <td class="${variationClass}">${item.variacao_percentual > 0 ? '+' : ''}${item.variacao_percentual.toFixed(2)}%</td>
      <td><span class="status ${statusClass}">${statusText}</span></td>
    `;
    tbody.appendChild(row);
  });
}

// Create charts
function createCharts() {
  createChart1();
  createChart2();
  createChart2Bars();
  createChart3();
}

function createChart1() {
  const ctx = document.getElementById('chart1').getContext('2d');
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: dados.dados_parte1.map(item => item.mes_ano.split('/')[0]),
      datasets: [{
        label: 'Salário Médio (R$)',
        data: dados.dados_parte1.map(item => item.valor_medio),
        backgroundColor: chartColors[0],
        borderColor: chartColors[0],
        borderWidth: 1,
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `R$ ${context.parsed.y.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          ticks: {
            callback: function(value) {
              return 'R$ ' + value.toLocaleString('pt-BR');
            }
          }
        }
      }
    }
  });
}

function createChart2() {
  const ctx = document.getElementById('chart2').getContext('2d');
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: dados.dados_parte2.map(item => item.mes_ano.split('/')[0]),
      datasets: [{
        label: 'Variação %',
        data: dados.dados_parte2.map(item => item.variacao_percentual),
        borderColor: chartColors[0],
        backgroundColor: chartColors[0] + '20',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: chartColors[0],
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.parsed.y > 0 ? '+' : ''}${context.parsed.y.toFixed(2)}%`;
            }
          }
        }
      },
      scales: {
        y: {
          ticks: {
            callback: function(value) {
              return value + '%';
            }
          },
          grid: {
            color: function(context) {
              return context.tick.value === 0 ? '#666' : '#e0e0e0';
            }
          }
        }
      }
    }
  });
}

function createChart2Bars() {
  const ctx = document.getElementById('chart2-bars').getContext('2d');
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: dados.dados_parte2.map(item => item.mes_ano.split('/')[0]),
      datasets: [{
        label: 'Variação %',
        data: dados.dados_parte2.map(item => item.variacao_percentual),
        backgroundColor: dados.dados_parte2.map(item => 
          item.variacao_percentual > 0 ? chartColors[1] : chartColors[2]
        ),
        borderWidth: 1,
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.parsed.y > 0 ? '+' : ''}${context.parsed.y.toFixed(2)}%`;
            }
          }
        }
      },
      scales: {
        y: {
          ticks: {
            callback: function(value) {
              return value + '%';
            }
          },
          grid: {
            color: function(context) {
              return context.tick.value === 0 ? '#666' : '#e0e0e0';
            }
          }
        }
      }
    }
  });
}

function createChart3() {
  const ctx = document.getElementById('chart3').getContext('2d');
  
  const distribuicao = dados.resultado_parte3.distribuicao_salarial;
  
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Acima do Salário Mínimo', 'Abaixo do Salário Mínimo'],
      datasets: [{
        data: [distribuicao.acima_salario_minimo, distribuicao.abaixo_salario_minimo],
        backgroundColor: [chartColors[1], chartColors[2]],
        borderWidth: 2,
        borderColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 20,
            font: {
              size: 12
            }
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = ((context.parsed / total) * 100).toFixed(1);
              return `${context.label}: ${context.parsed} (${percentage}%)`;
            }
          }
        }
      }
    }
  });
}

// Update statistics
function updateStatistics() {
  const valores = dados.dados_parte1.map(item => item.valor_medio);
  const maxSalary = Math.max(...valores);
  const minSalary = Math.min(...valores);
  const avgSalary = valores.reduce((a, b) => a + b, 0) / valores.length;
  
  document.getElementById('max-salary').textContent = formatCurrency(maxSalary);
  document.getElementById('min-salary').textContent = formatCurrency(minSalary);
  document.getElementById('avg-salary').textContent = formatCurrency(avgSalary);
}

// Utility functions
function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

function toggleCode(codeId) {
  const codeBlock = document.getElementById(codeId);
  codeBlock.classList.toggle('hidden');
}

// Add smooth scrolling for better UX
function smoothScroll(target) {
  document.querySelector(target).scrollIntoView({
    behavior: 'smooth'
  });
}

// Export functionality (simulated)
function exportData(format) {
  alert(`Funcionalidade de exportação em ${format} será implementada em versão futura.`);
}

// Keyboard navigation for tabs
document.addEventListener('keydown', function(e) {
  const activeTab = document.querySelector('.nav-tab.active');
  const tabs = Array.from(document.querySelectorAll('.nav-tab'));
  const currentIndex = tabs.indexOf(activeTab);
  
  if (e.key === 'ArrowLeft' && currentIndex > 0) {
    tabs[currentIndex - 1].click();
  } else if (e.key === 'ArrowRight' && currentIndex < tabs.length - 1) {
    tabs[currentIndex + 1].click();
  }
});

// Add loading states for charts
function showLoading(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
}

// Animation for statistics on scroll
function animateStats() {
  const stats = document.querySelectorAll('.stat-value');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeIn 0.6s ease-out';
      }
    });
  });
  
  stats.forEach(stat => observer.observe(stat));
}

// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
  animateStats();
});

// Handle window resize for charts
window.addEventListener('resize', function() {
  Chart.helpers.each(Chart.instances, function(instance) {
    instance.resize();
  });
});

// Add tooltips for enhanced UX
function addTooltips() {
  const tooltipElements = document.querySelectorAll('[data-tooltip]');
  
  tooltipElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.textContent = this.getAttribute('data-tooltip');
      document.body.appendChild(tooltip);
      
      const rect = this.getBoundingClientRect();
      tooltip.style.left = rect.left + 'px';
      tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
    });
    
    element.addEventListener('mouseleave', function() {
      const tooltip = document.querySelector('.tooltip');
      if (tooltip) tooltip.remove();
    });
  });
}

// Print functionality
function printReport() {
  window.print();
}

// Search functionality (future enhancement)
function searchData(query) {
  // Implementation for searching through the data
  console.log('Searching for:', query);
}

// Data filtering (future enhancement)
function filterByPeriod(startMonth, endMonth) {
  // Implementation for filtering data by period
  console.log('Filtering from', startMonth, 'to', endMonth);
}