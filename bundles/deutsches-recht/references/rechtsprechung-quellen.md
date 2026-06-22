---
type: Reference
title: "Rechtsprechung und frei zugängliche Quellen"
description: Die frei zugänglichen Fundstellen für Gerichtsentscheidungen (bundesgerichtshof.de als amtliche Quelle der BGH-Rechtsprechung, daneben rechtsprechung-im-internet.de, dejure.org, openJur, Curia) und die Grenze zur kostenpflichtigen Kommentarliteratur, die dieses Bündel zitiert, aber nicht spiegelt.
resource: https://www.bundesgerichtshof.de/
tags: [external, rechtsprechung, case-law, frei, bundesgerichtshof, dejure, openjur, urheberrecht]
timestamp: 2026-06-22T12:00:00Z
---

# Warum eine Rechtsprechungsebene

Der **Normtext** ist die frei verfügbare Grundlage (gesetze-im-internet.de), aber das geltende Recht entsteht zu großen Teilen erst in der **Rechtsprechung**. Viele Tatbestände sind ohne die Leitentscheidungen nicht anwendbar: die Vorsatzanfechtung lebt von der BGH-Linie zu § 133 InsO, die Sachmangelhaftung von der Auslegung des § 434 BGB, die Beweiswürdigung von der Konkretisierung des § 286 ZPO. Konzepte dieses Bündels führen daher, wo die Rechtsprechung die Regel prägt, unter `# Rechtsprechung` die **Leitentscheidungen** mit Gericht, Datum und Aktenzeichen und einer kurzen Zusammenfassung des tragenden Gedankens.

# Frei zugängliche Quellen

| Quelle | Inhalt | Fundstelle |
|--------|--------|------------|
| Bundesgerichtshof (Entscheidungssuche) | Amtlicher Volltext aller veröffentlichten BGH-Entscheidungen samt amtlicher Leitsätze, frei; die maßgebliche Quelle gerade für die BGH-geprägte Insolvenzanfechtung | https://www.bundesgerichtshof.de/ |
| Rechtsprechung im Internet | Amtliche Entscheidungssammlung des Bundes (BVerfG, BGH, BVerwG, BFH, BAG, BSG), frei | https://www.rechtsprechung-im-internet.de/ |
| dejure.org | Normtext, Querverweise zwischen Normen und umfangreiche Rechtsprechungsnachweise je Paragraph, frei | https://dejure.org/ |
| openJur | Freie Sammlung von Gerichtsentscheidungen mit Volltext und Zitierhilfe | https://openjur.de/ |
| Curia / EUR-Lex | Entscheidungen des EuGH und des Gerichts der EU | https://curia.europa.eu/ |

Diese Quellen liefern den Volltext oder die Fundstelle einer Entscheidung kostenlos. Sie sind der Weg, die in den Konzepten genannten Aktenzeichen gegenzuprüfen und die jeweils aktuelle Linie zu verfolgen.

# Amtliche Quelle und Verhältnis der Quellen

Maßgeblich ist die **amtliche Quelle**. Für die BGH-Rechtsprechung ist das **bundesgerichtshof.de** (Entscheidungssuche): dort steht der Volltext mit den amtlichen Leitsätzen, und dorthin verweist dieses Bündel als `resource` einer Entscheidung; daneben tritt die amtliche Sammlung (etwa BGHZ). **dejure.org und openJur ziehen ihre Texte aus diesen amtlichen Quellen** und sind insoweit nachgelagert. Sie sind aber nicht überflüssig: ihr eigener Wert liegt in der **Verknüpfung Norm zu Entscheidung** (welche Urteile zu § 133 InsO ergangen sind) und in der Abdeckung **anderer Gerichte** (Oberlandesgerichte, BAG, BVerfG), für die bundesgerichtshof.de naturgemäß nichts enthält. Kurz: für den Beleg einer konkreten BGH-Entscheidung genügt die amtliche Quelle, für das Auffinden nach Norm und für die Instanzrechtsprechung bleiben dejure und rechtsprechung-im-internet.de nützlich.

# Grenze zur Kommentarliteratur

Hier ist die urheberrechtliche Lage entscheidend, und sie verläuft genau zwischen Rechtsprechung und Literatur:

- **Gerichtsentscheidungen und ihre amtlich verfassten Leitsätze sind nach § 5 UrhG amtliche Werke und gemeinfrei.** Sie genießen keinen Urheberrechtsschutz und dürfen im Wortlaut wiedergegeben werden. Eine Leitentscheidung kann daher einen eigenen Knoten (`type: Gerichtsentscheidung`) erhalten, der den amtlichen Leitsatz und die Kernaussage festhält und auf den amtlichen Volltext verweist.
- **Die Kommentarliteratur** (Münchener Kommentar, Staudinger, Grüneberg und die Angebote der Verlage über Beck-Online, Wolters Kluwer, juris sowie KI-gestützte Dienste wie Libra oder Noxtus) ist dagegen **urheberrechtlich geschützt und kostenpflichtig**. Dieses Bündel **spiegelt sie nicht**, sondern verweist auf sie höchstens als Fundstelle, ohne ihren Text zu übernehmen.

So entsteht der Mehrwert (die nach Norm geordnete, an Entscheidungen belegte Dogmatik) auf rechtlich sauberer, frei verteilbarer Grundlage.

# Verhältnis zum Korpus-Bündel

Der **Volltext-Korpus** der BGH-Entscheidungen liegt im **Schwesterbündel `bgh-rechtsprechung`**, nicht hier. Die Trennung ist bewusst: dieses Bündel hält die kuratierte, nach Norm geordnete Dogmatik schlank (schrittweise Offenlegung), das Korpus-Bündel hält je Entscheidung einen eigenen Knoten mit Leitsatz und Volltext und erschließt sie über ein Norm-Register (welche Urteile zu welcher Vorschrift). Die Konzepte hier zitieren eine Entscheidung über Gericht, Datum und Aktenzeichen; ein Agent, der beide Bündel geladen hat, findet darüber den Volltext im Korpus-Bündel.

# Hinweis

Eine Entscheidung wird mit **Gericht, Datum und Aktenzeichen** zitiert (etwa "BGH, Urteil vom 06.05.2021 - IX ZR 72/20"); das ist die stabile, gerichtsübergreifend auffindbare Kennung. Rechtsprechung entwickelt sich fort: das in einem Konzept genannte Datum markiert den Stand, und die obigen Quellen zeigen jüngere oder abweichende Entscheidungen.

# Citations

[1] [Bundesgerichtshof, Entscheidungssuche](https://www.bundesgerichtshof.de/SiteGlobals/Forms/Suche/EntscheidungssucheBGH_Formular.html)
[2] [Rechtsprechung im Internet (Bund)](https://www.rechtsprechung-im-internet.de/)
[3] [dejure.org](https://dejure.org/)
[4] [openJur](https://openjur.de/)
[5] [§ 5 UrhG (amtliche Werke)](https://www.gesetze-im-internet.de/urhg/__5.html)
