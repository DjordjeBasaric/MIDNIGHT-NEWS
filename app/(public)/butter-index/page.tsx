import type { Metadata } from 'next';
import ChartWithData from '@/components/chart/ChartWithData';

export const metadata: Metadata = {
  title: 'Butter Index – Midnight News',
  description: '$NIGHT per pound of US Butter. Dynamic chart updated daily.',
};

export default function ButterIndexPage() {
  return (
    <section className="chart-page">
      <header className="list-header">
        <h1>Butter Index</h1>
      </header>

      <ChartWithData showLatest={false} showChart={true} />
    </section>
  );
}
