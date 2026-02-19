import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";

const SAMPLE_DEBATE = {
  id:1, category:"Technology", categoryColor:"#7EC8C8",
  title:"AI will replace software developers within 10 years",
  description:"With the rapid advancement of AI coding tools like GitHub Copilot, ChatGPT, and Devin, many experts believe traditional software development roles will be automated. Others argue AI will augment developers, not replace them.",
  forVotes:847, againstVotes:1203, createdBy:"tech_visionary", timeAgo:"2h ago",
};

const INITIAL_OPINIONS = [
  { id:1, stance:"FOR",     author:"future_coder",  avatar:"F", avatarColor:"#7EC8C8",
    text:"AI tools are already writing 40-60% of production code in many companies. In 10 years, the remaining 40% will be automated too. The writing is on the wall — adapt or become obsolete.",
    upvotes:234, downvotes:45, userVote:null, timeAgo:"1h ago",
    replies:[{ id:11, author:"dev_realist", avatar:"D", avatarColor:"#B5A8D5", text:"Adapt to what exactly? If AI writes all code, what role do developers play?", timeAgo:"45m ago" }] },
  { id:2, stance:"AGAINST", author:"senior_dev_99", avatar:"S", avatarColor:"#F4A7B9",
    text:"I've been a developer for 15 years. AI is a powerful tool, but it lacks the ability to understand business context, stakeholder nuances, and architectural trade-offs. It will make us faster, not jobless.",
    upvotes:412, downvotes:23, userVote:null, timeAgo:"90m ago",
    replies:[
      { id:21, author:"ml_engineer", avatar:"M", avatarColor:"#F9C784", text:"Exactly. AI still requires human oversight for anything non-trivial.", timeAgo:"1h ago" },
      { id:22, author:"startup_cto", avatar:"C", avatarColor:"#A8D5BA", text:"The context problem is real — for now. But AI models are improving fast.", timeAgo:"30m ago" },
    ]},
  { id:3, stance:"FOR",     author:"ai_researcher", avatar:"A", avatarColor:"#7EC8C8",
    text:"We already have AI agents that can autonomously debug, test, and deploy code. The trajectory is clear. Junior developers are already being replaced at scale in many tech companies.",
    upvotes:178, downvotes:89, userVote:null, timeAgo:"3h ago", replies:[] },
  { id:4, stance:"AGAINST", author:"pragmatic_pete", avatar:"P", avatarColor:"#B5A8D5",
    text:"The complexity of real-world software systems — integrations, legacy code, human processes — is far beyond what current AI can handle reliably. 10 years is nowhere near enough time for that leap.",
    upvotes:321, downvotes:67, userVote:null, timeAgo:"4h ago", replies:[] },
];

function OpinionCard({ opinion, onVote, onReply }) {
  const [hovered, setHovered] = useState(false);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showReplies, setShowReplies] = useState(true);
  const isFor = opinion.stance === "FOR";

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: hovered ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.03)", border:`1px solid ${hovered ? isFor ? "rgba(126,200,200,0.25)" : "rgba(244,167,185,0.25)" : "rgba(255,255,255,0.07)"}`, borderLeft:`3px solid ${isFor ? "#7EC8C8" : "#F4A7B9"}`, borderRadius:14, padding:"20px 22px", transition:"all 0.2s", animation:"fadeSlideIn 0.4s ease both" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:34, height:34, borderRadius:"50%", background:`${opinion.avatarColor}25`, border:`1px solid ${opinion.avatarColor}50`, display:"flex", alignItems:"center", justifyContent:"center", color:opinion.avatarColor, fontWeight:700, fontSize:14, fontFamily:"'Space Mono',monospace" }}>{opinion.avatar}</div>
          <div>
            <div style={{ color:"#f0ecff", fontSize:14, fontWeight:600 }}>{opinion.author}</div>
            <div style={{ color:"rgba(240,236,255,0.3)", fontSize:11, fontFamily:"'Space Mono',monospace" }}>{opinion.timeAgo}</div>
          </div>
        </div>
        <div style={{ background: isFor ? "rgba(126,200,200,0.12)" : "rgba(244,167,185,0.12)", border:`1px solid ${isFor ? "rgba(126,200,200,0.3)" : "rgba(244,167,185,0.3)"}`, color: isFor ? "#7EC8C8" : "#F4A7B9", borderRadius:6, padding:"3px 12px", fontSize:11, fontWeight:700, letterSpacing:1.2, fontFamily:"'Space Mono',monospace" }}>
          {isFor ? "✓ FOR" : "✗ AGAINST"}
        </div>
      </div>
      <p style={{ color:"rgba(240,236,255,0.82)", fontSize:15, lineHeight:1.7, fontFamily:"'Space Grotesk',sans-serif", marginBottom:16 }}>{opinion.text}</p>
      <div style={{ display:"flex", alignItems:"center", gap:12, flexWrap:"wrap" }}>
        <button onClick={() => onVote(opinion.id,"up")} style={{ display:"flex", alignItems:"center", gap:6, background: opinion.userVote==="up" ? "rgba(126,200,200,0.15)" : "transparent", border:`1px solid ${opinion.userVote==="up" ? "rgba(126,200,200,0.4)" : "rgba(255,255,255,0.1)"}`, color: opinion.userVote==="up" ? "#7EC8C8" : "rgba(240,236,255,0.4)", borderRadius:7, padding:"5px 12px", cursor:"pointer", fontSize:13, fontFamily:"'Space Mono',monospace", transition:"all 0.2s" }}>▲ {opinion.upvotes}</button>
        <button onClick={() => onVote(opinion.id,"down")} style={{ display:"flex", alignItems:"center", gap:6, background: opinion.userVote==="down" ? "rgba(244,167,185,0.15)" : "transparent", border:`1px solid ${opinion.userVote==="down" ? "rgba(244,167,185,0.4)" : "rgba(255,255,255,0.1)"}`, color: opinion.userVote==="down" ? "#F4A7B9" : "rgba(240,236,255,0.4)", borderRadius:7, padding:"5px 12px", cursor:"pointer", fontSize:13, fontFamily:"'Space Mono',monospace", transition:"all 0.2s" }}>▼ {opinion.downvotes}</button>
        <button onClick={() => setShowReplyBox(!showReplyBox)} style={{ background:"transparent", border:"none", color:"rgba(240,236,255,0.35)", cursor:"pointer", fontSize:13, fontFamily:"'Space Mono',monospace" }}>💬 Reply</button>
        {opinion.replies.length > 0 && <button onClick={() => setShowReplies(!showReplies)} style={{ background:"transparent", border:"none", color:"rgba(240,236,255,0.3)", cursor:"pointer", fontSize:12, fontFamily:"'Space Mono',monospace", marginLeft:"auto" }}>{showReplies?"▾":"▸"} {opinion.replies.length} {opinion.replies.length===1?"reply":"replies"}</button>}
      </div>
      {showReplyBox && (
        <div style={{ marginTop:14, display:"flex", gap:10 }}>
          <input value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Write a reply..." style={{ flex:1, background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, padding:"10px 14px", color:"#f0ecff", fontSize:13, fontFamily:"'Space Grotesk',sans-serif", outline:"none" }} />
          <button onClick={() => { onReply(opinion.id,replyText); setReplyText(""); setShowReplyBox(false); }} style={{ background:"linear-gradient(135deg,#7EC8C8,#a8dede)", border:"none", color:"#1a1625", borderRadius:8, padding:"10px 18px", fontWeight:700, cursor:"pointer", fontSize:13, fontFamily:"'Space Grotesk',sans-serif" }}>Post</button>
        </div>
      )}
      {showReplies && opinion.replies.length > 0 && (
        <div style={{ marginTop:16, paddingLeft:16, borderLeft:"2px solid rgba(255,255,255,0.06)" }}>
          {opinion.replies.map((reply) => (
            <div key={reply.id} style={{ display:"flex", gap:10, marginBottom:12, padding:"12px 14px", background:"rgba(255,255,255,0.03)", borderRadius:10 }}>
              <div style={{ width:28, height:28, borderRadius:"50%", flexShrink:0, background:`${reply.avatarColor}22`, border:`1px solid ${reply.avatarColor}44`, display:"flex", alignItems:"center", justifyContent:"center", color:reply.avatarColor, fontWeight:700, fontSize:12 }}>{reply.avatar}</div>
              <div>
                <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:4 }}>
                  <span style={{ color:"#f0ecff", fontSize:13, fontWeight:600 }}>{reply.author}</span>
                  <span style={{ color:"rgba(240,236,255,0.25)", fontSize:11, fontFamily:"'Space Mono',monospace" }}>{reply.timeAgo}</span>
                </div>
                <p style={{ color:"rgba(240,236,255,0.6)", fontSize:13, lineHeight:1.6 }}>{reply.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Debate() {
  const navigate = useNavigate();
  const [opinions, setOpinions] = useState(INITIAL_OPINIONS);
  const [activeTab, setActiveTab] = useState("ALL");
  const [newOpinion, setNewOpinion] = useState("");
  const [selectedStance, setSelectedStance] = useState(null);
  const [sortBy, setSortBy] = useState("top");

  const debate = SAMPLE_DEBATE;
  const total  = debate.forVotes + debate.againstVotes;
  const forPct = Math.round((debate.forVotes / total) * 100);

  const handleVote = (opinionId, direction) => {
    setOpinions((prev) => prev.map((op) => {
      if (op.id !== opinionId) return op;
      if (op.userVote === direction) return { ...op, userVote:null, upvotes: direction==="up" ? op.upvotes-1 : op.upvotes, downvotes: direction==="down" ? op.downvotes-1 : op.downvotes };
      return { ...op, userVote:direction, upvotes: direction==="up" ? op.upvotes+1 : op.userVote==="up" ? op.upvotes-1 : op.upvotes, downvotes: direction==="down" ? op.downvotes+1 : op.userVote==="down" ? op.downvotes-1 : op.downvotes };
    }));
  };

  const handleReply = (opinionId, text) => {
    if (!text.trim()) return;
    setOpinions((prev) => prev.map((op) => op.id!==opinionId ? op : { ...op, replies:[...op.replies,{ id:Date.now(), author:"you", avatar:"Y", avatarColor:"#7EC8C8", text, timeAgo:"just now" }] }));
  };

  const handlePost = () => {
    if (!newOpinion.trim() || !selectedStance) return;
    setOpinions((prev) => [{ id:Date.now(), stance:selectedStance, author:"you", avatar:"Y", avatarColor:"#7EC8C8", text:newOpinion, upvotes:0, downvotes:0, userVote:null, timeAgo:"just now", replies:[] }, ...prev]);
    setNewOpinion(""); setSelectedStance(null);
  };

  const filtered = opinions.filter((o) => activeTab==="ALL" || o.stance===activeTab).sort((a,b) => sortBy==="top" ? (b.upvotes-b.downvotes)-(a.upvotes-a.downvotes) : b.id-a.id);

  return (
    <div style={{ minHeight:"100vh", background:"#1a1625", fontFamily:"'Space Grotesk',sans-serif", color:"#f0ecff" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=Space+Mono:wght@400;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        @keyframes fadeSlideIn { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        textarea::placeholder,input::placeholder{color:rgba(240,236,255,0.2)} textarea:focus,input:focus{outline:none}
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:2px}
      `}</style>
      <Navbar />
      <main style={{ maxWidth:800, margin:"0 auto", padding:"40px 24px 80px" }}>
        <button onClick={() => navigate("/")} style={{ background:"transparent", border:"none", color:"rgba(240,236,255,0.35)", cursor:"pointer", fontSize:13, fontFamily:"'Space Mono',monospace", marginBottom:24, padding:0, display:"flex", alignItems:"center", gap:6 }}>← Back to debates</button>

        {/* Header */}
        <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:20, padding:"32px 36px", marginBottom:32, animation:"fadeSlideIn 0.5s ease both" }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:14 }}>
            <span style={{ background:`${debate.categoryColor}22`, color:debate.categoryColor, border:`1px solid ${debate.categoryColor}44`, borderRadius:6, padding:"3px 12px", fontSize:11, fontWeight:700, letterSpacing:1.2, textTransform:"uppercase", fontFamily:"'Space Mono',monospace" }}>{debate.category}</span>
            <span style={{ color:"rgba(240,236,255,0.3)", fontSize:12, fontFamily:"'Space Mono',monospace" }}>{debate.timeAgo} · by {debate.createdBy}</span>
          </div>
          <h1 style={{ fontFamily:"'Lora',serif", fontSize:"clamp(22px,3vw,30px)", fontWeight:700, lineHeight:1.3, marginBottom:14, color:"#f0ecff" }}>{debate.title}</h1>
          <p style={{ color:"rgba(240,236,255,0.45)", fontSize:14, lineHeight:1.7, marginBottom:28 }}>{debate.description}</p>
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
              <div><span style={{ color:"#7EC8C8", fontFamily:"'Space Mono',monospace", fontSize:20, fontWeight:700 }}>{forPct}%</span><span style={{ color:"rgba(240,236,255,0.3)", fontSize:12, marginLeft:6 }}>FOR · {debate.forVotes.toLocaleString()} votes</span></div>
              <div style={{ textAlign:"right" }}><span style={{ color:"#F4A7B9", fontFamily:"'Space Mono',monospace", fontSize:20, fontWeight:700 }}>{100-forPct}%</span><span style={{ color:"rgba(240,236,255,0.3)", fontSize:12, marginLeft:6 }}>AGAINST · {debate.againstVotes.toLocaleString()} votes</span></div>
            </div>
            <div style={{ height:8, borderRadius:4, background:"rgba(255,255,255,0.08)", overflow:"hidden", display:"flex" }}>
              <div style={{ width:`${forPct}%`, background:"linear-gradient(90deg,#7EC8C8,#a8dede)", borderRadius:"4px 0 0 4px" }} />
              <div style={{ width:`${100-forPct}%`, background:"linear-gradient(90deg,#F4A7B9,#f7c5d0)", borderRadius:"0 4px 4px 0" }} />
            </div>
            <div style={{ textAlign:"center", marginTop:10, color:"rgba(240,236,255,0.25)", fontSize:12, fontFamily:"'Space Mono',monospace" }}>{total.toLocaleString()} total votes · {opinions.length} opinions</div>
          </div>
        </div>

        {/* Post opinion */}
        <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:16, padding:"24px", marginBottom:32, animation:"fadeSlideIn 0.5s ease 0.1s both" }}>
          <h3 style={{ fontSize:15, fontWeight:600, marginBottom:16, color:"rgba(240,236,255,0.8)" }}>Share your opinion</h3>
          <div style={{ display:"flex", gap:10, marginBottom:14 }}>
            {["FOR","AGAINST"].map((stance) => (
              <button key={stance} onClick={() => setSelectedStance(stance)} style={{ flex:1, padding:"10px", background: selectedStance===stance ? stance==="FOR" ? "rgba(126,200,200,0.15)" : "rgba(244,167,185,0.15)" : "rgba(255,255,255,0.03)", border:`1px solid ${selectedStance===stance ? stance==="FOR" ? "rgba(126,200,200,0.4)" : "rgba(244,167,185,0.4)" : "rgba(255,255,255,0.1)"}`, color: selectedStance===stance ? stance==="FOR" ? "#7EC8C8" : "#F4A7B9" : "rgba(240,236,255,0.35)", borderRadius:10, cursor:"pointer", fontSize:13, fontWeight:700, letterSpacing:1, fontFamily:"'Space Mono',monospace", transition:"all 0.2s" }}>
                {stance==="FOR" ? "✓ I'm FOR this" : "✗ I'm AGAINST this"}
              </button>
            ))}
          </div>
          <textarea value={newOpinion} onChange={(e) => setNewOpinion(e.target.value)} placeholder="State your argument clearly and respectfully..." rows={3}
            style={{ width:"100%", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, padding:"12px 16px", color:"#f0ecff", fontSize:14, lineHeight:1.6, fontFamily:"'Space Grotesk',sans-serif", resize:"vertical" }} />
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:12 }}>
            <span style={{ color:"rgba(240,236,255,0.25)", fontSize:12, fontFamily:"'Space Mono',monospace" }}>{newOpinion.length}/500</span>
            <button onClick={handlePost} disabled={!selectedStance||!newOpinion.trim()} style={{ background: selectedStance&&newOpinion.trim() ? "linear-gradient(135deg,#7EC8C8,#a8dede)" : "rgba(255,255,255,0.07)", border:"none", color: selectedStance&&newOpinion.trim() ? "#1a1625" : "rgba(240,236,255,0.2)", padding:"10px 24px", borderRadius:9, fontWeight:700, cursor: selectedStance&&newOpinion.trim() ? "pointer" : "not-allowed", fontSize:14, fontFamily:"'Space Grotesk',sans-serif", transition:"all 0.2s" }}>Post Opinion →</button>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <div style={{ display:"flex", gap:6 }}>
            {["ALL","FOR","AGAINST"].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{ background: activeTab===tab ? tab==="FOR" ? "rgba(126,200,200,0.15)" : tab==="AGAINST" ? "rgba(244,167,185,0.15)" : "rgba(255,255,255,0.1)" : "transparent", border:`1px solid ${activeTab===tab ? tab==="FOR" ? "rgba(126,200,200,0.35)" : tab==="AGAINST" ? "rgba(244,167,185,0.35)" : "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.07)"}`, color: activeTab===tab ? tab==="FOR" ? "#7EC8C8" : tab==="AGAINST" ? "#F4A7B9" : "#f0ecff" : "rgba(240,236,255,0.35)", borderRadius:8, padding:"7px 16px", cursor:"pointer", fontSize:12, fontWeight:700, fontFamily:"'Space Mono',monospace", letterSpacing:0.8, transition:"all 0.2s" }}>
                {tab} {tab==="ALL"?`(${opinions.length})`:tab==="FOR"?`(${opinions.filter(o=>o.stance==="FOR").length})`:`(${opinions.filter(o=>o.stance==="AGAINST").length})`}
              </button>
            ))}
          </div>
          <div style={{ display:"flex", gap:6 }}>
            {["top","new"].map((s) => (
              <button key={s} onClick={() => setSortBy(s)} style={{ background: sortBy===s ? "rgba(255,255,255,0.08)" : "transparent", border:"1px solid rgba(255,255,255,0.08)", color: sortBy===s ? "#f0ecff" : "rgba(240,236,255,0.3)", borderRadius:7, padding:"6px 13px", cursor:"pointer", fontSize:12, fontFamily:"'Space Mono',monospace", textTransform:"uppercase", letterSpacing:0.5 }}>{s}</button>
            ))}
          </div>
        </div>

        {/* Opinions */}
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {filtered.map((opinion) => <OpinionCard key={opinion.id} opinion={opinion} onVote={handleVote} onReply={handleReply} />)}
        </div>
      </main>
    </div>
  );
}
