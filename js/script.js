'use strict'

const title = document.getElementsByTagName('h1')[0]
const startBtn = document.getElementsByClassName('handler_btn')[0]
const resetBtn = document.getElementsByClassName('handler_btn')[1]
const addBtn = document.querySelector('.screen-btn')
const otherItemsPercent = document.querySelectorAll('.other-items.percent')
const otherItemsNumber = document.querySelectorAll('.other-items.number')
const inputType = document.querySelector('.rollback>*>input').getAttribute('type')
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
    rollback: 10,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    services: {},

    init: () => {
        appData.addTitle()
        startBtn.addEventListener('click', appData.start)
        addBtn.addEventListener('click', appData.addScreenBlock)
    },

    addTitle: () => {
        document.title = title.textContent
    },

    addScreens: () => {
        screens.forEach((item, idx) => {
            const select = item.querySelector('select')
            const input = item.querySelector('input')
            const name = select.options[select.selectedIndex].textContent
            appData.screens.push({ id: idx, name: name, price: +select.value * +input.value })
        })
    },

    addScreenBlock: () => {
        screens = document.querySelectorAll('.screen')
        const cloneScreen = screens[0].cloneNode(true)
        screens[screens.length - 1].after(cloneScreen)
    },

    asking: () => {
        let tmp
        do {
            tmp = prompt('Как называется ваш проект?', ' КаЛьКулятор Верстки')
        } while (appData.isNumber(tmp))
        appData.title = tmp
        for (let i = 0; i < 2; i++) {
            let screenName
            do {
                screenName = prompt('Какие типы экранов нужно разработать?')
            } while (appData.isNumber(screenName))
            do {
                tmp = prompt('Сколько будет стоить данная работа?')
                if (tmp === null) {
                    tmp = 0
                    break
                }
                tmp = tmp.trim()
            } while (!appData.isNumber(tmp))
            appData.screens.push({ id: i, name: screenName, price: +tmp })
        }

        appData.screenPrice = appData.screens.reduce((sum, screen) => {
            return sum + screen.price
        }, 0)

        appData.adaptive = confirm('Нужен ли адаптив на сайте?')

        for (let i = 0; i < 2; i++) {
            let serviceName
            do {
                serviceName = prompt('Какой дополнительный тип услуги нужен?')
            } while (appData.isNumber(serviceName))
            do {
                tmp = prompt('Сколько это будет стоить?', '1000')
                if (tmp === null) {
                    tmp = 0
                    break
                }
                tmp = tmp.trim()
            } while (!appData.isNumber(tmp))
            appData.services[`${serviceName}(${i + 1})`] = +tmp
        }
    },

    getAllServicePrices: () => {
        for (const key in appData.services) {
            appData.allServicePrices += appData.services[key]
        }
    },

    getFullPrice: () => {
        appData.fullPrice = appData.screenPrice + appData.allServicePrices
    },


    getServicePercentPrice: () => {
        appData.servicePercentPrice = Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback / 100)))
    },

    start: () => {
        appData.addScreens()
        // appData.asking()
        // appData.getAllServicePrices()
        // appData.getFullPrice()
        // appData.getServicePercentPrice()
    },
}

appData.init()
