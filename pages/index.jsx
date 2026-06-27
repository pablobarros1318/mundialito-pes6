import { useState } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Landing from "../components/Landing";
import GroupTable from "../components/GroupTable";
import ThirdsTable from "../components/ThirdsTable";
import MatchCard from "../components/MatchCard";
import Bracket from "../components/Bracket";
import Rules from "../components/Rules";
import { getMatchdaysWithMatches } from "../lib/standings";
import { GROUPS } from "../lib/tournament";
import styles from "./index.module.css";

export default function Home() {
  const [tab, setTab] = useState("home");
  const matchdays = getMatchdaysWithMatches();

  return (
    <>
      <Head>
        <title>Mundialito PES 6</title>
        <meta name="description" content="Torneo oficial de PES 6 — tablas, resultados y llave" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header activeTab={tab} onTab={setTab} />

      <main className={styles.main}>

        {/* ── HOME ──────────────────────────────────── */}
        {tab === "home" && (
          <Landing onNavigate={setTab} />
        )}

        {/* ── GRUPOS ────────────────────────────────── */}
        {tab === "grupos" && (
          <section>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>Fase de grupos</h2>
              <p className={styles.sectionSub}>Clasifican los 2 primeros de cada grupo + 4 mejores terceros</p>
            </div>
            <div className={styles.groupsGrid}>
              {Object.keys(GROUPS).map(letter => (
                <GroupTable key={letter} letter={letter} />
              ))}
            </div>
            <ThirdsTable />
          </section>
        )}

        {/* ── PARTIDOS ──────────────────────────────── */}
        {tab === "partidos" && (
          <section>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>Partidos</h2>
              <p className={styles.sectionSub}>Todos los partidos agrupados por fecha de transmisión</p>
            </div>
            <div className={styles.matchdays}>
              {matchdays.map(day => (
                <div key={day.id} className={styles.matchdayBlock}>
                  <div className={styles.matchdayHeader}>
                    <span className={styles.matchdayLabel}>{day.label}</span>
                    <span className={styles.matchdayDate}>{day.streamDate}</span>
                    <span className={styles.matchdayCount}>{day.matches.length} partidos</span>
                  </div>
                  <div className={styles.matchdayMatches}>
                    {day.matches.map(m => <MatchCard key={m.id} match={m} />)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── LLAVE ─────────────────────────────────── */}
        {tab === "llave" && (
          <section>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>Llave eliminatoria</h2>
              <p className={styles.sectionSub}>Partido único · alargue y penales en caso de empate</p>
            </div>
            <Bracket />
          </section>
        )}

        {/* ── REGLAMENTO ────────────────────────────── */}
        {tab === "reglas" && (
          <section>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>Reglamento oficial</h2>
              <p className={styles.sectionSub}>Mundialito PES 6 · Formato oficial</p>
            </div>
            <Rules />
          </section>
        )}

      </main>

      <footer className={styles.footer}>
        <span>Mundialito PES 6 · Organizado por</span>
        <a href="https://kick.com/pichon11" target="_blank" rel="noopener noreferrer" className={styles.footerKick}>pichon11</a>
        <span>·</span>
        <a href="https://discord.gg/CQyxHThYfr" target="_blank" rel="noopener noreferrer" className={styles.footerDiscord}>Discord</a>
      </footer>
    </>
  );
}
