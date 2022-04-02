const loader = document.querySelector('.loader');
const themeCircle = document.querySelector('.circle')
const themeBtn = document.querySelector('.nav__options--toggle-theme-btn')
const timer = document.querySelector('.timer')

const inputOne = document.querySelector('#input-money')
const inputResult = document.querySelector('#input-result')
const currencyChoiceOne = document.querySelector('#selectOne')
const currencyChoiceTwo = document.querySelector('#selectTwo')

const swapBtn = document.querySelector('.swap-btn')
const saveBtn = document.querySelector('.save-btn')
const result = document.querySelector('.result')

const historyArea = document.querySelector('.history-container__notes-area')
const emptyError = document.querySelector('.empty-error')
let cardID = 0
let cardAmount = 0
let currency1
let currency2
let date
let hour

// -----------------------------------------

const main = () => {
    events()
    calculate()
}

const events = () => {
    loaderLoading()
    dateCalculating()
    saveBtn.addEventListener('click', createElement)
    inputOne.addEventListener('input', calculate)
    currencyChoiceOne.addEventListener('change', calculate)
    swapBtn.addEventListener('click', swap)
    currencyChoiceTwo.addEventListener('change', calculate)
    themeBtn.addEventListener('click', () => {
        if (!themeCircle.classList.contains('dark-mode-transform')) {
            themeCircle.classList.add('dark-mode-transform')
        } else {
            themeCircle.classList.remove('dark-mode-transform')
        }

        if (document.body.getAttribute('data-theme') !== 'light') {
            document.body.setAttribute('data-theme', 'light')
        } else {
            document.body.setAttribute('data-theme', 'dark')
        }
    })
}


const createElement = () => {
    const historyNote = document.createElement('div')
    historyNote.classList.add('history-container__notes-area--note')
    historyArea.appendChild(historyNote)
    historyNote.setAttribute('id', cardID)

    historyNote.innerHTML = `
    <button class="delete-note-btn" onclick="deleteElement(${cardID})">
    <i class="uil uil-times"></i>
    </button>
    <div class="date-box">
    <p class="title">Date</p>
    <p class="nav__title-box--timer timer">${date}</p>
    <p class="timerHours">at ${hour}</p>
    </div>
    <p class="result">${inputOne.value} ${currency1} = ${inputResult.value} ${currency2}</p>
    `
    cardID++
    cardAmount++
    emptyChecker()
}

const deleteElement = (id) => {
    const newElement = document.getElementById(id)
    historyArea.removeChild(newElement)

    if (cardAmount !== 0) {
        cardAmount--
    }
    emptyChecker()
}

const emptyChecker = () => {
    if (cardAmount !== 0) {
        emptyError.style.display = 'none'
    } else {
        emptyError.style.display = 'flex'
    }
}


const loaderLoading = () => {
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.display = 'none';
        }, 800);
    });
};

const calculate = () => {
    fetch(`https://api.exchangerate.host/latest?base=${currencyChoiceOne.value}&symbols=${currencyChoiceTwo.value}`)
        .then(res => res.json())
        .then(data => {
            currency1 = currencyChoiceOne.value
            currency2 = currencyChoiceTwo.value
            const rate = data.rates[currency2]

            inputResult.value = (inputOne.value * rate).toFixed(2)
        })
}

const swap = () => {
    let oldValue = currencyChoiceOne.value
    currencyChoiceOne.value = currencyChoiceTwo.value
    currencyChoiceTwo.value = oldValue
    calculate()
}

const dateCalculating = () => {
    let today = new Date()
    date = today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear()
    hour = today.getHours() + ':' + (today.getMinutes())
    timer.textContent = date
}

document.addEventListener('DOMContentLoaded', main)