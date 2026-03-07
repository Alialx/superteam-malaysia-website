import { useState, useEffect, useRef, useCallback, memo } from "react";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
type BadgeKey =
  | "Solana Builder"
  | "Hackathon Winner"
  | "Core Contributor"
  | "Grant Recipient"
  | "Bounty Hunter"
  | "DAO Steward";

interface Achievement {
  icon: string;
  title: string;
  description: string;
  year: string;
}

export default interface Member {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  skills: string[];
  badges: BadgeKey[];
  twitter: string;
  achievements: Achievement[];
}

interface ModalProps {
  member: Member;
  onClose: () => void;
}

interface MemberCardProps {
  member: Member;
  flipped: boolean;
  onFlip: () => void;
}

/* ─────────────────────────────────────────────
   CONSTANTS & DATA
───────────────────────────────────────────── */
const ACCENT     = "#5C4F9C";
const CARD_BG    = "#3C2B8C";
const INNER_BG   = "#07050B";
const CARD_W     = 337;   // px
const CARD_H     = 450;   // px


const BADGE_CONFIG: Record<BadgeKey, { icon: string }> = {
  "Solana Builder":   { icon: "◈" },
  "Hackathon Winner": { icon: "⚡" },
  "Core Contributor": { icon: "◆" },
  "Grant Recipient":  { icon: "◎" },
  "Bounty Hunter":    { icon: "◉" },
  "DAO Steward":      { icon: "◐" },
};

/* ─────────────────────────────────────────────
   MODAL
───────────────────────────────────────────── */
function Modal({ member, onClose }: ModalProps) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 300,
        display: "flex", alignItems: "center", justifyContent: "center", padding: "20px",
        background: "rgba(0,0,0,0.88)", backdropFilter: "blur(16px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative", width: "100%", maxWidth: "460px",
          borderRadius: "20px", overflow: "hidden",
          background: "linear-gradient(145deg,#0a0a14 0%,#111120 100%)",
          border: `1px solid ${ACCENT}50`,
          boxShadow: `0 0 80px ${ACCENT}25, 0 0 160px ${ACCENT}08`,
        }}
      >
        {/* top glow */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "100px", opacity: 0.3,
          background: `radial-gradient(ellipse at 50% 0%, ${ACCENT}, transparent 70%)`,
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative", padding: "28px" }}>
          <button
            onClick={onClose}
            style={{
              position: "absolute", top: "14px", right: "14px",
              width: "30px", height: "30px", borderRadius: "50%", border: "none",
              background: "rgba(255,255,255,0.06)", color: "#9ca3af",
              cursor: "pointer", fontSize: "13px",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >✕</button>

          {/* header */}
          <div style={{ display: "flex", gap: "14px", alignItems: "center", marginBottom: "20px" }}>
            <img
              src={member.avatar} alt={member.name}
              style={{ width: "56px", height: "56px", borderRadius: "14px", border: `2px solid ${ACCENT}55` }}
            />
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: "20px" }}>{member.name}</div>
              <div style={{ color: "#b8aee0", fontSize: "13px" }}>{member.role} · {member.company}</div>
              <a
                href={`https://twitter.com/${member.twitter.replace("@", "")}`}
                target="_blank" rel="noreferrer"
                style={{ color: "#c4b8e8", fontSize: "12px", textDecoration: "none" }}
              >{member.twitter}</a>
            </div>
          </div>

          {/* badges */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", marginBottom: "20px" }}>
            {member.badges.map((b) => (
              <span key={b} style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "5px 13px", borderRadius: "999px", fontSize: "12px",
                background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)",
              }}>
                <span style={{ color: "#e2d9ff", fontSize: "13px" }}>{BADGE_CONFIG[b].icon}</span>
                <span style={{ color: "#e2d9ff" }}>{b}</span>
              </span>
            ))}
          </div>

          <div style={{
            color: "#a89ecf", fontSize: "10px", fontWeight: 700,
            letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "14px",
          }}>
            On-Chain Achievements
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "11px" }}>
            {member.achievements.map((a, i) => (
              <div key={i} style={{
                display: "flex", gap: "14px", padding: "14px", borderRadius: "13px",
                background: `${ACCENT}12`, border: `1px solid ${ACCENT}35`,
              }}>
                <div style={{
                  width: "42px", height: "42px", borderRadius: "10px", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "20px", background: `${ACCENT}22`, border: `1px solid ${ACCENT}40`,
                }}>{a.icon}</div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "8px" }}>
                    <div style={{ color: "#ffffff", fontSize: "14px", fontWeight: 600 }}>{a.title}</div>
                    <div style={{ color: "#9d8fc4", fontSize: "11px", flexShrink: 0 }}>{a.year}</div>
                  </div>
                  <div style={{ color: "#c4b8e8", fontSize: "12px", marginTop: "3px", lineHeight: "1.5" }}>
                    {a.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MEMBER CARD
───────────────────────────────────────────── */
export const MemberCard = memo(function MemberCard({ member, flipped, onFlip }: MemberCardProps) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [hovered,   setHovered]   = useState<boolean>(false);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onFlip();
  }, [onFlip]);

  return (
    <>
      <div
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "relative",
          width: `${CARD_W}px`,
          height: `${CARD_H}px`,
          perspective: "1000px",
          flexShrink: 0,
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        {/* glow bloom */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: "14px",
          pointerEvents: "none", zIndex: 0,
          background: `radial-gradient(ellipse at 50% 115%, ${ACCENT}72, transparent 60%)`,
          filter: "blur(22px)",
          transform: "translateY(14px) scaleX(0.82)",
          opacity: hovered ? 1 : 0.4,
          transition: "opacity 0.35s ease",
        }} />

        {/* flip wrapper */}
        <div style={{
          position: "relative", width: "100%", height: "100%",
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.72s cubic-bezier(0.4,0.2,0.2,1)",
        }}>

          {/* ══ FRONT ══ */}
          <div style={{
            position: "absolute", inset: 0, borderRadius: "12px", overflow: "hidden",
            backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
            backgroundColor: CARD_BG,
            boxShadow: hovered
              ? `0 0 0 1px ${ACCENT}55, 0 20px 55px rgba(0,0,0,0.8), 0 0 40px ${ACCENT}30`
              : `0 0 0 1px ${ACCENT}20, 0 10px 35px rgba(0,0,0,0.65)`,
            transition: "box-shadow 0.35s ease",
          }}>
            {/* blur orb */}
            <div style={{
              position: "absolute", width: "224px", height: "192px",
              background: "white", filter: "blur(50px)",
              left: "-50%", top: "-50%", zIndex: 0,
              opacity: hovered ? 0.16 : 0.10,
              transition: "opacity 0.35s ease",
            }} />

            {/* inner dark surface */}
            <div style={{
              position: "absolute", inset: "2px", borderRadius: "10px",
              background: INNER_BG, zIndex: 1,
              display: "flex", flexDirection: "column", overflow: "hidden",
            }}>
              {/* avatar */}
              <div style={{ position: "relative", flex: "1 1 auto", overflow: "hidden", minHeight: 0 }}>
                <img
                  src={member.avatar} alt={member.name}
                  style={{
                    width: "100%", height: "100%",
                    objectFit: "cover", objectPosition: "center top", display: "block",
                  }}
                />
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0, height: "56px",
                  background: `linear-gradient(to bottom, transparent, ${INNER_BG})`,
                }} />
              </div>

              {/* name / role strip */}
              <div style={{ padding: "10px 12px 12px", flexShrink: 0 }}>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: "14px", lineHeight: "1.2", letterSpacing: "-0.01em" }}>
                  {member.name}
                </div>
                <div style={{ color: "#6b7280", fontSize: "10px", marginTop: "2px" }}>{member.role}</div>
                <div style={{ color: `${ACCENT}bb`, fontSize: "10px" }}>{member.company}</div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "8px" }}>
                  {member.skills.map((s) => (
                    <span key={s} style={{
                      padding: "2px 8px", borderRadius: "999px",
                      fontSize: "9px", fontWeight: 600, letterSpacing: "0.04em",
                      background: `${ACCENT}14`, color: `${ACCENT}dd`, border: `1px solid ${ACCENT}30`,
                    }}>{s}</span>
                  ))}
                  <a
                    href={`https://twitter.com/${member.twitter.replace("@", "")}`}
                    onClick={(e) => e.stopPropagation()}
                    target="_blank" rel="noreferrer"
                    style={{
                      display: "flex", alignItems: "center", gap: "3px",
                      padding: "2px 8px", borderRadius: "999px", fontSize: "9px",
                      background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)",
                      color: "#9ca3af", textDecoration: "none",
                    }}
                  >
                    <svg viewBox="0 0 24 24" style={{ width: "8px", height: "8px", fill: "#9ca3af" }}>
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    {member.twitter}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ══ BACK ══ */}
          <div style={{
            position: "absolute", inset: 0, borderRadius: "12px", overflow: "hidden",
            backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            backgroundColor: CARD_BG,
            boxShadow: `0 0 0 1px ${ACCENT}55, 0 20px 55px rgba(0,0,0,0.8), 0 0 50px ${ACCENT}30`,
          }}>
            {/* blur orb */}
            <div style={{
              position: "absolute", width: "224px", height: "192px",
              background: "white", filter: "blur(50px)",
              left: "-50%", top: "-50%", zIndex: 0, opacity: 0.07,
            }} />

            {/* inner dark surface */}
            <div style={{
              position: "absolute", inset: "2px", borderRadius: "10px",
              background: INNER_BG, zIndex: 1, overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "120px", opacity: 0.4,
                background: `radial-gradient(ellipse at 50% 0%, ${ACCENT}, transparent 70%)`,
                pointerEvents: "none",
              }} />

              <div style={{
                position: "relative", padding: "20px", height: "100%",
                display: "flex", flexDirection: "column", boxSizing: "border-box",
              }}>
                <div style={{
                  color: "#e2d9ff", fontSize: "11px", fontWeight: 700,
                  letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "16px",
                }}>◈ Achievements</div>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px", flex: 1, overflow: "hidden" }}>
                  {member.achievements.slice(0, 3).map((a, i) => (
                    <div key={i} style={{
                      display: "flex", gap: "12px", padding: "12px", borderRadius: "11px",
                      background: `${ACCENT}12`, border: `1px solid ${ACCENT}35`,
                    }}>
                      <div style={{
                        width: "40px", height: "40px", borderRadius: "9px", flexShrink: 0,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "20px", background: `${ACCENT}22`,
                      }}>{a.icon}</div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{
                          color: "#ffffff", fontSize: "13px", fontWeight: 600,
                          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                        }}>{a.title}</div>
                        <div style={{
                          color: "#c4b8e8", fontSize: "11px", lineHeight: "1.4", marginTop: "3px",
                          overflow: "hidden", display: "-webkit-box",
                          WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const,
                        }}>{a.description}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "14px" }}>
                  {member.badges.map((b) => (
                    <span key={b} style={{
                      display: "flex", alignItems: "center", gap: "5px",
                      padding: "4px 10px", borderRadius: "999px", fontSize: "11px",
                      background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)",
                    }}>
                      <span style={{ color: "#e2d9ff" }}>{BADGE_CONFIG[b].icon}</span>
                      <span style={{ color: "#d4c9f5" }}>{b}</span>
                    </span>
                  ))}
                </div>

                <button
                  onClick={(e) => { e.stopPropagation(); setModalOpen(true); }}
                  style={{
                    marginTop: "14px", width: "100%", padding: "11px", borderRadius: "10px",
                    fontSize: "13px", fontWeight: 600, cursor: "pointer",
                    background: `linear-gradient(135deg, ${ACCENT}33, ${ACCENT}18)`,
                    border: `1px solid ${ACCENT}60`, color: "#e2d9ff",
                    transition: "transform 0.15s",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.03)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
                >Full Profile →</button>
              </div>
            </div>
          </div>

        </div>{/* /flip wrapper */}
      </div>{/* /perspective container */}

      {modalOpen && <Modal member={member} onClose={() => setModalOpen(false)} />}
    </>
  );
});