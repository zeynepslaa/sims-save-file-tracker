# Oyun ile “canlı” senkron — nasıl çalışır?

## Kısa gerçek

- **Tarayıcı**, The Sims 4’ün içine bağlanamaz. Oyun kendi güvenlik modelinde çalışır.
- **Çözüm:** Arada küçük bir **köprü** (Mac’te çalışan `npm run bridge`) durur. Bu program `localhost:3847` üzerinde dinler.
- **Web uygulaması** birkaç saniyede bir `GET /api/pull` ile kuyruktaki güncellemeleri alır ve listeyi günceller.
- **Gelecekte** yazacağın Sims 4 **script modu** (.ts4script), oyunda bir olay olduğunda `POST /api/push` ile aynı köprüye JSON gönderebilir — böylece “neredeyse eş zamanlı” his oluşur.

## Şu an ne hazır?

| Parça | Durum |
|--------|--------|
| Köprü sunucusu (`scripts/game-bridge.mjs`) | Hazır — `npm run bridge` |
| Web uygulaması polling | Hazır — **Settings** → Enable bridge polling |
| Sims 4 içinden otomatik POST | **Henüz yok** — ayrı mod projesi (Python 3.7 derleme vb.) |

## POST formatı (mod veya test için)

```json
{
  "updates": [
    {
      "worldName": "Willow Creek",
      "lotName": "My Starter",
      "status": "finished"
    }
  ]
}
```

`worldName` tracker’daki dünya adıyla **aynı** olmalı (ör. “Willow Creek”).  
`lotName` yoksa yeni lot oluşturulur; varsa alanlar birleştirilir.

## İki terminal akışı

1. Terminal A: `npm run dev` (web)
2. Terminal B: `npm run bridge` (köprü)
3. Tarayıcı: **Settings** → bridge’i aç
4. Test: Terminal C’de `curl` ile POST at (Settings sayfasındaki örnek)

## Sonraki adım (oyun modu)

Sims 4 script tarafında `requests` benzeri HTTP yoksa, mod bazen dosyaya yazar ve küçük bir watcher script köprüye aktarır — bunu birlikte mod projesinde netleştiririz.
