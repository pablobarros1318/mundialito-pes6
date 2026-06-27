import { getPlayer } from "../lib/standings";
import { MATCHES } from "../lib/tournament";
import styles from "./Bracket.module.css";

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
  return <span>{player?.flag ?? "🏴"}</span>;
}

function BracketMatch({ match, number }) {
  const homePl = match.home ? getPlayer(match.home) : null;
  const awayPl = match.away ? getPlayer(match.away) : null;

  const homeLabel = homePl ? homePl.name : match.homeLabel ?? "Por definir";
  const awayLabel = awayPl ? awayPl.name : match.awayLabel ?? "Por definir";

  const played = match.homeScore !== null;
  const homeWon = played && match.homeScore > match.awayScore;
  const awayWon = played && match.awayScore > match.homeScore;
  const isTbd = !played && !match.home;

  return (
    <div className={styles.match}>
      <div className={styles.matchMeta}>
        {number && <span className={styles.matchNum}>Partido {number}</span>}
        <span className={styles.matchDate}>{match.date}</span>
        <span className={`${styles.statusBadge} ${played ? styles.played : styles.upcoming}`}>
          {played ? "Jugado" : "Próximo"}
        </span>
      </div>
      <div className={styles.matchBody}>
        <div className={`${styles.team} ${homeWon ? styles.won : ""} ${isTbd ? styles.tbd : ""}`}>
          <div className={styles.teamInner}>
            {homePl && <Flag player={homePl} />}
            <span>{homeLabel}</span>
          </div>
          {played && <span className={styles.score}>{match.homeScore}</span>}
        </div>
        <div className={styles.divider} />
        <div className={`${styles.team} ${awayWon ? styles.won : ""} ${isTbd ? styles.tbd : ""}`}>
          <div className={styles.teamInner}>
            {awayPl && <Flag player={awayPl} />}
            <span>{awayLabel}</span>
          </div>
          {played && <span className={styles.score}>{match.awayScore}</span>}
        </div>
      </div>
    </div>
  );
}

function Round({ label, matches, numberOffset = 0 }) {
  return (
    <div className={styles.round}>
      <div className={styles.roundHeader}>
        <span className={styles.roundLabel}>{label}</span>
        <span className={styles.roundCount}>{matches.length} partido{matches.length !== 1 ? "s" : ""}</span>
      </div>
      <div className={styles.matchGrid}>
        {matches.map((m, i) => (
          <BracketMatch key={m.id} match={m} number={numberOffset ? numberOffset + i : null} />
        ))}
      </div>
    </div>
  );
}

export default function Bracket() {
  const r16  = MATCHES.filter(m => m.stage === "r16");
  const qf   = MATCHES.filter(m => m.stage === "qf");
  const sf   = MATCHES.filter(m => m.stage === "sf");
  const fin  = MATCHES.filter(m => m.stage === "final");

  return (
    <div className={styles.bracket}>
      <Round label="Octavos de Final"  matches={r16} numberOffset={1} />
      <Round label="Cuartos de Final"  matches={qf}  numberOffset={1} />
      <Round label="Semifinales"       matches={sf}  numberOffset={1} />
      <Round label="Final"             matches={fin} />
    </div>
  );
}
