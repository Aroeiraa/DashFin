import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import NovaTransacaoForm from './components/NovaTransacaoForm';
import ListaTransacoes from './components/ListaTransacoes';
import Header from './components/Header';
import { TransacaoProvider } from './context/TransacaoContext';

function App() {
  return (
    <TransacaoProvider>
      <BrowserRouter>
        <Header />
        <nav className="bg-gray-100 p-2 max-w-4xl mx-auto flex gap-4 mb-6">
          <Link to="/" className="text-indigo-600 hover:underline">Dashboard</Link>
          <Link to="/transacoes" className="text-indigo-600 hover:underline">Transações</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/transacoes"
            element={
              <div className="max-w-4xl mx-auto p-4">
                <h2 className="text-2xl font-bold mb-4">Minhas Transações</h2>
                <NovaTransacaoForm />
                <ListaTransacoes />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </TransacaoProvider>
  );
}

export default App;
