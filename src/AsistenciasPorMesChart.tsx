import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  eventos: {
      fecha_inicio: string;
      asistencias_confirmadas: number;
  }[];
}

// Esta es la grafica
const AsistenciasPorMesChart: React.FC<ChartProps> = ({ eventos }) => {
  // Colores
  const colors = [
    "rgba(75, 192, 192, 0.6)",
    "rgba(153, 102, 255, 0.6)",
    "rgba(255, 159, 64, 0.6)",
    "rgba(255, 99, 132, 0.6)",
    "rgba(54, 162, 235, 0.6)",
    "rgba(255, 206, 86, 0.6)",
  ];
  // Lugares
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  // Agregar todos los eventos por mes
  const eventosPorMes = new Array(12).fill(0);
  eventos.forEach((evento) => {
    const month = new Date(evento.fecha_inicio).getMonth(); // Obtener el mes (0-11)
    eventosPorMes[month] += evento.asistencias_confirmadas; // Sumar asistencias confirmadas
  });

  // Datos
  const data = {
    labels: meses,
    datasets: [
      {
        label: "Numero de asistencias confirmadas",
        data: eventosPorMes,
        backgroundColor: meses.map((_, index) => colors[index % colors.length]),
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        display: false,
      },
      title: {
        display: true,
        text: "Numero de asistencias confirmadas por mes",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          callback: function (value: number | string) {
            return value;
          },
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default AsistenciasPorMesChart;
