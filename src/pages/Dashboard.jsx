import React, { useState } from 'react';
import { useTransacoes } from '../context/TransacaoContext';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CORES_DESPESAS = ['#FF5733', '#FF8D1A', '#4adda7ff', '#C70039', '#0c9064ff', '#12a935ff'];
const CORES_GANHOS = ['#33ccffff', '#5aa2c8ff', '#00FFC3', '#39C700', '#1940a5ff', '#ac2f3dff'];

export default function Dashboard() {
  const { transacoes } = useTransacoes();
  const [filtroMes, setFiltroMes] = useState('');
  const [filtroAno, setFiltroAno] = useState(new Date().getFullYear().toString()); // Ano atual como padrão

  const filtrarPorMesEAno = (transacoes) => {
    return transacoes.filter(t => {
      const data = new Date(t.data);
      const mesValido = filtroMes ? data.getMonth() + 1 === parseInt(filtroMes) : true;
      const anoValido = filtroAno ? data.getFullYear() === parseInt(filtroAno) : true;
      return mesValido && anoValido;
    });
  };

  const limparFiltros = () => {
    setFiltroMes('');
    setFiltroAno(new Date().getFullYear().toString());
  };

  const ganhos = filtrarPorMesEAno(transacoes.filter(t => t.tipo === 'ganho'));
  const despesas = filtrarPorMesEAno(transacoes.filter(t => t.tipo === 'despesa'));

  const totalGanhos = ganhos.reduce((acc, t) => acc + Number(t.valor), 0);
  const totalDespesas = despesas.reduce((acc, t) => acc + Number(t.valor), 0);
  const saldo = totalGanhos - totalDespesas;

  // Dados para gráfico de despesas por categoria
  const categoriasDespesas = [...new Set(despesas.map(d => d.categoria || 'Geral'))];
  const dadosGraficoDespesas = categoriasDespesas.map(cat => {
    const total = despesas
      .filter(d => (d.categoria || 'Geral') === cat)
      .reduce((acc, d) => acc + d.valor, 0);
    return { name: cat, value: total };
  });

  // Dados para gráfico de ganhos por categoria
  const categoriasGanhos = [...new Set(ganhos.map(g => g.categoria || 'Geral'))];
  const dadosGraficoGanhos = categoriasGanhos.map(cat => {
    const total = ganhos
      .filter(g => (g.categoria || 'Geral') === cat)
      .reduce((acc, g) => acc + Number(g.valor), 0);
    return { name: cat, value: total };
  });

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard Financeiro</h2>

      {/* Filtros por mês e ano */}
      <div className="mb-4 flex gap-4 items-end">
        <div>
          <label className="block font-semibold mb-1">Mês</label>
          <select
            value={filtroMes}
            onChange={(e) => setFiltroMes(e.target.value)}
            className="border rounded p-2"
          >
            <option value="">Todos</option>
            <option value="1">Janeiro</option>
            <option value="2">Fevereiro</option>
            <option value="3">Março</option>
            <option value="4">Abril</option>
            <option value="5">Maio</option>
            <option value="6">Junho</option>
            <option value="7">Julho</option>
            <option value="8">Agosto</option>
            <option value="9">Setembro</option>
            <option value="10">Outubro</option>
            <option value="11">Novembro</option>
            <option value="12">Dezembro</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1">Ano</label>
          <input
            type="number"
            value={filtroAno}
            onChange={(e) => setFiltroAno(e.target.value)}
            placeholder="Ex: 2023"
            className="border rounded p-2"
          />
        </div>
        <button
          onClick={limparFiltros}
          className="bg-gray-200 text-gray-700 rounded p-2 hover:bg-gray-300 transition"
        >
          Limpar Filtros
        </button>
      </div>

      {/* Resumo e gráficos */}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gráfico de Despesas */}
        <div>
          <h3 className="mb-2 font-semibold">Despesas por Categoria</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={dadosGraficoDespesas} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
                  {dadosGraficoDespesas.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CORES_DESPESAS[index % CORES_DESPESAS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `R$ ${value.toFixed(2)}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico de Ganhos */}
        <div>
          <h3 className="mb-2 font-semibold">Ganhos por Categoria</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={dadosGraficoGanhos} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
                  {dadosGraficoGanhos.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CORES_GANHOS[index % CORES_GANHOS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `R$ ${value.toFixed(2)}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
