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
      amount: 500000,
      date: '16/02/2021'
    },
    {
      id: 3,
      description: 'Água',
      amount: -20000,
      date: '16/02/2021'
    },
    {
      id: 4,
      description: 'Site',
      amount: 2000000,
      date: '16/02/2021'
    }
  ]

  // 1° Somar as entradas
  // 2° Somar as saídas
  // 3° Subtrair das entradas o valor das saídas
  // 4° Atribuir o total
  const Transaction = {
    incomes() {  
      // Somar as entradas
    },

    expenses() {
      // Somar as saídas
    },

    total() {
      // incomes - expenses
    }
  }

  // Substituir os dados do HTML com os dados do JS.

  const DOM = {
    transactionContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
      const tr = document.createElement('tr')
      tr.innerHTML = DOM.innerHTMLTransaction(transaction)

      DOM.transactionContainer.appendChild(tr)
    },

    innerHTMLTransaction(transaction) {
      const CSSclass = transaction.amount > 0 ? "income" : "expense"


      const html = `
      <td 
        class="description"
      > 
        ${transaction.description}
      </td>
      <td 
        class={CSSclass}
      >
        ${transaction.amount}
      </td>
      <td class="date">
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
    }
  }

transactions.forEach(function(transaction) {
  DOM.addTransaction(transaction)
})