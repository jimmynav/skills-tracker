/* NREMT EMT Psychomotor Examination skill sheets, as digital forms.
   Source: National Registry of Emergency Medical Technicians (© 2016/2017 NREMT, Columbus, OH).
   "All materials subject to this copyright may be photocopied for the non-commercial purpose of
   educational or scientific advancement."

   Row types:
     {h:"SECTION"}                         section heading
     {t:"Step", p:1}                       one checkbox worth p points
     {t:"Group", subs:["a","b"]}           one checkbox per sub-item, 1 point each
     {t:"Group", choose:5, opts:[...]}     pick up to N options, 1 point each (max N)
     {note:"Examiner prompt"}              script line the examiner reads, no points
   Keyed by the tracker's skill id. */
(function(){
const COMMON_END = [
  "Failure to manage the patient as a competent EMT",
  "Exhibits unacceptable affect with patient or other personnel",
  "Uses or orders a dangerous or inappropriate intervention"
];
const SHEETS = {
  "pa-trauma": {
    code: "E201", title: "Patient Assessment/Management – Trauma", timeLimitMin: 10, scenario: true,
    rows: [
      {t:"Takes or verbalizes appropriate PPE precautions", p:1},
      {h:"Scene size-up"},
      {t:"Determines the scene/situation is safe", p:1},
      {t:"Determines the mechanism of injury/nature of illness", p:1},
      {t:"Determines the number of patients", p:1},
      {t:"Requests additional EMS assistance if necessary", p:1},
      {t:"Considers stabilization of the spine", p:1},
      {h:"Primary survey/resuscitation"},
      {note:"Areas denoted by ** may be integrated within sequence of Primary Survey/Resuscitation."},
      {t:"Verbalizes general impression of the patient", p:1},
      {t:"Determines responsiveness/level of consciousness", p:1},
      {t:"Determines chief complaint/apparent life-threats", p:1},
      {t:"Airway", subs:["Opens and assesses airway","Inserts adjunct as indicated"]},
      {t:"Breathing", subs:["Assesses breathing","Assures adequate ventilation","Initiates appropriate oxygen therapy","Manages any injury which may compromise breathing/ventilation"]},
      {t:"Circulation", subs:["Checks pulse","Assesses skin [color, temperature or condition]","Assesses for and controls major bleeding if present","Initiates shock management [positions properly, conserves body heat]"]},
      {t:"Identifies patient priority and makes treatment/transport decision (based upon calculated GCS)", p:1},
      {h:"History taking"},
      {t:"Obtains baseline vital signs [must include BP, P and R]", p:1},
      {t:"Attempts to obtain SAMPLE history", p:1},
      {h:"Secondary assessment"},
      {t:"Head", subs:["Inspects and palpates scalp and ears **","Assesses eyes","Inspects mouth**, nose** and assesses facial area"]},
      {t:"Neck **", subs:["Checks position of trachea","Checks jugular veins","Palpates cervical spine"]},
      {t:"Chest **", subs:["Inspects chest","Palpates chest","Auscultates chest"]},
      {t:"Abdomen/pelvis **", subs:["Inspects and palpates abdomen","Assesses pelvis","Verbalizes assessment of genitalia/perineum as needed"]},
      {t:"Lower extremities ** — inspects, palpates, assesses motor, sensory and distal circulation", subs:["Left leg","Right leg"]},
      {t:"Upper extremities — inspects, palpates, assesses motor, sensory and distal circulation", subs:["Left arm","Right arm"]},
      {t:"Posterior thorax, lumbar and buttocks **", subs:["Inspects and palpates posterior thorax","Inspects and palpates lumbar and buttocks areas"]},
      {t:"Manages secondary injuries and wounds appropriately", p:1},
      {h:"Reassessment"},
      {t:"Demonstrates how and when to reassess the patient", p:1}
    ],
    total: 42,
    critical: [
      "Failure to initiate or call for transport of the patient within 10 minute time limit",
      "Failure to take or verbalize appropriate PPE precautions",
      "Failure to determine scene safety",
      "Failure to assess for and provide spinal protection when indicated",
      "Failure to voice and ultimately provide high concentration oxygen",
      "Failure to assess/provide adequate ventilation",
      "Failure to find or appropriately manage problems associated with airway, breathing, hemorrhage or shock",
      "Failure to differentiate patient's need for immediate transportation versus continued assessment/treatment at the scene",
      "Performs other assessment before assessing/treating threats to airway, breathing and circulation",
      ...COMMON_END
    ]
  },
  "pa-medical": {
    code: "E202", title: "Patient Assessment/Management – Medical", timeLimitMin: 15, scenario: true,
    rows: [
      {t:"Takes or verbalizes appropriate PPE precautions", p:1},
      {h:"Scene size-up"},
      {t:"Determines the scene/situation is safe", p:1},
      {t:"Determines the mechanism of injury/nature of illness", p:1},
      {t:"Determines the number of patients", p:1},
      {t:"Requests additional EMS assistance if necessary", p:1},
      {t:"Considers stabilization of the spine", p:1},
      {h:"Primary survey/resuscitation"},
      {t:"Verbalizes the general impression of the patient", p:1},
      {t:"Determines responsiveness/level of consciousness (AVPU)", p:1},
      {t:"Determines chief complaint/apparent life-threats", p:1},
      {t:"Assesses airway and breathing", subs:["Assessment","Assures adequate ventilation","Initiates appropriate oxygen therapy"]},
      {t:"Assesses circulation", subs:["Assesses/controls major bleeding","Checks pulse","Assesses skin [color, temperature or condition]"]},
      {t:"Identifies patient priority and makes treatment/transport decision", p:1},
      {h:"History taking"},
      {t:"History of the present illness", subs:["Onset","Provocation","Quality","Radiation","Severity","Time","Clarifying questions of associated signs and symptoms related to OPQRST (1 of 2)","Clarifying questions of associated signs and symptoms related to OPQRST (2 of 2)"]},
      {t:"Past medical history", subs:["Allergies","Medications","Past pertinent history","Last oral intake","Events leading to present illness"]},
      {h:"Secondary assessment"},
      {t:"Assesses affected body part/system", choose:5, opts:["Cardiovascular","Pulmonary","Neurological","Musculoskeletal","Integumentary","GI/GU","Reproductive","Psychological/Social"]},
      {h:"Vital signs"},
      {t:"Vital signs", subs:["Blood pressure","Pulse","Respiratory rate","Respiratory quality"]},
      {t:"States field impression of patient", p:1},
      {t:"Interventions [verbalizes proper interventions/treatment]", p:1},
      {h:"Reassessment"},
      {t:"Demonstrates how and when to reassess the patient to determine changes in condition", p:1},
      {t:"Provides accurate verbal report to arriving EMS unit", p:1}
    ],
    total: 42,
    critical: [
      "Failure to initiate or call for transport of the patient within 15 minute time limit",
      "Failure to take or verbalize appropriate PPE precautions",
      "Failure to determine scene safety before approaching patient",
      "Failure to voice and ultimately provide appropriate oxygen therapy",
      "Failure to assess/provide adequate ventilation",
      "Failure to find or appropriately manage problems associated with airway, breathing, hemorrhage or shock",
      "Failure to differentiate patient's need for immediate transportation versus continued assessment or treatment at the scene",
      "Performs secondary examination before assessing and treating threats to airway, breathing and circulation",
      "Orders a dangerous or inappropriate intervention",
      "Failure to provide accurate report to arriving EMS unit",
      ...COMMON_END
    ]
  },
  "bvm": {
    code: "E203", title: "BVM Ventilation of an Apneic Adult Patient",
    rows: [
      {t:"Takes or verbalizes appropriate PPE precautions", p:1},
      {t:"Checks responsiveness", p:1},
      {t:"Requests additional EMS assistance", p:1},
      {t:"Checks breathing and pulse simultaneously", p:1},
      {note:"After checking responsiveness, then breathing and pulse for no more than 10 seconds, inform the candidate: “The patient is unresponsive, apneic and has a weak pulse of 60.”"},
      {t:"Opens airway properly", p:1},
      {note:"Inform the candidate: “The mouth is full of secretions and vomitus.”"},
      {t:"Prepares rigid suction catheter", p:1},
      {t:"Turns on power to suction device or retrieves manual suction device", p:1},
      {t:"Inserts rigid suction catheter without applying suction", p:1},
      {t:"Suctions the mouth and oropharynx", p:1},
      {note:"Inform the candidate: “The mouth and oropharynx are clear.”"},
      {t:"Opens the airway manually", p:1},
      {t:"Inserts oropharyngeal airway", p:1},
      {note:"Inform the candidate: “No gag reflex is present and the patient accepts the airway adjunct.”"},
      {t:"Ventilates the patient immediately using a BVM device unattached to oxygen [award if candidate ventilates initially with BVM attached to reservoir and oxygen, so long as first ventilation is within 30 seconds]", p:1},
      {note:"Inform the candidate that ventilation is being properly performed without difficulty."},
      {t:"Re-checks pulse for no more than 10 seconds", p:1},
      {t:"Attaches the BVM assembly [mask, bag, reservoir] to oxygen [15 L/minute]", p:1},
      {t:"Ventilates the patient adequately", subs:["Proper volume to cause visible chest rise","Proper rate [10–12/minute, 1 ventilation every 5–6 seconds]"]},
      {note:"Ask the candidate: “How would you know if you are delivering appropriate volumes with each ventilation?”"}
    ],
    total: 16,
    critical: [
      "After suctioning the patient, failure to initiate ventilations within 30 seconds or interrupts ventilations for greater than 30 seconds at any time",
      "Failure to take or verbalize appropriate PPE precautions",
      "Failure to suction airway before ventilating the patient",
      "Suctions the patient for an excessive and prolonged time",
      "Failure to check responsiveness, then check breathing and pulse simultaneously for no more than 10 seconds",
      "Failure to voice and ultimately provide high oxygen concentration [at least 85%]",
      "Failure to ventilate the patient at a rate of 10–12/minute (1 ventilation every 5–6 seconds)",
      "Failure to provide adequate volumes per breath [maximum 2 errors/minute permissible]",
      "Insertion or use of any adjunct in a manner dangerous to the patient",
      ...COMMON_END
    ]
  },
  "o2": {
    code: "E204", title: "Oxygen Administration by Non-Rebreather Mask",
    rows: [
      {t:"Takes or verbalizes appropriate PPE precautions", p:1},
      {t:"Gathers appropriate equipment", p:1},
      {t:"Cracks valve on the oxygen tank", p:1},
      {t:"Assembles the regulator to the oxygen tank", p:1},
      {t:"Opens the oxygen tank valve", p:1},
      {t:"Checks oxygen tank pressure", p:1},
      {t:"Checks for leaks", p:1},
      {t:"Attaches non-rebreather mask to correct port of regulator", p:1},
      {t:"Turns on oxygen flow to prefill reservoir bag", p:1},
      {t:"Adjusts regulator to assure oxygen flow rate of at least 10 L/minute", p:1},
      {t:"Attaches mask to patient's face and adjusts to fit snugly", p:1}
    ],
    total: 11,
    critical: [
      "Failure to take or verbalize appropriate PPE precautions",
      "Failure to assemble the oxygen tank and regulator without leaks",
      "Failure to prefill the reservoir bag",
      "Failure to adjust the oxygen flow rate to the non-rebreather mask of at least 10 L/minute",
      "Failure to ensure a tight mask seal to patient's face",
      ...COMMON_END
    ]
  },
  "spinal-seated": {
    code: "E211", title: "Spinal Immobilization (Seated Patient)",
    rows: [
      {t:"Takes or verbalizes appropriate PPE precautions", p:1},
      {t:"Directs assistant to place/maintain head in the neutral, in-line position", p:1},
      {t:"Directs assistant to maintain manual stabilization of the head", p:1},
      {t:"Reassesses motor, sensory and circulatory functions in each extremity", p:1},
      {t:"Applies appropriately sized extrication collar", p:1},
      {t:"Positions the immobilization device behind the patient", p:1},
      {t:"Secures the device to the patient's torso", p:1},
      {t:"Evaluates torso fixation and adjusts as necessary", p:1},
      {t:"Evaluates and pads behind the patient's head as necessary", p:1},
      {t:"Secures the patient's head to the device", p:1},
      {t:"Verbalizes moving the patient to a long backboard", p:1},
      {t:"Reassesses motor, sensory and circulatory function in each extremity", p:1}
    ],
    total: 12,
    critical: [
      "Failure to immediately direct or take manual stabilization of the head",
      "Failure to properly apply appropriately sized cervical collar before ordering release of manual stabilization",
      "Released or ordered release of manual stabilization before it was maintained mechanically",
      "Manipulated or moved patient excessively causing potential spinal compromise",
      "Head immobilized to the device before device sufficiently secured to the torso",
      "Device moves excessively up, down, left or right on the patient's torso",
      "Head immobilization allows for excessive movement",
      "Torso fixation inhibits chest rise, resulting in respiratory compromise",
      "Upon completion of immobilization, head is not in a neutral, in-line position",
      "Failure to reassess motor, sensory and circulatory functions in each extremity after voicing immobilization to the long backboard",
      ...COMMON_END
    ]
  },
  "spinal-supine": {
    code: "E212", title: "Spinal Immobilization (Supine Patient)",
    rows: [
      {t:"Takes or verbalizes appropriate PPE precautions", p:1},
      {t:"Directs assistant to place/maintain head in the neutral, in-line position", p:1},
      {t:"Directs assistant to maintain manual stabilization of the head", p:1},
      {t:"Reassesses motor, sensory and circulatory function in each extremity", p:1},
      {t:"Applies appropriately sized extrication collar", p:1},
      {t:"Positions the immobilization device appropriately", p:1},
      {t:"Directs movement of the patient onto the device without compromising the integrity of the spine", p:1},
      {t:"Applies padding to void between the torso and the device as necessary", p:1},
      {t:"Immobilizes the patient's torso to the device", p:1},
      {t:"Evaluates and pads behind the patient's head as necessary", p:1},
      {t:"Immobilizes the patient's head to the device", p:1},
      {t:"Secures the patient's legs to the device", p:1},
      {t:"Secures the patient's arms to the device", p:1},
      {t:"Reassesses motor, sensory and circulatory function in each extremity", p:1}
    ],
    total: 14,
    critical: [
      "Failure to immediately direct or take manual stabilization of the head",
      "Failure to properly apply appropriately sized cervical collar before ordering release of manual stabilization",
      "Released or ordered release of manual stabilization before it was maintained mechanically",
      "Manipulated or moved the patient excessively causing potential spinal compromise",
      "Head immobilized to the device before device sufficiently secured to the torso",
      "Patient moves excessively up, down, left or right on the device",
      "Head immobilization allows for excessive movement",
      "Upon completion of immobilization, head is not in a neutral, in-line position",
      "Failure to reassess motor, sensory and circulatory functions in each extremity after immobilizing patient to the device",
      ...COMMON_END
    ]
  },
  "bleeding": {
    code: "E213", title: "Bleeding Control/Shock Management",
    rows: [
      {t:"Takes or verbalizes appropriate PPE precautions", p:1},
      {t:"Applies direct pressure to the wound", p:1},
      {note:"Inform the candidate that the wound continues to bleed."},
      {t:"Applies tourniquet", p:1},
      {note:"Inform the candidate that the patient is exhibiting signs and symptoms of hypoperfusion."},
      {t:"Properly positions the patient", p:1},
      {t:"Administers high concentration oxygen", p:1},
      {t:"Initiates steps to prevent heat loss from the patient", p:1},
      {t:"Indicates the need for immediate transportation", p:1}
    ],
    total: 7,
    critical: [
      "Failure to take or verbalize appropriate PPE precautions",
      "Failure to administer high concentration oxygen",
      "Failure to control hemorrhage using correct procedures in a timely manner",
      "Failure to indicate the need for immediate transportation",
      ...COMMON_END
    ]
  },
  "cardiac": {
    code: "E215", title: "Cardiac Arrest Management / AED",
    rows: [
      {t:"Takes or verbalizes appropriate PPE precautions", p:1},
      {t:"Determines the scene/situation is safe", p:1},
      {t:"Checks patient responsiveness", p:1},
      {t:"Directs assistant to retrieve AED", p:1},
      {t:"Requests additional EMS assistance", p:1},
      {t:"Checks breathing and pulse simultaneously", p:1},
      {note:"After checking responsiveness, then breathing and pulse for no more than 10 seconds, inform the candidate: “The patient is unresponsive, apneic and pulseless.”"},
      {t:"Immediately begins chest compressions [adequate depth and rate; allows the chest to recoil completely]", p:1},
      {t:"Performs 2 minutes of high-quality, 1-rescuer adult CPR", subs:["Adequate depth and rate","Correct compression-to-ventilation ratio","Allows the chest to recoil completely","Adequate volumes for each breath","Minimal interruptions of no more than 10 seconds throughout"]},
      {note:"After 2 minutes (5 cycles), candidate assesses patient and second rescuer resumes compressions while candidate operates AED."},
      {t:"Turns on power to AED", p:1},
      {t:"Follows prompts and correctly attaches AED to patient", p:1},
      {t:"Stops CPR and ensures all individuals are clear of the patient during rhythm analysis", p:1},
      {t:"Ensures that all individuals are clear of the patient and delivers shock from AED", p:1},
      {t:"Immediately directs rescuer to resume chest compressions", p:1}
    ],
    total: 17,
    critical: [
      "Failure to take or verbalize appropriate PPE precautions",
      "Failure to check responsiveness, then check breathing and pulse simultaneously for no more than 10 seconds",
      "Failure to immediately begin chest compressions as soon as pulselessness is confirmed",
      "Failure to demonstrate acceptable high-quality, 1-rescuer adult CPR",
      "Interrupts CPR for more than 10 seconds at any point",
      "Failure to correctly attach the AED to the patient",
      "Failure to operate the AED properly",
      "Failure to deliver shock in a timely manner",
      "Failure to ensure that all individuals are clear of patient during rhythm analysis and before delivering shock [verbalizes “All clear” and observes]",
      "Failure to immediately resume compressions after shock delivered",
      ...COMMON_END
    ]
  },
  "joint": {
    code: "E216", title: "Joint Immobilization",
    rows: [
      {t:"Takes or verbalizes appropriate PPE precautions", p:1},
      {t:"Directs application of manual stabilization of the injury", p:1},
      {t:"Assesses distal motor, sensory and circulatory functions in the injured extremity", p:1},
      {note:"Acknowledge: “Motor, sensory and circulatory functions are present and normal.”"},
      {t:"Selects the proper splinting material", p:1},
      {t:"Immobilizes the site of the injury", p:1},
      {t:"Immobilizes the bone above the injury site", p:1},
      {t:"Immobilizes the bone below the injury site", p:1},
      {t:"Secures the entire injured extremity", p:1},
      {t:"Reassesses distal motor, sensory and circulatory functions in the injured extremity", p:1},
      {note:"Acknowledge: “Motor, sensory and circulatory functions are present and normal.”"}
    ],
    total: 9,
    critical: [
      "Failure to immediately stabilize the extremity manually",
      "Grossly moves the injured extremity",
      "Failure to immobilize the bone above and below the injury site",
      "Failure to reassess distal motor, sensory and circulatory functions in the injured extremity before and after splinting",
      ...COMMON_END
    ]
  },
  "long-bone": {
    code: "E217", title: "Long Bone Immobilization",
    rows: [
      {t:"Takes or verbalizes appropriate PPE precautions", p:1},
      {t:"Directs application of manual stabilization of the injury", p:1},
      {t:"Assesses distal motor, sensory and circulatory functions in the injured extremity", p:1},
      {note:"Acknowledge: “Motor, sensory and circulatory functions are present and normal.”"},
      {t:"Measures the splint", p:1},
      {t:"Applies the splint", p:1},
      {t:"Immobilizes the joint above the injury site", p:1},
      {t:"Immobilizes the joint below the injury site", p:1},
      {t:"Secures the entire injured extremity", p:1},
      {t:"Immobilizes the hand/foot in the position of function", p:1},
      {t:"Reassesses distal motor, sensory and circulatory functions in the injured extremity", p:1},
      {note:"Acknowledge: “Motor, sensory and circulatory functions are present and normal.”"}
    ],
    total: 10,
    critical: [
      "Failure to immediately stabilize the extremity manually",
      "Grossly moves the injured extremity",
      "Failure to immobilize the joint above and the joint below the injury site",
      "Failure to immobilize the hand or foot in a position of function",
      "Failure to reassess distal motor, sensory and circulatory functions in the injured extremity before and after splinting",
      ...COMMON_END
    ]
  }
};

/* Scoring helpers shared by the instructor screen, the review screen and the printout.
   A filled sheet is: {marks: {"r3": true, "r12.0": true, "r20.Cardiovascular": true}, critical:[2,5], ...} */
function rowMax(r){ return r.p ? r.p : r.subs ? r.subs.length : r.choose ? r.choose : 0; }
function rowScore(r, i, marks){
  marks = marks || {};
  if(r.p) return marks["r"+i] ? r.p : 0;
  if(r.subs) return r.subs.reduce((n,_,j)=> n + (marks["r"+i+"."+j] ? 1 : 0), 0);
  if(r.choose) return Math.min(r.choose, r.opts.filter(o=>marks["r"+i+"."+o]).length);
  return 0;
}
function sheetTotal(sheet){ return sheet.rows.reduce((n,r)=>n+rowMax(r),0); }
function sheetScore(sheet, marks){ return sheet.rows.reduce((n,r,i)=>n+rowScore(r,i,marks),0); }

/* Printable copy laid out like the paper form. */
function esc(s){ return String(s==null?"":s).replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
function fmtClock(iso){ return iso ? new Date(iso).toLocaleTimeString(undefined,{hour:"numeric",minute:"2-digit"}) : "__________"; }
function printHtml(sheet, f){
  const marks = f.marks || {};
  const rows = sheet.rows.map((r,i)=>{
    if(r.h) return `<tr class="h"><td colspan="3">${esc(r.h.toUpperCase())}</td></tr>`;
    if(r.note) return `<tr class="note"><td colspan="3">NOTE: ${esc(r.note)}</td></tr>`;
    let detail = "";
    if(r.subs) detail = `<div class="subs">${r.subs.map((s,j)=>`<span>${marks["r"+i+"."+j]?"☑":"☐"} ${esc(s)}</span>`).join("")}</div>`;
    if(r.choose) detail = `<div class="subs">${r.opts.map(o=>`<span>${marks["r"+i+"."+o]?"☑":"☐"} ${esc(o)}</span>`).join("")}</div>`;
    const mark = r.p ? (marks["r"+i]?"☑ ":"☐ ") : "";
    return `<tr><td>${mark}${esc(r.t)}${detail}</td><td class="n">${rowMax(r)}</td><td class="n aw">${rowScore(r,i,marks)}</td></tr>`;
  }).join("");
  const crit = sheet.critical.map((c,i)=>`<li>${(f.critical||[]).includes(i)?"<b>☒</b>":"☐"} ${esc(c)}</li>`).join("");
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${esc(sheet.code)} ${esc(f.studentName||"")}</title><style>
    body{font:12px/1.35 Arial,Helvetica,sans-serif;color:#000;margin:24px}
    h1{font-size:13px;text-align:center;margin:0} h2{font-size:15px;text-align:center;margin:4px 0 10px}
    .meta{display:grid;grid-template-columns:1fr 1fr;gap:4px 24px;margin-bottom:8px}
    .meta div{border-bottom:1px solid #000;padding:2px 0}
    table{width:100%;border-collapse:collapse} td,th{border:1px solid #000;padding:3px 6px;vertical-align:top}
    th{font-size:11px} td.n{width:54px;text-align:center} td.aw{font-weight:bold}
    tr.h td{font-weight:bold;background:#eee} tr.note td{font-style:italic;font-size:11px}
    .subs{display:flex;flex-wrap:wrap;gap:2px 14px;margin-top:2px;font-size:11px}
    .tot td{font-weight:bold} ul{list-style:none;padding:0;margin:4px 0} li{margin:2px 0}
    .box{border:1px solid #000;padding:6px;min-height:40px;white-space:pre-wrap;margin-top:4px}
    .res{font-size:14px;font-weight:bold;margin:10px 0}
    .foot{font-size:9px;margin-top:12px;color:#333}
    @media print{body{margin:10mm}}
  </style></head><body>
    <h1>National Registry of Emergency Medical Technicians — EMT Psychomotor Examination</h1>
    <h2>${esc(sheet.title.toUpperCase())}</h2>
    <div class="meta">
      <div>Candidate: <b>${esc(f.studentName||"")}</b></div><div>Examiner: <b>${esc(f.examiner||"")}</b></div>
      <div>Date: ${esc(f.startedAt? new Date(f.startedAt).toLocaleDateString() : "")}</div><div>Attempt: ${esc(f.attemptNo||"")}${f.assistantName?` · Assistant: ${esc(f.assistantName)}`:""}</div>
      ${sheet.scenario?`<div>Scenario #: ${esc(f.scenario||"")}</div><div></div>`:""}
      <div>Actual Time Started: ${fmtClock(f.startedAt)}</div><div>Actual Time Ended: ${fmtClock(f.endedAt)}</div>
    </div>
    <table><tr><th></th><th>Possible Points</th><th>Points Awarded</th></tr>${rows}
      <tr class="tot"><td style="text-align:right">TOTAL</td><td class="n">${sheetTotal(sheet)}</td><td class="n">${sheetScore(sheet, marks)}</td></tr></table>
    <p><b>CRITICAL CRITERIA</b></p><ul>${crit}</ul>
    ${(f.critical||[]).length? `<b>Rationale for critical criteria:</b><div class="box">${esc(f.criticalNotes||"")}</div>`:""}
    <b>Examiner notes:</b><div class="box">${esc(f.notes||"")}</div>
    <div class="res">Result: ${f.result==="P"?"PASS":f.result==="F"?"FAIL":"—"}${f.approvedAt?` · Approved ${esc(new Date(f.approvedAt).toLocaleString())}`:" · Pending approval"}</div>
    <div class="foot">${esc(sheet.code)} · Form content © National Registry of Emergency Medical Technicians, Inc., Columbus, OH. Reproduced for non-commercial educational use.</div>
    <script>window.onload=()=>{setTimeout(()=>window.print(),200)}<\/script>
  </body></html>`;
}

window.SKILL_SHEETS = SHEETS;
window.SheetKit = {rowMax, rowScore, sheetTotal, sheetScore, printHtml};
})();
