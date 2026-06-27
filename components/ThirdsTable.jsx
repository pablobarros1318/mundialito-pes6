import { getAllThirds, getPlayer } from "../lib/standings";
import styles from "./ThirdsTable.module.css";

function Flag({ player }) {
  if (player?.iso2) {
    return <img src={`https://flagcdn.com/w40/${player.iso2.toLowerCase()}.png`} alt="" className={styles.flagImg} loading="lazy" />;
  }
  return <span>{player?.flag ?? "🏴"}</span>;
}

export default function ThirdsTable() {
  const thirds = getAllThirds();

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.title}>Mejores terceros</span>
        <span className={styles.sub}>Los 4 primeros clasifican a Octavos</span>
      </div>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th className={styles.left}>Jugador</th>
              <th>Grp</th>
              <th>PJ</th>
              <th>G</th>
              <th>E</th>
              <th>P</th>
              <th>GF</th>
              <th>GC</th>
              <th>DG</th>
              <th>PTS</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {thirds.length === 0 ? (
              <tr>
                <td colSpan={12} className={styles.empty}>
                  Los terceros aparecerán aquí al completarse los partidos.
                </td>
              </tr>
            ) : thirds.map((row, i) => {
              const pl = getPlayer(row.id);
              const q = i < 4;
              return (
                <tr key={row.id} className={q ? styles.qualify : ""}>
                  <td className={styles.center}>{i + 1}</td>
                  <td className={styles.left}>
                    <div className={styles.playerCell}>
                      <Flag player={pl} />
                      <strong>{pl?.name}</strong>
                      <span className={styles.nation}>{pl?.nation}</span>
                    </div>
                  </td>
                  <td className={`${styles.center} ${styles.grp}`}>{row.group}</td>
                  <td className={styles.center}>{row.pj}</td>
                  <td className={styles.center}>{row.g}</td>
                  <td className={styles.center}>{row.e}</td>
                  <td className={styles.center}>{row.p}</td>
                  <td className={styles.center}>{row.gf}</td>
                  <td className={styles.center}>{row.gc}</td>
                  <td className={styles.center}>{row.gf - row.gc}</td>
                  <td className={`${styles.center} ${styles.pts}`}>{row.pts}</td>
                  <td className={styles.center}>
                    {q && <span className={styles.badge}>✓ Clasifica</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
