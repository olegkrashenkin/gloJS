'use strict'

const appData = {
    title: '',
    screens: '',
    screenPrice: 0,
    adaptive: true,
    rollback: 10,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    service1: '',
    service2: '',

    asking: () => {
        let tmp
        appData.title = prompt('Как называется ваш проект?', ' КаЛьКулятор Верстки')
        appData.screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные')
        do {
            tmp = prompt('Сколько будет стоить данная работа?', '12000')
            if (tmp === null) {
                tmp = 0
                break
            }
            tmp = tmp.trim()
        } while (!appData.isNumber(tmp))
        appData.screenPrice = +tmp
        appData.adaptive = confirm('Нужен ли адаптив на сайте?')
    },

    isNumber: (num) => {
        return !isNaN(parseFloat(num)) && isFinite(num)
    },

    getAllServicePrices: () => {
        let tmp
        let result = 0
        for (let i = 0; i < 2; i++) {
            i === 0
                ? appData.service1 = prompt('Какой дополнительный тип услуги нужен?')
                : appData.service2 = prompt('Какой дополнительный тип услуги нужен?')
            do {
                tmp = prompt('Сколько это будет стоить?', '1000')
                if (tmp === null) {
                    tmp = 0
                    break
                }
                tmp = tmp.trim()
            } while (!appData.isNumber(tmp))
            result += +tmp
        }
        return result
    },

    getFullPrice: (screenPrice, allServicePrices) => {
        return screenPrice + allServicePrices
    },

    getTitle: (title) => {
        return title.trim()[0].toUpperCase() + title.trim().slice(1).toLowerCase()
    },

    getServicePercentPrices: (fullPrice, rollback) => {
        return Math.ceil(fullPrice - (fullPrice * (rollback / 100)))
    },

    getRollbackMessage: (price) => {
        if (price <= 0) {
            return 'Что то пошло не так'
        } else if (price <= 15000) {
            return 'Скидка не предусмотрена'
        } else if (price <= 30000) {
            return 'Даем скидку в 5%'
        } else {
            return 'Даем скидку в 10%'
        }
    },

    start: () => {
        appData.asking()
        appData.allServicePrices = appData.getAllServicePrices()
        appData.fullPrice = appData.getFullPrice(appData.screenPrice, appData.allServicePrices)
        appData.servicePercentPrice = appData.getServicePercentPrices(appData.fullPrice, appData.rollback)
        appData.title = appData.getTitle(appData.title)
        appData.logger()
    },

    logger: () => {
        for (const key in appData) {
            console.log(`${key}: ${appData[key]}`)
        }
    },
}

appData.start()
