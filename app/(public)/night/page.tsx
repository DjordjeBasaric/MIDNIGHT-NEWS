import type { Metadata } from 'next';
import ChartWithData from '@/components/chart/ChartWithData';

export const metadata: Metadata = {
  title: '$NIGHT – Midnight News',
  description: 'Latest NIGHT token price. Open, high, low, close, volume and market cap.',
};

export default function NightPage() {
  return (
    <section className="chart-page">
      <header className="list-header">
        <h1>$NIGHT</h1>
      </header>

      <ChartWithData showLatest={true} showChart={false} />
    </section>
  );
}
