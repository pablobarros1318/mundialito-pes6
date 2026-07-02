import { useState, useEffect, useRef } from "react";
import styles from "./Sorteo.module.css";

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

// Spinning reel component
function Reel({ items, spinning, result, label, color }) {
  const reelRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const animRef = useRef(null);
  const ITEM_H = 48;

  useEffect(() => {
    if (spinning) {
      let speed = 18;
      let pos = 0;
      const tick = () => {
        pos += speed;
        setOffset(pos % (items.length * ITEM_H));
        animRef.current = requestAnimationFrame(tick);
      };
      animRef.current = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(animRef.current);
    }
  }, [spinning, items.length]);

  const displayItems = [...items, ...items, ...items];

  return (
    <div className={styles.reelWrap}>
      <div className={styles.reelLabel} style={{ color }}>{label}</div>
      <div className={styles.reelWindow}>
        <div className={styles.reelHighlight} />
        {result && !spinning ? (
          <div className={styles.reelResult}>
            {result.iso2 && (
              <img src={`https://flagcdn.com/w40/${result.iso2}.png`} alt="" className={styles.reelFlag} />
            )}
            <span className={styles.reelResultText}>{result.name || result}</span>
          </div>
        ) : (
          <div
            className={styles.reelTrack}
            style={{ transform: `translateY(-${offset % (items.length * ITEM_H)}px)` }}
          >
            {displayItems.map((item, i) => (
              <div key={i} className={styles.reelItem}>
                {item.iso2 && (
                  <img src={`https://flagcdn.com/w40/${item.iso2}.png`} alt="" className={styles.reelFlag} />
                )}
                <span>{item.name || item}</span>
              </div>
            ))}
          </div>
        )}
        <div className={styles.reelFadeTop} />
        <div className={styles.reelFadeBot} />
      </div>
    </div>
  );
}

export default function Sorteo() {
  const [remainingPlayers, setRemainingPlayers] = useState([...PLAYERS]);
  const [remainingNations, setRemainingNations] = useState([...NATIONS]);
  const [pairs, setPairs] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const [pendingPair, setPendingPair] = useState(null); // {player, nation}
  const [phase, setPhase] = useState("idle"); // idle | spinning | result

  const canSpin = remainingPlayers.length > 0 && remainingNations.length > 0;

  function handleSpin() {
    if (!canSpin || spinning) return;

    // pick random
    const pIdx = Math.floor(Math.random() * remainingPlayers.length);
    const nIdx = Math.floor(Math.random() * remainingNations.length);
    const player = remainingPlayers[pIdx];
    const nation = remainingNations[nIdx];
    setPendingPair({ player, nation });
    setPhase("spinning");
    setSpinning(true);

    setTimeout(() => {
      setSpinning(false);
      setPhase("result");
    }, 2200 + Math.random() * 600);
  }

  function handleConfirm() {
    if (!pendingPair) return;
    setPairs(p => [...p, pendingPair]);
    setRemainingPlayers(r => r.filter(x => x !== pendingPair.player));
    setRemainingNations(r => r.filter(x => x !== pendingPair.nation));
    setPendingPair(null);
    setPhase("idle");
  }

  function handleReset() {
    setRemainingPlayers([...PLAYERS]);
    setRemainingNations([...NATIONS]);
    setPairs([]);
    setPendingPair(null);
    setPhase("idle");
    setSpinning(false);
  }

  const isDone = remainingPlayers.length === 0;

  return (
    <div className={styles.sorteo}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.eyebrow}>🎰 Sorteo en vivo</span>
          <span className={styles.progress}>
            {pairs.length} / {PLAYERS.length} sorteados
          </span>
        </div>
        <button className={styles.resetBtn} onClick={handleReset}>↺ Reiniciar</button>
      </div>

      {!isDone && (
        <div className={styles.machine}>
          <Reel
            label="Jugador"
            color="var(--kick)"
            items={remainingPlayers.map(p => ({ name: p }))}
            spinning={spinning}
            result={phase === "result" ? { name: pendingPair?.player } : null}
          />
          <div className={styles.vs}>×</div>
          <Reel
            label="Selección"
            color="#5865f2"
            items={remainingNations}
            spinning={spinning}
            result={phase === "result" ? pendingPair?.nation : null}
          />
        </div>
      )}

      {phase === "result" && pendingPair && (
        <div className={styles.resultBanner}>
          <div className={styles.resultPair}>
            <span className={styles.resultPlayer}>{pendingPair.player}</span>
            <span className={styles.resultArrow}>→</span>
            <img src={`https://flagcdn.com/w40/${pendingPair.nation.iso2}.png`} alt="" className={styles.resultFlag} />
            <span className={styles.resultNation}>{pendingPair.nation.name}</span>
          </div>
          <button className={styles.confirmBtn} onClick={handleConfirm}>
            ✓ Confirmar
          </button>
        </div>
      )}

      {phase === "idle" && !isDone && (
        <button className={styles.spinBtn} onClick={handleSpin} disabled={!canSpin}>
          🎰 Sortear
        </button>
      )}

      {isDone && (
        <div className={styles.doneMsg}>
          ¡Sorteo completo! Todos los jugadores tienen su selección.
        </div>
      )}

      {/* Pairs list */}
      {pairs.length > 0 && (
        <div className={styles.pairsSection}>
          <div className={styles.pairsTitle}>Resultados del sorteo</div>
          <div className={styles.pairsGrid}>
            {pairs.map((pair, i) => (
              <div key={i} className={styles.pairRow}>
                <span className={styles.pairNum}>{i + 1}</span>
                <span className={styles.pairPlayer}>{pair.player}</span>
                <span className={styles.pairSep}>→</span>
                <img src={`https://flagcdn.com/w40/${pair.nation.iso2}.png`} alt="" className={styles.pairFlag} />
                <span className={styles.pairNation}>{pair.nation.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Remaining lists */}
      {!isDone && (
        <div className={styles.remaining}>
          <div className={styles.remainingCol}>
            <div className={styles.remainingTitle}>Jugadores restantes ({remainingPlayers.length})</div>
            {remainingPlayers.map((p, i) => (
              <div key={i} className={styles.remainingItem}>{p}</div>
            ))}
          </div>
          <div className={styles.remainingCol}>
            <div className={styles.remainingTitle}>Países restantes ({remainingNations.length})</div>
            {remainingNations.map((n, i) => (
              <div key={i} className={styles.remainingItem}>
                <img src={`https://flagcdn.com/w40/${n.iso2}.png`} alt="" className={styles.remainingFlag} />
                {n.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
