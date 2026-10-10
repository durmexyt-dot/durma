# durma – OKANO ♥️

Eine GIF-Galerie im Vollbild, gehostet mit GitHub Pages vom Branch `dev`.

- **Ansehen:** https://durmexyt-dot.github.io/durma/
- **Verwalten:** https://durmexyt-dot.github.io/durma/new/

## Funktionen

- GIFs im Vollbild auf schwarzem Hintergrund, Titel „OKANO ♥️“ oben mittig
- Wechseln mit den Buttons **‹ ›**, den Pfeiltasten oder durch Wischen (Handy)
- Echter Vollbildmodus über den Button oben rechts oder mit der Taste `f`
- Buttons blenden sich nach 2,5 s ohne Bewegung aus
- Jedes GIF hat einen eigenen Link (`/durma/1/`, `/durma/2/`, …) mit Vorschaubild für WhatsApp, Viber & Co.

## GIFs verwalten (`/new`)

1. **Einmalig:** Einen [Fine-grained Token](https://github.com/settings/personal-access-tokens/new) erstellen
   - Repository access: nur `durmexyt-dot/durma`
   - Permissions: **Contents: Read and write**

   Auf `/new` unter „GitHub-Token“ einfügen und **Speichern** klicken. Der Token bleibt nur im Browser.
2. GIF-Link einfügen (GIPHY-Seite oder direkter `.gif`-Link) und **Create** klicken.
3. Einzelne GIFs mit **Entfernen** löschen.
4. Änderungen werden erst gesammelt. **Push** schreibt alles in einem Commit ins Repo, **Verwerfen** macht sie rückgängig.
5. Nach ca. 1 Minute ist der neue Stand online.

## Aufbau

| Pfad | Inhalt |
|---|---|
| `index.html` | Vollbild-Viewer |
| `gifs/gifs.json` | Liste der GIFs (Links oder Dateinamen in `gifs/`) |
| `new/index.html` | Verwaltungsseite (Entwurf, Push über die GitHub-API) |
| `new/share-page.js` | Vorlage für die Vorschauseiten |
| `1/`, `2/`, … | Vorschauseiten pro GIF: `index.html` mit Open-Graph-Tags und `preview.jpg` (1200×630) |

Die Ordner `1/`, `2/`, … werden beim Push von `/new` automatisch erzeugt, aktualisiert und gelöscht. Bitte nicht von Hand bearbeiten.

## Link-Vorschau

Messenger lesen nur das HTML einer Seite, ohne JavaScript und ohne `#…`. Deshalb hat jedes GIF eine eigene kleine Seite. Sie enthält `og:`-Tags und ein JPEG-Standbild auf der eigenen Domain und leitet Besucher sofort zum Viewer weiter.

- Beim Blättern zeigt die Adresszeile den teilbaren Link (`/durma/3/`).
- Messenger speichern Vorschauen zwischen. Zum Testen hilft ein Anhang wie `/durma/3/?v=2`.
- Wird ein GIF entfernt, rücken die Nummern nach. Alte Links zeigen dann das GIF, das jetzt an dieser Stelle steht.

## Hosting

GitHub Pages: *Settings → Pages → Deploy from a branch → `dev` / (root)*. Jeder Push auf `dev` startet einen neuen Build.
