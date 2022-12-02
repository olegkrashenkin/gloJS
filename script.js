const title = 'Проект'
const screens = 'Простые, Сложные, Интерактивные'
const screenPrice = 6953
const rollback = 12
const fullPrice = 1000
const adaptive = true

console.log(`title - ${title} - ${typeof title}
fullPrice - ${fullPrice} - ${typeof fullPrice}
adaptive - ${adaptive} - ${typeof adaptive}
Длина строки из переменной screens - ${screens.length}
Стоимость верстки экранов ${screenPrice} рублей
Стоимость разработки сайта ${fullPrice} рублей
${screens.toLowerCase().split(', ')}
${(fullPrice * (rollback/100))}`
)

