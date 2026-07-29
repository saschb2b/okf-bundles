---
type: Anleitung
title: Vorratshaltung, von der Pfanne in den Vorrat
description: Die querliegende Ebene dieses Bundles, die für jedes fertige Gericht festhält, wie es portioniert, gekühlt, eingefroren und wieder aufgewärmt wird.
tags: [anleitung, vorratshaltung, meal-prep, lagerung, tiefkuehl]
generated:
  by: claude-code/opus-5
  at: 2026-07-29T21:00:00Z
sources:
  - id: erfahrung
    resource: Produzentenwissen, Stand 2026-07-29, nicht aus einer Vorlage dieses Bundles gelesen
    title: Produzentenwissen
---

# Warum das eine eigene Ebene ist

Ein Rezept endet üblicherweise auf dem Teller. Tatsächlich endet es im Kühlschrank, denn die meisten dieser Gerichte werden für vier Portionen gekocht und von ein bis zwei Personen gegessen. Was danach passiert, entscheidet darüber, ob am Mittwoch eine Mahlzeit bereitsteht oder eine Dose weggeworfen wird.

Diese Frage hat eigene Regeln, die weder ins Rezept noch in die Zutat gehören. Sie hängt nicht am Gericht, sondern an seiner Beschaffenheit: eine Sauce verhält sich anders als eine Kruste, Reis anders als Teig, ein pochiertes Ei anders als geschmortes Fleisch. Deshalb liegt sie hier als eigene Ebene, quer zu den vier Ebenen aus dem [Überblick](/overview.md), und jedes Gericht und jede Komponente trägt ihren Abschnitt „Aufbewahren".

# Die vier Handgriffe

```mermaid
flowchart LR
  F[Fertiges Gericht] --> A[Abkühlen]
  A --> P[Portionieren]
  P --> K[Kühlschrank]
  P --> G[Gefrierfach]
  K --> W[Auftauen und Aufwärmen]
  G --> W
  W --> M[Mahlzeit]
```

Jeder Schritt ist eine eigene [Technik](/techniken/abkuehlen.md) mit eigenem Konzept, weil jeder eigene Fehler hat:

1. **[Abkühlen](/techniken/abkuehlen.md).** Schnell und flach, bevor der Deckel draufkommt. Der einzige Schritt mit einer echten Hygienefolge.
2. **[Portionieren](/techniken/portionieren.md).** In Mahlzeiten teilen, nicht in Topfmengen, und beschriften. Der Schritt, der aus Resten einen Vorrat macht.
3. **[Einfrieren](/techniken/einfrieren.md).** Flach, luftfrei, mit Datum. Wo die Haltbarkeiten stehen und was sich nicht eignet.
4. **[Auftauen und Aufwärmen](/techniken/auftauen-und-aufwaermen.md).** Nach Textur, nicht nach Bequemlichkeit. Knuspriges nie in die Mikrowelle.

# Die drei Fragen an jedes Gericht

Wer ein neues Gericht in dieses Bundle schreibt, beantwortet für den Abschnitt „Aufbewahren" drei Dinge:

Portionierbar?
: Lässt sich das Gericht in Mahlzeiten teilen, und wenn ja, an welcher Naht? Bei einem Eintopf überall, bei [Jiaozi](/gerichte/jiaozi.md) stückweise, bei einer [Paella](/gerichte/paella.md) gar nicht ohne Verlust.

Was hält sich wie lange?
: Getrennt nach Kühlschrank und Gefrierfach, und getrennt nach Bestandteil, wo die Bestandteile sich unterschiedlich verhalten. Die [Shakshuka](/gerichte/shakshuka.md)sauce hält drei Monate, ihre Eier keinen Tag.

Wie kommt es zurück auf den Teller?
: Die Methode aus [Auftauen und Aufwärmen](/techniken/auftauen-und-aufwaermen.md), plus das, was ergänzt werden muss: eine Kelle Brühe, ein frisches Ei, frische Kräuter.

# Was in welche Kategorie fällt

Die Einordnung aller Gerichte und Komponenten dieses Bundles. Die Spalte `eignung` steht so auch im Frontmatter des jeweiligen Konzepts.

## Vorratsgerichte, dafür gemacht

| Gericht | Kühlschrank | Gefrierfach |
|---------|-------------|-------------|
| [Freezer-Burritos](/gerichte/burrito.md) | 3 Tage | 3 Monate |
| [Jiaozi](/gerichte/jiaozi.md), roh | 1 Tag | 3 Monate |
| [Sauerteigbrötchen](/gerichte/broetchen.md), vorgebacken | mehrere Monate | mehrere Monate |
| [Pulled Beef](/gerichte/pulled-beef.md) | 4 Tage | 3 Monate |
| [Curry-Roux](/komponenten/curry-roux.md) | 2 Wochen | 3 Monate |

## Halten sich gut

| Gericht | Kühlschrank | Gefrierfach |
|---------|-------------|-------------|
| [Japanisches Curry](/gerichte/japanisches-curry.md) | 3 bis 4 Tage | 3 Monate, Kartoffeln ausgenommen |
| [Japanisches Curry nach Kenji](/gerichte/japanisches-curry-kenji.md) | 3 bis 4 Tage | 3 Monate |
| [Chicken Curry (indisch)](/gerichte/chicken-curry-indisch.md) | 3 Tage | 2 Monate |
| [Shakshuka](/gerichte/shakshuka.md), nur die Sauce | 4 Tage | 3 Monate |
| [Brownies](/gerichte/brownies.md) | Raumtemperatur 4 Tage | 3 Monate |
| [Pizzaschnecken](/gerichte/pizzaschnecken.md), roh gerollt | 1 Tag | 3 Monate |
| [Japanischer Reis](/komponenten/japanischer-reis.md) | nicht empfohlen | 1 Monat |
| [Onigiri](/gerichte/onigiri.md) | nicht empfohlen | 1 Monat |
| [Jiaozi-Teig](/komponenten/jiaozi-teig.md) | 1 Tag | 3 Monate |
| [Focaccia](/gerichte/focaccia.md) | Raumtemperatur 2 Tage | 3 Monate |

## Eingeschränkt

| Gericht | Warum |
|---------|-------|
| [Bratreis mit Ei und Gemüse](/gerichte/bratreis-mit-ei-und-gemuese.md) | Ist selbst schon Resteverwertung. Zweimal gelagerter Reis wird nicht besser |
| [Tofu mit Brokkoli](/gerichte/tofu-brokkoli.md) | Kühlschrank ja, Gefrierfach nein: der Tofu wird schwammig, der Brokkoli weich |
| [Jiaozi-Füllung](/komponenten/jiaozi-fuellung.md) | Besser als fertige Teigtasche einfrieren als als rohe Hackmasse |

## Frisch essen

| Gericht | Warum |
|---------|-------|
| [Paella](/gerichte/paella.md) | Der [Socarrat](/techniken/socarrat.md) entsteht einmal und kommt nicht wieder |
| [Scampi-Erdnussbutter-Nudeln](/gerichte/scampi-erdnussbutter-nudeln.md) | [Garnelen](/zutaten/fisch/garnele.md) werden beim Aufwärmen zäh, Reisbandnudeln matschig |
| [Sushi-Reis](/komponenten/sushi-reis.md) | Gewürzter Reis ist am selben Tag am besten und verträgt keine Kälte |

# Wo die Grenze zur Zutat liegt

Dieses Konzept behandelt **fertiges Essen**. Wie ein einzelnes Lebensmittel vor dem Kochen gelagert wird, steht im Zutatenkonzept unter „Einkauf und Lagerung", zum Beispiel bei [Butter](/zutaten/grundzutaten/butter.md), [Tomatenmark](/zutaten/wuerzmittel/tomatenmark.md) oder [Weizenmehl](/zutaten/grundzutaten/weizenmehl.md). Beide Ebenen benutzen dieselben vier Techniken, beantworten aber verschiedene Fragen: die Zutat fragt „wie halte ich das frisch, bis ich es koche", das Gericht fragt „wie halte ich das, nachdem ich es gekocht habe".

# Verwandtes

Die Konventionen für das Frontmatter-Feld `aufbewahrung` und den Pflichtabschnitt stehen in [Arbeiten in diesem Bundle](/guide/arbeiten-in-diesem-bundle.md). Wer umgekehrt von vorhandenen Zutaten zum Gericht sucht, nimmt die [Rückwärtssuche](/guide/rueckwaertssuche.md).
