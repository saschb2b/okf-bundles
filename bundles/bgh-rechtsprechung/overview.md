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
- **Stapel-Ingestion:** Für den Massenbezug ist die offene, maschinenlesbare Bereitstellung von [rechtsprechung-im-internet.de](https://www.rechtsprechung-im-internet.de/) geeignet (Inhaltsverzeichnis `rii-toc.xml`, je Entscheidung eine XML-Datei). Das Verfahren: Inhaltsverzeichnis laden, BGH-Entscheidungen filtern, je Entscheidung XML holen und in ein Konzept übersetzen (Aktenzeichen, Datum, Senat, Leitsätze, Normen, Tenor, Gründe), nach `entscheidungen/<senat>/<jahr>/` einsortieren, danach Norm-Register und `index.md` neu erzeugen und validieren. Der Lauf ist als Stapelverarbeitung gedacht, in Scheiben und mit Höflichkeitspausen; er wird gesondert ausgeführt, nicht von Hand.
- **Abgrenzung:** Ein roher Volltext-Korpus für Suche oder Vektoreinbettung ist ein anderes Artefakt als dieses kuratierte, nach Norm erschlossene Bündel. Dieses Bündel ist beides zugänglich (Mensch wie Agent), aber bleibt OKF-konform strukturiert.

# Stand und Haftung

Der Seed deckt die Anfechtungs-Leitentscheidungen des IX. Zivilsenats ab, mit Kernaussagen bis der Volltext-Ingest die wörtlichen Leitsätze und Gründe nachträgt. Entscheidungen sind eine bewegliche Materie. Das bei jeder Entscheidung genannte Datum und Aktenzeichen sind der Weg zur amtlichen Gegenprüfung; jüngere oder abweichende Rechtsprechung ist dort zu suchen. Dies ist keine Rechtsberatung.
