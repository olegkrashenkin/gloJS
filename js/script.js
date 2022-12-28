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
    cmsPercent: 0,

    init: function () {
        this.addTitle()

        addBtn.addEventListener('click', this.addScreenBlock)

        inputType.addEventListener('input', (event) => {
            this.rollback = +event.target.value
            span.textContent = `${event.target.value} %`
        })

        startBtn.addEventListener('mousedown', this.mouseDown.bind(this))

        resetBtn.addEventListener('click', () => {
            this.reset()
            this.showResult()
            this.screenEnabled()
        })

        cms.addEventListener('change', () => {
            this.addCms(cms.checked)
        })
    },

    addTitle: function () {
        document.title = title.textContent
    },

    addScreens: function () {
        screens = document.querySelectorAll('.screen')

        screens.forEach((item, idx) => {
            const select = item.querySelector('select')
            const input = item.querySelector('input')
            const name = select.options[select.selectedIndex].textContent
            const price = +select.value * +input.value

            this.screens.push({ id: idx, name: name, price: price, count: +input.value })
        })
    },

    addScreenBlock: function () {
        screens = document.querySelectorAll('.screen')
        const cloneScreen = screens[0].cloneNode(true)

        cloneScreen.querySelector('input').value = ''
        screens[screens.length - 1].after(cloneScreen)
    },

    addPrices: function () {
        for (let screen of this.screens) {
            this.screenPrice += +screen.price
            this.screensCount += screen.count
        }

        for (let key in this.servicesNumber) {
            this.servicePricesNumber += this.servicesNumber[key]
        }

        for (let key in this.servicesPercent) {
            this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100)
        }

        this.fullPrice = +this.screenPrice + this.servicePricesPercent + this.servicePricesNumber
        this.fullPrice = this.fullPrice + (this.fullPrice / 100 * this.cmsPercent)

        this.servicePercentPrice = Math.ceil(this.fullPrice - (this.fullPrice * (this.rollback / 100)))
    },

    addServises: function () {
        otherItemsPercent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]')
            const label = item.querySelector('label')
            const input = item.querySelector('input[type=text]')

            if (check.checked) this.servicesPercent[label.textContent] = +input.value
        })

        otherItemsNumber.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]')
            const label = item.querySelector('label')
            const input = item.querySelector('input[type=text]')

            if (check.checked) this.servicesNumber[label.textContent] = +input.value
        })
    },

    showResult: function () {
        screenPrice.value = this.screenPrice
        screenCount.value = this.screensCount
        servicePrices.value = this.servicePricesPercent + this.servicePricesNumber
        fullPrice.value = this.fullPrice
        totalPrice.value = this.servicePercentPrice
    },

    start: function () {
        this.addScreens()
        this.addServises()
        this.addPrices()
        this.showResult()
        this.screenDisabled()

        startBtn.removeEventListener('mouseup', this.mouseUp)
    },

    mouseDown: function () {
        screens = document.querySelectorAll('.screen')
        let isFull = []

        screens.forEach((item) => {
            const select = item.querySelector('select')
            const name = select.options[select.selectedIndex].textContent
            const price = +item.querySelector('input').value

            name === 'Тип экранов' || price == 0 ? isFull.push(false) : isFull.push(true)
        })

        if (!isFull.includes(false)) {
            startBtn.addEventListener('mouseup', this.mouseUp.bind(this))
        }
    },

    mouseUp: function () {
        inputType.addEventListener('input', () => {
            totalPrice.value = Math.ceil(this.fullPrice - (this.fullPrice * (this.rollback / 100)))
        })

        this.start()
    },

    screenDisabled: function () {
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

    screenEnabled: function () {
        screens = document.querySelectorAll('.screen')

        addBtn.disabled = false

        screens.forEach((item) => {
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

    reset: function () {
        this.title = ''
        this.screens = []
        this.screenPrice = 0
        this.adaptive = true
        this.rollback = 0
        this.servicePricesPercent = 0
        this.servicePricesNumber = 0
        this.fullPrice = 0
        this.servicePercentPrice = 0
        this.servicesPercent = {}
        this.servicesNumber = {}
        this.screensCount = 0
        this.cms = 0

        const cloneScreen = screens[0].cloneNode(true)

        cloneScreen.querySelector('input').value = ''

        screens.forEach((item) => item.remove())

        addBtn.before(cloneScreen)

        otherItemsPercent.forEach((item) => item.querySelector('input[type=checkbox]').checked = false)
        otherItemsNumber.forEach((item) => item.querySelector('input[type=checkbox]').checked = false)

        cms.checked = false

        inputType.value = '0'
        span.textContent = '0 %'

        this.addCms(false)
    },

    addCms: function (isChecked) {
        if (isChecked) {
            hiddenCmsVariants.style.display = 'flex'

            select.addEventListener('change', (event) => {
                switch (event.target.value) {
                    case '50':
                        hiddenInput.style.display = 'none'
                        this.cmsPercent = 50
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