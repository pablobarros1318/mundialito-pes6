import MatchCard from "./MatchCard";
import { getCurrentMatchday, getMatchdaysWithMatches } from "../lib/standings";
import styles from "./Landing.module.css";

export default function Landing({ onNavigate }) {
  const current = getCurrentMatchday();
  const allDays = getMatchdaysWithMatches();
  const hasPlayed = allDays.some(d => d.matches.some(m => m.homeScore !== null));
  const isCurrentPlayed = current?.matches.some(m => m.homeScore !== null);

  return (
    <div className={styles.landing}>

      {/* ── Hero ─────────────────────────────────────── */}
      <div className={styles.hero}>
        <div className={styles.heroEyebrow}>Torneo oficial de PES 6</div>
        <h1 className={styles.heroTitle}>Mundialito<br/>PES 6</h1>
        <p className={styles.heroSub}>
          24 jugadores · 6 grupos · eliminatoria directa<br/>
          Transmitido en vivo todos los partidos
        </p>
        <div className={styles.heroCtas}>
          <a
            href="https://kick.com/pichon11"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.cta} ${styles.ctaKick}`}
          >
            <span className={styles.ctaDot} />
            Ver en Kick
          </a>
          <a
            href="https://discord.gg/CQyxHThYfr"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.cta} ${styles.ctaDiscord}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
            </svg>
            Unirse al Discord
          </a>
        </div>
      </div>

      {/* ── Info cards ───────────────────────────────── */}
      <div className={styles.infoRow}>
        <div className={styles.infoCard}>
          <div className={styles.infoValue}>24</div>
          <div className={styles.infoLabel}>Jugadores</div>
        </div>
        <div className={styles.infoCard}>
          <div className={styles.infoValue}>6</div>
          <div className={styles.infoLabel}>Grupos</div>
        </div>
        <div className={styles.infoCard}>
          <div className={styles.infoValue}>16</div>
          <div className={styles.infoLabel}>Clasificados</div>
        </div>
        <div className={styles.infoCard}>
          <div className={styles.infoValue}>⭐⭐⭐⭐⭐</div>
          <div className={styles.infoLabel}>Dificultad</div>
        </div>
        <div className={styles.infoCard}>
          <div className={styles.infoValue}>10 min</div>
          <div className={styles.infoLabel}>Por partido</div>
        </div>
      </div>

      {/* ── Current matchday ─────────────────────────── */}
      {current && (
        <div className={styles.matchdaySection}>
          <div className={styles.matchdayHeader}>
            <div>
              <div className={styles.matchdayEyebrow}>
                {isCurrentPlayed ? "Última fecha jugada" : "Próxima fecha"}
              </div>
              <div className={styles.matchdayTitle}>
                {current.label} · {current.streamDate}
              </div>
            </div>
            <button className={styles.viewAll} onClick={() => onNavigate("partidos")}>
              Ver todos los partidos →
            </button>
          </div>
          <div className={styles.matchList}>
            {current.matches.map(m => (
              <MatchCard key={m.id} match={m} />
            ))}
          </div>
        </div>
      )}

      {/* ── Quick nav ────────────────────────────────── */}
      <div className={styles.quickNav}>
        <button className={styles.navCard} onClick={() => onNavigate("grupos")}>
          <span className={styles.navIcon}>📊</span>
          <span className={styles.navLabel}>Tablas de posición</span>
          <span className={styles.navArrow}>→</span>
        </button>
        <button className={styles.navCard} onClick={() => onNavigate("partidos")}>
          <span className={styles.navIcon}>📅</span>
          <span className={styles.navLabel}>Todos los partidos</span>
          <span className={styles.navArrow}>→</span>
        </button>
        <button className={styles.navCard} onClick={() => onNavigate("llave")}>
          <span className={styles.navIcon}>⚔️</span>
          <span className={styles.navLabel}>Llave eliminatoria</span>
          <span className={styles.navArrow}>→</span>
        </button>
        <button className={styles.navCard} onClick={() => onNavigate("reglas")}>
          <span className={styles.navIcon}>📋</span>
          <span className={styles.navLabel}>Reglamento</span>
          <span className={styles.navArrow}>→</span>
        </button>
      </div>

    </div>
  );
}
