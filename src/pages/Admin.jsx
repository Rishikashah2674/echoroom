import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";

const PENDING_TOPICS = [
  { id:1, title:"Should coding be a mandatory subject in all schools?", category:"Education", author:"edu_reformer", submitted:"1h ago" },
  { id:2, title:"Is cryptocurrency the future of global finance?",       category:"Economy",   author:"crypto_bull",  submitted:"3h ago" },
  { id:3, title:"Should voting be made mandatory in democracies?",       category:"Politics",  author:"civic_voice",  submitted:"5h ago" },
];

const FLAGGED_OPINIONS = [
  { id:1, author:"angry_user_99", text:"This is complete nonsense and anyone who believes this is an idiot.", debate:"AI replacing developers", reason:"Disrespectful language", timeAgo:"30m ago" },
  { id:2, author:"spammer_bot",   text:"Click here for free debate coins!! LIMITED OFFER!!!",                 debate:"UBI debate",             reason:"Spam",                   timeAgo:"2h ago" },
];

const USERS = [
  { id:1, username:"future_coder",  email:"fc@mail.com",  role:"User",  joined:"Jan 2025", debates:12, status:"Active" },
  { id:2, username:"senior_dev_99", email:"sd@mail.com",  role:"User",  joined:"Feb 2025", debates:34, status:"Active" },
  { id:3, username:"angry_user_99", email:"au@mail.com",  role:"User",  joined:"Mar 2025", debates:2,  status:"Flagged" },
  { id:4, username:"spammer_bot",   email:"sp@mail.com",  role:"User",  joined:"Mar 2025", debates:0,  status:"Banned" },
  { id:5, username:"ai_researcher", email:"air@mail.com", role:"Admin", joined:"Dec 2024", debates:45, status:"Active" },
];

const STATS = [
  { label:"Pending Reviews", value:"3",   icon:"⏳", color:"#F9C784" },
  { label:"Flagged Content", value:"2",   icon:"🚩", color:"#F4A7B9" },
  { label:"Active Debates",  value:"142", icon:"💬", color:"#7EC8C8" },
  { label:"Total Users",     value:"1.2K",icon:"👥", color:"#B5A8D5" },
];

export default function Admin() {
  const navigate = useNavigate();
  const [tab,     setTab]     = useState("overview");
  const [pending, setPending] = useState(PENDING_TOPICS);
  const [flagged, setFlagged] = useState(FLAGGED_OPINIONS);
  const [users,   setUsers]   = useState(USERS);

  const approveTopic  = (id) => setPending((p) => p.filter((t) => t.id !== id));
  const rejectTopic   = (id) => setPending((p) => p.filter((t) => t.id !== id));
  const deleteOpinion = (id) => setFlagged((f) => f.filter((o) => o.id !== id));
  const dismissFlag   = (id) => setFlagged((f) => f.filter((o) => o.id !== id));
  const banUser       = (id) => setUsers((u) => u.map((usr) => usr.id===id ? {...usr,status:"Banned"} : usr));

  const tabs = [
    { key:"overview", label:"Overview",      icon:"📊" },
    { key:"topics",   label:"Pending Topics", icon:"⏳", badge: pending.length },
    { key:"flagged",  label:"Flagged",        icon:"🚩", badge: flagged.length },
    { key:"users",    label:"Users",          icon:"👥" },
  ];

  return (
    <div style={{ minHeight:"100vh", background:"#1a1625", fontFamily:"'Space Grotesk',sans-serif", color:"#f0ecff" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=Space+Mono:wght@400;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        @keyframes fadeSlideIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:2px}
      `}</style>
      <Navbar />
      <main style={{ maxWidth:960, margin:"0 auto", padding:"40px 24px 80px" }}>

        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:36, animation:"fadeSlideIn 0.5s ease both" }}>
          <div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(244,167,185,0.12)", border:"1px solid rgba(244,167,185,0.25)", borderRadius:8, padding:"4px 12px", marginBottom:12, fontSize:11, fontFamily:"'Space Mono',monospace", color:"#F4A7B9", letterSpacing:1.2 }}>🛡 ADMIN PANEL</div>
            <h1 style={{ fontFamily:"'Lora',serif", fontSize:"clamp(24px,3vw,36px)", fontWeight:700, marginBottom:6, color:"#f0ecff" }}>Moderation Dashboard</h1>
            <p style={{ color:"rgba(240,236,255,0.4)", fontSize:14 }}>Manage topics, users, and content quality</p>
          </div>
          <button onClick={() => navigate("/")} style={{ background:"transparent", border:"1px solid rgba(255,255,255,0.1)", color:"rgba(240,236,255,0.5)", borderRadius:8, padding:"8px 16px", cursor:"pointer", fontSize:13, fontFamily:"'Space Grotesk',sans-serif" }}>← Back to Site</button>
        </div>

        {/* Stats */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:36, animation:"fadeSlideIn 0.5s ease 0.05s both" }}>
          {STATS.map((s) => (
            <div key={s.label} style={{ background:"rgba(255,255,255,0.04)", border:`1px solid ${s.color}20`, borderRadius:12, padding:"18px 20px" }}>
              <div style={{ fontSize:24, marginBottom:8 }}>{s.icon}</div>
              <div style={{ fontFamily:"'Lora',serif", fontSize:28, fontWeight:700, color:s.color }}>{s.value}</div>
              <div style={{ color:"rgba(240,236,255,0.35)", fontSize:12, marginTop:3, fontFamily:"'Space Mono',monospace" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display:"flex", gap:6, marginBottom:28, animation:"fadeSlideIn 0.5s ease 0.1s both" }}>
          {tabs.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{ background: tab===t.key ? "rgba(255,255,255,0.08)" : "transparent", border:`1px solid ${tab===t.key ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.07)"}`, color: tab===t.key ? "#f0ecff" : "rgba(240,236,255,0.4)", borderRadius:8, padding:"8px 16px", cursor:"pointer", fontSize:13, fontFamily:"'Space Grotesk',sans-serif", fontWeight:500, display:"flex", alignItems:"center", gap:7, transition:"all 0.2s" }}>
              {t.icon} {t.label}
              {t.badge > 0 && <span style={{ background:"#F4A7B9", color:"#1a1625", borderRadius:100, padding:"1px 7px", fontSize:10, fontWeight:700 }}>{t.badge}</span>}
            </button>
          ))}
        </div>

        {/* OVERVIEW */}
        {tab==="overview" && (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, animation:"fadeSlideIn 0.4s ease both" }}>
            <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:16, padding:"24px" }}>
              <h3 style={{ fontFamily:"'Lora',serif", fontSize:18, fontWeight:700, marginBottom:16, color:"#f0ecff" }}>⏳ Awaiting Approval ({pending.length})</h3>
              {pending.length===0 ? <p style={{ color:"rgba(240,236,255,0.3)", fontSize:13 }}>All clear! No pending topics.</p>
                : pending.slice(0,2).map((t) => (
                  <div key={t.id} style={{ borderBottom:"1px solid rgba(255,255,255,0.06)", paddingBottom:12, marginBottom:12 }}>
                    <p style={{ color:"rgba(240,236,255,0.8)", fontSize:13, marginBottom:6, lineHeight:1.4 }}>{t.title}</p>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <span style={{ color:"rgba(240,236,255,0.35)", fontSize:11, fontFamily:"'Space Mono',monospace" }}>by {t.author} · {t.submitted}</span>
                      <div style={{ display:"flex", gap:6 }}>
                        <button onClick={() => approveTopic(t.id)} style={{ background:"rgba(126,200,200,0.15)", border:"1px solid rgba(126,200,200,0.3)", color:"#7EC8C8", borderRadius:6, padding:"3px 10px", cursor:"pointer", fontSize:11, fontFamily:"'Space Mono',monospace" }}>✓</button>
                        <button onClick={() => rejectTopic(t.id)}  style={{ background:"rgba(244,167,185,0.15)", border:"1px solid rgba(244,167,185,0.3)", color:"#F4A7B9", borderRadius:6, padding:"3px 10px", cursor:"pointer", fontSize:11, fontFamily:"'Space Mono',monospace" }}>✗</button>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
            <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:16, padding:"24px" }}>
              <h3 style={{ fontFamily:"'Lora',serif", fontSize:18, fontWeight:700, marginBottom:16, color:"#f0ecff" }}>🚩 Flagged Content ({flagged.length})</h3>
              {flagged.length===0 ? <p style={{ color:"rgba(240,236,255,0.3)", fontSize:13 }}>No flagged content right now.</p>
                : flagged.slice(0,2).map((f) => (
                  <div key={f.id} style={{ borderBottom:"1px solid rgba(255,255,255,0.06)", paddingBottom:12, marginBottom:12 }}>
                    <p style={{ color:"rgba(240,236,255,0.6)", fontSize:12, marginBottom:6, fontStyle:"italic", lineHeight:1.4 }}>"{f.text.slice(0,80)}..."</p>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <span style={{ background:"rgba(244,167,185,0.1)", color:"#F4A7B9", border:"1px solid rgba(244,167,185,0.2)", borderRadius:4, padding:"2px 7px", fontSize:10, fontFamily:"'Space Mono',monospace" }}>{f.reason}</span>
                      <button onClick={() => deleteOpinion(f.id)} style={{ background:"rgba(244,167,185,0.15)", border:"1px solid rgba(244,167,185,0.3)", color:"#F4A7B9", borderRadius:6, padding:"3px 10px", cursor:"pointer", fontSize:11, fontFamily:"'Space Mono',monospace" }}>Delete</button>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        )}

        {/* PENDING TOPICS */}
        {tab==="topics" && (
          <div style={{ display:"flex", flexDirection:"column", gap:14, animation:"fadeSlideIn 0.4s ease both" }}>
            {pending.length===0
              ? <div style={{ textAlign:"center", padding:"60px 0", color:"rgba(240,236,255,0.3)", fontFamily:"'Space Mono',monospace" }}>✓ No pending topics!</div>
              : pending.map((t) => (
                <div key={t.id} style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:14, padding:"22px 24px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                    <div style={{ flex:1, marginRight:20 }}>
                      <span style={{ background:"rgba(249,199,132,0.15)", color:"#F9C784", border:"1px solid rgba(249,199,132,0.3)", borderRadius:5, padding:"2px 8px", fontSize:10, fontWeight:700, letterSpacing:1, fontFamily:"'Space Mono',monospace", display:"inline-block", marginBottom:10, textTransform:"uppercase" }}>{t.category}</span>
                      <h3 style={{ fontFamily:"'Lora',serif", fontSize:17, fontWeight:700, marginBottom:8, color:"#f0ecff" }}>{t.title}</h3>
                      <span style={{ color:"rgba(240,236,255,0.35)", fontSize:12, fontFamily:"'Space Mono',monospace" }}>Submitted by {t.author} · {t.submitted}</span>
                    </div>
                    <div style={{ display:"flex", gap:10 }}>
                      <button onClick={() => approveTopic(t.id)} style={{ background:"rgba(126,200,200,0.15)", border:"1px solid rgba(126,200,200,0.35)", color:"#7EC8C8", borderRadius:8, padding:"8px 20px", cursor:"pointer", fontSize:13, fontWeight:700, fontFamily:"'Space Grotesk',sans-serif" }}>✓ Approve</button>
                      <button onClick={() => rejectTopic(t.id)}  style={{ background:"rgba(244,167,185,0.15)", border:"1px solid rgba(244,167,185,0.35)", color:"#F4A7B9", borderRadius:8, padding:"8px 20px", cursor:"pointer", fontSize:13, fontWeight:700, fontFamily:"'Space Grotesk',sans-serif" }}>✗ Reject</button>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        )}

        {/* FLAGGED */}
        {tab==="flagged" && (
          <div style={{ display:"flex", flexDirection:"column", gap:14, animation:"fadeSlideIn 0.4s ease both" }}>
            {flagged.length===0
              ? <div style={{ textAlign:"center", padding:"60px 0", color:"rgba(240,236,255,0.3)", fontFamily:"'Space Mono',monospace" }}>✓ No flagged content!</div>
              : flagged.map((f) => (
                <div key={f.id} style={{ background:"rgba(244,167,185,0.04)", border:"1px solid rgba(244,167,185,0.15)", borderRadius:14, padding:"22px 24px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
                    <div>
                      <span style={{ color:"#f0ecff", fontSize:14, fontWeight:600 }}>{f.author}</span>
                      <span style={{ color:"rgba(240,236,255,0.35)", fontSize:12, fontFamily:"'Space Mono',monospace", marginLeft:10 }}>in "{f.debate}" · {f.timeAgo}</span>
                    </div>
                    <span style={{ background:"rgba(244,167,185,0.15)", color:"#F4A7B9", border:"1px solid rgba(244,167,185,0.3)", borderRadius:5, padding:"2px 10px", fontSize:11, fontFamily:"'Space Mono',monospace" }}>{f.reason}</span>
                  </div>
                  <p style={{ color:"rgba(240,236,255,0.6)", fontSize:14, lineHeight:1.6, marginBottom:16, fontStyle:"italic" }}>"{f.text}"</p>
                  <div style={{ display:"flex", gap:10 }}>
                    <button onClick={() => deleteOpinion(f.id)} style={{ background:"rgba(244,167,185,0.15)", border:"1px solid rgba(244,167,185,0.35)", color:"#F4A7B9", borderRadius:8, padding:"7px 18px", cursor:"pointer", fontSize:13, fontWeight:700, fontFamily:"'Space Grotesk',sans-serif" }}>🗑 Delete</button>
                    <button onClick={() => dismissFlag(f.id)}   style={{ background:"transparent", border:"1px solid rgba(255,255,255,0.1)", color:"rgba(240,236,255,0.4)", borderRadius:8, padding:"7px 18px", cursor:"pointer", fontSize:13, fontFamily:"'Space Grotesk',sans-serif" }}>Dismiss</button>
                  </div>
                </div>
              ))
            }
          </div>
        )}

        {/* USERS */}
        {tab==="users" && (
          <div style={{ animation:"fadeSlideIn 0.4s ease both" }}>
            <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:16, overflow:"hidden" }}>
              <div style={{ display:"grid", gridTemplateColumns:"2fr 2fr 1fr 1fr 1fr 1fr", padding:"14px 24px", borderBottom:"1px solid rgba(255,255,255,0.07)", background:"rgba(255,255,255,0.03)" }}>
                {["Username","Email","Role","Debates","Status","Action"].map((h) => (
                  <span key={h} style={{ color:"rgba(240,236,255,0.35)", fontSize:11, fontFamily:"'Space Mono',monospace", letterSpacing:1, textTransform:"uppercase" }}>{h}</span>
                ))}
              </div>
              {users.map((user) => (
                <div key={user.id} style={{ display:"grid", gridTemplateColumns:"2fr 2fr 1fr 1fr 1fr 1fr", padding:"16px 24px", borderBottom:"1px solid rgba(255,255,255,0.05)", alignItems:"center" }}>
                  <span style={{ color:"#f0ecff", fontSize:14, fontWeight:600 }}>{user.username}</span>
                  <span style={{ color:"rgba(240,236,255,0.4)", fontSize:13 }}>{user.email}</span>
                  <span style={{ color: user.role==="Admin" ? "#F9C784" : "rgba(240,236,255,0.4)", fontSize:12, fontFamily:"'Space Mono',monospace" }}>{user.role}</span>
                  <span style={{ color:"rgba(240,236,255,0.5)", fontSize:13 }}>{user.debates}</span>
                  <span style={{ background: user.status==="Active" ? "rgba(126,200,200,0.12)" : user.status==="Flagged" ? "rgba(249,199,132,0.12)" : "rgba(244,167,185,0.12)", color: user.status==="Active" ? "#7EC8C8" : user.status==="Flagged" ? "#F9C784" : "#F4A7B9", border:`1px solid ${user.status==="Active" ? "rgba(126,200,200,0.25)" : user.status==="Flagged" ? "rgba(249,199,132,0.25)" : "rgba(244,167,185,0.25)"}`, borderRadius:5, padding:"2px 8px", fontSize:11, fontFamily:"'Space Mono',monospace", display:"inline-block" }}>{user.status}</span>
                  {user.status!=="Banned"&&user.role!=="Admin"
                    ? <button onClick={() => banUser(user.id)} style={{ background:"transparent", border:"1px solid rgba(244,167,185,0.25)", color:"rgba(244,167,185,0.7)", borderRadius:6, padding:"4px 10px", cursor:"pointer", fontSize:11, fontFamily:"'Space Mono',monospace" }}>Ban</button>
                    : <span style={{ color:"rgba(240,236,255,0.15)", fontSize:11 }}>—</span>
                  }
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
