const title = 'Проект'
const screens = 'Простые, Сложные, Интерактивные'
const screenPrice = 6953
const rollback = 12
const fullPrice = 1000
const adaptive = true

console.log(
    // Вывести в консоль тип данных значений переменных title, fullPrice, adaptive;
    `title - ${title} - ` + typeof title +
    `\nfullPrice - ${fullPrice} - ` + typeof fullPrice +
    `\nadaptive - ${adaptive} - ` + typeof adaptive +

    // Вывести в консоль длину строки из переменной screens
    `\nДлина строки из переменной screens - ${screens.length}` +

    // Вывести в консоль “Стоимость верстки экранов (screenPrice) рублей/ долларов/гривен/юани”
    // и “Стоимость разработки сайта (fullPrice) рублей/ долларов/гривен/юани”
    `\nСтоимость верстки экранов ${screenPrice} рублей/долларов/гривен/юани` +
    `\nСтоимость разработки сайта ${fullPrice} рублей/долларов/гривен/юани` +

    // Привести строку screens к нижнему регистру и разбить строку на массив, вывести массив в консоль
    `\n` + screens.toLowerCase().split(', ') +

    // Вывести в консоль Процент отката посреднику за работу (fullPrice * (rollback/100))
    `\n` + (fullPrice * (rollback/100))
)

