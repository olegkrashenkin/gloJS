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
    services: {},

    asking: () => {
        let tmp
        appData.title = prompt('Как называется ваш проект?', ' КаЛьКулятор Верстки')
        appData.screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные')
        do {
            tmp = prompt('Сколько будет стоить данная работа?', '20000')
            if (tmp === null) {
                tmp = 0
                break
            }
            tmp = tmp.trim()
        } while (!appData.isNumber(tmp))
        appData.screenPrice = +tmp
        appData.adaptive = confirm('Нужен ли адаптив на сайте?')
        for (let i = 0; i < 2; i++) {
            let serviceName = prompt('Какой дополнительный тип услуги нужен?')
            do {
                tmp = prompt('Сколько это будет стоить?', '1000')
                if (tmp === null) {
                    tmp = 0
                    break
                }
                tmp = tmp.trim()
            } while (!appData.isNumber(tmp))
            appData.services[`${serviceName}${i + 1}`] = +tmp
        }
    },

    isNumber: (num) => {
        return !isNaN(parseFloat(num)) && isFinite(num)
    },

    getAllServicePrices: () => {
        for (const key in appData.services) {
            appData.allServicePrices += appData.services[key]
        }
    },

    getFullPrice: () => {
        appData.fullPrice = appData.screenPrice + appData.allServicePrices
    },

    getTitle: () => {
        appData.title = appData.title.trim()[0].toUpperCase() + appData.title.trim().slice(1).toLowerCase()
    },

    getServicePercentPrice: () => {
        appData.servicePercentPrice = Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback / 100)))
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
        appData.getAllServicePrices()
        appData.getFullPrice()
        appData.getServicePercentPrice()
        appData.getTitle()
        appData.logger()
    },

    logger: () => {
        for (const key in appData) {
            console.log(`${key}: ${appData[key]}`)
        }
        console.log(appData.services);
    },
}

appData.start()
