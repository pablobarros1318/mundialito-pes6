import { PLAYERS, MATCHES } from "../lib/tournament";
import styles from "./Scorers.module.css";

function Flag({ iso2, nation }) {
  if (iso2) return <img src={`https://flagcdn.com/w40/${iso2}.png`} alt={nation} className={styles.flag} loading="lazy" />;
  return null;
}

// Calcula goleadores automáticamente desde los eventos de los partidos
function computeScorers() {
  const totals = {}; // "Nombre Jugador|playerId" -> { name, playerId, goals }

  MATCHES.forEach(m => {
    const sides = [
      { goals: m.homeGoals, playerId: m.home },
      { goals: m.awayGoals, playerId: m.away },
    ];
    sides.forEach(({ goals, playerId }) => {
      if (!goals?.length || !playerId) return;
      goals.forEach(name => {
        if (name.startsWith("G.E.:")) return; // ignorar goles en contra
        const key = `${name}|${playerId}`;
        if (!totals[key]) totals[key] = { name, playerId, goals: 0 };
        totals[key].goals++;
      });
    });
  });

  return Object.values(totals).sort((a, b) => b.goals - a.goals);
}

export default function Scorers() {
  const scorers = computeScorers();

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.icon}>⚽</span>
        <span className={styles.title}>Tabla de goleadores</span>
      </div>
      {scorers.length === 0 ? (
        <div className={styles.empty}>Los goleadores aparecerán aquí al iniciarse el torneo.</div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th className={styles.left}>Goleador</th>
              <th className={styles.left}>Selección</th>
              <th className={styles.left}>Participante</th>
              <th>⚽</th>
            </tr>
          </thead>
          <tbody>
            {scorers.map((s, i) => {
              const player = PLAYERS[s.playerId];
              return (
                <tr key={`${s.name}-${s.playerId}`} className={i === 0 ? styles.top : ""}>
                  <td className={styles.rank}>
                    {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}
                  </td>
                  <td className={styles.left}>
                    <span className={styles.scorerName}>{s.name}</span>
                  </td>
                  <td className={styles.left}>
                    <div className={styles.nation}>
                      <Flag iso2={player?.iso2} nation={player?.nation} />
                      <span>{player?.nation ?? "—"}</span>
                    </div>
                  </td>
                  <td className={styles.left}>
                    <span className={styles.participantName}>{player?.name ?? "—"}</span>
                  </td>
                  <td className={styles.goals}>{s.goals}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
