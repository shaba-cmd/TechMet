import avtovyshka from '../assets/equipment/avtovyshka.jpg'
import avtokran from '../assets/equipment/avtokran.jpg'
import buldozer from '../assets/equipment/buldozer.jpg'
import gusenichny from '../assets/equipment/gusenichny-ekskavator.jpg'
import kolesny from '../assets/equipment/kolesny-ekskavator.jpg'
import pogruzchik from '../assets/equipment/ekskavator-pogruzchik.jpg'

export type TabId = 'material' | 'rent' | 'tools' | 'parts' | 'uniform'

export interface Tab {
  id: TabId
  title: string
}

export const TABS: Tab[] = [
  { id: 'material', title: 'Материал' },
  { id: 'rent', title: 'Аренда Техники' },
  { id: 'tools', title: 'Инструменты' },
  { id: 'parts', title: 'Запчасти' },
  { id: 'uniform', title: 'Униформа' },
]

export const CATEGORIES = [
  'САТС',
  'Лесозаготов. тех.',
  'Автотракторная тех.',
  'С/х техника',
  'Подъемная тех.',
  'Дорожная тех.',
  'Землеройная тех.',
  'Коммунальная тех.',
] as const

export const MANUFACTURERS = [
  'ЕлАЗ',
  'BAUMECH',
  'H7',
  'AI Машинери',
  'ДСТ-УРАЛ',
  'Завод АСТ',
  'Ивановец',
  'ЧЕТРА',
  'Галичанин',
] as const

export type Category = (typeof CATEGORIES)[number]
export type Manufacturer = (typeof MANUFACTURERS)[number]

export interface Product {
  id: number
  tab: TabId
  title: string
  image: string
  category: Category
  manufacturer: Manufacturer
  pricePerHour: number
  minHours: number
  description: string
  specs: Record<string, string>
}

export const PRICE_MIN = 0
export const PRICE_MAX = 10000
export const PRICE_STEP = 100

type Draft = Omit<Product, 'id' | 'tab'>

const items: Draft[] = [
  {
    title: 'Автовышка',
    image: avtovyshka,
    category: 'Подъемная тех.',
    manufacturer: 'Галичанин',
    pricePerHour: 1000,
    minHours: 4,
    description: 'Телескопическая автовышка на шасси МАЗ для монтажных и фасадных работ на высоте.',
    specs: { 'Высота подъёма': '28 м', 'Грузоподъёмность люльки': '250 кг', Шасси: 'МАЗ-5340' },
  },
  {
    title: 'Автокран',
    image: avtokran,
    category: 'Подъемная тех.',
    manufacturer: 'Ивановец',
    pricePerHour: 1000,
    minHours: 4,
    description: 'Автокран «Ивановец» на шасси КАМАЗ для погрузочно-разгрузочных и монтажных работ.',
    specs: { Грузоподъёмность: '25 т', 'Длина стрелы': '31 м', Шасси: 'КАМАЗ-65115' },
  },
  {
    title: 'Бульдозер',
    image: buldozer,
    category: 'Землеройная тех.',
    manufacturer: 'ЧЕТРА',
    pricePerHour: 1000,
    minHours: 8,
    description: 'Гусеничный бульдозер для планировки площадок, разработки и перемещения грунта.',
    specs: { 'Мощность двигателя': '240 л.с.', 'Ширина отвала': '4,2 м', 'Масса': '25 т' },
  },
  {
    title: 'Гусеничный Экскаватор',
    image: gusenichny,
    category: 'Землеройная тех.',
    manufacturer: 'H7',
    pricePerHour: 1000,
    minHours: 8,
    description: 'Полноповоротный гусеничный экскаватор для котлованов, траншей и карьерных работ.',
    specs: { 'Объём ковша': '1,2 м³', 'Глубина копания': '6,7 м', Масса: '22 т' },
  },
  {
    title: 'Колёсный Экскаватор',
    image: kolesny,
    category: 'Дорожная тех.',
    manufacturer: 'BAUMECH',
    pricePerHour: 1000,
    minHours: 6,
    description: 'Мобильный колёсный экскаватор для работы в городских условиях и на дорогах.',
    specs: { 'Объём ковша': '0,8 м³', 'Глубина копания': '5,5 м', 'Скорость': '35 км/ч' },
  },
  {
    title: 'Экскаваторы Погрузчики',
    image: pogruzchik,
    category: 'Автотракторная тех.',
    manufacturer: 'AI Машинери',
    pricePerHour: 1000,
    minHours: 4,
    description: 'Универсальный экскаватор-погрузчик: земляные, погрузочные и коммунальные работы.',
    specs: { 'Объём ковша погрузчика': '1,1 м³', 'Глубина копания': '5,9 м', Масса: '8,5 т' },
  },
  {
    title: 'Автовышка 18 м',
    image: avtovyshka,
    category: 'Коммунальная тех.',
    manufacturer: 'Завод АСТ',
    pricePerHour: 1400,
    minHours: 4,
    description: 'Компактная автовышка для обслуживания освещения, рекламных конструкций и кровли.',
    specs: { 'Высота подъёма': '18 м', 'Грузоподъёмность люльки': '200 кг', Шасси: 'ГАЗон Next' },
  },
  {
    title: 'Автокран 50 т',
    image: avtokran,
    category: 'Подъемная тех.',
    manufacturer: 'Галичанин',
    pricePerHour: 3500,
    minHours: 6,
    description: 'Тяжёлый автокран для монтажа металлоконструкций и железобетонных изделий.',
    specs: { Грузоподъёмность: '50 т', 'Длина стрелы': '40 м', Шасси: 'КАМАЗ-6540' },
  },
  {
    title: 'Бульдозер болотоходный',
    image: buldozer,
    category: 'Лесозаготов. тех.',
    manufacturer: 'ЧЕТРА',
    pricePerHour: 2900,
    minHours: 8,
    description: 'Бульдозер с уширенными гусеницами для слабых грунтов, лесных и болотистых участков.',
    specs: { 'Мощность двигателя': '200 л.с.', 'Давление на грунт': '0,28 кг/см²', Масса: '21 т' },
  },
  {
    title: 'Экскаватор карьерный',
    image: gusenichny,
    category: 'САТС',
    manufacturer: 'ЕлАЗ',
    pricePerHour: 4800,
    minHours: 8,
    description: 'Карьерный экскаватор повышенной производительности для горнодобывающих работ.',
    specs: { 'Объём ковша': '2,5 м³', 'Глубина копания': '7,8 м', Масса: '45 т' },
  },
  {
    title: 'Колёсный экскаватор с гидромолотом',
    image: kolesny,
    category: 'Дорожная тех.',
    manufacturer: 'ДСТ-УРАЛ',
    pricePerHour: 2600,
    minHours: 6,
    description: 'Экскаватор с гидромолотом для демонтажа покрытий и разрушения мёрзлого грунта.',
    specs: { 'Энергия удара': '3000 Дж', 'Объём ковша': '0,7 м³', Масса: '16 т' },
  },
  {
    title: 'Экскаватор-погрузчик с вилами',
    image: pogruzchik,
    category: 'С/х техника',
    manufacturer: 'AI Машинери',
    pricePerHour: 1700,
    minHours: 4,
    description: 'Экскаватор-погрузчик с вилочным захватом для работы на фермах и складах.',
    specs: { 'Грузоподъёмность вил': '2 т', 'Объём ковша': '1,0 м³', Масса: '8 т' },
  },
  {
    title: 'Автовышка 35 м',
    image: avtovyshka,
    category: 'Подъемная тех.',
    manufacturer: 'H7',
    pricePerHour: 2800,
    minHours: 4,
    description: 'Высотная автовышка для промышленного альпинизма и монтажа на высотных объектах.',
    specs: { 'Высота подъёма': '35 м', 'Грузоподъёмность люльки': '300 кг', Шасси: 'КАМАЗ-43118' },
  },
  {
    title: 'Автокран вездеход',
    image: avtokran,
    category: 'Лесозаготов. тех.',
    manufacturer: 'Ивановец',
    pricePerHour: 3000,
    minHours: 6,
    description: 'Полноприводный автокран для работы на лесосеках и строительных площадках без дорог.',
    specs: { Грузоподъёмность: '32 т', 'Колёсная формула': '6×6', 'Длина стрелы': '30 м' },
  },
  {
    title: 'Бульдозер дорожный',
    image: buldozer,
    category: 'Дорожная тех.',
    manufacturer: 'ДСТ-УРАЛ',
    pricePerHour: 2300,
    minHours: 8,
    description: 'Бульдозер для подготовки основания дорог, отсыпки и планировки насыпей.',
    specs: { 'Мощность двигателя': '170 л.с.', 'Ширина отвала': '3,5 м', Масса: '18 т' },
  },
  {
    title: 'Мини-экскаватор',
    image: gusenichny,
    category: 'Коммунальная тех.',
    manufacturer: 'BAUMECH',
    pricePerHour: 1200,
    minHours: 4,
    description: 'Компактный экскаватор для работ во дворах, подвалах и стеснённых условиях.',
    specs: { 'Объём ковша': '0,1 м³', 'Глубина копания': '3,1 м', Масса: '3,5 т' },
  },
  {
    title: 'Колёсный экскаватор 21 т',
    image: kolesny,
    category: 'Землеройная тех.',
    manufacturer: 'H7',
    pricePerHour: 2400,
    minHours: 6,
    description: 'Колёсный экскаватор повышенной мощности для крупных объектов инфраструктуры.',
    specs: { 'Объём ковша': '1,0 м³', 'Глубина копания': '6,0 м', Масса: '21 т' },
  },
  {
    title: 'Экскаватор-погрузчик JCB-класса',
    image: pogruzchik,
    category: 'Автотракторная тех.',
    manufacturer: 'Завод АСТ',
    pricePerHour: 1900,
    minHours: 4,
    description: 'Экскаватор-погрузчик с телескопической рукоятью для универсальных работ.',
    specs: { 'Объём ковша погрузчика': '1,1 м³', 'Глубина копания': '5,9 м', Масса: '8,7 т' },
  },
  {
    title: 'Автовышка коленчатая',
    image: avtovyshka,
    category: 'САТС',
    manufacturer: 'Завод АСТ',
    pricePerHour: 2100,
    minHours: 4,
    description: 'Коленчато-телескопическая автовышка для работ с обходом препятствий.',
    specs: { 'Высота подъёма': '22 м', 'Вылет стрелы': '14 м', Шасси: 'МАЗ-4381' },
  },
  {
    title: 'Автокран 16 т',
    image: avtokran,
    category: 'Автотракторная тех.',
    manufacturer: 'ДСТ-УРАЛ',
    pricePerHour: 1600,
    minHours: 4,
    description: 'Лёгкий автокран для разгрузки материалов и малоэтажного строительства.',
    specs: { Грузоподъёмность: '16 т', 'Длина стрелы': '22 м', Шасси: 'МАЗ-5340' },
  },
  {
    title: 'Бульдозер-рыхлитель',
    image: buldozer,
    category: 'САТС',
    manufacturer: 'ЕлАЗ',
    pricePerHour: 5200,
    minHours: 8,
    description: 'Тяжёлый бульдозер с рыхлителем для скальных и мёрзлых грунтов.',
    specs: { 'Мощность двигателя': '410 л.с.', 'Глубина рыхления': '1,4 м', Масса: '50 т' },
  },
  {
    title: 'Экскаватор длиннорукий',
    image: gusenichny,
    category: 'Землеройная тех.',
    manufacturer: 'AI Машинери',
    pricePerHour: 3900,
    minHours: 8,
    description: 'Экскаватор с удлинённой стрелой для очистки водоёмов и берегоукрепления.',
    specs: { 'Вылет стрелы': '18 м', 'Глубина копания': '12 м', Масса: '24 т' },
  },
  {
    title: 'Колёсный экскаватор для ЖКХ',
    image: kolesny,
    category: 'Коммунальная тех.',
    manufacturer: 'Галичанин',
    pricePerHour: 1800,
    minHours: 4,
    description: 'Колёсный экскаватор для аварийных работ на сетях водо- и теплоснабжения.',
    specs: { 'Объём ковша': '0,6 м³', 'Глубина копания': '4,8 м', Масса: '14 т' },
  },
  {
    title: 'Экскаватор-погрузчик фермерский',
    image: pogruzchik,
    category: 'С/х техника',
    manufacturer: 'BAUMECH',
    pricePerHour: 1500,
    minHours: 4,
    description: 'Экскаватор-погрузчик для мелиорации, уборки навоза и погрузки кормов.',
    specs: { 'Объём ковша погрузчика': '0,9 м³', 'Глубина копания': '4,5 м', Масса: '7,5 т' },
  },
  {
    title: 'Автовышка на вездеходе',
    image: avtovyshka,
    category: 'Лесозаготов. тех.',
    manufacturer: 'ЧЕТРА',
    pricePerHour: 3300,
    minHours: 6,
    description: 'Автовышка повышенной проходимости для обслуживания ЛЭП и лесных угодий.',
    specs: { 'Высота подъёма': '24 м', 'Колёсная формула': '6×6', Шасси: 'Урал-4320' },
  },
  {
    title: 'Автокран 100 т',
    image: avtokran,
    category: 'САТС',
    manufacturer: 'ЕлАЗ',
    pricePerHour: 9500,
    minHours: 8,
    description: 'Сверхтяжёлый автокран для монтажа оборудования и мостовых конструкций.',
    specs: { Грузоподъёмность: '100 т', 'Длина стрелы': '52 м', Шасси: 'специальное 10×6' },
  },
  {
    title: 'Мини-бульдозер',
    image: buldozer,
    category: 'С/х техника',
    manufacturer: 'H7',
    pricePerHour: 1100,
    minHours: 4,
    description: 'Компактный бульдозер для расчистки участков и работ на сельхозугодьях.',
    specs: { 'Мощность двигателя': '90 л.с.', 'Ширина отвала': '2,4 м', Масса: '8 т' },
  },
  {
    title: 'Экскаватор для лесозаготовки',
    image: gusenichny,
    category: 'Лесозаготов. тех.',
    manufacturer: 'ДСТ-УРАЛ',
    pricePerHour: 3400,
    minHours: 8,
    description: 'Гусеничный экскаватор с грейферным захватом для погрузки леса.',
    specs: { 'Грузоподъёмность захвата': '4 т', 'Вылет стрелы': '9 м', Масса: '23 т' },
  },
  {
    title: 'Колёсный экскаватор-планировщик',
    image: kolesny,
    category: 'Дорожная тех.',
    manufacturer: 'Завод АСТ',
    pricePerHour: 2700,
    minHours: 6,
    description: 'Экскаватор-планировщик для профилирования откосов и кюветов дорог.',
    specs: { 'Ширина ковша': '1,5 м', 'Вылет стрелы': '8,5 м', Масса: '17 т' },
  },
  {
    title: 'Экскаватор-погрузчик с гидромолотом',
    image: pogruzchik,
    category: 'Коммунальная тех.',
    manufacturer: 'ЕлАЗ',
    pricePerHour: 2200,
    minHours: 4,
    description: 'Экскаватор-погрузчик с навесным гидромолотом для ремонта дорог и коммуникаций.',
    specs: { 'Энергия удара': '1200 Дж', 'Объём ковша': '1,0 м³', Масса: '9 т' },
  },
  {
    title: 'Автовышка гусеничная',
    image: avtovyshka,
    category: 'Дорожная тех.',
    manufacturer: 'BAUMECH',
    pricePerHour: 2500,
    minHours: 4,
    description: 'Самоходный подъёмник на гусеничном ходу для работы внутри цехов и на газонах.',
    specs: { 'Высота подъёма': '20 м', 'Грузоподъёмность люльки': '230 кг', Ход: 'гусеничный' },
  },
  {
    title: 'Автокран 32 т',
    image: avtokran,
    category: 'Автотракторная тех.',
    manufacturer: 'Галичанин',
    pricePerHour: 2600,
    minHours: 6,
    description: 'Универсальный автокран для гражданского и промышленного строительства.',
    specs: { Грузоподъёмность: '32 т', 'Длина стрелы': '31 м', Шасси: 'КАМАЗ-65115' },
  },
  {
    title: 'Бульдозер колёсный',
    image: buldozer,
    category: 'Автотракторная тех.',
    manufacturer: 'AI Машинери',
    pricePerHour: 2000,
    minHours: 6,
    description: 'Бульдозер на базе трактора для быстрых перебросок между объектами.',
    specs: { 'Мощность двигателя': '300 л.с.', 'Ширина отвала': '3,8 м', Масса: '16 т' },
  },
  {
    title: 'Экскаватор гусеничный 30 т',
    image: gusenichny,
    category: 'С/х техника',
    manufacturer: 'Ивановец',
    pricePerHour: 4200,
    minHours: 8,
    description: 'Экскаватор для мелиоративных каналов и крупных земляных работ.',
    specs: { 'Объём ковша': '1,6 м³', 'Глубина копания': '7,2 м', Масса: '30 т' },
  },
]

export const PRODUCTS: Product[] = items.map((item, index) => ({
  ...item,
  id: index + 1,
  tab: 'rent',
}))
