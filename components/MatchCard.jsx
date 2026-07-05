import { getPlayer, matchStatus } from "../lib/standings";
import styles from "./MatchCard.module.css";

function Flag({ player }) {
  if (player?.iso2) {
    return <img src={`https://flagcdn.com/w40/${player.iso2}.png`} alt="" className={styles.flag} loading="lazy" />;
  }
  return <span className={styles.flagEmoji}>{player?.flag ?? "🏴"}</span>;
}

function Events({ goals, cards, align }) {
  const hasGoals = goals?.length > 0;
  const hasCards = cards?.length > 0;
  if (!hasGoals && !hasCards) return null;

  // Count repeated goal scorers
  const goalCounts = (goals || []).reduce((acc, g) => { acc[g] = (acc[g] || 0) + 1; return acc; }, {});
  const uniqueGoals = [...new Set(goals || [])];

  return (
    <div className={`${styles.events} ${align === "right" ? styles.eventsRight : styles.eventsLeft}`}>
      {uniqueGoals.map((name, i) => (
        <span key={i} className={styles.goalEvent}>
          ⚽ {name}{goalCounts[name] > 1 ? ` ×${goalCounts[name]}` : ""}
        </span>
      ))}
      {(cards || []).map((c, i) => (
        <span key={i} className={styles.cardEvent}>
          <span className={c.type === "red" ? styles.redCard : styles.yellowCard} />
          {c.player}
        </span>
      ))}
    </div>
  );
}

export default function MatchCard({ match }) {
  const status  = matchStatus(match);
  const homePl  = match.home ? getPlayer(match.home) : null;
  const awayPl  = match.away ? getPlayer(match.away) : null;
  const homeName = homePl ? homePl.name : (match.homeLabel ?? "Por definir");
  const awayName = awayPl ? awayPl.name : (match.awayLabel ?? "Por definir");
  const homeWon  = status === "played" && match.homeScore > match.awayScore;
  const awayWon  = status === "played" && match.awayScore > match.homeScore;
  const isTbd    = !match.home && !match.homeLabel;
  const played   = status === "played";

  return (
    <div className={styles.card}>
      {/* Meta row */}
      <div className={styles.meta}>
        {match.time  && <span className={styles.time}>{match.time}</span>}
        {match.group && <span className={styles.group}>Grupo {match.group}</span>}
        <span className={`${styles.badge} ${played ? styles.played : styles.upcoming}`}>
          {played ? "Jugado" : "Próximo"}
        </span>
      </div>

      {/* Main match row */}
      <div className={styles.matchRow}>

        {/* Home side */}
        <div className={styles.side}>
          <div className={`${styles.teamName} ${styles.teamNameHome} ${homeWon ? styles.winner : ""} ${isTbd ? styles.tbd : ""}`}>
            {homePl && <Flag player={homePl} />}
            <span>{homeName}</span>
          </div>
          {played && (
            <Events goals={match.homeGoals} cards={match.homeCards} align="left" />
          )}
        </div>

        {/* Score */}
        <div className={styles.scoreBox}>
          {played
            ? <>
                <span className={styles.score}>{match.homeScore} – {match.awayScore}</span>
                {match.homeScorePens != null && (
                  <span className={styles.pens}>({match.homeScorePens}-{match.awayScorePens} pen.)</span>
                )}
              </>
            : <span className={styles.vs}>vs</span>
          }
        </div>

        {/* Away side */}
        <div className={`${styles.side} ${styles.sideRight}`}>
          <div className={`${styles.teamName} ${styles.teamNameAway} ${awayWon ? styles.winner : ""} ${isTbd ? styles.tbd : ""}`}>
            <span>{awayName}</span>
            {awayPl && <Flag player={awayPl} />}
          </div>
          {played && (
            <Events goals={match.awayGoals} cards={match.awayCards} align="right" />
          )}
        </div>

      </div>
    </div>
  );
}
