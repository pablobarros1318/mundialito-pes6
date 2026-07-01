import { useState, useEffect } from "react";
import styles from "./Landing.module.css";

// ── Fecha y hora del sorteo ────────────────────────────────
const SORTEO_DATE = new Date(new Date().setHours(20, 0, 0, 0));
// ──────────────────────────────────────────────────────────

const PLAYERS = [
  "urubaunsub", "Hunter_rodrig29", "Lukitax", "VILLAKIDD",
  "Marcos_Emirr", "daiansuarez1", "Maxi_LV16", "Rider_PermaDeath",
  "Benja2301s", "Blastoise21", "IgnacioTO5", "prodbyLextone",
  "emiliozeeta", "ObitoGames36", "Rasek", "Markito9320",
  "Shintejon", "1ru7", "Hikusen", "JonyFz",
  "evilomt", "GordooManuu", "momegre57", "Kenshi777",
];

const NATIONS = [
  { name: "Argentina",       iso2: "ar" },
  { name: "Brasil",          iso2: "br" },
  { name: "España",          iso2: "es" },
  { name: "Bélgica",         iso2: "be" },
  { name: "Croacia",         iso2: "hr" },
  { name: "Inglaterra",      iso2: "gb" },
  { name: "Francia",         iso2: "fr" },
  { name: "Alemania",        iso2: "de" },
  { name: "Holanda",         iso2: "nl" },
  { name: "Italia",          iso2: "it" },
  { name: "Noruega",         iso2: "no" },
  { name: "Portugal",        iso2: "pt" },
  { name: "Japón",           iso2: "jp" },
  { name: "Ucrania",         iso2: "ua" },
  { name: "Colombia",        iso2: "co" },
  { name: "EEUU",            iso2: "us" },
  { name: "Corea del Sur",   iso2: "kr" },
  { name: "Paraguay",        iso2: "py" },
  { name: "Marruecos",       iso2: "ma" },
  { name: "Costa de Marfil", iso2: "ci" },
  { name: "Austria",         iso2: "at" },
  { name: "Suiza",           iso2: "ch" },
  { name: "México",          iso2: "mx" },
  { name: "Uruguay",         iso2: "uy" },
];

function Countdown({ target }) {
  const [diff, setDiff] = useState(null);

  useEffect(() => {
    setDiff(target - Date.now());
    const t = setInterval(() => setDiff(target - Date.now()), 1000);
    return () => clearInterval(t);
  }, [target]);

  // No renderizar en el servidor para evitar hydration mismatch
  if (diff === null) return null;

  const past = diff <= 0;
  const h  = Math.floor(Math.abs(diff) / 3600000);
  const m  = Math.floor((Math.abs(diff) % 3600000) / 60000);
  const s  = Math.floor((Math.abs(diff) % 60000) / 1000);
  const pad = n => String(n).padStart(2, "0");

  if (past) {
    return (
      <div className={`${styles.countdown} ${styles.countdownLive}`}>
        <div className={styles.countdownEyebrow}>
          <span className={styles.liveDot} /> EN VIVO AHORA
        </div>
        <div className={styles.countdownLiveText}>¡El sorteo está en curso!</div>
        <a href="https://kick.com/pichon11" target="_blank" rel="noopener noreferrer"
          className={styles.liveBtn}>
          Ver en Kick →
        </a>
      </div>
    );
  }

  return (
    <div className={styles.countdown}>
      <div className={styles.countdownEyebrow}>🎰 Sorteo en vivo · hoy a las 20:00 hs</div>
      <div className={styles.countdownTimer}>
        <div className={styles.countdownUnit}>
          <span className={styles.countdownNum}>{pad(h)}</span>
          <span className={styles.countdownLabel}>hs</span>
        </div>
        <span className={styles.countdownSep}>:</span>
        <div className={styles.countdownUnit}>
          <span className={styles.countdownNum}>{pad(m)}</span>
          <span className={styles.countdownLabel}>min</span>
        </div>
        <span className={styles.countdownSep}>:</span>
        <div className={styles.countdownUnit}>
          <span className={styles.countdownNum}>{pad(s)}</span>
          <span className={styles.countdownLabel}>seg</span>
        </div>
      </div>
      <p className={styles.countdownSub}>
        Seguilo en vivo por{" "}
        <a href="https://kick.com/pichon11" target="_blank" rel="noopener noreferrer"
          className={styles.countdownLink}>kick.com/pichon11</a>
        {" "}y comentalo en{" "}
        <a href="https://discord.gg/CQyxHThYfr" target="_blank" rel="noopener noreferrer"
          className={styles.countdownLinkDiscord}>Discord</a>
      </p>
    </div>
  );
}

export default function Landing({ onNavigate }) {
  return (
    <div className={styles.landing}>

      {/* ── Hero ──────────────────────────────────────── */}
      <div className={styles.hero}>
        <div className={styles.heroEyebrow}>Torneo oficial de PES 6</div>
        <h1 className={styles.heroTitle}>Mundialito<br/>PES 6</h1>
        <p className={styles.heroSub}>
          24 jugadores · 6 grupos · eliminatoria directa<br/>
          Transmitido en vivo por Kick
        </p>
        <div className={styles.heroCtas}>
          <a href="https://kick.com/pichon11" target="_blank" rel="noopener noreferrer"
            className={`${styles.cta} ${styles.ctaKick}`}>
            <span className={styles.ctaDot} />
            Ver en Kick
          </a>
          <a href="https://discord.gg/CQyxHThYfr" target="_blank" rel="noopener noreferrer"
            className={`${styles.cta} ${styles.ctaDiscord}`}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
            </svg>
            Discord
          </a>
        </div>
      </div>

      {/* ── Countdown ─────────────────────────────────── */}
      <Countdown target={SORTEO_DATE.getTime()} />

      {/* ── Info stats ────────────────────────────────── */}
      <div className={styles.infoRow}>
        {[
          { v: "24",         l: "Jugadores" },
          { v: "6",          l: "Grupos" },
          { v: "16",         l: "Clasificados" },
          { v: "⭐⭐⭐⭐⭐",  l: "Dificultad" },
          { v: "10 min",     l: "Por partido" },
        ].map(({ v, l }) => (
          <div key={l} className={styles.infoCard}>
            <div className={styles.infoValue}>{v}</div>
            <div className={styles.infoLabel}>{l}</div>
          </div>
        ))}
      </div>

      {/* ── Players + Nations ─────────────────────────── */}
      <div className={styles.listsGrid}>

        <div className={styles.listCard}>
          <div className={styles.listHeader}>
            <span className={styles.listIcon}>🎮</span>
            <span className={styles.listTitle}>Participantes</span>
            <span className={styles.listCount}>{PLAYERS.length}</span>
          </div>
          <div className={styles.listBody}>
            {PLAYERS.map((p, i) => (
              <div key={i} className={styles.listItem}>
                <span className={styles.listNum}>{i + 1}</span>
                <span className={styles.listText}>{p}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.listCard}>
          <div className={styles.listHeader}>
            <span className={styles.listIcon}>🌍</span>
            <span className={styles.listTitle}>Selecciones disponibles</span>
            <span className={styles.listCount}>{NATIONS.length}</span>
          </div>
          <div className={styles.listBody}>
            {NATIONS.map((n, i) => (
              <div key={i} className={styles.listItem}>
                <span className={styles.listNum}>{i + 1}</span>
                <img
                  src={`https://flagcdn.com/w40/${n.iso2}.png`}
                  alt={n.name}
                  className={styles.listFlag}
                />
                <span className={styles.listText}>{n.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── Quick nav ─────────────────────────────────── */}
      <div className={styles.quickNav}>
        {[
          { id: "grupos",   icon: "📊", label: "Tablas de posición" },
          { id: "partidos", icon: "📅", label: "Todos los partidos"  },
          { id: "llave",    icon: "⚔️", label: "Llave eliminatoria"  },
          { id: "reglas",   icon: "📋", label: "Reglamento"          },
        ].map(({ id, icon, label }) => (
          <button key={id} className={styles.navCard} onClick={() => onNavigate(id)}>
            <span className={styles.navIcon}>{icon}</span>
            <span className={styles.navLabel}>{label}</span>
            <span className={styles.navArrow}>→</span>
          </button>
        ))}
      </div>

    </div>
  );
}
