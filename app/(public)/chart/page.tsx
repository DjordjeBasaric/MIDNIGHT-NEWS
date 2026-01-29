import type { Metadata } from 'next';
import ChartWithData from '@/components/chart/ChartWithData';

export const metadata: Metadata = {
  title: 'Chart – Midnight News',
  description: 'NIGHT token vs US butter (lb) ratio. Dynamic data updated daily.',
};

export default function ChartPage() {
  return (
    <section className="chart-page">
      <header className="list-header">
        <h1>Chart</h1>
      </header>

      <ChartWithData />
    </section>
  );
}
