"use client";

import { useState, useCallback, memo, useMemo, useEffect, useRef } from "react";
import { Member }from "@/types";

import {
  getAllMembers,
  getAllSkills,
  mapSanityMembers,
  type SanitySkill,
} from "@/lib/sanity/queries";

interface MemberCardProps {
  member: Member;
  flipped: boolean;
  onFlip: () => void;
}

const ACCENT   = "#5C4F9C";
const INNER_BG = "#07050B";
const BORDER   = "#333333";
const CORNER   = "#3C2B8C";
const CARD_W   = 340;
const CARD_H   = 480;

function CornerBrackets({
  size = 12, thickness = 2, color = CORNER,
}: { size?: number; thickness?: number; color?: string }) {
  const s: React.CSSProperties = { position: "absolute", width: `${size}px`, height: `${size}px` };
  const b = `${thickness}px solid ${color}`;
  return (
    <>
      <span style={{ ...s, top: 0,    left: 0,  borderTop: b,    borderLeft: b  }} />
      <span style={{ ...s, top: 0,    right: 0, borderTop: b,    borderRight: b }} />
      <span style={{ ...s, bottom: 0, left: 0,  borderBottom: b, borderLeft: b  }} />
      <span style={{ ...s, bottom: 0, right: 0, borderBottom: b, borderRight: b }} />
    </>
  );
}

const MemberCard = memo(function MemberCard({ member, flipped, onFlip }: MemberCardProps) {
  const [hovered, setHovered] = useState(false);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onFlip();
  }, [onFlip]);

  const avatarSrc = member.avatar
    ?? `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(member.name)}`;

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        width: `${CARD_W}px`,
        height: `${CARD_H}px`,
        perspective: "1200px",
        flexShrink: 0,
        cursor: "pointer",
        userSelect: "none",
        transform: hovered ? "scale(1.02)" : "scale(1)",
        transition: "transform 0.6s cubic-bezier(0.34,1.56,0.64,1)",
        zIndex: hovered ? 10 : 1,
      }}
    >
      <div style={{
        position: "absolute", inset: "-10px",
        pointerEvents: "none", zIndex: 0,
        background: `radial-gradient(ellipse at 50% 110%, ${ACCENT}, transparent 65%)`,
        filter: "blur(35px)",
        transform: "translateY(20px) scaleX(0.85)",
        opacity: hovered ? 0.75 : 0,
        transition: "opacity 0.35s ease",
      }} />

      <div style={{
        position: "relative", width: "100%", height: "100%",
        transformStyle: "preserve-3d",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        transition: "transform 0.72s cubic-bezier(0.4,0.2,0.2,1)",
      }}>

        <div style={{
          position: "absolute", inset: 0, overflow: "hidden",
          backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
          backgroundColor: INNER_BG,
          border: `1px solid ${hovered ? ACCENT + "70" : BORDER}`,
          boxShadow: hovered
            ? `0 24px 60px rgba(0,0,0,0.85), 0 0 50px ${ACCENT}30`
            : `0 10px 40px rgba(0,0,0,0.6)`,
          transition: "box-shadow 0.35s ease, border-color 0.35s ease",
        }}>
          <CornerBrackets color={hovered ? "#7B6BC0" : CORNER} size={14} thickness={2} />

          <div style={{
            position: "absolute", width: "280px", height: "220px",
            background: "white", filter: "blur(60px)",
            left: "-35%", top: "-35%", zIndex: 0,
            opacity: hovered ? 0.12 : 0.07,
            transition: "opacity 0.35s ease",
          }} />

          <div style={{
            position: "relative", display: "flex", flexDirection: "column",
            height: "100%", zIndex: 1,
          }}>
            <div style={{ position: "relative", flex: "1 1 auto", overflow: "hidden", minHeight: 0 }}>
              <img
                src={avatarSrc} alt={member.name}
                style={{
                  width: "100%", height: "100%",
                  objectFit: "cover", objectPosition: "center top", display: "block",
                }}
              />
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: "90px",
                background: `linear-gradient(to bottom, transparent, ${INNER_BG})`,
              }} />
            </div>

            <div style={{ padding: "12px 16px 16px", flexShrink: 0 }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "8px" }}>
                <div style={{
                  color: "#ffffff", fontWeight: 700, fontSize: "20px",
                  lineHeight: "1.2", letterSpacing: "-0.02em",
                }}>
                  {member.name}
                </div>

                {member.twitter && (
                  <a
                    href={`https://twitter.com/${member.twitter.replace(/^.*\/|@/g, "")}`}
                    onClick={(e) => e.stopPropagation()}
                    target="_blank" rel="noreferrer"
                    style={{
                      display: "flex", alignItems: "center", gap: "4px",
                      marginTop: "4px", padding: "3px 9px", flexShrink: 0,
                      fontSize: "11px",
                      background: "rgba(255,255,255,0.04)", border: `1px solid ${BORDER}`,
                      color: "#9ca3af", textDecoration: "none",
                    }}
                  >
                    <svg viewBox="0 0 24 24" style={{ width: "10px", height: "10px", fill: "#9ca3af" }}>
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    {member.twitter.replace(/^.*\//, "")}
                  </a>
                )}
              </div>

              {member.role && (
                <div style={{ color: "#a89ecf", fontSize: "12px", marginTop: "3px" }}>{member.role}</div>
              )}
              {member.company && (
                <div style={{ color: "#7b6fc2", fontSize: "12px", fontWeight: 500 }}>{member.company}</div>
              )}

              {member.skills && member.skills.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginTop: "10px" }}>
                  {member.skills.slice(0, 3).map((s) => (
                    <span key={s} style={{
                      padding: "2px 9px", fontSize: "10px", fontWeight: 600, letterSpacing: "0.04em",
                      background: `${ACCENT}18`, color: "#d4c9f5", border: `1px solid ${ACCENT}35`,
                    }}>{s}</span>
                  ))}
                  {member.skills.length > 3 && (
                    <span style={{
                      padding: "2px 9px", fontSize: "10px", fontWeight: 600,
                      background: `${ACCENT}0c`, color: `${ACCENT}aa`, border: `1px solid ${ACCENT}25`,
                    }}>+{member.skills.length - 3}</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div style={{
          position: "absolute", inset: 0, overflow: "hidden",
          backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          backgroundColor: INNER_BG,
          border: `1px solid ${ACCENT}55`,
          boxShadow: `0 24px 60px rgba(0,0,0,0.85), 0 0 60px ${ACCENT}30`,
        }}>
          <CornerBrackets color={CORNER} size={14} thickness={2} />

          <div style={{
            position: "absolute", width: "280px", height: "220px",
            background: "white", filter: "blur(60px)",
            left: "-35%", top: "-35%", zIndex: 0, opacity: 0.05,
          }} />

          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "130px", opacity: 0.35,
            background: `radial-gradient(ellipse at 50% 0%, ${ACCENT}, transparent 70%)`,
            pointerEvents: "none", zIndex: 1,
          }} />

          <div style={{
            position: "relative", height: "100%",
            display: "flex", flexDirection: "column",
            boxSizing: "border-box", zIndex: 2,
          }}>
            <div style={{ padding: "18px 18px 0", flexShrink: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                <img
                  src={avatarSrc} alt={member.name}
                  style={{
                    width: "42px", height: "42px", flexShrink: 0,
                    objectFit: "cover", objectPosition: "center top",
                    border: `1px solid ${BORDER}`,
                  }}
                />
                <div>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: "15px", letterSpacing: "-0.01em" }}>
                    {member.name}
                  </div>
                  {member.company && (
                    <div style={{ color: "#7b6fc2", fontSize: "11px" }}>{member.company}</div>
                  )}
                </div>
              </div>

              {member.skills && member.skills.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "12px" }}>
                  {member.skills.map((s) => (
                    <span key={s} style={{
                      padding: "2px 8px", fontSize: "10px", fontWeight: 600,
                      background: `${ACCENT}18`, color: "#d4c9f5", border: `1px solid ${ACCENT}35`,
                    }}>{s}</span>
                  ))}
                </div>
              )}



              <div style={{
                color: "#6b5fa8", fontSize: "9px", fontWeight: 700,
                letterSpacing: "0.16em", textTransform: "uppercase",
                marginBottom: "10px",
              }}>◈ Achievements</div>
            </div>

            <div
              className="member-scroll"
              style={{
                flex: "1 1 auto", overflowY: "auto",
                padding: "0 18px",
                scrollbarWidth: "thin",
                scrollbarColor: `${ACCENT}40 transparent`,
              }}
            >
              {member.achievements && member.achievements.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", paddingBottom: "16px" }}>
                  {member.achievements.map((a, i) => (
                    <div key={i} style={{
                      display: "flex", gap: "10px", padding: "11px",
                      background: `${ACCENT}0e`, border: `1px solid ${ACCENT}28`,
                    }}>
                      {a.icon && (
                        <div style={{
                          width: "34px", height: "34px", flexShrink: 0,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "17px", background: `${ACCENT}18`,
                        }}>{a.icon}</div>
                      )}
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div style={{
                          display: "flex", justifyContent: "space-between",
                          alignItems: "baseline", gap: "6px",
                        }}>
                          <div style={{
                            color: "#ffffff", fontSize: "12px", fontWeight: 600,
                            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                          }}>{a.title}</div>
                          {a.year && (
                            <div style={{ color: "#6b5fa8", fontSize: "10px", flexShrink: 0 }}>
                              {a.year}
                            </div>
                          )}
                        </div>
                        {a.description && (
                          <div style={{
                            color: "#c4b8e8", fontSize: "11px",
                            lineHeight: "1.4", marginTop: "3px",
                          }}>{a.description}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ color: "#4b5563", fontSize: "12px", padding: "8px 0 16px" }}>
                  No achievements listed yet.
                </div>
              )}
            </div>

            <div style={{
              height: "28px", flexShrink: 0,
              background: `linear-gradient(to bottom, transparent, ${INNER_BG})`,
              pointerEvents: "none", marginTop: "-28px",
            }} />
          </div>
        </div>

      </div>
    </div>
  );
});

function SkillDropdown({
  skills,
  activeSkills, onToggle, onClear,
}: {
  skills: string[];
  activeSkills: Set<string>;
  onToggle: (skill: string) => void;
  onClear: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const count = activeSkills.size;

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex", alignItems: "center", gap: "8px",
          padding: "8px 14px", cursor: "pointer",
          background: count > 0 ? `${ACCENT}25` : "rgba(255,255,255,0.03)",
          border: `1px solid ${open || count > 0 ? ACCENT + "60" : BORDER}`,
          color: count > 0 ? "#e2d9ff" : "#9ca3af",
          fontSize: "12px", fontWeight: count > 0 ? 600 : 400,
          transition: "all 0.2s", position: "relative",
        }}
      >
        {count > 0 && <CornerBrackets color={CORNER} size={5} thickness={1} />}
        <span>Skills</span>
        {count > 0 && (
          <span style={{
            background: ACCENT, color: "#fff",
            fontSize: "10px", fontWeight: 700,
            padding: "1px 6px", minWidth: "18px", textAlign: "center",
          }}>{count}</span>
        )}
        <svg
          width="11" height="11" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 6px)", left: 0,
          zIndex: 50, minWidth: "200px",
          background: "#0d0d1a",
          border: `1px solid ${BORDER}`,
          boxShadow: `0 16px 48px rgba(0,0,0,0.75), 0 0 30px ${ACCENT}12`,
          padding: "6px",
        }}>
          <CornerBrackets color={CORNER} size={8} thickness={1.5} />

          {skills.map((skill) => {
            const active = activeSkills.has(skill);
            return (
              <button
                key={skill}
                onClick={() => onToggle(skill)}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  width: "100%", padding: "8px 10px", textAlign: "left",
                  background: active ? `${ACCENT}20` : "transparent",
                  border: "none", cursor: "pointer",
                  color: active ? "#e2d9ff" : "#9ca3af",
                  fontSize: "12px", fontWeight: active ? 600 : 400,
                  transition: "background 0.15s, color 0.15s",
                }}
                onMouseEnter={(e) => {
                  if (!active) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)";
                }}
                onMouseLeave={(e) => {
                  if (!active) (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                }}
              >
                <span>{skill}</span>
                {active && <span style={{ color: ACCENT, fontSize: "13px" }}>✓</span>}
              </button>
            );
          })}

          {count > 0 && (
            <>
              <div style={{ borderTop: `1px solid ${BORDER}`, margin: "6px 0" }} />
              <button
                onClick={() => { onClear(); setOpen(false); }}
                style={{
                  width: "100%", padding: "7px 10px", textAlign: "left",
                  background: "transparent", border: "none", cursor: "pointer",
                  color: "#6b7280", fontSize: "11px",
                }}
              >✕ Clear all</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default function MembersPage() {
  const [members,      setMembers]      = useState<Member[]>([]);
  const [skillList,    setSkillList]    = useState<string[]>([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState<string | null>(null);
  const [search,       setSearch]       = useState("");
  const [activeSkills, setActiveSkills] = useState<Set<string>>(new Set());
  const [flippedIds,   setFlippedIds]   = useState<Record<string, boolean>>({});

  useEffect(() => {
    Promise.all([getAllMembers(), getAllSkills()])
      .then(([rawMembers, rawSkills]) => {
        setMembers(mapSanityMembers(rawMembers));

        if (rawSkills.length > 0) {
          setSkillList(rawSkills.map((s: SanitySkill) => s.name));
        } else {
          const fromMembers = Array.from(
            new Set(
              mapSanityMembers(rawMembers).flatMap((m) => m.skills)
            )
          ).sort();
          setSkillList(fromMembers);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load members.");
        setLoading(false);
      });
  }, []);

  const toggleFlip  = useCallback((id: number) => {
    setFlippedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const toggleSkill = useCallback((skill: string) => {
    setActiveSkills((prev) => {
      const next = new Set(prev);
      if (next.has(skill)) next.delete(skill); else next.add(skill);
      return next;
    });
  }, []);

  const clearSkills = useCallback(() => setActiveSkills(new Set()), []);

  const filtered = useMemo<Member[]>(() => {
    let result = members;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.role?.toLowerCase().includes(q) ||
          m.company?.toLowerCase().includes(q) ||
          m.skills?.some((s) => s.toLowerCase().includes(q))
      );
    }
    if (activeSkills.size > 0) {
      result = result.filter((m) => m.skills?.some((s) => activeSkills.has(s)));
    }
    return result;
  }, [members, search, activeSkills]);

  return (
    <main className="min-h-screen bg-[#07050B]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; font-family: Inter, sans-serif; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes spin   { to { transform: rotate(360deg); } }
        .member-scroll::-webkit-scrollbar { width: 3px; }
        .member-scroll::-webkit-scrollbar-track { background: transparent; }
        .member-scroll::-webkit-scrollbar-thumb { background: ${ACCENT}50; border-radius: 2px; }
      `}</style>

      <div className="min-h-screen relative z-10 max-w-[1700px] mx-auto px-4 py-20 sm:px-6 lg:px-8 lg:py-30">

        <div style={{
          display: "flex", alignItems: "center", gap: "10px",
          marginBottom: "40px", flexWrap: "wrap",
        }}>
          {/* search */}
          <div style={{ position: "relative", flex: "1 1 240px", maxWidth: "400px" }}>
            <svg
              viewBox="0 0 24 24" fill="none" stroke="#6b5fa8" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
              style={{
                position: "absolute", left: "11px", top: "50%",
                transform: "translateY(-50%)", width: "13px", height: "13px", pointerEvents: "none",
              }}
            >
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search name, role, company…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%", padding: "9px 34px 9px 34px",
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${search ? ACCENT + "55" : BORDER}`,
                color: "#e2d9ff", fontSize: "13px",
                outline: "none", transition: "border-color 0.2s",
              }}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                style={{
                  position: "absolute", right: "10px", top: "50%",
                  transform: "translateY(-50%)",
                  background: "none", border: "none",
                  color: "#6b7280", cursor: "pointer", fontSize: "13px", padding: "2px",
                }}
              >✕</button>
            )}
          </div>

          <SkillDropdown skills={skillList} activeSkills={activeSkills} onToggle={toggleSkill} onClear={clearSkills} />

          {Array.from(activeSkills).map((skill) => (
            <span
              key={skill}
              onClick={() => toggleSkill(skill)}
              style={{
                display: "flex", alignItems: "center", gap: "5px",
                padding: "5px 11px", cursor: "pointer",
                background: `${ACCENT}20`, border: `1px solid ${ACCENT}50`,
                color: "#d4c9f5", fontSize: "11px", fontWeight: 600,
              }}
            >
              {skill}
              <span style={{ color: "#8b7fe8", fontSize: "12px", lineHeight: 1 }}>✕</span>
            </span>
          ))}

          <span style={{ marginLeft: "auto", color: "#4b5563", fontSize: "11px", fontVariantNumeric: "tabular-nums" }}>
            {loading ? "Loading…" : `${filtered.length} member${filtered.length !== 1 ? "s" : ""}`}
          </span>
        </div>

        {loading && (
          <div style={{ display: "flex", justifyContent: "center", padding: "80px 0" }}>
            <div style={{
              width: "30px", height: "30px",
              border: `2px solid ${BORDER}`, borderTop: `2px solid ${ACCENT}`,
              borderRadius: "50%", animation: "spin 0.8s linear infinite",
            }} />
          </div>
        )}

        {error && !loading && (
          <div style={{ textAlign: "center", padding: "80px 20px", color: "#ef4444", fontSize: "14px" }}>
            {error}
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 20px", color: "#4b5563", fontSize: "14px" }}>
            {members.length === 0 ? "No members in Sanity yet." : "No members match your search or filters."}
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div style={{
            display: "grid",
            gridTemplateColumns: `repeat(auto-fill, minmax(${CARD_W}px, 1fr))`,
            gap: "32px",
          }}>
            {filtered.map((member, idx) => (
              <div
                key={member.id}
                style={{
                  display: "flex", justifyContent: "center",
                  animation: "fadeUp 0.45s ease both",
                  animationDelay: `${Math.min(idx * 0.06, 0.42)}s`,
                }}
              >
                <MemberCard
                  member={member}
                  flipped={!!flippedIds[member.id]}
                  onFlip={() => toggleFlip(member.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}