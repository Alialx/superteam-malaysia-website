"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import AnimatedButton from "./Button";

const FEED_ID  = "2fa7c7db-b31f-4a41-9a7a-f3b85b8a2638";
const API_BASE = `https://api.curator.io/v1/feeds/${FEED_ID}/posts?limit=20`;

const BRACKET_COLOR = "#3C2B8C";
const BORDER_COLOR  = "#2a2a2a";
const CARD_BG       = "#111111";

interface CuratorPost {
  id: string | number;
  user_full_name?: string;
  user_screen_name?: string;
  user_image?: string;
  text?: string;
  content?: string;
  likes?: number;
  like_count?: number;
  retweets?: number;
  retweet_count?: number;
  source_created_at?: string;
  created_at?: string;
  image?: string;
  media_url?: string;
}

interface CuratorResponse {
  posts?: CuratorPost[];
  data?:  CuratorPost[];
  items?: CuratorPost[];
  pagination?: { after?: string; before?: string };
}

interface CornerBracketsProps  { color?: string; size?: number; thickness?: number; }
interface TagPillProps          { tag: string; }
interface TweetTextProps        { text: string; }
interface TweetCardProps        { post: CuratorPost; index: number; isNew: boolean; }
interface LiveBarProps          { count: number; }
interface NewPostsBannerProps   { count: number; onClick: () => void; }
interface ErrorStateProps       { message: string; onRetry: () => void; }
interface FetchOptions          { silent?: boolean; append?: boolean; }

function CornerBrackets({ color = BRACKET_COLOR, size = 10, thickness = 2 }: CornerBracketsProps) {
  const s = (extra: React.CSSProperties): React.CSSProperties => ({
    position: "absolute", width: size, height: size, transition: "border-color 0.3s", ...extra,
  });
  return (
    <>
      <span style={s({ top: 0,    left:  0, borderTop:    `${thickness}px solid ${color}`, borderLeft:   `${thickness}px solid ${color}` })} />
      <span style={s({ top: 0,    right: 0, borderTop:    `${thickness}px solid ${color}`, borderRight:  `${thickness}px solid ${color}` })} />
      <span style={s({ bottom: 0, left:  0, borderBottom: `${thickness}px solid ${color}`, borderLeft:   `${thickness}px solid ${color}` })} />
      <span style={s({ bottom: 0, right: 0, borderBottom: `${thickness}px solid ${color}`, borderRight:  `${thickness}px solid ${color}` })} />
    </>
  );
}

const TAG_COLORS: Record<string, { bg: string; color: string }> = {
  solana:  { bg: "rgba(20,241,149,0.1)",  color: "#14f195" },
  uae:     { bg: "rgba(249,115,22,0.1)",  color: "#fb923c" },
  dubai:   { bg: "rgba(249,115,22,0.1)",  color: "#fb923c" },
  vc:      { bg: "rgba(153,69,255,0.12)", color: "#c084fc" },
  web3:    { bg: "rgba(96,165,250,0.1)",  color: "#60a5fa" },
  bitcoin: { bg: "rgba(247,147,26,0.12)", color: "#f7931a" },
  crypto:  { bg: "rgba(52,211,153,0.1)",  color: "#34d399" },
};

function TagPill({ tag }: TagPillProps) {
  const key = tag.replace("#", "").toLowerCase();
  const c   = TAG_COLORS[key] ?? { bg: "rgba(255,255,255,0.06)", color: "#6b7280" };
  return (
    <span style={{
      display: "inline-block", padding: "2px 9px", borderRadius: 999,
      fontSize: 10, fontWeight: 600, letterSpacing: "0.04em",
      background: c.bg, color: c.color, marginRight: 4, marginTop: 6,
    }}>{tag}</span>
  );
}

function relativeTime(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60)    return `${diff}s`;
  if (diff < 3600)  return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  return `${Math.floor(diff / 86400)}d`;
}

function extractTags(text: string): string[] {
  return [...new Set((text.match(/#\w+/g) ?? []).slice(0, 3))];
}

function TweetText({ text }: TweetTextProps) {
  const parts = text.split(/(\s@\w+|#\w+|https?:\/\/\S+)/g);
  return (
    <p style={{ fontSize: 13.5, lineHeight: 1.7, color: "#8a8a9a", fontFamily: "'Inter', sans-serif", margin: 0 }}>
      {parts.map((part, i) => {
        const t = part.trim();
        if (t.startsWith("@"))    return <span key={i} style={{ color: "#9945ff", fontWeight: 500 }}>{part}</span>;
        if (t.startsWith("#"))    return <span key={i} style={{ color: "#14f195", fontWeight: 500 }}>{part}</span>;
        if (t.startsWith("http")) return null;
        return part;
      })}
    </p>
  );
}

const GRADIENTS: string[] = [
  "linear-gradient(135deg,#667eea,#764ba2)",
  "linear-gradient(135deg,#f7971e,#ffd200)",
  "linear-gradient(135deg,#11998e,#38ef7d)",
  "linear-gradient(135deg,#4facfe,#00f2fe)",
  "linear-gradient(135deg,#f093fb,#f5576c)",
  "linear-gradient(135deg,#f7931a,#ffce5c)",
  "linear-gradient(135deg,#a18cd1,#fbc2eb)",
  "linear-gradient(135deg,#84fab0,#8fd3f4)",
];

function getGradient(str: string): string {
  let hash = 0;
  for (const c of str) hash = (hash * 31 + c.charCodeAt(0)) & 0xffffffff;
  return GRADIENTS[Math.abs(hash) % GRADIENTS.length];
}

function initials(name: string): string {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

function SkeletonCard() {
  return (
    <div style={{ position: "relative", background: CARD_BG, padding: "18px 20px", marginBottom: 14 }}>
      <span style={{ position: "absolute", inset: 0, border: `1px solid ${BORDER_COLOR}` }} />
      <CornerBrackets />
      <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#1a1a1a", animation: "pulse 1.5s infinite" }} />
        <div style={{ flex: 1 }}>
          <div style={{ height: 12, width: "40%", background: "#1a1a1a", borderRadius: 4, marginBottom: 6, animation: "pulse 1.5s infinite" }} />
          <div style={{ height: 10, width: "25%", background: "#151515", borderRadius: 4, animation: "pulse 1.5s infinite" }} />
        </div>
      </div>
      {[100, 80, 55].map((w) => (
        <div key={w} style={{ height: 11, background: "#1a1a1a", borderRadius: 4, width: `${w}%`, marginBottom: 6, animation: "pulse 1.5s infinite" }} />
      ))}
    </div>
  );
}

function TweetCard({ post, index, isNew }: TweetCardProps) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), isNew ? 60 : index * 50 + 50);
    return () => clearTimeout(t);
  }, []);

  const name   = post.user_full_name ?? post.user_screen_name ?? "User";
  const handle = `@${post.user_screen_name ?? "user"}`;
  const text   = post.text ?? post.content ?? "";
  const tags   = extractTags(text);
  const likes  = post.likes ?? post.like_count ?? 0;
  const rts    = post.retweets ?? post.retweet_count ?? 0;
  const time   = relativeTime(post.source_created_at ?? post.created_at ?? new Date().toISOString());
  const imgSrc = post.image && post.image !== "" ? post.image : (post.media_url ?? null);
  const avatar = post.user_image ?? null;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: hovered ? "#161616" : CARD_BG,
        padding: "18px 20px", marginBottom: 14, breakInside: "avoid",
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: "opacity 0.45s ease, transform 0.45s ease, background 0.2s",
      }}
    >
      <span style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        border: `1px solid ${hovered ? "#333" : BORDER_COLOR}`,
        transition: "border-color 0.3s",
      }} />
      <CornerBrackets color={hovered ? "#5a3fc0" : BRACKET_COLOR} size={10} thickness={2} />

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <div style={{
          width: 36, height: 36, borderRadius: "50%", flexShrink: 0, overflow: "hidden",
          background: getGradient(name),
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 12, fontWeight: 700, color: "#fff", fontFamily: "'Inter', sans-serif",
        }}>
          {avatar
            ? <img src={avatar} alt={name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => { e.currentTarget.style.display = "none"; }} />
            : initials(name)
          }
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 13, color: "#fff",
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}>{name}</div>
          <div style={{ fontSize: 11, color: "#555", marginTop: 1 }}>{handle}</div>
        </div>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="#2a2a2a">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
        </svg>
      </div>

      <TweetText text={text} />

      {imgSrc && (
        <div style={{ marginTop: 12, borderRadius: 10, overflow: "hidden" }}>
          <img src={imgSrc} alt="" style={{
            width: "100%", display: "block", borderRadius: 10,
            transition: "transform 0.4s ease",
            transform: hovered ? "scale(1.02)" : "scale(1)",
          }} />
        </div>
      )}

      {tags.length > 0 && <div>{tags.map((t) => <TagPill key={t} tag={t} />)}</div>}

      <div style={{
        display: "flex", alignItems: "center", gap: 16,
        marginTop: 14, paddingTop: 12, borderTop: "1px solid #1a1a1a",
      }}>
        <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#cc0044" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#cc0044">
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
          {likes.toLocaleString()}
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#555" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          {rts.toLocaleString()}
        </span>
        <span style={{
          marginLeft: "auto", fontSize: 10, color: "#333",
          fontFamily: "'Inter', sans-serif", letterSpacing: "0.06em",
        }}>
          {time} ago
        </span>
      </div>
    </div>
  );
}

function LiveBar({ count }: LiveBarProps) {
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const t = setInterval(() => setPulse((p) => !p), 900);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 7, fontSize: 10,
      fontFamily: "'Inter', sans-serif", fontWeight: 700,
      letterSpacing: "0.12em", textTransform: "uppercase", color: "#14f195",
    }}>
      <span style={{
        width: 7, height: 7, borderRadius: "50%",
        background: pulse ? "#14f195" : "#0a5530",
        transition: "background 0.4s",
        boxShadow: pulse ? "0 0 6px #14f195" : "none",
      }} />
      Live · {count} posts
    </div>
  );
}

function NewPostsBanner({ count, onClick }: NewPostsBannerProps) {
  return (
    <div onClick={onClick} style={{
      position: "relative", margin: "0 0 14px", padding: "10px 16px",
      background: "rgba(60,43,140,0.12)", cursor: "pointer",
      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
      fontSize: 12, fontFamily: "'Inter', sans-serif", fontWeight: 700,
      color: "#c084fc", letterSpacing: "0.04em",
      animation: "slideDown 0.35s ease",
    }}>
      <span style={{ position: "absolute", inset: 0, border: "1px solid rgba(153,69,255,0.25)" }} />
      <CornerBrackets color="#9945ff" size={8} thickness={1.5} />
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 19V5M5 12l7-7 7 7"/>
      </svg>
      {count} new post{count > 1 ? "s" : ""} — click to load
    </div>
  );
}

function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div style={{ position: "relative", padding: "32px 24px", textAlign: "center", marginBottom: 14 }}>
      <span style={{ position: "absolute", inset: 0, border: "1px solid #2a1a1a" }} />
      <CornerBrackets color="#7f1d1d" />
      <div style={{ fontSize: 13, color: "#ef4444", fontFamily: "'Inter', sans-serif", fontWeight: 700, marginBottom: 8 }}>
        Failed to load feed
      </div>
      <div style={{ fontSize: 11, color: "#555", marginBottom: 16 }}>{message}</div>
      <button onClick={onRetry} style={{
        position: "relative", padding: "8px 20px", background: "transparent",
        border: "none", cursor: "pointer", color: "#888",
        fontSize: 11, fontFamily: "'Inter', sans-serif", fontWeight: 700, letterSpacing: "0.08em",
      }}>
        <span style={{ position: "absolute", inset: 0, border: `1px solid ${BORDER_COLOR}` }} />
        <CornerBrackets size={7} thickness={1.5} />
        Try again
      </button>
    </div>
  );
}

export default function TwitterFeedGrid() {
  const [posts, setPosts]             = useState<CuratorPost[]>([]);
  const [pending, setPending]         = useState<CuratorPost[]>([]);
  const [loading, setLoading]         = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError]             = useState<string | null>(null);
  const [hasMore, setHasMore]         = useState<boolean>(true);
  const afterCursorRef                = useRef<string | null>(null);
  const seenIds                       = useRef<Set<string | number>>(new Set());
  const timerRef                      = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasFetched                    = useRef(false);

  const fetchPosts = async ({ silent = false, append = false }: FetchOptions = {}) => {
    if (!silent && !append) setLoading(true);
    if (!silent && append)  setLoadingMore(true);
    setError(null);

    try {
      const url = append && afterCursorRef.current
        ? `${API_BASE}&after=${afterCursorRef.current}`
        : API_BASE;

      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const json = await res.json() as CuratorResponse;
      const raw: CuratorPost[] = json.posts ?? json.data ?? json.items ?? [];
      const fresh = raw.filter((p) => !seenIds.current.has(p.id));
      fresh.forEach((p) => seenIds.current.add(p.id));

      if (!silent) {
        afterCursorRef.current = json.pagination?.after ?? null;
        if (!json.pagination?.after || raw.length < 20) setHasMore(false);
      }

      if (silent && fresh.length === 0) return;

      if (silent)      setPending((prev) => [...fresh, ...prev]);
      else if (append) setPosts((prev) => [...prev, ...fresh]);
      else             setPosts(fresh);

    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchPosts();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      timerRef.current = setInterval(() => fetchPosts({ silent: true }), 30000);
    }, 10000);
    return () => {
      clearTimeout(t);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const promotePending = () => {
    setPosts((prev) => [...pending, ...prev]);
    setPending([]);
  };

  const loadMore = () => fetchPosts({ append: true });

  return (
    <div className="relative z-10 max-w-[1700px] mx-auto px-8">
      <style>{`
        @keyframes slideDown { from { opacity:0; transform:translateY(-10px) } to { opacity:1; transform:translateY(0) } }
        @keyframes spin { to { transform:rotate(360deg) } }
        @keyframes pulse { 0%,100% { opacity:0.4 } 50% { opacity:0.8 } }
      `}</style>

      <div style={{ maxWidth: 1160, margin: "0 auto" }}>

        <div className="flex items-center justify-between w-full mb-10">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 10 }}>
            {!loading && <LiveBar count={posts.length} />}
          </div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <AnimatedButton
              href="https://x.com/SuperteamMY"
              label="Follow Our X"
              delay={0.4}
            />
          </motion.div>
        </div>

        {pending.length > 0 && (
          <NewPostsBanner count={pending.length} onClick={promotePending} />
        )}

        {/* Feed */}
        {error ? (
          <ErrorState message={error} onRetry={() => fetchPosts()} />
        ) : (
          <div style={{ columns: "3 280px", columnGap: 16 }}>
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
              : posts.map((post, i) => (
                  <TweetCard key={post.id} post={post} index={i} isNew={i < pending.length} />
                ))
            }
          </div>
        )}

        {!loading && !error && hasMore && (
          <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
            <button
              onClick={loadMore}
              disabled={loadingMore}
              style={{
                position: "relative", display: "inline-flex", alignItems: "center", gap: 9,
                padding: "13px 32px", background: "transparent",
                cursor: loadingMore ? "default" : "pointer",
                color: loadingMore ? "#333" : "#888",
                fontSize: 12, fontFamily: "'Inter', sans-serif",
                fontWeight: 700, letterSpacing: "0.08em", border: "none", outline: "none",
              }}
            >
              <span style={{ position: "absolute", inset: 0, border: `1px solid ${loadingMore ? "#1e1e1e" : BORDER_COLOR}`, transition: "border-color 0.3s" }} />
              <CornerBrackets color={loadingMore ? "#1e1e1e" : BRACKET_COLOR} size={9} thickness={2} />
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                style={{ animation: loadingMore ? "spin 1s linear infinite" : "none" }}>
                <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              {loadingMore ? "Loading…" : "Load more"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}