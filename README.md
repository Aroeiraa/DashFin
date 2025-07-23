# 💰 DashFin - Dashboard Financeiro Pessoal

**DashFin** é um aplicativo web que ajuda você a gerenciar suas finanças de forma **simples, intuitiva e visual**. Acompanhe seus ganhos, despesas, metas e saldo através de gráficos interativos e filtros personalizados.

---

## ✨ Funcionalidades

- 🔄 **CRUD de Transações**  
  Adicione, edite e remova transações de ganhos ou despesas.

- 📊 **Gráficos Interativos**  
  Visualize suas finanças com gráficos de pizza organizados por categoria.

- 🎯 **Filtros Avançados**  
  Filtre por mês e ano, ou limpe os filtros para visualizar tudo novamente.

- 🧾 **Resumo Financeiro**  
  Veja um resumo com total de ganhos, despesas e o saldo atual.

---

## 🛠️ Tecnologias Utilizadas

- ⚛️ **React** — Interface moderna e responsiva
- 🎨 **Tailwind CSS** — Estilização rápida e elegante
- 📈 **Recharts** — Gráficos bonitos e responsivos
- 💾 **LocalStorage / JSON Server** — Persistência de dados local e fake API REST

---

## 🔌 Back-end com JSON Server

O projeto usa um arquivo `db.json` como banco de dados local e um servidor simulado com o **json-server**.

### ➤ Instalar o JSON Server

```bash
npm install -g json-server
json-server --watch db.json --port 3001
