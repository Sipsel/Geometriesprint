# Geometriesprint


## Inhaltsverzeichnis
1. [Authoren] (#Authoren)
2. [Beschreibung] (#Beschreibung)
3. [Aktuelle-Version] (#Aktuelle-Version)
4. [Installation] (#Installation)
5. [Known-Bugs] (#Known-Bugs)
6. [Browserkompabilität] (#Browserkompabilität)
7. [License] (#License)

<a name="Authoren"/>

## Authoren

Florian Koll und Daniel Reiner Franke(Sipsel)


<a name="Beschreibung"/>
## Beschreibung
Geometriesprint ist ein automatischer 2d-Sidescroll Jump'n'Run in Anlehnung an das Spiel Geometry Dash von Ropert Topala. Geometriesprint ist ein open-source Spiel das entwickelt wurde, um dem Spieler mehr mögliche personalisierungs Optionen zu bieten als das Spiel Geometry Dash. Zudem sollten Entwickler die Möglichkeit haben, selber basierend auf Geometriesprint herumzutüffteln.


<a name="Aktuelle-Version"/>
## Aktuelle Version

Die aktuelle Version 1.0 wurde am 29.11.2021 erstellt. 


<a name="Authoren"/>
## Installation 

Das Spiel kann sofort über [Github pages](https://sipsel.github.io/Geometriesprint/) gespielt werden.
Alternativ kann der Quellcode auch heruntergeladen, entpackt und über die Datei index.html geöffnet werden.
Bei der zweiten Variante empfehlen wir den Erweiterung Live-Server von Visual Studio Code oder das hosten der Datei auf einem Server (z.B. Apache). Damit können Fehler durch fehleden Zugriff auf das Dateiensystme vermieden werden. 

<a name="Authoren"/>
## Known Bugs

### Existing Bugs

1. Sollte während des Spiel der Browser minimiert werden, kann es zu Problem im Spiel kommen, so dass empfohlen wird das Spiel immer an einem Stück zu spielen. 
2. Sollten zu große oder zu viele Karten hinzugefügt werden kann es zu Problemen beim Laden der Karte kommen. Dieser Fehler wird als schwerwiegend angesehen und dementsprechen das ganze Spiel zurückgesetzt werden. 

### Fixing most bugs
1. Um die meisten Fehler zu beheben sollte der Browser neugeladen werden. Danach sollte folgender Befehl in die [Entwicklerkonsole] (https://wise.com/de/help/articles/2954851/wie-offne-ich-die-konsole?origin=related-article-2491525) eingebene werden:
```
flushLocalstorage()
```
2. Sollte es zu weiteren Fehler kommen, bitten wir darum eine E-Mail an daniel.franke19(at)gmail.com zu schicken 

<a name="Authoren"/>
## Browserkompatibiltät

Getestet (29.11.2019)

### Desktop-Devices (Version)

Chrome-Version  : 96.0.4664.45
Microsoft Edge  : 96.0.1054.34   

### Mobile-Devices (Version)

Safari          :   15.0 (iOS)
Chrome          :   96.0.4664.53 (iOS)
Chrome          :   96.0.4664.45 (Anroid)	


<a name="Authoren"/>
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