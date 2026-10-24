# ASTERA — Beyond Ordinary Horizons

Cайт вымышленной компании межпланетных путешествий. Vite + TypeScript + Three.js.

## Запуск

Требуется Node.js 22.13+ (проверено на Node.js 24).

```powershell
npm install
npm run dev -- --port 5173
```

Открыть http://localhost:5173 (или http://127.0.0.1:5173). В Windows можно запустить `START-ASTERA.cmd` двойным щелчком. Оставить окно сервера работающим. Если порт занят, Vite выведет другой адрес — использовать его.

```powershell
npm run build
npm run preview
```

Production preview: http://127.0.0.1:4173. Все изображения, текстуры, шрифты и код локальные. Интернет нужен для первоначальной установки npm-зависимостей, но не для работы готового сайта.

## Возможности

- Все десять разделов из мастер-промпта, оригинальный логотип ASTERA.
- Three.js-сферы, настоящие кольца Сатурна и орбитальное движение с прерыванием переходов. Стрелки, ←/→ внутри hero, мышь, горизонтальный трекпад, свайп и кнопки направлений.
- Подробности пяти курортов, трёх кораблей, шести интерьеров и трёх членов экипажа в доступных диалогах.
- Локальный demo-поиск: дата, направление, гости, каюта, итоговая цена и иллюстративный маршрут. Europa + Private Charter демонстрирует пустое состояние. Нет платежей, сетевых заявок или сбора персональных данных.
- HTML-превью приложения, смена экранов по прокрутке и кнопкам, честные Coming Soon, Privé.
- Мобильное меню, reduced-motion, пауза анимации, fallback без WebGL, отложенные изображения и остановка рендера вне экрана.

## Медиа

18 оригинальных сцен и 5 текстур планет созданы встроенным image_gen. Реальный идентификатор модели инструмент не сообщает, поэтому конкретная версия модели не заявляется.

- `public/media/originals/` — исходные PNG.
- `public/media/images/` — WebP 640/1280 и пользовательский логотип.
- `node scripts/optimize-images.mjs` — повторная оптимизация.
- `docs/IMAGE_PROMPTS.md` — промпты.
- `docs/ASSET_MANIFEST.md` — наличие файлов.
- `docs/VIDEO_REQUESTS.md` — полный бриф VID-05 для Google Flow.

**VID-05_traveler_horizon.mp4 получен и подключён в финальном блоке.** 1080p, 8 секунд; оригинал сохранён. IMG-18 служит постером и reduced-motion fallback. После получения и проверки видео сохранить его в `public/media/video/`, а в `manifest.json` добавить `{"final":"VID-05_traveler_horizon.mp4"}`. Не добавлять запись до появления файла. Компонент использует poster, muted, playsinline, pause и reduced-motion.

## Проверки

```powershell
npm run typecheck
npm run lint
npm test
npm run build
```

Браузерная проверка через Playwright CLI при работающем dev-сервере:

```powershell
npx --yes --package @playwright/cli playwright-cli -s=astera open http://127.0.0.1:5173/
npx --yes --package @playwright/cli playwright-cli -s=astera run-code --filename scripts/browser-qa.js
```

Снимки и отчёт: `output/playwright/`, `docs/QA_REPORT.md`. Проверка программным браузером не заменяет тест на реальном мобильном GPU.

