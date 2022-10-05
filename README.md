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


## Screenshots

<a href="https://raw.githubusercontent.com/Ortygia/Orpheus/master/.github/screenshots/OPS_DEV_1.png" width="49.5%"/></a>
<a href="https://raw.githubusercontent.com/Ortygia/Orpheus/master/.github/screenshots/OPS_DEV_2.png" width="49.5%"/></a>
<a href="https://raw.githubusercontent.com/Ortygia/Orpheus/master/.github/screenshots/OPS_DEV_3.png" width="49.5%"/></a>

