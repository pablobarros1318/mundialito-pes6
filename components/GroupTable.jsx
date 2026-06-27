import { getGroupStandings, getPlayer } from "../lib/standings";
import styles from "./GroupTable.module.css";

const POS_CLASS = ["gold", "silver", "bronze", "out"];

// iso2: two-letter country code, e.g. "ar", "br", "de"
// If player has iso2 set we use flagcdn image; otherwise fall back to flag emoji
function Flag({ player }) {
  if (player?.iso2) {
    return (
      <img
        src={`https://flagcdn.com/w40/${player.iso2.toLowerCase()}.png`}
        alt={player.nation ?? ""}
        className={styles.flagImg}
        loading="lazy"
      />
    );
  }
  return <span className={styles.flagFallback}>{player?.flag ?? "🏴"}</span>;
}

export default function GroupTable({ letter }) {
  const standings = getGroupStandings(letter);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.badge}>{letter}</span>
        <span className={styles.label}>Grupo {letter}</span>
      </div>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.thLeft}>#</th>
              <th className={`${styles.thLeft} ${styles.thPlayer}`}>Jugador</th>
              <th>PJ</th>
              <th>G</th>
              <th>E</th>
              <th>P</th>
              <th>GF</th>
              <th>GC</th>
              <th>DG</th>
              <th className={styles.pts}>PTS</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((row, i) => {
              const pl = getPlayer(row.id);
              const posClass = POS_CLASS[i] ?? "out";
              const qualify = i < 2;
              return (
                <tr key={row.id} className={qualify ? styles.qualifyRow : ""}>
                  <td>
                    <span className={`${styles.pos} ${styles[posClass]}`}>{i + 1}</span>
                  </td>
                  <td className={styles.player}>
                    <div className={styles.playerInner}>
                      <Flag player={pl} />
                      <span className={styles.name}>{pl?.name}</span>
                      <span className={styles.nation}>{pl?.nation}</span>
                    </div>
                  </td>
                  <td className={styles.num}>{row.pj}</td>
                  <td className={styles.num}>{row.g}</td>
                  <td className={styles.num}>{row.e}</td>
                  <td className={styles.num}>{row.p}</td>
                  <td className={styles.num}>{row.gf}</td>
                  <td className={styles.num}>{row.gc}</td>
                  <td className={styles.num}>{row.gf - row.gc}</td>
                  <td className={`${styles.num} ${styles.pts}`}>{row.pts}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
