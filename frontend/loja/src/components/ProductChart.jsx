import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';

// Registrando os componentes necessários do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title);

const ProductChart = ({ data }) => {
  const chartData = {
    labels: data.map(product => product.name), // Nomes dos produtos
    datasets: [
      {
        label: 'Quantidade em Estoque',
        data: data.map(product => product.quantity), // Quantidades dos produtos
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Cor da barra
      },
    ],
  };

  return (
    <div>
      <h2>Estatísticas de Produtos</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default ProductChart;
