# 🏆 Mundialito PES 6

Web oficial del torneo. Stack: **Next.js 14 + CSS Modules**, sin base de datos — todo se actualiza editando un único archivo.

---

## Arrancar en local

```bash
npm install
npm run dev
# → http://localhost:3000
```

---

## Flujo de trabajo

### 1. Después del sorteo en vivo

Editar **`lib/tournament.js`**:

#### Jugadores
```js
P1:  { name: "Pichon",   flag: "🇦🇷", nation: "Argentina" },
P2:  { name: "Crack10",  flag: "🇧🇷", nation: "Brasil"    },
// ...
```

#### Grupos
```js
A: ["P3", "P7", "P12", "P19"],
B: ["P1", "P5", "P14", "P22"],
// ...
```

### 2. Cargar resultados de la fase de grupos

En la sección `MATCHES`, cambiar `homeScore: null` por el resultado real:
```js
{ id: "A1", ..., homeScore: 2, awayScore: 1 },
```

La tabla de posiciones y mejores terceros se calculan **automáticamente**.

### 3. Cargar clasificados en Octavos

Una vez conocidos, completar `home` y `away` en los partidos `R1`–`R8`:
```js
{ id: "R1", ..., home: "P3", away: "P14", homeScore: null, awayScore: null },
```

### 4. Penales en eliminatoria

Agregar `homeScorePens` y `awayScorePens`:
```js
{ id: "R1", ..., homeScore: 1, awayScore: 1, homeScorePens: 4, awayScorePens: 3 },
```

---

## Deploy en Vercel

```bash
# Conectar repo en vercel.com → importar proyecto → deploy automático
# Cada push a main actualiza el sitio en ~30 segundos
```

O desde CLI:
```bash
npm i -g vercel
vercel --prod
```

---

## Estructura

```
lib/
  tournament.js   ← ÚNICO archivo a editar
  standings.js    ← lógica de cálculo (no tocar)
components/
  Header.jsx
  GroupTable.jsx  ← tabla de posiciones por grupo
  MatchCard.jsx   ← tarjeta de partido (resultado u horario)
  Bracket.jsx     ← llave de eliminatoria
pages/
  index.jsx       ← página principal con tabs
styles/
  globals.css
```
