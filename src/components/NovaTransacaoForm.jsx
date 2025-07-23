import React, { useState } from 'react';
import { useTransacoes } from '../context/TransacaoContext';

const CATEGORIAS = [
  'Alimentação',
  'Moradia',
  'Transporte',
  'Saúde',
  'Lazer',
  'Educação',
  'Financeiro',
  'Trabalho',
  'Outros',
];

export default function NovaTransacaoForm() {
  const { adicionarTransacao } = useTransacoes();

  const [form, setForm] = useState({
    valor: '',
    tipo: 'despesa',
    categoria: CATEGORIAS[0], // Categoria inicial pré-selecionada
    data: new Date().toISOString().slice(0, 10),
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.valor) return alert('Preencha os campos obrigatórios.');

    adicionarTransacao({ ...form, valor: parseFloat(form.valor) });

    setForm({
      valor: '',
      tipo: 'despesa',
      categoria: CATEGORIAS[0],
      data: new Date().toISOString().slice(0, 10),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4 grid grid-cols-1 md:grid-cols-5 gap-2 items-end mb-6">
      <input
        name="valor"
        value={form.valor}
        onChange={handleChange}
        type="number"
        placeholder="Valor"
        className="border rounded p-2"
        required
      />
      <select name="tipo" value={form.tipo} onChange={handleChange} className="border rounded p-2">
        <option value="despesa">Despesa</option>
        <option value="ganho">Ganho</option>
      </select>
      <select name="categoria" value={form.categoria} onChange={handleChange} className="border rounded p-2">
        {CATEGORIAS.map((categoria) => (
          <option key={categoria} value={categoria}>
            {categoria}
          </option>
        ))}
      </select>
      <input
        name="data"
        value={form.data}
        onChange={handleChange}
        type="date"
        className="border rounded p-2"
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white rounded p-2 hover:bg-indigo-700 transition"
      >
        Adicionar
      </button>
    </form>
  );
}
