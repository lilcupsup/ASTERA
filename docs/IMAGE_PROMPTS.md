# ASTERA — промпты изображений

Все файлы созданы встроенным image_gen. Используемую внутреннюю версию модели инструмент не раскрывает. Формат: отдельные landscape кадры, без текста/UI. Оригиналы в public/media/originals; web-версии в public/media/images.

## Общая арт-дирекция
ONE standalone landscape 16:9 photorealistic luxury travel editorial still for fictional ASTERA. Coherent pearl-white shells, restrained champagne gold, obsidian/navy accents, curved panoramic glass. Luxury first, science fiction second. Beautiful realistic material detail and architectural lighting. No text, logos, lettering, UI, watermark, collage, neon or cyberpunk.

## Опорные кадры
- IMG-01_flagship: entire pearl-white interplanetary yacht above Earth, continuous panoramic dark glass band, twin swept aft fins, champagne seams, three-quarter view, private aviation editorial photograph.
- IMG-02_lounge: flagship observation lounge, curved panoramic Saturn-view glass, pearl-white ribs, gold reveals, navy sofas, walnut tables, ivory upholstery, warm indirect light.
- IMG-03_saturn: orbital Rings Resort, pearl-white curved terraces, champagne shells, dark glazing, warm sealed interiors, Saturn and immense rings behind left, resort right two thirds.

## IMG-04_luna
```text
Tranquility Resort on the lunar surface: low pearl-white curved buildings with panoramic dark glazing, enclosed glowing terraces, silver cratered regolith and distant blue Earth in a black sky. Wide exterior architectural photograph.
```

## IMG-18_horizon
```text
Single elegant adult traveler in ivory tailoring, seen from behind standing at far RIGHT at an enormous panoramic window overlooking Saturn's rings in a luxury spacecraft lounge. Empty dark navy LEFT half for HTML copy, white ribs, gold floor light, pale stone floor. Emotional wide architectural photo.
```

## IMG-05_mars
```text
Elysium Resort, terraced pearl-white luxury hotel nestled into monumental rusty red Martian canyon cliffs, gold detailing and long curved dark-glass windows, warm inviting glow, dusty peach sky, spectacular wide architecture photograph.
```

## IMG-06_europa
```text
Oceanus Resort on Europa, a remote low pearl-white luxury retreat embedded in sculptural pale blue ice ridges, gold-trimmed panoramic sealed glass, Jupiter in black sky, warm inviting interior lights, wide exterior architecture photograph.
```

## IMG-07_titan
```text
Horizon Resort on Titan, secluded pearl-white sculptural luxury outpost beside a dark methane lake under opaque amber haze, curved sealed glass with warm lights, gold seams, dark rocks, wide atmospheric architecture photograph.
```

## IMG-08_suite
```text
Celestial suite inside a private interplanetary yacht, king-size ivory linen bed, walnut and pearl-white curved walls, champagne-gold seams, vast window overlooking blue Earth, soft warm indirect lighting, sparse luxury five-star furnishings. Wide interior photograph.
```

## IMG-09_dining
```text
Fine-dining restaurant inside a luxury spacecraft, intimate cream chairs and round marble tables set with fine porcelain, candles behind glass, gold delicate trim, enormous window overlooking Saturn rings, midnight navy ceiling. Wide interior photograph.
```

## IMG-10_spa
```text
Zero-G Spa in a luxury spacecraft, warm pearl-white vaulted room, sculptural enclosed flotation therapy pod with small suspended water droplets inside its transparent chamber, soft gold light, linen relaxation beds, planet through panoramic glass. Wide interior photo.
```

## IMG-11_atrium
```text
The Atrium inside a luxury spacecraft, monumental double-height pearl-white sculpted ribs, champagne seams, living olive trees in stone planters, curved mezzanine with dark glass balustrades, navy seating, enormous overhead window onto stars. Wide luxury interior photo.
```

## IMG-12_cabin
```text
Intimate private family cabin aboard a pearl-white luxury interplanetary yacht, two elegant ivory chaise sleeping berths, walnut storage, curved panoramic Earth window, champagne-gold trims, cashmere and warm indirect light, sophisticated minimal premium hospitality. Wide interior photo.
```

## IMG-13_celeste
```text
CELESTE luxury orbital transport spacecraft, a compact pearl-white sculptural yacht with continuous dark panoramic window band, swept twin aft fins, restrained champagne-gold seams, drifting over blue Earth at dawn. Entire vessel visible, three-quarter view. Same fleet design language as long elegant interplanetary yacht, no engines firing.
```

## IMG-14_aurelia
```text
AURELIA small private interplanetary charter yacht, pearl-white tapered elegant fuselage, long dark wraparound glass band, two swept sculptural aft fins, gold seams, orbiting the Moon in black space. Entire compact ship in frame, editorial private aviation photograph.
```

## IMG-15_elena
```text
Portrait of fictional Commander Elena Vale, woman about 40 with dark brown hair neatly tied back, calm confident expression, tailored cosmic navy luxury aviation uniform with narrow champagne-gold piping and small unlettered gold pin, no helmet, warm soft light, blurred luxury spacecraft lounge background. Vertical portrait composition within landscape frame, centered bust, photorealistic.
```

## IMG-16_james
```text
Portrait of fictional Commander James Orion, Black man about 45 with close cropped hair, calm friendly confident expression, tailored cosmic navy luxury aviation uniform with narrow champagne-gold piping and small unlettered gold pin, no helmet, warm soft light, blurred luxury spacecraft lounge background. Centered bust portrait.
```

## IMG-17_maya
```text
Portrait of fictional Dr Maya Chen, East Asian woman about 35 with shoulder-length black hair, calm approachable expression, tailored cosmic navy luxury aviation uniform with narrow champagne-gold piping and small unlettered gold pin, no helmet, warm soft light, blurred luxury spacecraft lounge background. Centered bust portrait.
```

## TEX — карты для WebGL

Для каждой из пяти планет использовался отдельный вызов со следующим техническим заданием и описанием её поверхности:
```text
Generate ONE flat 2:1 equirectangular planetary albedo texture map for wrapping onto a WebGL sphere. Entire rectangular image filled edge to edge with flat uniformly lit surface/atmosphere, no directional lighting, no shading sphere, no limb, no stars, no background, no text, no labels, no borders. Seamless left and right longitude edge, horizontal bands where applicable. Photorealistic NASA-quality natural detail, restrained colors, believable scientific texture, high resolution.
```
- TEX-saturn: pale honey, cream, taupe and beige horizontal cloud bands, fine swirling cloud detail, subtle realistic turbulence; no bright orange.
- TEX-luna: gray lunar regolith, subtle craters and dark maria, fine varied impacts, avoid evenly spaced dots.
- TEX-mars: rusty umber ochre terrain, dark basalt patches, canyons, dusty red.
- TEX-europa: ivory ice, fine branching rust-brown linea cracks, subtle gray ice; no blue ocean.
- TEX-titan: muted amber ochre opaque haze, subtle horizontal cloud bands; not a rocky surface.

