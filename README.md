# TaskBoard
(Task & Notes Dashboard)

Frontendová SPA aplikace vytvořená v rámci semestrální práce.  
Aplikace slouží ke správě úkolů a poznámek bez backendu, s využitím klientského úložiště.

---

## Použité technologie

- Vue 3 (Composition API)
- Vite
- Pinia
- Vue Router
- TypeScript
- LocalStorage
- Vitest (unit testy)
- Cypress (e2e testy)

---

## Požadavky

- Node.js (doporučeno verze 22.12+)
- npm

---

## Instalace projektu

1. Naklonování repozitáře:

```bash
git clone <URL_REPOZITÁŘE>
cd taskboard
```

2. Instalace závislostí:

```bash
npm install
```

---

## Spuštění aplikace (vývojový režim)

```bash
npm run dev
```

Aplikace poběží na:

```arduino
http://localhost:5173
```

---

## Build pro produkci

```bash
npm run build
```

---

## Spuštění jednotkových testů (Vitest)

```bash
npx vitest
```

Volitelně s UI:

```bash
npx vitest --ui
```

---

## Spuštění end-to-end testů (Cypress)

1. Spusť aplikaci:

```bash
npm run dev
```

2. V jiném terminálu spusť Cypress:

```bash
npx cypress open
```

---

## Ukládání dat

Data (úkoly a poznámky) jsou ukládána do LocalStorage prohlížeče.
Při obnovení stránky zůstávají zachována.

---

## Autor

Adam Zinzer - semestrální práce