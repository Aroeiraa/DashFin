import React from 'react';
import { useTransacoes } from '../context/TransacaoContext';

export default function ListaTransacoes() {
  const { transacoes, removerTransacao, loading } = useTransacoes();

  if(loading) return <p className="text-center">Carregando...</p>;

  return (
    <div className="max-w-4xl mx-auto">
      {transacoes.length === 0 && <p>Nenhuma transação cadastrada.</p>}
      <ul>
        {transacoes.map(t => (
          <li key={t.id} className="flex justify-between items-center border-b p-2">
            <div>
              <p className="font-semibold">{t.nome} <span className="text-sm text-gray-500">({t.categoria || 'Geral'})</span></p>
              <small className="text-gray-500">{t.data}</small>
            </div>
            <div className={`font-bold ${t.tipo === 'despesa' ? 'text-red-600' : 'text-green-600'}`}>
              R$ {Number(t.valor).toFixed(2)}
              <button
                onClick={() => removerTransacao(t.id)}
                className="ml-4 text-sm text-gray-400 hover:text-red-600"
                title="Remover"
              >
                ✖
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
