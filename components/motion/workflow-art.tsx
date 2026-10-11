"use client"

import { useEffect, useRef, useState } from "react"
import styles from "./workflow-art.module.css"

/** Original decorative artwork. Copy and CTAs remain server-visible. */
export function WorkflowArt({ variant = "aios" }: { variant?: "aios" | "healthcare" }) {
  const root = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    if (root.current) observer.observe(root.current)
    return () => observer.disconnect()
  }, [])
  const labels = variant === "healthcare"
    ? ["Workflow", "Human review", "Evaluation"]
    : ["Enquiry", "Approved reply", "Human handoff"]
  return (
    <div ref={root} className={`${styles.art} ${variant === "healthcare" ? styles.healthcare : ""}`} data-running={visible && !paused}>
      <div className={styles.scene} aria-hidden="true">
        <div className={styles.dots} />
        <div className={styles.orbit}><div className={styles.orbitInner} /></div>
        <div className={styles.core}><span>ayo</span><span className={styles.star}>✳</span></div>
        {labels.map((label, index) => (
          <div key={label} className={`${styles.card} ${styles[`card${index}`]}`}>
            <span className={styles.number}>0{index + 1}</span><span>{label}</span><span className={styles.indicator} />
          </div>
        ))}
        <div className={styles.caption}>CONNECTED SYSTEMS · HUMAN OVERSIGHT</div>
      </div>
      <button type="button" className={styles.pause} aria-pressed={paused} onClick={() => setPaused(!paused)}>
        {paused ? "Play motion" : "Pause motion"}
      </button>
    </div>
  )
}
