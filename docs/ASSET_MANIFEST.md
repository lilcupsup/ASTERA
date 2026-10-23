# ASTERA — реестр медиа

Создано 18 сцен и 5 текстур планет встроенным image_gen. Все оригиналы сохраняются в public/media/originals; WebP — public/media/images. Логотип предоставлен пользователем: astera-logo.png. Hero Section Mockup.png — композиционный референс, не фон сайта.

| ID | Имя | Раздел | Статус |
|---|---|---|---|
| IMG-01 | flagship | Fleet | integrated |
| IMG-02 | lounge | Interiors | integrated |
| IMG-03 | saturn | Hero, resort | integrated |
| IMG-04 | luna | Destinations | integrated |
| IMG-05 | mars | Destinations | integrated |
| IMG-06 | europa | Destinations | integrated |
| IMG-07 | titan | Destinations | integrated |
| IMG-08 | suite | Interiors | integrated |
| IMG-09 | dining | Interiors | integrated |
| IMG-10 | spa | Interiors | integrated |
| IMG-11 | atrium | Interiors | integrated |
| IMG-12 | cabin | Interiors | integrated |
| IMG-13 | celeste | Fleet | integrated |
| IMG-14 | aurelia | Fleet | integrated |
| IMG-15 | elena | Crew | integrated |
| IMG-16 | james | Crew | integrated |
| IMG-17 | maya | Crew | integrated |
| IMG-18 | horizon | Privé, final CTA | integrated |

## Видео — пользователь создаёт в Google Flow
| ID / файл | Формат | Раздел | Poster | Статус |
|---|---|---|---|---|
| VID-05_traveler_horizon.mp4 | 16:9 | Final CTA | IMG-18_horizon-1280.webp | integrated |
| VID-02_flagship_flyby.mp4 | 16:9 | Fleet | IMG-01_flagship-1280.webp | planned (optional, not requested yet) |

Первый запрос — только VID-05. Второй ролик не нужен для запуска и будет запрошен отдельно, если потребуется. VID-05 получен и подключён: 1920×1080, 8 секунд, 7 539 830 байт. Оригинал сохранён в public/media/originals/VID-05_traveler_horizon.mp4. Перекодирование не требовалось.


Текстуры TEX-luna, TEX-mars, TEX-europa, TEX-saturn, TEX-titan: generated / integrated. Для каждого IMG/TEX есть PNG-оригинал и WebP 640/1280. 23 WebP версии 1280 вместе занимают около 3.2 MB. Версия модели image_gen не раскрыта инструментом.


Hero upgrade: добавлены 5 локальных TEX-*-detail.webp из оригиналов 1774×887, quality 94; 3 TEX-*-relief.webp для Luna/Mars/Europa. Это производные существующих ассетов, без новых генераций. На мобильных используются 1280-версии. Подробности: docs/HERO_UPGRADE.md.

