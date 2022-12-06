'use strict'


let title = prompt('Как называется ваш проект?', ' КаЛьКулятор Верстки')
let screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные')
let screenPrice = +prompt('Сколько будет стоить данная работа?', '12000')
let adaptive = confirm('Нужен ли адаптив на сайте?')
let service1 = prompt('Какой дополнительный тип услуги нужен?')
let servicePrice1 = +prompt('Сколько это будет стоить?', '1000')
let service2 = prompt('Какой дополнительный тип услуги нужен?')
let servicePrice2 = +prompt('Сколько это будет стоить?', '1000')
let rollback = 12
let allServicePrices, fullPrice, servicePercentPrice


const getAllServicePrices = function (...prices) {
    let result = 0
    for (const price of prices) {
        result += price
    }
    return result
}

function getFullPrice (screenPrice, allServicePrices) {
    return screenPrice + allServicePrices
}

function getTitle (title) {
    return title.trim()[0].toUpperCase() + title.slice(1).toLowerCase()
}

function getServicePercentPrices (fullPrice, rollback) {
    return Math.ceil(fullPrice - (fullPrice * (rollback / 100)))
}

const showTypeOf = function (variable) {
    return `${variable} - ${typeof variable}`
}

const getRollbackMessage = function (price) {
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


allServicePrices = getAllServicePrices(servicePrice1, servicePrice2)
fullPrice = getFullPrice(screenPrice, allServicePrices)
servicePercentPrice = getServicePercentPrices(fullPrice, rollback)
title = getTitle(title)


console.log(showTypeOf(title))
console.log(showTypeOf(fullPrice))
console.log(showTypeOf(adaptive))
console.log(screens)
console.log(getRollbackMessage(fullPrice))
console.log(getServicePercentPrices(fullPrice, rollback))
