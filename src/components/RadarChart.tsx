import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  type ChartData,
  type ChartOptions,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import type { PersonalityDimension } from '@/types';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

interface Props {
  dimensions: PersonalityDimension[];
}

export function RadarChart({ dimensions }: Props) {
  const data: ChartData<'radar'> = {
    labels: dimensions.map((d) => `${d.emoji} ${d.label}`),
    datasets: [
      {
        label: '你',
        data: dimensions.map((d) => d.score),
        backgroundColor: 'rgba(255, 122, 15, 0.18)',
        borderColor: 'rgba(255, 122, 15, 0.9)',
        borderWidth: 2.5,
        pointBackgroundColor: '#ff7a0f',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options: ChartOptions<'radar'> = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(26, 26, 22, 0.92)',
        padding: 12,
        cornerRadius: 10,
        titleFont: { size: 14, family: '"Noto Sans SC"' },
        bodyFont: { size: 13, family: '"Noto Sans SC"' },
        callbacks: {
          label: (ctx) => `${ctx.parsed.r} 分`,
        },
      },
    },
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 25,
          display: false,
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.08)',
        },
        angleLines: {
          color: 'rgba(0, 0, 0, 0.08)',
        },
        pointLabels: {
          font: { size: 12, family: '"Noto Sans SC"', weight: 500 },
          color: '#3d3d36',
        },
      },
    },
  };

  return (
    <div className="aspect-square w-full max-w-[320px] mx-auto">
      <Radar data={data} options={options} />
    </div>
  );
}
