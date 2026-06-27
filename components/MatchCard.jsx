import { getPlayer, formatScore, matchStatus } from "../lib/standings";
import styles from "./MatchCard.module.css";

function Flag({ player }) {
  if (player?.iso2) {
    return <img src={`https://flagcdn.com/w40/${player.iso2.toLowerCase()}.png`} alt="" className={styles.flag} loading="lazy" />;
  }
  return <span className={styles.flagEmoji}>{player?.flag ?? "🏴"}</span>;
}

export default function MatchCard({ match }) {
  const status = matchStatus(match);
  const score  = formatScore(match);

  const homePl = match.home ? getPlayer(match.home) : null;
  const awayPl = match.away ? getPlayer(match.away) : null;

  const homeName = homePl ? homePl.name : (match.homeLabel ?? "Por definir");
  const awayName = awayPl ? awayPl.name : (match.awayLabel ?? "Por definir");

  const homeWon = status === "played" && match.homeScore > match.awayScore;
  const awayWon = status === "played" && match.awayScore > match.homeScore;
  const isTbd   = !match.home && !match.homeLabel;

  return (
    <div className={`${styles.card} ${status === "played" ? styles.played : ""}`}>
      <div className={styles.meta}>
        {match.time && <span className={styles.time}>{match.time}</span>}
        {match.group && <span className={styles.group}>Grupo {match.group}</span>}
        <span className={`${styles.badge} ${styles[status]}`}>
          {status === "played" ? "Jugado" : "Próximo"}
        </span>
      </div>
      <div className={styles.row}>
        <div className={`${styles.team} ${styles.home} ${homeWon ? styles.winner : ""} ${isTbd ? styles.tbd : ""}`}>
          {homePl && <Flag player={homePl} />}
          <span className={styles.teamName}>{homeName}</span>
        </div>
        <div className={styles.scoreBox}>
          {status === "played"
            ? <span className={styles.score}>{match.homeScore} – {match.awayScore}</span>
            : <span className={styles.vs}>vs</span>
          }
          {match.homeScorePens != null && (
            <span className={styles.pens}>({match.homeScorePens}-{match.awayScorePens} pen.)</span>
          )}
        </div>
        <div className={`${styles.team} ${styles.away} ${awayWon ? styles.winner : ""} ${isTbd ? styles.tbd : ""}`}>
          <span className={styles.teamName}>{awayName}</span>
          {awayPl && <Flag player={awayPl} />}
        </div>
      </div>
    </div>
  );
}
