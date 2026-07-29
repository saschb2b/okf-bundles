---
type: Anleitung
title: Arbeiten in diesem Bundle
description: Die Konventionen für neue Gerichte, Zutaten und Techniken, damit der Graph in beide Richtungen begehbar bleibt.
tags: [anleitung, konventionen, okf]
generated:
  by: claude-code/opus-5
  at: 2026-07-29T23:00:00Z
---

# Die harte Regel

Dieses Bundle folgt dem Open Knowledge Format (OKF v0.2): ein Ordner aus Markdown-Dateien, in dem jedes Konzept YAML-Frontmatter mit einem nicht leeren `type` trägt. Das ist die einzige harte Anforderung. `index.md` und `log.md` sind reserviert, sind nie Konzepte, und nur die Wurzel-`index.md` trägt Frontmatter (ihr `okf_version`).

Alles Weitere hier ist Hauskonvention. Sie existiert, damit die [Rückwärtssuche](/guide/rueckwaertssuche.md) funktioniert, und die bricht schneller, als der Validator merkt.

# Die Typen und ihr Frontmatter

Verwendete `type`-Werte, jeweils mit den Feldern, die über die OKF-Empfehlungen hinausgehen. Empfohlen und hier überall gesetzt sind `title`, `description`, `tags` und `generated` (`by`, also wer das Konzept geschrieben hat, und `at`, der Zeitpunkt); wo eine Quelle dahintersteht, kommt `sources` dazu. `verified` bleibt leer, solange niemand das Rezept tatsächlich nachgekocht und bestätigt hat:

`Rezept`
: Ein fertiges Gericht. Zusätzlich `kueche`, `gang`, `portionen`, `zeit_aktiv`, `zeit_gesamt`, `schwierigkeit`, `aufbewahrung` (siehe unten), optional `allergene` und `vorab` (was am Vortag geht). Beispiel: [Japanisches Curry](/gerichte/japanisches-curry.md).

`Rezeptkomponente`
: Ein Baustein, den mehrere Gerichte teilen (Saucen, Grundlagen, Beilagen). Gleiche Felder wie ein Rezept, aber `ergibt` statt `portionen`. Beispiel: [Curry-Roux](/komponenten/curry-roux.md).

`Zutat`
: Ein einzelnes Lebensmittel. Zusätzlich `kategorie`, `warengruppe`, `vegan`, `allergene`, `lagerung`, `haltbarkeit`, optional `saison`. Beispiel: [Karotte](/zutaten/gemuese/karotte.md).

`Zubereitungstechnik`
: Ein Handgriff oder eine Garmethode, unabhängig vom Gericht. Zusätzlich `kategorie` (Schnitttechnik, Garmethode, Vorbereitung, Vorratshaltung), `werkzeug`, optional `temperatur` und `dauer`. Beispiel: [Anschwitzen](/techniken/anschwitzen.md).

`Wochenplan`
: Eine gerechnete Woche aus vorhandenen Gerichten. Zusätzlich `haushalt`, `einkaufstag`, `kochtage`, `aktivzeit_woche`, `laengster_tag`, `vegetarische_tage` und vor allem `gerichte`: die Liste der Rezeptpfade, aus denen der Plan besteht. Beispiel: [Standardwoche](/wochenplaene/standardwoche.md).

Dazu kommen `Küche` für eine Landesküche ([Japanische Küche](/kuechen/japanisch.md)) und `Anleitung` für Konzepte wie dieses.

# Wohin die Datei gehört

```
gerichte/           ein Gericht, eine Datei
komponenten/        Bausteine, die mehrere Gerichte teilen
zutaten/
  gemuese/  obst/  fleisch/  fisch/  milch-und-ei/
  gewuerze/  grundzutaten/  wuerzmittel/  suesswaren/
techniken/          eine Technik, eine Datei, flach
kuechen/            eine Landesküche, eine Datei
wochenplaene/       fertig gerechnete Wochen, abgeleitet aus den Gerichten
guide/              Konventionen und Methoden
assets/             Bilder, flach, sprechende Dateinamen
```

Dateinamen sind klein, ohne Umlaute, mit Bindestrich: `haehnchenschenkel.md`, `reis-kochen-absorptionsmethode.md`. Der Titel im Frontmatter trägt die korrekte Schreibweise mit Umlauten.

# Ein neues Gericht anlegen, Schritt für Schritt

1. **Gericht schreiben** unter `gerichte/<name>.md`. Die Zutatentabelle verlinkt jede Zeile auf das Zutatenkonzept, die Ablaufschritte verlinken auf die Techniken.
2. **Fehlende Zutaten anlegen**, jede als eigene Datei in ihrer Warengruppe. Keine Sammel-Datei „Gewürze", auch nicht für Salz.
3. **Fehlende Techniken anlegen**, jede als eigene Datei. Wenn ein Schritt eine Technik nur benutzt, gehört die Erklärung in die Technik, nicht in das Rezept. Das Rezept sagt „Zwiebeln [anschwitzen](/techniken/anschwitzen.md), bis sie glasig sind", nicht, wie Anschwitzen geht.
4. **Abschnitt „Aufbewahren" schreiben.** Pflicht bei jedem Rezept und jeder Komponente, auch wenn die Antwort „hält sich nicht" lautet. Die drei Fragen dazu stehen in [Vorratshaltung](/guide/vorratshaltung.md).
5. **Rückverweise ergänzen.** In jeder verwendeten Zutat eine Zeile unter `# Wird verwendet in`, in jeder verwendeten Technik eine Zeile unter `# Wird gebraucht für`. Dieser Schritt wird am häufigsten vergessen und ist der einzige, der die Rückwärtssuche trägt.
6. **Indexe aktualisieren**: die `index.md` jedes berührten Ordners und die Wurzel-`index.md`.
7. **Wochenpläne prüfen.** Ein [Wochenplan](/wochenplaene/standardwoche.md) ist abgeleitetes Wissen und wird falsch, wenn sich ein Gericht ändert. `node scripts/check-wochenplaene.mjs` meldet jeden Plan, der älter ist als eines seiner Rezepte. Danach inhaltlich prüfen: Zeiten, Portionen, Einkaufsmengen, und ob das neue Gericht in einen bestehenden Plan gehört oder einen neuen ermöglicht. Die Regeln stehen in [Wochenplanung](/guide/wochenplanung.md).
8. **Bilder ablegen**, falls vorhanden, unter `assets/<gericht>.jpg`, auf etwa 1600 Pixel Kantenlänge verkleinert, und mit einem **relativen** Pfad (`../assets/…`) einbinden, damit sie auch auf GitHub angezeigt werden. Konzept-zu-Konzept-Links bleiben dagegen bundle-absolut.
9. **`log.md` ergänzen**, neuester Eintrag oben, Datum als `## JJJJ-MM-TT`.
10. **Validieren**: `node scripts/okf-validate.mjs bundles/rezepte --strict` aus dem Repo-Wurzelverzeichnis, oder `node scripts/check-bundles.mjs` für alle Bundles. Dazu `node scripts/check-wochenplaene.mjs` für die Aktualität der Wochenpläne.

# Was den Graphen kaputt macht

- **Ein Link auf eine `index.md`.** Ein Index ist Navigation, kein Konzept. Aus einem Konzept heraus wird immer auf ein Konzept verlinkt, nie auf die Übersicht daneben.
- **Eine Zutat ohne Rückverweis.** Sie ist dann nur über den Index erreichbar und taucht in keiner Rückwärtssuche auf.
- **Eine Zutat doppelt.** „Frühlingszwiebel" und „Lauchzwiebel" sind dasselbe Konzept. Ein Lebensmittel, eine Datei, die zweite Bezeichnung steht im Fließtext.
- **Ein Wochenplan, der ein geändertes Gericht nicht nachvollzieht.** Er nennt dann Zeiten und Einkaufsmengen, die nicht mehr stimmen, und ist schlimmer als kein Plan. Deshalb der Prüfschritt oben.
- **Mengen im Zutatenkonzept.** Mengen gehören ins Rezept, das Zutatenkonzept beschreibt das Lebensmittel. Sonst muss jede Zutat bei jedem neuen Gericht angefasst werden.

# Herkunft festhalten

Stammt ein Gericht aus einer eigenen Notiz, gehört diese als `sources`-Eintrag mit `author: human:sascha` ins Frontmatter, verlinkte Videos und Rezeptseiten als eigene Einträge daneben. `generated.by` bleibt davon unberührt: dort steht, wer den Konzepttext geschrieben hat, nicht woher das Rezept stammt.

Wird eine dünne Notiz aus einer fremden Quelle aufgefüllt, muss im Text stehen, wo die Notiz endet und die Ergänzung beginnt. Liegt gar keine Anleitung vor, bekommt das Konzept `status: draft` und eine Liste der offenen Punkte, wie beim [Pulled Beef](/gerichte/pulled-beef.md). `verified` wird nie vorsorglich gesetzt: es steht für ein tatsächlich nachgekochtes und bestätigtes Rezept.

# Das Feld `aufbewahrung`

Jedes `Rezept` und jede `Rezeptkomponente` trägt es. Es fasst zusammen, was der Abschnitt „Aufbewahren" im Text ausführt, und macht die Ebene maschinenlesbar, so dass sich das Bundle nach „was kann ich vorkochen" filtern lässt:

```yaml
aufbewahrung:
  eignung: gut            # gut | eingeschränkt | schlecht, gerne mit Zusatz
  kuehlschrank: 3 bis 4 Tage
  gefrierfach: 3 Monate   # oder: nicht empfohlen
```

Weitere Schlüssel sind erlaubt, wo sie etwas beitragen, etwa `raumtemperatur` bei [Brownies](/gerichte/brownies.md). Wo sich Bestandteile unterschiedlich verhalten, sagt das der Wert selbst: bei der [Shakshuka](/gerichte/shakshuka.md) steht `Sauce 3 Monate, Eier nie`. Die Zeitangaben sind Qualitätsgrenzen und keine Sicherheitsgarantien, und sie gehören nicht geraten: wo eine Angabe unsicher ist, gehört das in den Text, nicht in ein glattes Feld.

Die Zutatenkonzepte bleiben davon unberührt. Sie behandeln unter „Einkauf und Lagerung" das rohe Lebensmittel vor dem Kochen, `aufbewahrung` behandelt das fertige Gericht danach.

# Was in ein Zutatenkonzept gehört

Was das Lebensmittel ist, welche Sorten es gibt und wie sie sich unterscheiden, worauf es beim Einkauf ankommt, wie es gelagert wird, wie es in der Küche behandelt wird (mit Links auf die Techniken), womit es sich ersetzen lässt, und in welchen Gerichten es vorkommt. Nicht: Nährwerttabellen und Botanik ohne Küchenrelevanz.
