import { destinations, experiences, fleet, crew } from "./data";
import {
  destinationsRu,
  experiencesRu,
  fleetRu,
  crewRu,
} from "./translations-data";

export const russian: Record<string, string> = {
  "Skip to destinations": "Перейти к направлениям",
  "ASTERA home": "ASTERA — главная",
  "INTERPLANETARY TRAVEL & RESORTS": "МЕЖПЛАНЕТНЫЕ ПУТЕШЕСТВИЯ И КУРОРТЫ",
  "Main navigation": "Основная навигация",
  Destinations: "Направления",
  "The Fleet": "Флот",
  Experience: "Впечатления",
  Crew: "Экипаж",
  "Book a journey": "Выбрать путешествие",
  "Book your journey": "Выбрать путешествие",
  Book: "Бронировать",
  "Open navigation": "Открыть меню",
  "Close navigation": "Закрыть меню",
  "Planetary destination carousel": "Карусель направлений",
  "Previous destination": "Предыдущее направление",
  "Next destination": "Следующее направление",
  "Choose a destination": "Выберите направление",
  "Pause planet motion": "Приостановить движение планет",
  "Resume planet motion": "Продолжить движение планет",
  Extraordinary: "Невероятные",
  worlds: "миры",
  "await.": "ждут вас.",
  "Some journeys change your surroundings.":
    "Одни путешествия меняют обстановку.",
  "Others change your perspective.": "Другие — ваш взгляд на мир.",
  "Discover five worlds, each distinctly ASTERA.":
    "Откройте пять миров в стиле ASTERA.",
  "Getting there is": "Путь к мечте —",
  "half the": "часть",
  "experience.": "путешествия.",
  "The rare pleasure of feeling at home,": "Редкое удовольствие быть как дома,",
  "somewhere entirely new.": "оказавшись в совершенно новом мире.",
  "Previous interior": "Предыдущее пространство",
  "Next interior": "Следующее пространство",
  "Onboard spaces, horizontally scrollable":
    "Пространства на борту, горизонтальная галерея",
  "Designed for the": "Созданы для",
  journey: "путешествий",
  "beyond.": "к звёздам.",
  "Exceptional vessels. One unmistakable philosophy.":
    "Особенные корабли. Единая философия.",
  "Select spacecraft": "Выберите корабль",
  "Explore the spacecraft": "Открыть корабль",
  GUESTS: "ГОСТЕЙ",
  "Five-star hospitality.": "Гостеприимство пяти звёзд.",
  "Zero Earth required.": "За пределами Земли.",
  "Every detail considered.": "Всё продумано до мелочей.",
  "Every moment, entirely yours.": "Каждое мгновение — ваше.",
  "Private suites": "Частные люксы",
  "Room to be yourself. Space to see everything.":
    "Место для себя. Простор для открытий.",
  "Fine dining": "Изысканная кухня",
  "A sense of place, at every table.": "Вкус нового мира за каждым столом.",
  "Personal concierge": "Личный консьерж",
  "Your preferences, anticipated. Your time, protected.":
    "Ваши желания предугаданы. Ваше время бесценно.",
  "Extraordinary excursions": "Необыкновенные экскурсии",
  "Venture further, in exceptional company.":
    "Отправляйтесь дальше в прекрасной компании.",
  "In extraordinary": "В надёжных",
  "hands.": "руках.",
  "The confidence to go further begins":
    "Смелость отправиться дальше начинается",
  "with the people who take you there.":
    "с доверия к тем, кто вас сопровождает.",
  "Meet Elena": "Знакомьтесь: Елена",
  "Meet James": "Знакомьтесь: Джеймс",
  "Meet Maya": "Знакомьтесь: Майя",
  "Where will you": "Куда отправимся",
  go: "",
  "next?": "дальше?",
  "A remarkable journey begins with a little curiosity.":
    "Большое путешествие начинается с любопытства.",
  From: "Откуда",
  Destination: "Направление",
  "Earth — Orbital Terminal": "Земля — орбитальный терминал",
  "Departure date": "Дата отправления",
  Travelers: "Гости",
  Cabin: "Размещение",
  "Celestial Suite": "Небесный люкс",
  "Private Residence": "Частная резиденция",
  "Private Charter": "Частный чартер",
  "Concept journeys. No real bookings or payments.":
    "Концепция путешествий. Без реального бронирования и оплаты.",
  "Search journeys": "Найти путешествие",
  "YOUR NEXT WORLD": "ВАШ НОВЫЙ МИР",
  "IN GOOD COMPANY": "В ПРЕКРАСНОЙ КОМПАНИИ",
  "YOUR PRIVATE SPACE": "ВАШЕ ЛИЧНОЕ ПРОСТРАНСТВО",
  "A DATE WITH THE EXTRAORDINARY": "ВРЕМЯ ДЛЯ НЕОБЫКНОВЕННОГО",
  "Previous month": "Предыдущий месяц",
  "Next month": "Следующий месяц",
  "Choose departure date": "Выберите дату отправления",
  "Time for a new perspective.": "Время увидеть мир иначе.",
  Today: "Сегодня",
  "The universe": "Вселенная",
  "in your": "у вас",
  "pocket.": "в кармане.",
  "Your itinerary. Your next discovery. Your personal concierge.":
    "Ваш маршрут. Новые открытия. Личный консьерж.",
  "One considered companion for the journey beyond.":
    "Всё необходимое для путешествия к звёздам.",
  "Preview app screens": "Экраны приложения",
  Discover: "Открытия",
  "Your journey": "Ваш маршрут",
  Concierge: "Консьерж",
  "COMING SOON": "СКОРО",
  "Your next": "Ваше новое",
  "extraordinary.": "открытие.",
  "Explore the collection": "Открыть коллекцию",
  "Saturn resort app preview": "Курорт у Сатурна в приложении",
  "is calling.": "зовёт.",
  "DAYS TO DEPARTURE · DEMO": "ДНЕЙ ДО ОТПРАВЛЕНИЯ · ПРИМЕР",
  "Celestial Suite · Deck 04": "Небесный люкс · Палуба 04",
  "CONCEPT BOARDING PASS": "ПРИМЕР ПОСАДОЧНОГО ТАЛОНА",
  "Itinerary · Arrival · Resort": "Маршрут · Прибытие · Курорт",
  Consider: "Считайте,",
  "it arranged.": "всё готово.",
  "Good evening. Your private observation salon is ready for ringrise.":
    "Добрый вечер. Ваш частный зал наблюдения готов к восходу колец.",
  "Private excursions": "Частные экскурсии",
  "Resort information": "О курорте",
  "Dining reservations": "Столик в ресторане",
  "Illustrative app preview": "Пример интерфейса приложения",
  "Travel beyond": "Откройте больше",
  "ordinary.": "возможного.",
  "For those who see the universe differently.":
    "Для тех, кто видит Вселенную иначе.",
  "An invitation to a more personal world of ASTERA.":
    "Приглашение в ваш личный мир ASTERA.",
  "Priority journeys & private launches":
    "Приоритетные маршруты и частные запуски",
  "Personal concierge & suite upgrades":
    "Личный консьерж и улучшение категории люкса",
  "Private excursions & charter access": "Частные экскурсии и чартерные рейсы",
  "Discover Privé": "Открыть Privé",
  "Your next world": "Ваш новый мир",
  is: "уже",
  "waiting.": "ждёт.",
  "Explore destinations": "Выбрать направление",
  "Pause film": "Приостановить видео",
  "Play film": "Воспроизвести видео",
  "Beyond Ordinary Horizons.": "За пределами привычного.",
  "Footer navigation": "Навигация внизу страницы",
  Spacecraft: "Корабли",
  Experiences: "Впечатления",
  About: "О нас",
  Contact: "Связаться",
  "A fictional future-travel concept": "Концепция путешествий будущего",
  "Close details": "Закрыть окно",
  "A little further": "Скоро",
  "on the horizon.": "на вашем экране.",
  "A more personal": "Вселенная",
  "universe.": "только для вас.",
  "A considered membership concept for those who want to travel on their own terms.":
    "Клубная программа для тех, кто хочет путешествовать на своих условиях.",
  "Priority booking and private launches":
    "Приоритетное бронирование и частные запуски",
  "Complimentary upgrades, subject to the imagined itinerary":
    "Улучшение категории размещения в рамках концепции маршрута",
  "Private planetary excursions and exclusive destinations":
    "Частные планетарные экскурсии и особенные направления",
  "Personal travel concierge": "Личный консьерж в путешествии",
  "Private spacecraft charter access": "Доступ к частным чартерным рейсам",
  "Concept only. Memberships are not currently offered for sale.":
    "Концепция программы. Клубные карты пока не продаются.",
  "Beyond Ordinary": "За пределами",
  "Horizons.": "привычного.",
  "ASTERA is a fictional vision of luxury interplanetary travel, set in an imagined future. It brings the care of exceptional hospitality to extraordinary worlds.":
    "ASTERA — воображаемый мир межпланетных путешествий премиум-класса. Здесь забота и безупречное гостеприимство встречаются с необыкновенными мирами будущего.",
  "This locally hosted website is a design and technology concept. Destinations, crew, vessels, durations and prices are fictional.":
    "Этот сайт — дизайнерская и технологическая концепция. Направления, экипаж, корабли, сроки и цены вымышлены.",
  "A future": "Диалог",
  "conversation.": "о будущем.",
  "ASTERA is a fictional concept and does not operate a booking or concierge service. No contact details or personal information are collected by this demo.":
    "ASTERA — вымышленная концепция, которая не предоставляет услуги бронирования или консьерж-сервиса. Сайт не собирает контактные и персональные данные.",
  "The ASTERA app is a design concept. It is not available on":
    "Приложение ASTERA — дизайнерская концепция. Оно пока недоступно в",
  "yet. Explore the interactive preview on this page.":
    "Ознакомьтесь с интерактивным превью на этой странице.",
  "Discover an environment shaped around your comfort, with panoramic views, exceptional materials and quietly attentive service.":
    "Пространство, созданное для вашего комфорта: панорамные виды, изысканные материалы и ненавязчивое внимание к каждому желанию.",
  "Fictional future concept. Durations and prices are illustrative, not real travel offers.":
    "Вымышленная концепция будущего. Сроки и цены приведены для примера и не являются предложением путешествия.",
  "A fictional member of the ASTERA crew.":
    "Вымышленный участник экипажа ASTERA.",
  "Explore demo journeys": "Посмотреть маршруты",
  "Find your journey": "Найти путешествие",
  "Concept journey from": "Примерная стоимость от",
  "/ guest": "/ гость",
  "Total illustrative price · USD": "Примерная общая стоимость · USD",
  "View itinerary": "Посмотреть маршрут",
  "No matching demo journeys": "Подходящих маршрутов нет",
  "Private charter is not included in our Europa concept collection. Try a suite or another destination.":
    "В концепции путешествий на Европу частный чартер не предусмотрен. Выберите люкс или другое направление.",
  "Private welcome at Earth Orbital Terminal":
    "Персональная встреча в орбитальном терминале Земли",
  "Departure aboard": "Отправление на борту",
  "Arrival and private transfer to": "Прибытие и частный трансфер:",
  "and time entirely your own": "и время только для вас",
  "Return passage to Earth": "Возвращение на Землю",
  "This is an illustrative itinerary only. No booking has been made, no payment is collected and no data is sent.":
    "Это пример маршрута. Бронирование не создано, оплата не взимается, данные не отправляются.",
  "Please choose a destination and cabin.":
    "Выберите направление и категорию размещения.",
  "Please choose a valid departure date from today onward.":
    "Выберите корректную дату отправления, начиная с сегодняшнего дня.",
  "Choose between 1 and 12 travelers.": "Укажите от 1 до 12 гостей.",
  Earth: "Земля",
  spacecraft: "корабль",
  on: "на",
  "above Earth": "над Землёй",
  "above Saturn": "у Сатурна",
  "Saturn and the ASTERA orbital resort": "Сатурн и орбитальный курорт ASTERA",
  "Traveler enjoying a private view of Saturn":
    "Путешественник любуется Сатурном",
  "A traveler looking out at Saturn through panoramic glass":
    "Путешественник смотрит на Сатурн через панорамное стекло",
  "ASTERA — Beyond Ordinary Horizons": "ASTERA — За пределами привычного",
  "ASTERA — Beyond Ordinary Horizons. A fictional vision of interplanetary travel and exceptional hospitality.":
    "ASTERA — за пределами привычного. Концепция межпланетных путешествий и исключительного гостеприимства.",
  "Wake above the most extraordinary": "Просыпайтесь над самым невероятным",
  "view in the solar system.": "видом Солнечной системы.",
};

function register(en: object, ru: object) {
  for (const key of Object.keys(ru)) {
    const source = (en as Record<string, string | string[]>)[key];
    const target = (ru as Record<string, string | string[]>)[key];
    if (Array.isArray(source) && Array.isArray(target))
      source.forEach((item, i) => (russian[item] = target[i]));
    else if (typeof source === "string" && typeof target === "string")
      russian[source] = target;
  }
}
destinations.forEach((d, i) => {
  register(d, destinationsRu[i]);
  russian[`${d.resort} on ${d.name}`] =
    `${destinationsRu[i].resort} ${["на Луне", "на Марсе", "на Европе", "у Сатурна", "на Титане"][i]}`;
  russian[`Explore ${d.name}`] = [
    "Открыть Луну",
    "Открыть Марс",
    "Открыть Европу",
    "Открыть Сатурн",
    "Открыть Титан",
  ][i];
  russian[`Your ${d.name} journey`] =
    `Ваше путешествие: ${destinationsRu[i].name}`;
});
experiences.forEach((d, i) => register(d, experiencesRu[i]));
fleet.forEach((d, i) => {
  register(d, fleetRu[i]);
  russian[`${d.name} spacecraft`] = `Корабль ${d.name}`;
});
crew.forEach((d, i) => register(d, crewRu[i]));
russian.Journey = "Маршрут";
for (const store of ["App Store", "Google Play"]) {
  russian[
    `The ASTERA app is a design concept. It is not available on ${store} yet. Explore the interactive preview on this page.`
  ] =
    `Приложение ASTERA — дизайнерская концепция. Оно пока недоступно в ${store}. Ознакомьтесь с интерактивным превью на этой странице.`;
}
for (let n = 1; n <= 120; n++) {
  const last = n % 10,
    teen = n % 100 >= 11 && n % 100 <= 14;
  const guest = teen
    ? "гостей"
    : last === 1
      ? "гость"
      : last >= 2 && last <= 4
        ? "гостя"
        : "гостей";
  const night = teen
    ? "ночей"
    : last === 1
      ? "ночь"
      : last >= 2 && last <= 4
        ? "ночи"
        : "ночей";
  russian[`${n} ${n === 1 ? "guest" : "guests"}`] = `${n} ${guest}`;
  russian[`${n} nights`] = `${n} ${night}`;
}
