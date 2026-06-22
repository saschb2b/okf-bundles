---
type: Overview
title: "BGH-Rechtsprechung: Überblick"
description: Aufbau, Navigation, Quelle und Ingestionsverfahren des BGH-Entscheidungskorpus als OKF-Bündel, ausgelegt auf Vollständigkeit bei erhaltener Navigierbarkeit über ein Norm-Register.
resource: https://www.bundesgerichtshof.de/
tags: [bgh-rechtsprechung, overview, navigation, ingestion]
timestamp: 2026-06-22T12:00:00Z
---

# Was das ist

Dieses Bündel hält die **veröffentlichten Entscheidungen des Bundesgerichtshofs** als einzeln adressierbare Konzepte vor, je Entscheidung einen Knoten mit Volltext und Leitsatz. Die zugrunde liegenden Vorschriften stehen amtlich bei gesetze-im-internet.de; die Auslegungsdogmatik ist nicht Gegenstand dieses Bündels. Warum überhaupt ein eigenes Bündel: ein Volltext-Korpus wird groß, und ein großer Korpus in einem kuratierten Wissensbündel würde dessen schrittweise Offenlegung zerstören.

Rechtsgrundlage der Wiedergabe: Entscheidungen und amtlich verfasste Leitsätze sind nach **§ 5 UrhG amtliche Werke und gemeinfrei**, dürfen also im Wortlaut aufgenommen werden (anders als die geschützte Kommentarliteratur).

# Navigieren bei großem Bestand

Der Bestand soll vollständig werden und kann Zehntausende Entscheidungen umfassen. Navigierbar bleibt er, weil niemand die Gesamtliste liest, sondern über einen der drei Einstiege absteigt (Prinzip der schrittweisen Offenlegung):

1. **Nach Norm** ([nach-norm/](nach-norm/index.md)). Der wichtigste Einstieg. Je Vorschrift ein Register, das die einschlägigen Entscheidungen verlinkt. Es wird aus dem Feld `normen` jeder Entscheidung erzeugt. Wer zu § 133 InsO arbeitet, öffnet ein Register mit den Entscheidungen zu § 133, nicht den ganzen Korpus.
2. **Nach Senat und Jahr** ([entscheidungen/](entscheidungen/index.md)). Der Baum `entscheidungen/<senat>/<jahr>/<aktenzeichen>.md` ist der feste Speicherort und der strukturelle Einstieg. Jede Ebene hat ein `index.md`, das nur die nächste Ebene listet.
3. **Nach Aktenzeichen.** Das Aktenzeichen ist der Dateiname, der Zugriff also ein direkter Pfad.

# Eine Entscheidung als Konzept

Jede Entscheidung ist ein Konzept mit `type: Gerichtsentscheidung`:

- **Frontmatter:** `gericht`, `senat`, `datum` (ISO), `aktenzeichen`, `ecli` (sofern bekannt), `fundstelle` (amtliche Sammlung wie `BGHZ 230, 28`), `normen` (Liste der ausgelegten Vorschriften, speist das Norm-Register), `resource` (amtliche Fundstelle).
- **Körper:** `# Leitsatz` (amtlicher Leitsatz, wörtlich, sofern vorhanden), sonst eine klar als solche bezeichnete `# Kernaussage`; `# Normen` (Querbezug zu den Vorschriften); `# Fundstelle und Volltext` mit Link zur amtlichen Quelle; `# Citations`.

# Quelle und Ingestion

- **Amtliche Quelle und Zitat:** [bundesgerichtshof.de](https://www.bundesgerichtshof.de/) (Entscheidungssuche) und die amtliche Sammlung (BGHZ, BGHSt). Diese stehen als `resource` und in den Citations.
- **Stapel-Ingestion:** Für den Massenbezug dient die offene, maschinenlesbare Bereitstellung von [rechtsprechung-im-internet.de](https://www.rechtsprechung-im-internet.de/) (Inhaltsverzeichnis `rii-toc.xml`, je Entscheidung eine ZIP mit einer XML nach `rii-dok.dtd`). Zwei Skripte im Repo führen das aus:
  - `scripts/ingest-bgh-rechtsprechung.mjs` lädt das Inhaltsverzeichnis, filtert die BGH-Entscheidungen, holt je Entscheidung die XML, übersetzt sie in ein Konzept (`entscheidungen/<senat>/<jahr>/<aktenzeichen>.md`) und überspringt bereits vorhandene Dateien (wiederaufsetzbar). Reihenfolge: erst ein Rauchtest `--limit 5` oder `--selftest`, dann der volle Lauf, in Scheiben (`--since`) und mit Höflichkeitspausen (`--delay`).
  - `scripts/build-rechtsprechung-index.mjs` erzeugt danach die Navigation neu aus dem Feld `normen` der Konzepte: die Norm-Register (`nach-norm/<gesetz>.md`) und die `index.md` je Ebene. So bleibt der Bestand bei beliebiger Größe über die Norm erschlossen.
- **Abgrenzung:** Ein roher Volltext-Korpus für Suche oder Vektoreinbettung ist ein anderes Artefakt als dieses kuratierte, nach Norm erschlossene Bündel. Dieses Bündel ist beides zugänglich (Mensch wie Agent), aber bleibt OKF-konform strukturiert.

# Stand und Haftung

Eingelesen sind über 800 Entscheidungen des IX. Zivilsenats (ab 2010) mit Leitsatz, Tenor und Gründen im Volltext; die übrigen Jahrgänge und Senate folgen mit demselben, wiederaufsetzbaren Lauf. Entscheidungen sind eine bewegliche Materie. Das bei jeder Entscheidung genannte Datum und Aktenzeichen sind der Weg zur amtlichen Gegenprüfung; jüngere oder abweichende Rechtsprechung ist dort zu suchen. Dies ist keine Rechtsberatung.
