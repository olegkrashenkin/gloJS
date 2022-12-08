'use strict'


let title, screens, screenPrice, adaptive
let rollback = 12
let allServicePrices, fullPrice, servicePercentPrice, service1, service2

const isNumber = (num) => {
    return !isNaN(parseFloat(num)) && isFinite(num)
}

const asking = () => {
    let tmp
    title = prompt('Как называется ваш проект?', ' КаЛьКулятор Верстки')
    screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные')
    do {
        tmp = prompt('Сколько будет стоить данная работа?', '12000')
        if (tmp === null) {
            tmp = 0
            break
        }
        tmp = tmp.trim()
    } while (!isNumber(tmp))
    screenPrice = +tmp
    adaptive = confirm('Нужен ли адаптив на сайте?')
}

const getAllServicePrices = () => {
    let tmp
    let result = 0
    for (let i = 0; i < 2; i++) {
        i === 0
            ? service1 = prompt('Какой дополнительный тип услуги нужен?')
            : service2 = prompt('Какой дополнительный тип услуги нужен?')
        do {
            tmp = prompt('Сколько это будет стоить?', '1000')
            if (tmp === null) {
                tmp = 0
                break
            }
            tmp = tmp.trim()
        } while (!isNumber(tmp))
        result += +tmp
    }
    return result
}

const getFullPrice = (screenPrice, allServicePrices) => {
    return screenPrice + allServicePrices
}

const getTitle = (title) => {
    return title.trim()[0].toUpperCase() + title.trim().slice(1).toLowerCase()
}

const getServicePercentPrices = (fullPrice, rollback) => {
    return Math.ceil(fullPrice - (fullPrice * (rollback / 100)))
}

const showTypeOf = (variable) => {
    return `${variable} - ${typeof variable}`
}

const getRollbackMessage = (price) => {
    if (price <= 0) {
        return 'Что то пошло не так'
    } else if (price <= 15000) {
        return 'Скидка не предусмотрена'
    } else if (price <= 30000) {
        return 'Даем скидку в 5%'
    } else {
        return 'Даем скидку в 10%'
    }
}

asking()
allServicePrices = getAllServicePrices()
fullPrice = getFullPrice(screenPrice, allServicePrices)
servicePercentPrice = getServicePercentPrices(fullPrice, rollback)
title = getTitle(title)


console.log(showTypeOf(title))
console.log(showTypeOf(fullPrice))
console.log(showTypeOf(adaptive))
console.log(screens)
console.log(getRollbackMessage(fullPrice))
console.log(getServicePercentPrices(fullPrice, rollback))
