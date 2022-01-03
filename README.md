# Geometriesprint

## Languages
[English](#english)
[German](#german)
[License](#license)
[Third-Party-Contribution](#Third-Party-Contribution) 
## English

## Table of Contents
1. [Authors](#1-authors)
2. [Description](#2-description)
3. [Current-Version](#3-current-version)
4. [Installation](#4-installation-en)
5. [Known bugs](#5-Known-bugs)
6. [Browser compatibility](#6-browser-compatibility)
7. [Acknowledgement](#9-acknowledgement)

## 1. Authors

Florian Koll und Daniel Reiner Franke(Sipsel)

## 2. Description

Geometriesprint is an automatic 2-d jump'n' run inspired by the game Geometry Dasg by Ropert Topala.
Geometriesprint is an open-source game which was made to allow more customisation then the original.
Additionally as it is open-source other devlopers can test/tinker with the code. 

## 3. Current Version

The current version 1.0 as created on the 29th of November 2021.

## 4. Installation EN

The game can be played without installation on the [github page](https://sipsel.github.io/Geometriesprint/).
Alternatively the game can be downloaded from github and played by opening the index.html file. 
When choosing the second option we would recommend using a backend server ir something similiar as there can be problems with loading map data from the file-system by just opening the index.html file. 

## 5. Known bugs

### 5.1 Existing bugs

1. Closing and reopening the tab/browser while playing a map has lead to some problems (such as clipping throu the walls) so we recommend playing a map from start to finish without stopping. 
2. We used the local storage for adding and loading maps. If one chooses to upload a very big/long map the local storage will stop functioning. In this case refer to 5.2..
3. Trying to use the map editor on mac might not work. 

### 5.2 Fixing most bugs

1. To fix most bugs we would recommend to reload the browser and type the following code in the developer [console] (https://balsamiq.com/support/faqs/browserconsole/) eingebene werden:
```
flushLocalstorage()
```
2. If you find additional bugs, please forward them to daniel.franke(at)gmail.com

## 6. Browser compatibility

tested (29.11.2019)

### 6.1 Desktop-Devices (Version)

Chrome-Version  : 96.0.4664.45
Microsoft Edge  : 96.0.1054.34   
Firefox         : 94.0.2
Opera           : 81.0.4196.60

### 6.2 Mobile-Devices (Version)

Safari          :   15.0 (iOS)
Chrome          :   96.0.4664.53 (iOS)
Chrome          :   96.0.4664.45 (Anroid)	
## 7. Acknowledgement
1. Florian Koll
    - Choosing the music (except for game_over.wav && win.wav)
    - CSS Folder(except for game.css)
    - csvMapTiles
    - img
        -favicon
    - js
        - autoMapMapTiles.js
        - main.js
        - map-editor.js
        - newGame.js
        - settings.js
        - standards.js
        - standardMaps.js
        - statistics.js
    - Map-Creator
    - about.html
    - editor.html
    - index.html
    - newGame.html
    - settings.html
    - statistics.html
2. Daniel Franke
    - Choosing music for the game (game_over.wav und win.wav)
    - css
        - game.css
    - img
        - canvas_background.jpg
        - player.png
    - js 
        - classes.js
        - constants.js
        - functions.js
        - game.js
        - user-input.js
    - game.html
    - LICENSE
    - README.md

## German

## Inhaltsverzeichnis
1. [Authoren](#1-authoren)
2. [Beschreibung](#2-beschreibung)
3. [Aktuelle-Version](#3-aktuelle-version)
4. [Installation](#4-installation)
5. [Known-Bugs](#5-known-bugs)
6. [Browserkompabilität](#6-browserkompabilität)
7. [Anerkennung](#9-Anerkennung)


## 1. Authoren

Florian Koll und Daniel Reiner Franke(Sipsel)


## 2. Beschreibung
Geometriesprint ist ein automatischer 2d-Sidescroll Jump'n'Run in Anlehnung an das Spiel Geometry Dash von Ropert Topala. Geometriesprint ist ein open-source Spiel das entwickelt wurde, um dem Spieler mehr mögliche personalisierungs Optionen zu bieten als das Spiel Geometry Dash. Zudem sollten Entwickler die Möglichkeit haben, selber basierend auf Geometriesprint herumzutüffteln.


## 3. Aktuelle Version

Die aktuelle Version 1.0 wurde am 29.11.2021 erstellt. 


## 4. Installation DE

Das Spiel kann sofort über [Github pages](https://sipsel.github.io/Geometriesprint/) gespielt werden.
Alternativ kann der Quellcode auch heruntergeladen, entpackt und über die Datei index.html geöffnet werden.
Bei der zweiten Variante empfehlen wir den Erweiterung Live-Server von Visual Studio Code oder das hosten der Datei auf einem Server (z.B. Apache). Damit können Fehler durch fehleden Zugriff auf das Dateiensystme vermieden werden. 


## 5. Known Bugs

### 5.1 Existing Bugs

1. Sollte während des Spiel der Browser minimiert werden, kann es zu Problem im Spiel kommen, so dass empfohlen wird das Spiel immer an einem Stück zu spielen. 
2. Sollten zu große oder zu viele Karten hinzugefügt werden kann es zu Problemen beim Laden der Karte kommen. Dieser Fehler wird als schwerwiegend angesehen und dementsprechen das ganze Spiel zurückgesetzt werden. 

### 5.2 Fixing most bugs
1. Um die meisten Fehler zu beheben sollte der Browser neugeladen werden. Danach sollte folgender Befehl in die [Entwicklerkonsole] (https://wise.com/de/help/articles/2954851/wie-offne-ich-die-konsole?origin=related-article-2491525) eingebene werden:
```
flushLocalstorage()
```
2. Sollte es zu weiteren Fehler kommen, bitten wir darum eine E-Mail an daniel.franke19(at)gmail.com zu schicken 


## 6. Browserkompatibiltät

Getestet (29.11.2019)

### 6.1 Desktop-Devices (Version)

Chrome-Version  : 96.0.4664.45
Microsoft Edge  : 96.0.1054.34   
Firefox         : 94.0.2
Opera           : 81.0.4196.60

### 6.2 Mobile-Devices (Version)

Safari          :   15.0 (iOS)
Chrome          :   96.0.4664.53 (iOS)
Chrome          :   96.0.4664.45 (Anroid)	




## 9. Anerkennung
1. Florian Koll
    - Musik Auswahl (alles außer game_over.wav && win.wav)
    - Im CSS Ordner(alles außer game.css)
    - csvMapTiles
    - img
        -favicon
    - js
        - autoMapMapTiles.js
        - main.js
        - map-editor.js
        - newGame.js
        - settings.js
        - standards.js
        - standardMaps.js
        - statistics.js
    - Map-Creator
    - about.html
    - editor.html
    - index.html
    - newGame.html
    - settings.html
    - statistics.html
2. Daniel Franke
    - Musik auswahl für das Spiel (game_over.wav und win.wav)
    - css
        - game.css
    - img
        - canvas_background.jpg
        - player.png
    - js 
        - classes.js
        - constants.js
        - functions.js
        - game.js
        - user-input.js
    - game.html
    - LICENSE
    - README.md

## Third Party Contribution
The Map Music is provided by:
Map 1: [Lightfox - "Pluck"](https://www.youtube.com/watch?v=tKwnSVfxwwI)
Map 2: [Cartoon - "On On"](https://www.youtube.com/watch?v=K4DyBUG242c)
Map 3: [Ross Bugden - "The Game is On"](https://www.youtube.com/watch?v=5dasaVm7L-Y)
Map 4: [Skeler - "Plume"](https://www.youtube.com/watch?v=0GM9XshEQ1s)
Map 5: [Deaf Kev - "Invincible"](https://www.youtube.com/watch?v=J2X5mJ3HDYE)

## License

MIT License

Copyright (c) 2021 Florian Koll, Daniel Reiner Franke

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.