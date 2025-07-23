import React from 'react';
import { useTransacoes } from '../context/TransacaoContext';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CORES = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA336A', '#3366AA'];

export default function Dashboard() {
  const { transacoes } = useTransacoes();

  const Ganhos = transacoes.filter(t => t.tipo === 'Ganho');
  const despesas = transacoes.filter(t => t.tipo === 'despesa');

  const totalGanhos = Ganhos.reduce((acc, t) => acc + Number(t.valor), 0);
  const totalDespesas = despesas.reduce((acc, t) => acc + Number(t.valor), 0);
  const saldo = totalGanhos - totalDespesas;

  // Dados para gráfico pizza de despesas por categoria
  const categorias = [...new Set(despesas.map(d => d.categoria || 'Geral'))];

  const dadosGrafico = categorias.map(cat => {
    const total = despesas
      .filter(d => (d.categoria || 'Geral') === cat)
      .reduce((acc, d) => acc + d.valor, 0);
    return { name: cat, value: total };
  });

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard Financeiro</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-100 p-4 rounded shadow text-green-700">
          <h3 className="font-semibold">Ganhos</h3>
          <p className="text-2xl font-bold">R$ {totalGanhos.toFixed(2)}</p>
        </div>
        <div className="bg-red-100 p-4 rounded shadow text-red-700">
          <h3 className="font-semibold">Despesas</h3>
          <p className="text-2xl font-bold">R$ {totalDespesas.toFixed(2)}</p>
        </div>
        <div className={`p-4 rounded shadow text-white ${saldo >= 0 ? 'bg-blue-600' : 'bg-red-600'}`}>
          <h3 className="font-semibold">Saldo</h3>
          <p className="text-2xl font-bold">R$ {saldo.toFixed(2)}</p>
        </div>
      </div>
      <h3 className="mb-2 font-semibold">Despesas por Categoria</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={dadosGrafico} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
              {dadosGrafico.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={CORES[index % CORES.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `R$ ${value.toFixed(2)}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
