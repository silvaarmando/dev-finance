const Modal = {
  open() {
    document
      .querySelector('.modal-overlay')
      .classList
      .add('active')
  },

  close() {
    document
      .querySelector('.modal-overlay')
      .classList
      .remove('active')
  }
}

const Transaction = {
  all: [
    {
      description: 'Luz',
      amount: -50000,
      date: '16/02/2021'
    },
    {
      description: 'Internet',
      amount: 500001,
      date: '16/02/2021'
    },
    {
      description: 'Água',
      amount: -20012,
      date: '16/02/2021'
    },
    {
      description: 'Site',
      amount: 200000,
      date: '16/02/2021'
    }
  ] 
,

  add(transaction) {
    Transaction.all.push(transaction)

    App.reload()
  },

  remove(index) {
    Transaction.all.splice(index, 1)

    App.reload()
  },

  incomes() {
    let income = 0;
    // Pegar todas as transações
    // Para cada transação
    Transaction.all.forEach(transaction => {
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
    Transaction.all.forEach(transaction => {
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
      },

  clearTransaction() {
    DOM.transactionContainer.innerHTML = ""
  }

}

const Utils = {
  formatAmount(value) {
    value = Number(value) * 100
    
    return value
  },

  formatDate(date) {
    const splittedDate = date.split("-")

    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
  },

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

const Form = {
  description: document.querySelector('input#description'),
  amount: document.querySelector('input#amount'),
  date: document.querySelector('input#date'),

  getValues() {
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value
    }
  },

  validateFields() {
    const { description, amount, date } = Form.getValues()

    if (
      description.trim() === '' ||
      amount.trim() === '' ||
      date.trim() === ''
    ) {
      throw new Error('Por favor, preencha todos os campos')
    }
  },

  validateValues() {
    let { description, amount, date } = Form.getValues()

    amount = Utils.formatAmount(amount)

    date = Utils.formatDate(date)

    return {
      description,
      amount,
      date
    }
  },


  clearFields() {
    Form.description.value = ""
    Form.amount.value = ""
    Form.date.value = ""
  },

  formatValues() {
    let { description, amount, date } = Form.getValues()

    amount = Utils.formatAmount(amount)

    date = Utils.formatDate(date)

    return {
      description,
      amount,
      date
    }
  },
 
  submit(event) {
    event.preventDefault()

    try {
      Form.validateFields()
      const transaction = Form.formatValues()
      Transaction.add(transaction)
      Form.clearFields()
      Modal.close()
    } catch (error) {
      alert(error.message)
    }
  }
}

const App = {
  init() {
    Transaction.all.forEach(transaction => {
      DOM.addTransaction(transaction)
    })
    DOM.updateBalance()  
  },

  reload() {
    DOM.clearTransaction()
    App.init()
  }
}

App.init()
