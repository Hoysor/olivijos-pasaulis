# Olivijos pasaulis 🌸

A Toca Boca–style sandbox game for children, set in Klaipėda, Lithuania. It runs in the browser and installs as an app on tablets and phones.

**Play:** https://hoysor.github.io/olivijos-pasaulis/

## How to play

There are no goals and no money. Everything can be picked up and played with:

- **Drag** characters, pets and things with your finger. They fall onto floors, tables and counters.
- Drop a character on a **chair, sofa or toilet** to sit, in a **bed** to sleep, or in **water** to swim.
- Drop **food** on a character to eat it, and **clothes** to put them on. Other things are held in the hand.
- **Tap** things to make them do something: lamps, the TV, the radio, the tiled stove, the bath, fountains, dolphins…
- Tap a **fridge, wardrobe, toy box or market stall** to take things out of it.
- Put characters and things in the **🎒 bag** to take them to another place.
- Use **☀️/🌙** to switch between day and night, and **👥** to edit characters or create new ones.

## Places

| | Place | What's there |
|---|---|---|
| 🏠 | Home | An Old Town half-timbered house: bathroom, bedroom, living room with a tiled stove (koklinė krosnis), kitchen |
| 🎭 | Theatre Square | The Ännchen of Tharau (Taravos Anikė) fountain, the chimney sweep on the roof, the wish mouse, a café, a balloon cart |
| ⛵ | Danė riverside | The sailing ship Meridianas, the swing bridge (pasukamas tiltas), the Black Ghost (Juodasis vaiduoklis) |
| 🧺 | Old market | Lithuanian food (cepelinai, šaltibarščiai, kibinai, šakotis, sūrelis…), amber, clothes, flowers, pets |
| 🐬 | Sea Museum | Dolphins, seals and penguins (feed them fish), an aquarium |
| 🏖️ | Smiltynė beach | Dunes and pines, a lifeguard tower, amber in the seaweed, a sandcastle, the lighthouse, the Baltic Sea |

The Sea Museum and the beach are on the Curonian Spit, so you take the ferry to get there.

The game is in Lithuanian by default. Use the EN/LT button on the map to switch language. Progress is saved on the device.

## Install as an app

- **iPad / iPhone (Safari):** open the link → Share → *Add to Home Screen*.
- **Android (Chrome):** open the link → menu ⋮ → *Install app* / *Add to Home screen*.

After the first visit the game also works offline.

## Development

Plain HTML/CSS/JS with no build step. Run locally with:

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000.

- `js/scenes/*.js`: one file per place, with the background art, surfaces, seats, interactive fixtures and starting people/things
- `js/engine.js`: drawing a place, plus drag and drop, gravity, eating, dressing, dispensers and the bag
- `js/character.js`: characters and clothes, drawn as SVG
- `js/app.js`: character editor, cast list, map and navigation

When you change files, bump `CACHE` in `sw.js` so installed apps pick up the update.
