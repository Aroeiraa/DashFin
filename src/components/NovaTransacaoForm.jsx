import React, { useState } from 'react';
import { useTransacoes } from '../context/TransacaoContext';

export default function NovaTransacaoForm() {
  const { adicionarTransacao } = useTransacoes();

  const [form, setForm] = useState({
    nome: '',
    valor: '',
    tipo: 'despesa',
    categoria: '',
    data: new Date().toISOString().slice(0, 10),
  });

  function handleChange(e) {
    setForm({...form, [e.target.name]: e.target.value});
  }

  function handleSubmit(e) {
    e.preventDefault();

    if(!form.nome || !form.valor) return alert('Preencha os campos obrigatórios.');

    adicionarTransacao({...form, valor: parseFloat(form.valor)});

    setForm({
      nome: '',
      valor: '',
      tipo: 'despesa',
      categoria: '',
      data: new Date().toISOString().slice(0, 10),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4 grid grid-cols-1 md:grid-cols-5 gap-2 mb-6">
      <input
        name="nome"
        value={form.nome}
        onChange={handleChange}
        placeholder="Descrição"
        className="border rounded p-2"
        required
      />
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
        <option value="Ganho">Ganho</option>
      </select>
      <input
        name="categoria"
        value={form.categoria}
        onChange={handleChange}
        placeholder="Categoria"
        className="border rounded p-2"
      />
      <input
        name="data"
        value={form.data}
        onChange={handleChange}
        type="date"
        className="border rounded p-2"
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white rounded p-2 hover:bg-indigo-700 transition col-span-full md:col-span-1"
      >
        Adicionar
      </button>
    </form>
  );
}
