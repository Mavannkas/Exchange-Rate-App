const loader = document.querySelector('.loader');
const themeCircle = document.querySelector('.circle')
const themeBtn = document.querySelector('.nav__options--toggle-theme-btn')
const timer = document.querySelector('.timer')

const inputOne = document.querySelector('#input-money')
const inputResult = document.querySelector('#input-result')
const currencyChoiceOne = document.querySelector('#selectOne')
const currencyChoiceTwo = document.querySelector('#selectTwo')

const swapBtn = document.querySelector('.swap-btn')
const swapArrow = document.querySelector('.swap-arrow')
const saveBtn = document.querySelector('.save-btn')
const result = document.querySelector('.result')
const errorMsg = document.querySelector('.container__error-msg')

const historyArea = document.querySelector('.history-container__notes-area')
const emptyError = document.querySelector('.empty-error')
const clearHistoryBtn = document.querySelector('.history-container__clear-all-btn')

let cardID = 0
let cardAmount = 0
let currency1
let currency2
let date
let hour

let show
let hide
let checkValues

const main = () => {
    events()
    calculate()
}

const events = () => {
    loaderLoading()
    dateCalculating()
    saveBtn.addEventListener('click', () => {
        if (inputOne.value === '' || inputOne.value === '0') {
            anime({
                targets: '.container__error-msg',
                duration: 60,
                translateX: [
                    { value: 60, duration: 60 },
                    { value: -30, duration: 60 },
                    { value: 0, duration: 60 }
                ]
            });
            errorMsg.style.display = 'flex'
            errorMsg.style.opacity = '1'
        } else {
            errorMsg.style.display = 'none'
            errorMsg.style.opacity = '0'
            createElement()
        }
    })
    inputOne.addEventListener('input', calculate)
    swapBtn.addEventListener('click', () => {
        swap()
        swapArrow.classList.toggle('icon-rotate')
    })
    currencyChoiceOne.addEventListener('change', () => {
        calculate()
        checkIfTheSame()
        checkValues()
    })
    currencyChoiceTwo.addEventListener('change', () => {
        calculate()
        checkIfTheSame()
        checkValues()
    })

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
    clearHistoryBtn.addEventListener('click', () => {
        historyArea.textContent = ''
        cardID = 0
        cardAmount = 0
        emptyChecker()
        showClearBtn()
    })
}

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
    showClearBtn()
}

const deleteElement = (id) => {
    const newElement = document.getElementById(id)
    historyArea.removeChild(newElement)

    if (cardAmount !== 0) {
        cardAmount--
        cardID--
    }
    emptyChecker()
    showClearBtn()
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
        }, 1000);
    });
};

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

const checkIfTheSame = () => {
    show = () => {
        saveBtn.style.pointerEvents = 'all'
        saveBtn.style.opacity = '1'
        swapBtn.style.pointerEvents = 'all'
        swapBtn.style.opacity = '1'
    }
    hide = () => {
        saveBtn.style.pointerEvents = 'none'
        saveBtn.style.opacity = '0.5'
        swapBtn.style.pointerEvents = 'none'
        swapBtn.style.opacity = '0.5'
    }

    if (currencyChoiceOne.value === currencyChoiceTwo.value) {
        hide()
    } else {
        show()
    }
}

const showClearBtn = () => {
    if (cardAmount !== 0) {
        clearHistoryBtn.style.visibility = 'visible'
        clearHistoryBtn.style.opacity = '1'
    } else {
        clearHistoryBtn.style.visibility = 'hidden'
        clearHistoryBtn.style.opacity = '0'
    }

}

ScrollReveal({
    reset: false,
    distance: '180px',
    duration: 1500
})

ScrollReveal().reveal('.scroll-box1', { delay: 1100, origin: 'left' })
ScrollReveal().reveal('.nav__title-box--line', { delay: 1300, origin: 'left' })
ScrollReveal().reveal('.scroll-box2', { delay: 1600, origin: 'left' })
ScrollReveal().reveal('.nav__options', { delay: 1700, origin: 'left' })
ScrollReveal().reveal('.container', { delay: 1800, origin: 'left' })
ScrollReveal().reveal('.history-container', { delay: 2000, origin: 'left' })

document.addEventListener('DOMContentLoaded', main)