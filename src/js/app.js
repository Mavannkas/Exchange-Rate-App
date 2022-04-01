// STORED ITEMS
const loader = document.querySelector('.loader');
const swapBtn = document.querySelector('.main__app-body--swap-btn')
const clearBtn = document.querySelector('.main__app-body--clear-btn')
const inputOne = document.querySelector('#amount-one')
const inputTwo = document.querySelector('#amount-two')
const selectOne = document.querySelector('#currency-one')
const selectTwo = document.querySelector('#currency-two')
const result = document.querySelector('.main__app-body--rate-info')
const inputs = [selectOne, selectTwo]

// GLOBAL FUNCTIONS
const main = () => {
    events()
}

const events = () => {
    loaderLoading()
    inputs.forEach(i => {
        i.addEventListener('focusin', () => {
            i.style.borderRadius = '1rem 1rem 0 0'
        })
        i.addEventListener('focusout', () => {
            i.style.borderRadius = '1rem'
        })
    })
    clearBtn.addEventListener('click', clearingForm)
    swapBtn.addEventListener('click', swap)
    inputOne.addEventListener('input', calculate)
    selectOne.addEventListener('input', calculate)
    selectTwo.addEventListener('input', calculate)
    calculate()
}

// APP FUNCTIONS
const loaderLoading = () => {
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.display = 'none';
        }, 800);
    });
};

const calculate = () => {
    fetch(`https://api.exchangerate.host/latest?base=${selectOne.value}&symbols=${selectTwo.value}`)
        .then(res => res.json())
        .then(data => {
            const currencyOne = selectOne.value
            const currencyTwo = selectTwo.value
            const rate = data.rates[currencyTwo]

            result.style.display = 'flex'

            result.textContent = `${inputOne.value} ${currencyOne} = ${(inputOne.value * rate).toFixed(3)} ${currencyTwo}`

            inputTwo.value = (inputOne.value * rate).toFixed(2)

        })
}

const clearingForm = () => {
    inputOne.value = '1'
    selectOne.value = 'PLN'
    selectTwo.value = 'EUR'
    calculate()
}

const swap = () => {
    let two = selectOne.value
    selectOne.value = selectTwo.value
    selectTwo.value = two
    calculate()
}

// MAIN LISTENING
document.addEventListener('DOMContentLoaded', main)