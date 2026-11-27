/* Student record PDF: page 1 = program cover sheet (filled in), page 2 = stats, then one page per
   skill attempt in the NREMT sheet layout. Uses jsPDF + autoTable (vendor/). Letter size, points. */
(function(){
const W = 612, H = 792, M = 40;
const SITE = "Orange Coast College", LOCATION = "Costa Mesa, CA";

function clean(s){
  return String(s==null?"":s).replace(/[–—−]/g,"-").replace(/[‘’]/g,"'").replace(/[“”]/g,'"')
    .replace(/…/g,"...").replace(/[•·]/g,"·").replace(/[^\x09\x0A\x0D\x20-\x7E -ÿ]/g,"");
}
function fmtDate(iso){ return iso ? new Date(iso).toLocaleDateString(undefined,{month:"short",day:"numeric",year:"numeric"}) : ""; }
function fmtTimeOfDay(iso){ return iso ? new Date(iso).toLocaleTimeString(undefined,{hour:"numeric",minute:"2-digit"}) : ""; }
function dur(ms){ if(ms==null) return ""; const t=Math.max(0,Math.floor(ms/1000)); return Math.floor(t/60)+":"+String(t%60).padStart(2,"0"); }

/* Label + value written on an underline, like a paper form. Returns the x where the line ends. */
function field(doc, label, value, x, y, lineW){
  doc.setFont("helvetica","normal"); doc.setFontSize(10.5); doc.setTextColor(0);
  doc.text(label, x, y);
  const lx = x + doc.getTextWidth(label) + 4;
  doc.setLineWidth(0.6); doc.line(lx, y+2, lx+lineW, y+2);
  if(value){ doc.setFont("helvetica","bold"); doc.setTextColor(20,40,120); doc.text(clean(value), lx+4, y-1); doc.setTextColor(0); doc.setFont("helvetica","normal"); }
  return lx + lineW;
}
function box(doc, cx, cy, s, ticked){
  doc.setDrawColor(0); doc.setLineWidth(0.6); doc.rect(cx - s/2, cy - s/2, s, s);
  if(ticked){ doc.setDrawColor(20,40,120); doc.setLineWidth(1.4);
    doc.line(cx - s/2 + 1.5, cy - s/2 + 1.5, cx + s/2 - 1.5, cy + s/2 - 1.5); doc.line(cx + s/2 - 1.5, cy - s/2 + 1.5, cx - s/2 + 1.5, cy + s/2 - 1.5);
    doc.setDrawColor(0); doc.setLineWidth(0.6); }
}

/* ---------- page 1: cover sheet ---------- */
function coverPage(doc, o){
  const st = o.student;
  let x = field(doc, "Last Name:", st.last, M, 72, 150);
  x = field(doc, "First Name:", st.first, x + 14, 72, 140);
  field(doc, "Middle Initial:", (st.mi||"").replace(/\./g,""), x + 14, 72, W - M - (x + 14) - doc.getTextWidth("Middle Initial:") - 4);
  field(doc, "Examination Site:", SITE, M, 104, W - 2*M - 90);
  field(doc, "Location:", LOCATION, M, 136, W - 2*M - 50);

  doc.setFont("helvetica","bold"); doc.setFontSize(26); doc.text("EMT Skills", M + 30, 210);

  const body = [];
  const meta = [];   // per body row: {kind:"skill", rec} | {kind:"label"} | {kind:"total"}
  const addSkill = (k, indent) => {
    const r = o.records[k.id] || {list:[]};
    const used = o.activeIds.includes(k.id) || r.list.length;
    const row = [(indent?"    ":"") + clean(k.name)];
    for(let i=0;i<3;i++){ const a = r.list[i]; row.push("", "", a ? o.initials(a) : ""); }
    const passA = r.list.find(a=>a.result==="P");
    row.push(passA && passA.score!=null ? String(passA.score) : "", used ? String(o.possible(k.id)) : String(o.possible(k.id)));
    body.push(row); meta.push({kind:"skill", r, used});
  };
  o.core.forEach(k=>addSkill(k, false));
  body.push([{content:"Random Skills:", colSpan:12, styles:{fontStyle:"bold"}}]); meta.push({kind:"label"});
  o.pool.forEach(k=>addSkill(k, true));
  const totPossible = o.activeIds.reduce((n,id)=>n+o.possible(id),0);
  const totPass = o.activeIds.reduce((n,id)=>{ const r=o.records[id]; const p = r && r.list.find(a=>a.result==="P"); return n + (p && p.score!=null ? p.score : 0); }, 0);
  const allPassed = o.activeIds.every(id=>{ const r=o.records[id]; return r && r.list.some(a=>a.result==="P"); });
  body.push([{content:"", colSpan:10, styles:{lineWidth:0}}, allPassed && totPass ? String(totPass) : "", String(totPossible)]); meta.push({kind:"total"});

  const head = [[
    {content:"", rowSpan:2, styles:{lineWidth:0}},
    {content:"Results of 1st Attempt", colSpan:3}, {content:"Results of 2nd Attempt", colSpan:3}, {content:"Results of 3rd Attempt", colSpan:3},
    {content:"Points Total at Pass", rowSpan:2}, {content:"Total Possible Points", rowSpan:2}
  ], ["Pass","Fail","Init","Pass","Fail","Init","Pass","Fail","Init"]];
  const cw = 26;
  doc.autoTable({
    startY: 228, head, body, theme:"grid", margin:{left:M, right:M},
    styles:{font:"helvetica", fontSize:8, cellPadding:{top:3.2,bottom:3.2,left:3,right:3}, lineColor:0, lineWidth:0.6, textColor:0, valign:"middle"},
    headStyles:{fillColor:false, textColor:0, fontStyle:"bold", halign:"center", fontSize:7.5},
    columnStyles:{0:{cellWidth:"auto", fontStyle:"bold"}, 1:{cellWidth:cw,halign:"center"},2:{cellWidth:cw,halign:"center"},3:{cellWidth:cw,halign:"center"},4:{cellWidth:cw,halign:"center"},5:{cellWidth:cw,halign:"center"},6:{cellWidth:cw,halign:"center"},7:{cellWidth:cw,halign:"center"},8:{cellWidth:cw,halign:"center"},9:{cellWidth:cw,halign:"center"},10:{cellWidth:44,halign:"center"},11:{cellWidth:44,halign:"center"}},
    didParseCell: d => {
      if(d.section!=="body") return;
      const m = meta[d.row.index];
      if(m.kind==="skill" && !m.used) d.cell.styles.textColor = 150;
      if(m.kind==="skill" && d.column.index>=1 && d.column.index<=9 && d.column.index%3===0) d.cell.styles.textColor = [20,40,120];
      if(m.kind==="skill" && d.column.index===10) { d.cell.styles.textColor = [20,40,120]; d.cell.styles.fontStyle = "bold"; }
      if(m.kind==="total" && d.column.index===10){ d.cell.styles.textColor = [20,40,120]; d.cell.styles.fontStyle = "bold"; }
    },
    didDrawCell: d => {
      if(d.section!=="body") return;
      const m = meta[d.row.index]; if(m.kind!=="skill") return;
      const c = d.column.index; if(c<1 || c>9 || c%3===0) return;
      const att = Math.floor((c-1)/3), isPass = (c-1)%3===0;
      const a = m.r.list[att];
      box(doc, d.cell.x + d.cell.width/2, d.cell.y + d.cell.height/2, 7.5, !!a && (isPass ? a.result==="P" : a.result!=="P"));
    }
  });
  let y = doc.lastAutoTable.finalY + 60;
  field(doc, "Signature of Program Director:", "", M, y, W - 2*M - 160);
  doc.setFont("helvetica","normal"); doc.setFontSize(10.5); doc.text("Comments:", M, y + 36);
}

/* ---------- page 2: stats ---------- */
function statsPage(doc, o){
  const st = o.student;
  doc.setFont("helvetica","bold"); doc.setFontSize(16); doc.text(clean(o.name), M, 60);
  doc.setFont("helvetica","normal"); doc.setFontSize(10); doc.setTextColor(70);
  doc.text(clean(`${o.semester} · ${o.lab} · ${SITE}`), M, 76);
  doc.setTextColor(0);
  const act = o.skills.filter(k=>o.activeIds.includes(k.id) || (o.records[k.id]||{list:[]}).list.length);
  const all = act.flatMap(k=>(o.records[k.id]||{list:[]}).list);
  const passed = act.filter(k=>(o.records[k.id]||{list:[]}).list.some(a=>a.result==="P")).length;
  const firstPass = act.filter(k=>{ const l=(o.records[k.id]||{list:[]}).list; return l[0] && l[0].result==="P"; }).length;
  const locked = act.filter(k=>{ const l=(o.records[k.id]||{list:[]}).list; return !l.some(a=>a.result==="P") && l.length>=3; }).length;
  const tiles = [["Skills passed", `${passed} of ${o.activeIds.length}`], ["Passed on 1st attempt", String(firstPass)], ["Total attempts", String(all.length)], ["Failed all 3", String(locked)]];
  const tw = (W - 2*M - 3*10)/4;
  tiles.forEach(([l,v],i)=>{ const x = M + i*(tw+10);
    doc.setDrawColor(200); doc.setLineWidth(0.8); doc.roundedRect(x, 92, tw, 50, 4, 4);
    doc.setFontSize(8.5); doc.setTextColor(90); doc.text(l, x+10, 108);
    doc.setFontSize(17); doc.setFont("helvetica","bold"); doc.setTextColor(0); doc.text(v, x+10, 132); doc.setFont("helvetica","normal"); });

  const body = [];
  for(const k of o.skills){
    const r = o.records[k.id] || {list:[]};
    const used = o.activeIds.includes(k.id) || r.list.length;
    if(!used) continue;
    if(!r.list.length){ body.push([clean(k.short||k.name), {content:"Not tested", colSpan:7, styles:{textColor:120, fontStyle:"italic"}}]); continue; }
    r.list.forEach((a,i)=>{
      const crit = a.critCount ? `${a.critCount} critical` : "";
      body.push([i===0 ? {content:clean(k.short||k.name), rowSpan:r.list.length, styles:{fontStyle:"bold", valign:"top"}} : null,
        String(i+1), a.result==="P"?"PASS":"FAIL", clean(a.examiner), fmtDate(a.at), a.score!=null ? `${a.score}/${o.possible(k.id)}` : "-", a.activeMs!=null ? dur(a.activeMs) : "-", [crit, a.missed!=null ? `${a.missed} missed` : ""].filter(Boolean).join(", ") || (a.sheet? "" : "No sheet")].filter(c=>c!==null));
    });
  }
  doc.autoTable({
    startY: 162, head:[["Skill","Try","Result","Examiner","Date","Score","Test time","Notes"]], body, theme:"grid", margin:{left:M,right:M},
    styles:{font:"helvetica", fontSize:9, cellPadding:4, lineColor:200, lineWidth:0.5, textColor:20},
    headStyles:{fillColor:[240,242,246], textColor:20, fontStyle:"bold"},
    columnStyles:{1:{halign:"center", cellWidth:28}, 2:{fontStyle:"bold", cellWidth:44}, 5:{halign:"center"}, 6:{halign:"center"}},
    didParseCell: d => { if(d.section==="body" && d.column.index===2){ if(d.cell.raw==="PASS") d.cell.styles.textColor=[19,115,51]; if(d.cell.raw==="FAIL") d.cell.styles.textColor=[179,38,30]; } }
  });
  doc.setFontSize(8); doc.setTextColor(120);
  doc.text(clean(`Each attempt with a digital skill sheet follows on its own page. Exported ${new Date().toLocaleString()}.`), M, H - 30);
  doc.setTextColor(0);
}

/* ---------- one page per attempt: NREMT sheet ---------- */
function sheetBody(sheet, sh){
  const marks = sh.marks || {}, notes = sh.itemNotes || {};
  const K = window.SheetKit, rows = [];
  sheet.rows.forEach((r,i)=>{
    if(r.h){ rows.push({kind:"h", cells:[{content:clean(r.h.toUpperCase()), colSpan:3}]}); return; }
    if(r.note){ rows.push({kind:"note", cells:[{content:"NOTE: "+clean(r.note), colSpan:3}]}); return; }
    let t = clean(r.t);
    if(r.subs) t += "\n" + r.subs.map((s,j)=>`${marks["r"+i+"."+j]?"[X]":"[  ]"} ${clean(s)}`).join("    ");
    if(r.choose) t += "\n" + r.opts.map(op=>`${marks["r"+i+"."+op]?"[X]":"[  ]"} ${clean(op)}`).join("    ");
    if(notes[i]) t += "\nExaminer note: " + clean(notes[i]);
    rows.push({kind: K.rowScore(r,i,marks) < K.rowMax(r) ? "miss" : "step", cells:[t, String(K.rowMax(r)), String(K.rowScore(r,i,marks))]});
  });
  rows.push({kind:"total", cells:[{content:"TOTAL", styles:{halign:"right"}}, String(K.sheetTotal(sheet)), String(K.sheetScore(sheet, marks))]});
  return rows;
}
function drawSheet(doc, sheet, sh, a, o, fs){
  const s = fs/8;                              // scale everything with the font size
  let y = M - 8;
  doc.setFont("helvetica","bold"); doc.setFontSize(7*s+1); doc.setTextColor(0);
  doc.text("National Registry of Emergency Medical Technicians - Emergency Medical Technician Psychomotor Examination", W/2, y, {align:"center"});
  y += 14*s+2; doc.setFontSize(11*s+2); doc.text(clean(sheet.title).toUpperCase(), W/2, y, {align:"center"});
  y += 8;
  doc.setFont("helvetica","normal"); doc.setFontSize(fs+0.5);
  const metaRows = [
    [`Candidate: ${clean(o.name)}`, `Examiner: ${clean(a.examiner)}`],
    [`Date: ${fmtDate(sh.startedAt || a.at)}`, `Attempt: ${a.no}${a.assistant ? " · Assistant: "+clean(a.assistant) : ""}`],
    [`Actual Time Started: ${fmtTimeOfDay(sh.startedAt)}`, `Actual Time Ended: ${fmtTimeOfDay(sh.endedAt)}`]
  ];
  const extra = [];
  if(sheet.scenario) extra.push(`Scenario #: ${clean(sh.scenario||"")}`);
  if(sh.activeMs!=null) extra.push(`Test time: ${dur(sh.activeMs)}${(sh.pauses||[]).length ? ` (clock paused ${sh.pauses.length}x, ${dur(sh.pausedMs||0)} not counted${sh.pauses.filter(p=>p.why).length? ": "+clean(sh.pauses.filter(p=>p.why).map(p=>p.why).join("; ")) : ""})` : ""}`);
  if(extra.length) metaRows.push(extra.length===2 ? extra : [extra[0], ""]);
  doc.autoTable({ startY: y, body: metaRows, theme:"plain", margin:{left:M,right:M},
    styles:{font:"helvetica", fontSize:fs+0.5, cellPadding:{top:1.5*s,bottom:1.5*s,left:0,right:6}, textColor:0} });
  y = doc.lastAutoTable.finalY + 4;

  const rows = sheetBody(sheet, sh);
  doc.autoTable({ startY: y, head:[["", "Possible Points", "Points Awarded"]], body: rows.map(r=>r.cells), theme:"grid", margin:{left:M,right:M},
    styles:{font:"helvetica", fontSize:fs, cellPadding:{top:1.6*s,bottom:1.6*s,left:4,right:4}, lineColor:0, lineWidth:0.5, textColor:0, valign:"middle"},
    headStyles:{fillColor:false, textColor:0, fontStyle:"bold", halign:"center", fontSize:fs-0.5},
    columnStyles:{1:{cellWidth:52, halign:"center"}, 2:{cellWidth:52, halign:"center", fontStyle:"bold"}},
    didParseCell: d => { if(d.section!=="body") return; const k = rows[d.row.index].kind;
      if(k==="h"){ d.cell.styles.fillColor=[232,232,232]; d.cell.styles.fontStyle="bold"; }
      if(k==="note"){ d.cell.styles.fontStyle="italic"; d.cell.styles.fontSize=fs-0.5; }
      if(k==="total") d.cell.styles.fontStyle="bold";
      if(k==="miss" && d.column.index===2) d.cell.styles.textColor=[179,38,30]; } });
  y = doc.lastAutoTable.finalY + 6;

  const critSel = sh.critical || [];
  doc.autoTable({ startY: y, head:[["CRITICAL CRITERIA"]], body: sheet.critical.map((c,i)=>[`${critSel.includes(i)?"[X]":"[  ]"}  ${clean(c)}`]), theme:"plain", margin:{left:M,right:M},
    styles:{font:"helvetica", fontSize:fs-0.5, cellPadding:{top:0.8*s,bottom:0.8*s,left:0,right:0}, textColor:0},
    headStyles:{fontStyle:"bold", fontSize:fs, fillColor:false},
    didParseCell: d => { if(d.section==="body" && critSel.includes(d.row.index)){ d.cell.styles.fontStyle="bold"; d.cell.styles.textColor=[179,38,30]; } } });
  y = doc.lastAutoTable.finalY + 4;

  const boxes = [];
  if(critSel.length) boxes.push(["Rationale for critical criteria:", sh.criticalNotes || ""]);
  boxes.push(["Examiner notes:", sh.notes || ""]);
  doc.autoTable({ startY: y, body: boxes.map(([l,v])=>[{content:l, styles:{fontStyle:"bold"}}, clean(v)]), theme:"grid", margin:{left:M,right:M},
    styles:{font:"helvetica", fontSize:fs, cellPadding:3*s, lineColor:0, lineWidth:0.5, textColor:0, minCellHeight:18*s, valign:"top"},
    columnStyles:{0:{cellWidth:120}} });
  y = doc.lastAutoTable.finalY + 12*s + 2;
  doc.setFont("helvetica","bold"); doc.setFontSize(fs+3);
  doc.setTextColor(...(a.result==="P" ? [19,115,51] : [179,38,30]));
  doc.text(`Result: ${a.result==="P"?"PASS":"FAIL"}`, M, y);
  doc.setTextColor(0); doc.setFont("helvetica","normal"); doc.setFontSize(fs-0.5);
  if(sh.approvedAt) doc.text(`Approved ${new Date(sh.approvedAt).toLocaleString()}`, M + 110, y);
  doc.setFontSize(6.5); doc.setTextColor(90);
  doc.text(`${sheet.code} · Form content © National Registry of Emergency Medical Technicians, Inc., Columbus, OH. Reproduced for non-commercial educational use.`, M, H - 18);
  doc.setTextColor(0);
  return y;
}
function sheetPage(doc, sheet, sh, a, o){
  const { jsPDF } = window.jspdf;
  const sizes = [9, 8.5, 8, 7.5, 7, 6.5, 6, 5.5];
  let pick = sizes[sizes.length-1];
  for(const fs of sizes){       // shrink until the whole sheet fits on one page
    const t = new jsPDF({unit:"pt", format:"letter"});
    const endY = drawSheet(t, sheet, sh, a, o, fs);
    if(t.getNumberOfPages()===1 && endY <= H - 30){ pick = fs; break; }
  }
  doc.addPage();
  drawSheet(doc, sheet, sh, a, o, pick);
}

/* o: {student, name, semester, lab, core, pool, skills, activeIds, records:{skillId:{list:[att]}}, possible(id), initials(att)}
   att: {result, at, examiner, no, score, missed, critCount, activeMs, sheet, assistant} */
function buildStudentPdf(o){
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({unit:"pt", format:"letter"});
  doc.setProperties({title: clean(o.name) + " - EMT skills record", subject: clean(o.semester)});
  coverPage(doc, o);
  doc.addPage(); statsPage(doc, o);
  for(const k of o.skills){
    const r = o.records[k.id]; if(!r) continue;
    const sheet = window.SKILL_SHEETS[k.id];
    for(const a of r.list) if(a.sheet && sheet) sheetPage(doc, sheet, a.sheet, a, o);
  }
  return doc.output("arraybuffer");
}
window.RecordPdf = {buildStudentPdf};
})();
