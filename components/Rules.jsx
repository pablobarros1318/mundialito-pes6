import styles from "./Rules.module.css";

function Section({ icon, title, children }) {
  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <span className={styles.icon}>{icon}</span>
        <h3 className={styles.sectionTitle}>{title}</h3>
      </div>
      <div className={styles.sectionBody}>{children}</div>
    </div>
  );
}

function Item({ children }) {
  return <div className={styles.item}><span className={styles.bullet}>—</span><span>{children}</span></div>;
}

function Stat({ label, value, accent }) {
  return (
    <div className={styles.stat}>
      <div className={`${styles.statValue} ${accent ? styles.accent : ""}`}>{value}</div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  );
}

function TieRow({ num, text }) {
  return (
    <div className={styles.tieRow}>
      <span className={styles.tieNum}>{num}</span>
      <span>{text}</span>
    </div>
  );
}

export default function Rules() {
  return (
    <div className={styles.rules}>

      {/* Overview stats */}
      <div className={styles.statsRow}>
        <Stat value="24" label="Participantes" />
        <Stat value="6" label="Grupos" />
        <Stat value="16" label="Clasificados" />
        <Stat value="10 min" label="Duración partido" accent />
        <Stat value="⭐⭐⭐⭐⭐" label="Dificultad" accent />
      </div>

      <div className={styles.grid}>

        <Section icon="🎮" title="Modo de juego">
          <Item>Solo selecciones nacionales. Cada selección es usada por un único jugador durante todo el torneo.</Item>
          <Item>Los grupos se determinan mediante sorteo en vivo.</Item>
          <Item>Duración: 10 minutos (dos tiempos de 5).</Item>
          <Item>Clima y horario: Despejado · Verano · Noche.</Item>
          <Item>Se respetan las expulsiones y la acumulación de 2 tarjetas amarillas. Las amarillas se limpian al finalizar Octavos de Final.</Item>
        </Section>

        <Section icon="🌍" title="Fase de grupos">
          <Item>6 grupos (A–F) de 4 jugadores cada uno.</Item>
          <Item>Todos contra todos: 3 partidos por jugador.</Item>
          <div className={styles.pointsBox}>
            <div className={styles.pointRow}><span className={styles.dot} style={{background:"#1baf7a"}} />Victoria<span className={styles.pts}>3 pts</span></div>
            <div className={styles.pointRow}><span className={styles.dot} style={{background:"#e8b84b"}} />Empate<span className={styles.pts}>1 pt</span></div>
            <div className={styles.pointRow}><span className={styles.dot} style={{background:"#e34948"}} />Derrota<span className={styles.pts}>0 pts</span></div>
          </div>
        </Section>

        <Section icon="🏅" title="Clasificación">
          <Item>Avanzan a Octavos: los 2 primeros de cada grupo (12 clasificados).</Item>
          <Item>Más los 4 mejores terceros de todos los grupos.</Item>
          <Item>Total de clasificados: 16 jugadores.</Item>
        </Section>

        <Section icon="⚖️" title="Criterio de desempate">
          <p className={styles.tieIntro}>En caso de igualdad de puntos, se aplican en orden:</p>
          <TieRow num="1" text="Diferencia de gol" />
          <TieRow num="2" text="Mayor cantidad de goles a favor" />
          <TieRow num="3" text="Resultado entre los jugadores empatados" />
          <TieRow num="4" text="Menor cantidad de goles en contra" />
          <TieRow num="5" text="Sorteo" />
        </Section>

        <Section icon="⚔️" title="Eliminación directa">
          <Item>Los 16 clasificados disputan los cruces mata-mata.</Item>
          <Item>Todos los encuentros son a partido único.</Item>
          <Item>En caso de empate se juega alargue. Si persiste la igualdad, se define por penales.</Item>
          <Item>Los cruces de los primeros vs. mejores terceros se definen según la tabla de combinaciones de terceros.</Item>
        </Section>

        <Section icon="🛑" title="Reglamento de organización">
          <Item>Cada partido tiene día y horario asignado según disponibilidad informada en el formulario.</Item>
          <Item>Si un jugador no puede disputar un partido, debe informar con antelación a la organización.</Item>
          <Item>Toda ausencia injustificada se sanciona con derrota por 3-0.</Item>
          <Item>Si un jugador no se presenta luego de 15 minutos de espera, pierde el partido por 3-0.</Item>
          <Item>Está prohibido abandonar un partido una vez iniciado.</Item>
          <Item>Las pausas solo pueden realizarse con la pelota detenida.</Item>
          <Item>Cualquier conducta antideportiva puede ser sancionada por la organización.</Item>
          <Item>La organización tiene la última palabra ante cualquier situación no contemplada.</Item>
        </Section>

      </div>
    </div>
  );
}
