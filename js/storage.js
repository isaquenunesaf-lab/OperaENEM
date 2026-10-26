(function(){
'use strict';
const KEY='operacao-enem-v1';
const U=window.U={
  esc:s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),
  uid:()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6),
  today(){const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');},
  br:iso=>iso.split('-').reverse().join('/'),
  short:iso=>iso.slice(8)+'/'+iso.slice(5,7),
  days(iso){const[a,b,c]=iso.split('-').map(Number),n=new Date();return Math.round((new Date(a,b-1,c)-new Date(n.getFullYear(),n.getMonth(),n.getDate()))/864e5);}
};
const num=x=>Math.max(0,Math.round(+x)||0);
const str=x=>typeof x==='string'?x:'';
const dt=x=>/^\d{4}-\d\d-\d\d$/.test(x)?x:U.today();
const obj=x=>x&&typeof x==='object'&&!Array.isArray(x)?x:{};
const arr=x=>Array.isArray(x)?x.filter(i=>i&&typeof i==='object'):[];
const flags=o=>{const f={};Object.entries(obj(o)).forEach(([k,v])=>{if(v===true)f[k]=true;});return f;};
const E=['tema','tese','a1','a2','prop','texto'];
const pick=p=>{const o={};E.forEach(k=>o[k]=str(p[k]));return o;};
function clean(r){
  r=obj(r);
  const tasks={},notes={};
  Object.entries(obj(r.tasks)).forEach(([k,v])=>{if(typeof v==='string')tasks[k]=v;});
  Object.entries(obj(r.notes)).forEach(([k,v])=>{if(typeof v==='string'&&v)notes[k]=v;});
  return{v:1,tasks,notes,
    perf:arr(r.perf).map(p=>{const total=num(p.total);return{id:str(p.id)||U.uid(),date:dt(p.date),disc:str(p.disc),total,hits:Math.min(num(p.hits),total),min:num(p.min)};}),
    review:arr(r.review).map(p=>({id:str(p.id)||U.uid(),text:str(p.text)})).filter(p=>p.text),
    essays:arr(r.essays).map(p=>Object.assign(pick(p),{id:str(p.id)||U.uid(),date:dt(p.date)})),
    draft:pick(obj(r.draft)),essayCheck:flags(r.essayCheck),check:flags(r.check),
    prefs:{name:str(obj(r.prefs).name).slice(0,40),tour:obj(r.prefs).tour===true}};
}
let state,ok=true;
try{state=clean(JSON.parse(localStorage.getItem(KEY)));}catch(e){state=clean(null);}
function save(){try{localStorage.setItem(KEY,JSON.stringify(state));ok=true;}catch(e){ok=false;}}
window.Store={
  get:()=>state,ok:()=>ok,
  update(fn){fn(state);save();},
  exportJSON:()=>JSON.stringify(state,null,2),
  importJSON(text){const r=JSON.parse(text);if(!r||typeof r!=='object'||!['tasks','perf','essays','check','review'].some(k=>k in r))throw new Error('Arquivo inválido');state=clean(r);save();},
  reset(){state=clean(null);try{localStorage.removeItem(KEY);}catch(e){}ok=true;}
};
})();
