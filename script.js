'use strict'
// const title = prompt('Как называется ваш проект?', 'Проект')
// const screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные')
const screenPrice = +prompt('Сколько будет стоить данная работа?', '12000')
// const adaptive = prompt('Нужен ли адаптив на сайте?', 'Да/Нет') === 'Да' ? true : false
let service1, service2, servicePrice1, servicePrice2
for (let i = 1; i < 3; i++) {
    eval('service' + i + ' = ' + 'prompt(\'Какой дополнительный тип услуги нужен?\')')
    eval('servicePrice' + i + ' = ' + prompt('Сколько это будет стоить?', '1000'))
}

// +prompt(\'Сколько это будет стоить?\')')
console.log(typeof servicePrice1)
const fullPrice = screenPrice + servicePrice1 + servicePrice2
// const rollback = 12
// const servicePercentPrice = Math.ceil(fullPrice - (fullPrice * (rollback/100)))

console.log(`Стоимость разработки сайта ${fullPrice} рублей`)




// console.log(`title - ${title} - ${typeof title}
// fullPrice - ${fullPrice} - ${typeof fullPrice}
// adaptive - ${adaptive} - ${typeof adaptive}
// Длина строки из переменной screens - ${screens.length}
// Стоимость верстки экранов ${screenPrice} рублей
// Стоимость разработки сайта ${fullPrice} рублей
// ${screens.toLowerCase().split(', ')}
// ${(fullPrice * (rollback/100))}`
// )



