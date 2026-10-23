import sharp from "sharp";
for (const name of ["luna", "mars", "europa", "saturn", "titan"]) {
  const input = "public/media/originals/TEX-" + name + ".png";
  await sharp(input)
    .webp({ quality: 94 })
    .toFile("public/media/images/TEX-" + name + "-detail.webp");
  if (["luna", "mars", "europa"].includes(name))
    await sharp(input)
      .greyscale()
      .normalise()
      .blur(0.7)
      .webp({ quality: 92 })
      .toFile("public/media/images/TEX-" + name + "-relief.webp");
}
