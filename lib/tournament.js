// ============================================================
//  MUNDIALITO PES 6 — CONFIGURACIÓN CENTRAL DEL TORNEO
//  Editar este archivo tras el sorteo en vivo.
// ============================================================

// --- JUGADORES -----------------------------------------------
// iso2: código de país en 2 letras (minúsculas) → muestra imagen de bandera real.
//   "ar" Argentina · "br" Brasil · "de" Alemania · "fr" Francia
//   "it" Italia · "es" España · "pt" Portugal · "nl" Países Bajos
//   "gb" Inglaterra · "us" EEUU · "mx" México · "co" Colombia
//   "uy" Uruguay · "cl" Chile · "hr" Croacia · "rs" Serbia
//   "be" Bélgica · "ng" Nigeria · "sn" Senegal · "ma" Marruecos
//   "jp" Japón · "kr" Corea del Sur · "au" Australia
// Si iso2 está vacío, usa el emoji del campo flag como fallback.
export const PLAYERS = {
  P1:  { name: "Marcos_Emirr",  iso2: "pt",   flag: "🏴", nation: "Portugal"  },
  P2:  { name: "evilomt",  iso2: "hr",   flag: "🏴", nation: "Croacia"  },
  P3:  { name: "Kenshi777",  iso2: "co",   flag: "🏴", nation: "Colombia"  },
  P4:  { name: "Saicrou",  iso2: "fr",   flag: "🏴", nation: "Francia"  },
  P5:  { name: "urubaunsub",  iso2: "us",   flag: "🏴", nation: "Estados Unidos"  },
  P6:  { name: "Hikusen",  iso2: "de",   flag: "🏴", nation: "Alemania"  },
  P7:  { name: "Jonyfz",  iso2: "ci",   flag: "🏴", nation: "Costa de Marfil"  },
  P8:  { name: "Villakidd",  iso2: "es",   flag: "🏴", nation: "España"  },
  P9:  { name: "Lukitax",  iso2: "nl",   flag: "🏴", nation: "Paises Bajos"  },
  P10: { name: "IgnacioTO5", iso2: "it",   flag: "🏴", nation: "Italia" },
  P11: { name: "emiliozeeta", iso2: "be",   flag: "🏴", nation: "Bélgica" },
  P12: { name: "ObitoGames36", iso2: "uy",   flag: "🏴", nation: "Uruguay" },
  P13: { name: "Joaquiv", iso2: "no",   flag: "🏴", nation: "Noruega" },
  P14: { name: "Hunter_rodrig29", iso2: "ma",   flag: "🏴", nation: "Marruecos" },
  P15: { name: "Markito9320", iso2: "at",   flag: "🏴", nation: "Austria" },
  P16: { name: "prodByLextone", iso2: "ua",   flag: "🏴", nation: "Ucrania" },
  P17: { name: "Shintejon", iso2: "ch",   flag: "🏴", nation: "Suiza" },
  P18: { name: "Maxi_LV116", iso2: "ar",   flag: "🏴", nation: "Argentina" },
  P19: { name: "Blastoise21", iso2: "kr",   flag: "🏴", nation: "Corea del Sur" },
  P20: { name: "Momegre57", iso2: "py",   flag: "🏴", nation: "Paraguay" },
  P21: { name: "1ru7", iso2: "mx",   flag: "🏴", nation: "México" },
  P22: { name: "Rider_PermaDeath", iso2: "jp",   flag: "🏴", nation: "Japón" },
  P23: { name: "Rasek", iso2: "gb",   flag: "🏴", nation: "Inglaterra" },
  P24: { name: "daiansuarez21", iso2: "br",   flag: "🏴", nation: "Brasil" },
};

// --- GRUPOS --------------------------------------------------
export const GROUPS = {
  A: ["P1",  "P2",  "P3",  "P4"],
  B: ["P5",  "P6",  "P7",  "P8"],
  C: ["P9",  "P10", "P11", "P12"],
  D: ["P13", "P14", "P15", "P16"],
  E: ["P17", "P18", "P19", "P20"],
  F: ["P21", "P22", "P23", "P24"],
};

// --- FECHAS DE TRANSMISIÓN -----------------------------------
// Cada "matchday" es una fecha de stream con su label y todos sus partidos.
// Agregar tantos como haga falta (fase de grupos + eliminatoria).
// streamDate: texto libre que se muestra como título de la fecha.
// label: etiqueta corta (ej. "Fecha 1", "Octavos").
export const MATCHDAYS = [
  { id: 1, label: "Fecha 1", streamDate: "Sábado 04 de Julio" },
  { id: 2, label: "Fecha 1", streamDate: "Domingo 05 de Julio" },

  { id: 3, label: "Fecha 2", streamDate: "Sábado 11 de julio"  },
  { id: 4, label: "Fecha 2", streamDate: "Domingo 12 de Julio" },

  { id: 5, label: "Fecha 3", streamDate: "Sábado 18 de julio" },
  { id: 6, label: "Fecha 3", streamDate: "Domingo 19 de julio" },

  { id: 7, label: "Octavos", streamDate: "Sábado 25 de julio" },
  { id: 8, label: "Octavos", streamDate: "Domingo 26 de julio" },

  { id: 9, label: "Cuartos", streamDate: "Sábado 1 de Agosto" },

  { id: 10, label: "Semis",   streamDate: "Domingo 2 de Agosto" },
  { id: 11, label: "Final",   streamDate: "Domingo 2 de Agosto" },
];

// --- PARTIDOS ------------------------------------------------
// matchdayId: referencia a MATCHDAYS[].id → agrupa todos los partidos de esa fecha
// time: hora del partido dentro del stream (ej. "20:00")
// homeScore / awayScore: null = no jugado, número = resultado
// Para eliminatorias con penales: homeScorePens / awayScorePens

// --- PARTIDOS ------------------------------------------------
// matchdayId: referencia a MATCHDAYS[].id
// time: hora del partido
// homeScore / awayScore: null = no jugado
// homeGoals / awayGoals: array de nombres de jugadores que metieron goles (pueden repetirse)
// homeCards / awayCards: array de { player, type } donde type es "yellow" o "red"
// Para eliminatorias con penales: homeScorePens / awayScorePens

export const MATCHES = [
  // ── FECHA 1 — SÁB 04/07  ─────────────────
  {
    id:"A1", stage:"group", group:"A", matchdayId:1, home:"P1", away:"P2", time:"22:00",
    homeScore: 4, awayScore: 0,
    homeGoals: ["Bernardo Silva", "Bernardo Silva", "Rafael Leão", "Rafael Leão"],
    awayGoals: [],
    homeCards: [{ player: "Cristiano Ronaldo", type: "yellow" }],
    awayCards: [{ player: "Gvardiol", type: "yellow" }],
  },
  { id:"A2", stage:"group", group:"A", matchdayId:1, home:"P3",  away:"P4",  time:"22:20", 
    homeScore:2, awayScore:1,
    homeGoals: ["Jhoan Arias", "James Rodríguez"],
    awayGoals: ["Kylian Mbappé"],
    homeCards: [],
    awayCards: [], },
  { id:"B1", stage:"group", group:"B", matchdayId:1, home:"P5",  away:"P6",  time:"22:40",
    homeScore:0, awayScore:2,
    homeGoals: [],
    awayGoals: ["Jamal Musiala", "G.E.: Tim Ream"],
    homeCards: [],
    awayCards: [], 
  },

  { id:"B2", stage:"group", group:"B", matchdayId:1, home:"P7",  away:"P8",  time:"23:00", 
    homeScore:2, awayScore:0,
    homeGoals: ["Yoan Bonny", "Amad Diallo"],
    awayGoals: [],
    homeCards: [],
    awayCards: [{ player: "Pedri", type: "red" }, { player: "Laporte", type: "red" }],
  },

  { id:"C1", stage:"group", group:"C", matchdayId:1, home:"P9",  away:"P10", time:"23:20",
    homeScore:null, awayScore:null,
    homeGoals: [],
    awayGoals: [],
    homeCards: [],
    awayCards: [], },

  { id:"C2", stage:"group", group:"C", matchdayId:1, home:"P11", away:"P12", time:"23:40", homeScore:null, awayScore:null },
  // ── FECHA 1 — DOM 05/07  ─────────────────  
  { id:"D1", stage:"group", group:"D", matchdayId:2, home:"P13", away:"P14", time:"22:00", homeScore:null, awayScore:null },
  { id:"D2", stage:"group", group:"D", matchdayId:2, home:"P15", away:"P16", time:"22:20", homeScore:null, awayScore:null },
  { id:"E1", stage:"group", group:"E", matchdayId:2, home:"P17", away:"P18", time:"22:40", homeScore:null, awayScore:null },
  { id:"E2", stage:"group", group:"E", matchdayId:2, home:"P19", away:"P20", time:"23:00", homeScore:null, awayScore:null },
  { id:"F1", stage:"group", group:"F", matchdayId:2, home:"P21", away:"P22", time:"23:20", homeScore:null, awayScore:null },
  { id:"F2", stage:"group", group:"F", matchdayId:2, home:"P23", away:"P24", time:"23:40", homeScore:null, awayScore:null },


  // ── FECHA 2 — SÁB 11/07 ─────────────────
  { id:"A3", stage:"group", group:"A", matchdayId:3, home:"P1",  away:"P3",  time:"22:00", homeScore:null, awayScore:null },
  { id:"A4", stage:"group", group:"A", matchdayId:3, home:"P2",  away:"P4",  time:"22:20", homeScore:null, awayScore:null },
  { id:"B3", stage:"group", group:"B", matchdayId:3, home:"P5",  away:"P7",  time:"22:40", homeScore:null, awayScore:null },
  { id:"B4", stage:"group", group:"B", matchdayId:3, home:"P6",  away:"P8",  time:"23:00", homeScore:null, awayScore:null },
  { id:"C3", stage:"group", group:"C", matchdayId:3, home:"P9",  away:"P11", time:"23:20", homeScore:null, awayScore:null },
  { id:"C4", stage:"group", group:"C", matchdayId:3, home:"P10", away:"P12", time:"23:40", homeScore:null, awayScore:null },
    // ── FECHA 2 — DOM 12/07 ─────────────────
  { id:"D3", stage:"group", group:"D", matchdayId:4, home:"P13", away:"P15", time:"22:00", homeScore:null, awayScore:null },
  { id:"D4", stage:"group", group:"D", matchdayId:4, home:"P14", away:"P16", time:"22:20", homeScore:null, awayScore:null },
  { id:"E3", stage:"group", group:"E", matchdayId:4, home:"P17", away:"P19", time:"22:40", homeScore:null, awayScore:null },
  { id:"E4", stage:"group", group:"E", matchdayId:4, home:"P18", away:"P20", time:"23:00", homeScore:null, awayScore:null },
  { id:"F3", stage:"group", group:"F", matchdayId:4, home:"P21", away:"P23", time:"23:20", homeScore:null, awayScore:null },
  { id:"F4", stage:"group", group:"F", matchdayId:4, home:"P22", away:"P24", time:"23:40", homeScore:null, awayScore:null },


  
  // ── FECHA 3 — SÁB 18/07 ─────────────────
  { id:"A5", stage:"group", group:"A", matchdayId:5, home:"P1",  away:"P4",  time:"22:00", homeScore:null, awayScore:null },
  { id:"A6", stage:"group", group:"A", matchdayId:5, home:"P2",  away:"P3",  time:"22:20", homeScore:null, awayScore:null },
  { id:"B5", stage:"group", group:"B", matchdayId:5, home:"P5",  away:"P8",  time:"22:40", homeScore:null, awayScore:null },
  { id:"B6", stage:"group", group:"B", matchdayId:5, home:"P6",  away:"P7",  time:"23:00", homeScore:null, awayScore:null },
  { id:"C5", stage:"group", group:"C", matchdayId:5, home:"P9",  away:"P12", time:"23:20", homeScore:null, awayScore:null },
  { id:"C6", stage:"group", group:"C", matchdayId:5, home:"P10", away:"P11", time:"23:40", homeScore:null, awayScore:null },
   // ── FECHA 3 — DOM 19/07 ─────────────────
  { id:"D5", stage:"group", group:"D", matchdayId:6, home:"P13", away:"P16", time:"22:00", homeScore:null, awayScore:null },
  { id:"D6", stage:"group", group:"D", matchdayId:6, home:"P14", away:"P15", time:"22:20", homeScore:null, awayScore:null },
  { id:"E5", stage:"group", group:"E", matchdayId:6, home:"P17", away:"P20", time:"22:40", homeScore:null, awayScore:null },
  { id:"E6", stage:"group", group:"E", matchdayId:6, home:"P18", away:"P19", time:"23:00", homeScore:null, awayScore:null },
  { id:"F5", stage:"group", group:"F", matchdayId:6, home:"P21", away:"P24", time:"23:20", homeScore:null, awayScore:null },
  { id:"F6", stage:"group", group:"F", matchdayId:6, home:"P22", away:"P23", time:"23:40", homeScore:null, awayScore:null },

  // ── OCTAVOS — SAB 25/07 ─────────────────────────────────
  { id:"R1", stage:"r16", group:null, matchdayId:7, home:null, away:null, homeLabel:"1° Grupo B", awayLabel:"3° (A/C/D)", time:"22:00", homeScore:null, awayScore:null },
  { id:"R2", stage:"r16", group:null, matchdayId:7, home:null, away:null, homeLabel:"1° Grupo C", awayLabel:"3° (A/B/F)", time:"22:20", homeScore:null, awayScore:null },
  { id:"R3", stage:"r16", group:null, matchdayId:7, home:null, away:null, homeLabel:"1° Grupo E", awayLabel:"2° Grupo F", time:"22:40", homeScore:null, awayScore:null },
  { id:"R4", stage:"r16", group:null, matchdayId:7, home:null, away:null, homeLabel:"1° Grupo A", awayLabel:"3° (C/D/E)", time:"23:00", homeScore:null, awayScore:null },
  { id:"R5", stage:"r16", group:null, matchdayId:7, home:null, away:null, homeLabel:"1° Grupo F", awayLabel:"2°Grupo B", time:"23:20", homeScore:null, awayScore:null },
  { id:"R6", stage:"r16", group:null, matchdayId:7, home:null, away:null, homeLabel:"2° Grupo D", awayLabel:"2° Grupo E", time:"23:40", homeScore:null, awayScore:null },
  { id:"R7", stage:"r16", group:null, matchdayId:7, home:null, away:null, homeLabel:"1° Grupo D", awayLabel:"3° (B/E/F)", time:"24:00", homeScore:null, awayScore:null },
  { id:"R8", stage:"r16", group:null, matchdayId:7, home:null, away:null, homeLabel:"2° Grupo A", awayLabel:"2°Grupo C", time:"24:20", homeScore:null, awayScore:null },


  // ── CUARTOS — DOM 26/07 ─────────────────────────────────
  { id:"QF1", stage:"qf", group:null, matchdayId:8, home:null, away:null, homeLabel:"G. R1", awayLabel:"G. R2", time:"22:00", homeScore:null, awayScore:null },
  { id:"QF2", stage:"qf", group:null, matchdayId:8, home:null, away:null, homeLabel:"G. R3", awayLabel:"G. R4", time:"22:20", homeScore:null, awayScore:null },
  { id:"QF3", stage:"qf", group:null, matchdayId:8, home:null, away:null, homeLabel:"G. R5", awayLabel:"G. R6", time:"22:40", homeScore:null, awayScore:null },
  { id:"QF4", stage:"qf", group:null, matchdayId:8, home:null, away:null, homeLabel:"G. R7", awayLabel:"G. R8", time:"23:00", homeScore:null, awayScore:null },

  // ── SEMIS — Vie 27/06 ───────────────────────────────────
  { id:"SF1", stage:"sf", group:null, matchdayId:9, home:null, away:null, homeLabel:"G. QF1", awayLabel:"G. QF2", time:"22:00", homeScore:null, awayScore:null },
  { id:"SF2", stage:"sf", group:null, matchdayId:9, home:null, away:null, homeLabel:"G. QF3", awayLabel:"G. QF4", time:"22:20", homeScore:null, awayScore:null },

  // ── FINAL — Sáb 28/06 ───────────────────────────────────
  { id:"FIN", stage:"final", group:null, matchdayId:10, home:null, away:null, homeLabel:"G. SF1", awayLabel:"G. SF2", time:"22:00", homeScore:null, awayScore:null },
];

// --- GOLEADORES ----------------------------------------------
// Actualizar después de cada fecha.
// playerId: ID del jugador (P1–P24)
// goals: cantidad de goles anotados en el torneo
// Ordenar de mayor a menor para facilitar lectura (la tabla se ordena automáticamente)
export const SCORERS = [
  // Ejemplos — reemplazar con datos reales:
  // { playerId: "P1", goals: 5 },
  // { playerId: "P18", goals: 3 },
];
