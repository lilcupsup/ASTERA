# ASTERA — Google Flow / Veo

## VID-05 — получен и интегрирован

- Раздел: финальный CTA, Your Next World Is Waiting.
- Назначение: спокойный атмосферный фон. Приоритет: optional. Сайт работает без него с постером.
- Файл: `VID-05_traveler_horizon.mp4`.
- Куда загрузить: `public/media/video/VID-05_traveler_horizon.mp4` или отправить в чат.
- Mode: Frames to Video (first frame), если доступно; иначе Text to Video. Первый кадр сохраняет архитектуру.
- Reference: `public/media/originals/IMG-18_horizon.png` (web poster: `public/media/images/IMG-18_horizon-1280.webp`).
- Model: лучший доступный в интерфейсе пользователя Veo quality preset. Для эксперимента можно fast. Конкретные доступные модели пока не подтверждены.
- Aspect ratio: 16:9.
- Duration: 8 s, если поддерживается; иначе ближайшая доступная короткая длительность.
- Resolution: 1080p, если предлагается; иначе best available. MP4, если предлагается.
- Audio: off; в сайте muted.
- Loop: спокойная петля с почти идентичными началом и концом.
- Сохранить: человек справа, геометрия окна, белые рёбра, золотое освещение и ориентация колец.
- Отдельная mobile-версия пока не нужна; используем постер и адаптивный crop.

### PROMPT FOR GOOGLE FLOW (COPY IN ENGLISH)
```text
Create a restrained, photorealistic luxury travel film using the supplied image as the first frame. Preserve the exact architecture, panoramic window geometry, pearl-white structural ribs, champagne-gold floor lighting, pale stone floor, Saturn and its ring orientation.

A single adult traveler in elegant ivory tailoring stands on the far right, viewed from behind, quietly contemplating Saturn through the immense panoramic window of an ASTERA spacecraft lounge. Keep the left half dark, calm and uncluttered for an HTML headline. No text is rendered in the film.

Wide architectural framing with a natural 35mm lens feeling. The camera remains almost locked, with an extremely slow, subtle forward drift of less than one percent of the frame over the entire shot. The traveler remains still except for natural breathing. Saturn and its rings remain coherent, with imperceptibly slow orbital movement. Warm indirect lighting, deep navy shadows, refined realistic materials, understated five-star hospitality. Luxury first, science fiction second.

Aim for an ambient eight-second loop with nearly identical beginning and ending composition. No cuts or changes of viewpoint. Preserve all window edges and architectural proportions.

Avoid text, logos, UI, watermarks, additional people or planets, morphing, flicker, warping, broken geometry, changing ring angles, abrupt exposure changes, frantic motion, neon, cyberpunk and gaming aesthetics.
```

### Acceptance check
1. Окно, интерьер и кольца не деформируются.
2. Человек остаётся справа; левая половина свободна для заголовка.
3. Движение медленное, без дрожания и скачка на стыке.
4. Нет текста, логотипов, лишних людей или планет.

После генерации скачать видео и отправить файл с указанным именем. Если опция недоступна, прислать список настроек Flow для адаптации. Проверить полученный файл, сохранить оригинал, затем добавить `"final":"VID-05_traveler_horizon.mp4"` в `public/media/video/manifest.json`.

## VID-02 — только кандидат, не запрошен
Полёт флагмана для Fleet. Optional; не блокирует работу сайта. Полный бриф будет подготовлен только при необходимости, чтобы не требовать лишних генераций.

