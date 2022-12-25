'use strict'

const title = document.getElementsByTagName('h1')[0]
const startBtn = document.getElementsByClassName('handler_btn')[0]
const resetBtn = document.getElementsByClassName('handler_btn')[1]

const addBtn = document.querySelector('.screen-btn')

const otherItemsPercent = document.querySelectorAll('.other-items.percent')
const otherItemsNumber = document.querySelectorAll('.other-items.number')

const cms = document.getElementById('cms-open')
const hiddenCmsVariants = document.querySelector('.hidden-cms-variants')
const hiddenInput = hiddenCmsVariants.querySelector('.main-controls__input')
const select = document.getElementById('cms-select')

const inputType = document.querySelector('.rollback>*>input')
const span = document.querySelector('.rollback>*>.range-value')

const screenPrice = document.getElementsByClassName('total-input')[0]
const screenCount = document.getElementsByClassName('total-input')[1]
const servicePrices = document.getElementsByClassName('total-input')[2]
const fullPrice = document.getElementsByClassName('total-input')[3]
const totalPrice = document.getElementsByClassName('total-input')[4]

let screens = document.querySelectorAll('.screen')

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    rollback: 0,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    servicesPercent: {},
    servicesNumber: {},
    screensCount: 0,

    init: () => {
        appData.addTitle()
        addBtn.addEventListener('click', appData.addScreenBlock)

        inputType.addEventListener('input', (event) => {
            appData.rollback = +event.target.value
            span.textContent = `${event.target.value} %`
        })

        startBtn.addEventListener('mousedown', appData.mouseDown)

        resetBtn.addEventListener('click', () => {
            appData.reset()
            appData.showResult()
            appData.screenEnabled()
        })

        cms.addEventListener('change', () => {
            appData.addCms(cms.checked)
        })
        // console.log(this);
    },

    addTitle: () => {
        document.title = title.textContent
    },

    addScreens: () => {
        screens = document.querySelectorAll('.screen')

        screens.forEach((item, idx) => {
            const select = item.querySelector('select')
            const input = item.querySelector('input')
            const name = select.options[select.selectedIndex].textContent
            const price = +select.value * +input.value

            appData.screens.push({ id: idx, name: name, price: price, count: +input.value })
        })
    },

    addScreenBlock: () => {
        screens = document.querySelectorAll('.screen')
        const cloneScreen = screens[0].cloneNode(true)

        cloneScreen.querySelector('input').value = ''
        screens[screens.length - 1].after(cloneScreen)
    },

    addPrices: () => {
        for (let screen of appData.screens) {
            appData.screenPrice += +screen.price
            appData.screensCount += screen.count
        }

        for (let key in appData.servicesNumber) {
            appData.servicePricesNumber += appData.servicesNumber[key]
        }

        for (let key in appData.servicesPercent) {
            appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100)
        }

        appData.fullPrice = +appData.screenPrice + appData.servicePricesPercent + appData.servicePricesNumber
        appData.servicePercentPrice = Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback / 100)))
    },

    addServises: () => {
        otherItemsPercent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]')
            const label = item.querySelector('label')
            const input = item.querySelector('input[type=text]')

            if (check.checked) appData.servicesPercent[label.textContent] = +input.value
        })

        otherItemsNumber.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]')
            const label = item.querySelector('label')
            const input = item.querySelector('input[type=text]')

            if (check.checked) appData.servicesNumber[label.textContent] = +input.value
        })
    },

    showResult: () => {
        screenPrice.value = appData.screenPrice
        screenCount.value = appData.screensCount
        servicePrices.value = appData.servicePricesPercent + appData.servicePricesNumber
        fullPrice.value = appData.fullPrice
        totalPrice.value = appData.servicePercentPrice
    },

    start: () => {
        appData.addScreens()
        appData.addServises()
        appData.addPrices()
        appData.showResult()
        // console.log(appData)
        appData.screenDisabled()

        startBtn.removeEventListener('mouseup', appData.mouseUp)
    },

    mouseDown: () => {
        screens = document.querySelectorAll('.screen')
        let isFull = []

        screens.forEach((item) => {
            const select = item.querySelector('select')
            const name = select.options[select.selectedIndex].textContent
            const price = +item.querySelector('input').value

            name === 'Тип экранов' || price == 0 ? isFull.push(false) : isFull.push(true)
        })

        if (!isFull.includes(false)) {
            startBtn.addEventListener('mouseup', appData.mouseUp)
        }
    },

    mouseUp: () => {
        inputType.addEventListener('input', () => {
            totalPrice.value = Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback / 100)))
        })
        appData.start()
    },

    screenDisabled: () => {
        addBtn.disabled = true

        screens.forEach((item) => {
            item.querySelector('select').disabled = true
            item.querySelector('input').disabled = true
        })

        otherItemsNumber.forEach((item) => {
            item.querySelector('input[type=checkbox]').disabled = true
            item.querySelector('input[type=text]').disabled = true
        })

        otherItemsPercent.forEach((item) => {
            item.querySelector('input[type=checkbox]').disabled = true
            item.querySelector('input[type=text]').disabled = true
        })

        cms.disabled = true
        select.disabled = true
        hiddenInput.querySelector('#cms-other-input').disabled = true

        startBtn.style.display = 'none'
        resetBtn.style.display = 'block'
    },

    screenEnabled: () => {
        addBtn.disabled = false

        screens.forEach((item) => {
            console.log('hello');
            item.querySelector('select').disabled = false
            item.querySelector('input').disabled = false
        })

        otherItemsNumber.forEach((item) => {
            item.querySelector('input[type=checkbox]').disabled = false
            item.querySelector('input[type=text]').disabled = false
        })

        otherItemsPercent.forEach((item) => {
            item.querySelector('input[type=checkbox]').disabled = false
            item.querySelector('input[type=text]').disabled = false
        })

        cms.disabled = false
        select.disabled = false
        hiddenInput.querySelector('#cms-other-input').disabled = false

        startBtn.style.display = 'block'
        resetBtn.style.display = 'none'
    },

    reset: () => {
        appData.title = ''
        appData.screens = []
        appData.screenPrice = 0
        appData.adaptive = true
        appData.rollback = 0
        appData.servicePricesPercent = 0
        appData.servicePricesNumber = 0
        appData.fullPrice = 0
        appData.servicePercentPrice = 0
        appData.servicesPercent = {}
        appData.servicesNumber = {}
        appData.screensCount = 0

        const cloneScreen = screens[0].cloneNode(true)

        cloneScreen.querySelector('input').value = ''

        screens.forEach((item) => item.remove())
        addBtn.before(cloneScreen)

        otherItemsPercent.forEach((item) => item.querySelector('input[type=checkbox]').checked = false)
        otherItemsNumber.forEach((item) => item.querySelector('input[type=checkbox]').checked = false)

        cms.checked = false

        inputType.value = '0'
        span.textContent = '0 %'

        appData.addCms(false)
    },

    addCms: (isChecked) => {
        if (isChecked) {
            hiddenCmsVariants.style.display = 'flex'

            select.addEventListener('change', (event) => {
                switch (event.target.value) {
                    case '50':
                        hiddenInput.style.display = 'none'
                        //! Расчет общей стоимости работ
                        break;

                    case 'other':
                        hiddenInput.style.display = 'flex'
                        break;

                    default:
                        hiddenInput.style.display = 'none'
                        break;
                }
            })
        } else {
            hiddenInput.style.display = 'none'
            hiddenCmsVariants.style.display = 'none'
            hiddenInput.querySelector('#cms-other-input').value = ''
            select.value = ''
        }
    }
}

appData.init()