const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
function clear() {
  currentOperandTextElement.textContent=''
  previousOperandTextElement.textContent=''
    //this.operation = undefined
  }

  function deleteNum() {
    currentOperandTextElement.textContent= currentOperandTextElement.textContent.toString().slice(0, -1)
  }

  function appendNumber(number) {
    if (number === '.' && currentOperandTextElement.textContent.includes('.')) return
    currentOperandTextElement.textContent = currentOperandTextElement.textContent.toString() + number.toString()
  }

  function chooseOperation(operation) {
    if (currentOperandTextElement.textContent === '') return
    if (previousOperandTextElement.textContent !== '') {
      compute(operation)
    }
    this.operation = operation
    previousOperandTextElement.textContent = currentOperandTextElement.textContent
    currentOperandTextElement.textContent = ''
  }

  function compute(operation,previousNum,currentNum) {
    let computation
    const prev = parseFloat(previousNum.slice(0,-1))
    const current = parseFloat(currentNum)
    if (isNaN(prev) || isNaN(current)) return
    switch (operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    currentOperandTextElement.textContent = computation
    //operation = undefined
    previousOperandTextElement.textContent=''
  }

  /*function getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }*/

  /*function updateDisplay() {
    currentOperandTextElement.textContent =
      getDisplayNumber(currentOperandTextElement.textContent)
    if (this.operation != null) {
      previousOperandTextElement.textContent =
        `${getDisplayNumber(previousOperandTextElement.textContent)} ${this.operation}`
    } else {
      previousOperandTextElement.textContent = ''
    }
  }*/

numberButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    currentOperandTextElement.textContent+=e.target.textContent;
  })
})
let operationBut;
operationButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    operationBut=e.target.textContent;
    previousOperandTextElement.textContent+=operationBut;
    console.log(e.target.textContent);
  })
})

equalsButton.addEventListener('click', button => {
  compute(operationBut,previousOperandTextElement.textContent,currentOperandTextElement.textContent);
})

allClearButton.addEventListener('click', button => {
  clear();
})

deleteButton.addEventListener('click', button => {
  deleteNum();
})