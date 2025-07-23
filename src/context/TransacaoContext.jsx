// src/context/TransacaoContext.js
import { createContext, useState, useContext, useEffect } from 'react';

const TransacaoContext = createContext();

export const TransacaoProvider = ({ children }) => {
  const [transacoes, setTransacoes] = useState(() => {
    const savedTransacoes = localStorage.getItem('transacoes');
    return savedTransacoes ? JSON.parse(savedTransacoes) : [];
  });

  const [filtros, setFiltros] = useState({ mes: '', categoria: '' });

  useEffect(() => {
    localStorage.setItem('transacoes', JSON.stringify(transacoes));
  }, [transacoes]);

  const calcularSaldo = () => {
    return transacoes.reduce((acc, trans) => {
      return trans.tipo === 'ganho' 
        ? acc + Number(trans.valor) 
        : acc - Number(trans.valor);
    }, 0);
  };

  const calcularTotais = () => {
    return transacoes.reduce((acc, trans) => {
      const valor = Number(trans.valor);
      if (trans.tipo === 'ganho') {
        acc.ganhos += valor;
      } else {
        acc.despesas += valor;
      }
      acc.saldo = acc.ganhos - acc.despesas;
      return acc;
    }, { ganhos: 0, despesas: 0, saldo: 0 });
  };

  const adicionarTransacao = (novaTransacao) => {
    const transacaoComId = {
      ...novaTransacao,
      id: Date.now(),
      valor: Number(novaTransacao.valor) // Garantindo que seja 'valor'
    };
    setTransacoes(prev => [...prev, transacaoComId]);
  };

  const removerTransacao = (id) => {
    setTransacoes(prev => prev.filter(t => t.id !== id));
  };

  const editarTransacao = (id, dadosAtualizados) => {
    setTransacoes(prev => prev.map(t => 
      t.id === id ? { ...t, ...dadosAtualizados } : t
    ));
  };

  const filtrarTransacoes = () => {
    return transacoes.filter(transacao => {
      const mesSelecionado = filtros.mes 
        ? new Date(transacao.data).getMonth() + 1 === parseInt(filtros.mes) 
        : true;
      const categoriaSelecionada = filtros.categoria 
        ? transacao.categoria === filtros.categoria 
        : true;
      return mesSelecionado && categoriaSelecionada;
    });
  };

  const getTransacoesPorCategoria = () => {
    return transacoes.reduce((acc, trans) => {
      const valor = trans.tipo === 'despesa' ? -trans.valor : trans.valor;
      acc[trans.categoria] = (acc[trans.categoria] || 0) + valor;
      return acc;
    }, {});
  };

  return (
    <TransacaoContext.Provider value={{
      transacoes,
      filtros,
      setFiltros,
      adicionarTransacao,
      removerTransacao,
      editarTransacao,
      filtrarTransacoes,
      calcularSaldo,
      calcularTotais,
      getTransacoesPorCategoria
    }}>
      {children}
    </TransacaoContext.Provider>
  );
};

export const useTransacoes = () => {
  const context = useContext(TransacaoContext);
  if (!context) {
    throw new Error('useTransacoes deve ser usado dentro de um TransacaoProvider');
  }
  return context;
};

export { TransacaoContext };