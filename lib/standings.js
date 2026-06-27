import { PLAYERS, GROUPS, MATCHES, MATCHDAYS } from "./tournament";

export function getPlayer(id) {
  if (!id) return null;
  return PLAYERS[id] ? { id, ...PLAYERS[id] } : null;
}

export function getGroupStandings(groupLetter) {
  const ids = GROUPS[groupLetter];
  const table = ids.map((id) => ({ id, pj:0, g:0, e:0, p:0, gf:0, gc:0, pts:0 }));

  MATCHES
    .filter(m => m.stage === "group" && m.group === groupLetter && m.homeScore !== null)
    .forEach(m => {
      const rh = table.find(r => r.id === m.home);
      const ra = table.find(r => r.id === m.away);
      if (!rh || !ra) return;
      rh.pj++; ra.pj++;
      rh.gf += m.homeScore; rh.gc += m.awayScore;
      ra.gf += m.awayScore; ra.gc += m.homeScore;
      if (m.homeScore > m.awayScore)      { rh.pts+=3; rh.g++; ra.p++; }
      else if (m.homeScore < m.awayScore) { ra.pts+=3; ra.g++; rh.p++; }
      else                                { rh.pts++; ra.pts++; rh.e++; ra.e++; }
    });

  table.sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    const da = a.gf - a.gc, db = b.gf - b.gc;
    if (db !== da) return db - da;
    if (b.gf !== a.gf) return b.gf - a.gf;
    // head-to-head
    const h2h = MATCHES.find(m =>
      m.stage === "group" && m.group === groupLetter && m.homeScore !== null &&
      ((m.home === a.id && m.away === b.id) || (m.home === b.id && m.away === a.id))
    );
    if (h2h) {
      const aScore = h2h.home === a.id ? h2h.homeScore : h2h.awayScore;
      const bScore = h2h.home === b.id ? h2h.homeScore : h2h.awayScore;
      if (aScore !== bScore) return bScore - aScore;
    }
    return a.gc - b.gc;
  });

  return table;
}

export function getAllThirds() {
  return Object.keys(GROUPS).map(g => {
    const st = getGroupStandings(g);
    return st.length >= 3 ? { ...st[2], group: g } : null;
  }).filter(Boolean).sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    if ((b.gf-b.gc) !== (a.gf-a.gc)) return (b.gf-b.gc)-(a.gf-a.gc);
    if (b.gf !== a.gf) return b.gf - a.gf;
    return a.gc - b.gc;
  });
}

export function getMatchesByGroup(groupLetter) {
  return MATCHES.filter(m => m.stage === "group" && m.group === groupLetter);
}

export function getMatchesByStage(stage) {
  return MATCHES.filter(m => m.stage === stage);
}

// Returns matchdays that have at least one match, sorted by id
export function getMatchdaysWithMatches() {
  return MATCHDAYS.map(day => ({
    ...day,
    matches: MATCHES.filter(m => m.matchdayId === day.id).sort((a,b) => (a.time||"").localeCompare(b.time||"")),
  })).filter(d => d.matches.length > 0);
}

// Current matchday: last one with any played match, or first upcoming
export function getCurrentMatchday() {
  const days = getMatchdaysWithMatches();
  // find last day that has at least one played match
  let last = null;
  for (const day of days) {
    if (day.matches.some(m => m.homeScore !== null)) last = day;
  }
  if (last) return last;
  return days[0] ?? null;
}

export function formatScore(m) {
  if (m.homeScore === null) return null;
  let s = `${m.homeScore} – ${m.awayScore}`;
  if (m.homeScorePens != null) s += ` (${m.homeScorePens}-${m.awayScorePens} pen.)`;
  return s;
}

export function matchStatus(m) {
  return m.homeScore !== null ? "played" : "upcoming";
}
