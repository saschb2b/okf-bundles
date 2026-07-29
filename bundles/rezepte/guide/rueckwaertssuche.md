---
type: Anleitung
title: Rückwärtssuche, von Zutaten zum Gericht
description: Wie ein Agent aus einer Liste vorhandener Zutaten die kochbaren Gerichte dieses Bundles ableitet.
tags: [anleitung, suche, zutaten, methode]
generated:
  by: claude-code/unrecorded
  at: 2026-07-29T12:00:00Z
---

# Die Frage

„Ich habe Zwiebeln, Karotten, Kartoffeln und Hähnchenschenkel da. Was kann ich kochen?" Das ist der Grund, warum in diesem Bundle jede Zutat eine eigene Datei hat statt einer Zeile in einer Rezeptliste.

# Das Verfahren

1. **Zutaten auflösen.** Jede genannte Zutat auf ihr Konzept abbilden, über die Warengruppen-Indexe unter `zutaten/`. Synonyme und Umgangsformen mitdenken: „Frühlingszwiebel" ist „Lauchzwiebel", „Erdapfel" ist [Kartoffel](/zutaten/gemuese/kartoffel.md).
2. **Rückverweise einsammeln.** Im Abschnitt `# Wird verwendet in` jedes Zutatenkonzepts stehen die Gerichte und Komponenten, die sie brauchen. Das ist die Kandidatenliste.
3. **Schnittmenge bilden und zählen.** Ein Gericht, das in vielen der vorhandenen Zutaten auftaucht, ist ein starker Kandidat. Ein Gericht, das nur in einer auftaucht, meist nicht.
4. **Gegen die Zutatenliste prüfen.** Das Gericht selbst öffnen und seine Zutatentabelle Zeile für Zeile abgleichen. Erst hier zeigt sich, was fehlt.
5. **Lücken bewerten statt ausschließen.** Fehlt eine Zutat, den Abschnitt `# Ersatz` ihres Konzepts lesen. Fehlt nur Beiwerk, ist das Gericht kochbar. Fehlt das Kernaroma, nicht.

# Welche Zutat wie viel wiegt

Nicht jede Zutat trägt gleich viel Information. Für die Bewertung eines Kandidaten:

| Rolle | Beispiel im [japanischen Curry](/gerichte/japanisches-curry.md) | Fehlt sie, dann |
|-------|------------------------------------------------------------------|-----------------|
| Kernaroma, macht das Gericht aus | [Currypulver](/zutaten/gewuerze/currypulver.md), [Garam Masala](/zutaten/gewuerze/garam-masala.md) | ist es ein anderes Gericht |
| Träger, bestimmt Textur und Sättigung | [Kartoffel](/zutaten/gemuese/kartoffel.md), [Japanischer Kurzkornreis](/zutaten/grundzutaten/japanischer-kurzkornreis.md) | braucht es echten Ersatz |
| Basis, aromatisches Fundament | [Zwiebel](/zutaten/gemuese/zwiebel.md), [Knoblauch](/zutaten/gemuese/knoblauch.md), [Ingwer](/zutaten/gemuese/ingwer.md) | wird es flach, bleibt aber kochbar |
| Tiefenwürze, feiner Feinschliff | [Worcestershiresauce](/zutaten/wuerzmittel/worcestershiresauce.md), [Honig](/zutaten/wuerzmittel/honig.md), [Apfel](/zutaten/obst/apfel.md) | merkt es außer dir niemand |
| Vorratsware, praktisch immer da | [Salz](/zutaten/gewuerze/salz.md), [Rapsöl](/zutaten/grundzutaten/rapsoel.md), [Weizenmehl](/zutaten/grundzutaten/weizenmehl.md) | zählt sie in der Suche nicht mit |

Deshalb ist die reine Trefferzahl irreführend: wer Salz, Öl und Mehl im Haus hat, „passt" zu jedem Gericht. Vorratsware wird bei der Bewertung nicht mitgezählt.

# Die zweite Suchrichtung: über die Technik

Dieselbe Mechanik funktioniert für Können und Ausstattung. Jede Zubereitungstechnik führt unter `# Wird gebraucht für` die Gerichte, die sie verlangen. Wer keinen Reiskocher und keinen schweren Topf hat, sieht über [Reis kochen nach der Absorptionsmethode](/techniken/reis-kochen-absorptionsmethode.md), welche Gerichte davon abhängen. Umgekehrt beantwortet der Weg „Technik zu Gericht" die Frage „Was kann ich mit dem, was ich kann, kochen?"

# Ehrlich bleiben

Die Rückverweise sind handgepflegt (siehe [Arbeiten in diesem Bundle](/guide/arbeiten-in-diesem-bundle.md)), also kann `# Wird verwendet in` unvollständig sein, wenn beim letzten Gericht ein Schritt vergessen wurde. Ein Treffer ist verlässlich, ein Nicht-Treffer nicht. Wenn die Rückverweise nichts liefern, lohnt der Blick in die Zutatentabellen der Gerichte selbst, und der gefundene Fehler gehört gleich zurück in die Zutat.
