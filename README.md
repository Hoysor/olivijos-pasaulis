# Olivijos pasaulis 🌸

A children's game that runs in the browser and installs as an app on tablets and phones.

**Play:** https://hoysor.github.io/olivijos-pasaulis/

## What you can do

- **Create a character**: name, skin, hairstyle, hair and eye color, starter clothes.
- **Build a city**: switch to 🔨 *Statyti* and place houses, shops, trees, roads, water and more. In 🚶 *Vaikščioti* mode, tap a square to walk there and collect 🪙 coins that pop up.
- **Build your home**: pick wall and floor colors and place furniture. Tap yourself or a pet to eat from the fridge.
- **Shop**:
  - 🛒 Food store: food goes into the fridge.
  - 👗 Clothes store: try clothes on, buy them and wear them. Change outfits in the wardrobe.
  - 🐾 Pet store: buy a dog, cat, bunny, unicorn and more, then give it a name. Your first pet follows you around the city.

The game is in Lithuanian by default. Tap 🇬🇧 EN in the top bar to switch to English. Progress is saved on the device.

## Install as an app

- **iPad / iPhone (Safari):** open the link → Share → *Add to Home Screen*.
- **Android (Chrome):** open the link → menu ⋮ → *Install app* / *Add to Home screen*.

After the first visit the game also works offline.

## Development

Plain HTML/CSS/JS with no build step. Run locally with:

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000. When you change files, bump `CACHE` in `sw.js` so installed apps pick up the update.
