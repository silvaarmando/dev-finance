const Modal = {
    open() {
      // Abrir Model 
      // Adicionar a class active ao modal
      document
        .querySelector('.modal-overlay')
        .classList
        .add('active')
    },

    close() {
      // Fechar o modal
      // Remover a class active do modal
      document
        .querySelector('.modal-overlay')
        .classList
        .remove('active')
    }
  }

  const transactions = [
    {
      id: 1,
      description: 'Luz',
      amount: -50000,
      date: '16/02/2021'
    },
    {
      id: 2,
      description: 'Internet',
      amount: 500001,
      date: '16/02/2021'
    },
    {
      id: 3,
      description: 'Água',
      amount: -20012,
      date: '16/02/2021'
    },
    {
      id: 4,
      description: 'Site',
      amount: 200000,
      date: '16/02/2021'
    }
  ]

  // 1° Somar as entradas
  // 2° Somar as saídas
  // 3° Subtrair das entradas o valor das saídas
  // 4° Atribuir o total

  const Transaction = {
    incomes() {
      let income = 0;
      // Pegar todas as transações
      // Para cada transação
      transactions.forEach(transaction => {
        // Se ela for maior que zero
        if (transaction.amount > 0) {
          // Somar a uma variavel e retornar a variavel
          income += transaction.amount;
        }
      })

      return income;
    },

    expenses() {
      let expense = 0;
      // Pegar todas as transações
      // Para cada transação
      transactions.forEach(transaction => {
        // sE ela for menor que zero
        if (transaction.amount < 0) {
          // Subtrair a uma variavel e retornar a variavel
          expense += transaction.amount
        }
      })

      return expense;
    },

    total() {
      // incomes - expenses
      return Transaction.incomes() + Transaction.expenses();
    }
  }

  // Substituir os dados do HTML com os dados do JS.

const DOM = {
  transactionContainer: document.querySelector('#data-table tbody'),

  addTransaction(transaction, index) {
    const tr = document.createElement('tr')
    tr
      .innerHTML = DOM
        .innerHTMLTransaction(transaction)

    DOM
      .transactionContainer
        .appendChild(tr)
  },

  innerHTMLTransaction(transaction) {
    const CSSclass = transaction
      .amount > 0 ? "income" : "expense"

    const amount = Utils
      .formatCurrency(transaction.amount)
    const html = `
    <td 
      class="description"
    > 
      ${transaction.description}
    </td>
    <td 
      class=${CSSclass}
    >
      ${amount}
    </td>
    <td 
      class="date"
    >
      ${transaction.date}
    </td>
    <td>
      <img
        src="./assets/minus.svg"
        alt="Remover Transação"
      >
    </td>
    `

    return html
  },

  updateBalance() {
    document
      .getElementById('incomeDisplay')
      .innerHTML = Utils
        .formatCurrency(
          Transaction.incomes()
        )

    document
      .getElementById('expenseDisplay')
      .innerHTML = Utils
        .formatCurrency(
          Transaction.expenses()
        )
    
      document
      .getElementById('totalDisplay')
      .innerHTML = Utils
        .formatCurrency(
          Transaction.total()
        )
    }
  }

const Utils = {
  formatCurrency(value) {
    const signal = Number(value) < 0 ? "-" : ""

    value = String(value)
      .replace(/\D/g , "")

    value = Number(value) / 100

    value = value
      .toLocaleString(
        "pt-BR", {
          style: "currency",
          currency: "BRL"
    })

    return signal + value
  }
}

transactions
  .forEach(
    function(transaction) {
      DOM
        .addTransaction(transaction)
})

DOM.updateBalance()