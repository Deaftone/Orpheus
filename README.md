# Orpheus

A frontend for Navidrome currently but hopefully in the future one for my own custom server

# Setup

Please follow the tauri guide on setting up tauri and rust https://tauri.studio/v1/guides/getting-started/prerequisites

You need to create a .env with the following values

``
VITE_USERNAME=
VITE_TOKEN=
VITE_S=
``

these values can be taken from Navidrome
Then just run ``npm install`` and then ``npm run dev`` for tauri app or ``npx vite`` for just a web app

Tauri only allows connection to https endpoints so you will need to reverse proxy your Navidrom instance and trust the certificate


![ops_1](https://files.catbox.moe/e1mzcy.png)
![ops_2](https://files.catbox.moe/kdpbn7.png)
![ops_3](https://files.catbox.moe/3ftuca.png)
