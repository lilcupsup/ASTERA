import sharp from "sharp";
import { readdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
const root = new URL("../public/media/", import.meta.url);
const files = await readdir(new URL("originals/", root));
for (const file of files.filter((f) => f.endsWith(".png"))) {
  for (const size of [640, 1280])
    await sharp(fileURLToPath(new URL(`originals/${file}`, root)))
      .resize({ width: size, withoutEnlargement: true })
      .webp({ quality: 84 })
      .toFile(
        fileURLToPath(
          new URL(`images/${file.replace(".png", "")}-${size}.webp`, root),
        ),
      );
}
await writeFile(
  new URL("images/available.json", root),
  JSON.stringify(files.map((f) => f.replace(".png", ""))),
);
console.log(`Optimized ${files.length} original images.`);
