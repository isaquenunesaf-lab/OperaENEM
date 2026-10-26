(function(){
'use strict';
// Eni, o mascote da Operação ENEM, e o tour de boas-vindas.
const svg=(mood,size)=>{
  size=size||110;
  const mouth=mood==='wow'?'<ellipse cx="60" cy="84" rx="8" ry="9" fill="#0a0f1f"/>':'<path d="M47 78 Q60 92 73 78" fill="none" stroke="#0a0f1f" stroke-width="4" stroke-linecap="round"/>';
  return `<svg class="mascot" viewBox="0 0 120 124" width="${size}" height="${size}" role="img" aria-label="Eni, o mascote da Operação ENEM"><ellipse cx="46" cy="116" rx="13" ry="6" fill="#fbbf24"/><ellipse cx="74" cy="116" rx="13" ry="6" fill="#fbbf24"/><circle cx="60" cy="74" r="42" fill="#2f6df6"/><ellipse cx="60" cy="88" rx="26" ry="22" fill="#bfdbfe"/><circle cx="46" cy="62" r="12" fill="#fff"/><circle cx="74" cy="62" r="12" fill="#fff"/><circle cx="48" cy="63" r="6" fill="#0a0f1f"/><circle cx="76" cy="63" r="6" fill="#0a0f1f"/><circle cx="50" cy="61" r="2" fill="#fff"/><circle cx="78" cy="61" r="2" fill="#fff"/>${mouth}<circle cx="34" cy="76" r="5" fill="#f472b6" opacity=".6"/><circle cx="86" cy="76" r="5" fill="#f472b6" opacity=".6"/><path d="M22 28 L60 12 L98 28 L60 44 Z" fill="#111827" stroke="#8fc2ff" stroke-width="2"/><path d="M42 38 v10 q18 9 36 0 v-10" fill="#1f2937"/><path d="M98 28 v18" stroke="#fbbf24" stroke-width="3"/><circle cx="98" cy="48" r="4" fill="#fbbf24"/></svg>`;
};
window.Mascot={svg};
const STEPS=[
{t:'Oi! Eu sou o Eni 👋',p:'Vou te mostrar como a Operação ENEM funciona. É rapidinho!',nav:''},
{t:'Início',p:'Aqui ficam a contagem regressiva, o resumo do seu progresso e as tarefas de hoje. Comece escrevendo seu nome no topo!',nav:'inicio'},
{t:'Plano de estudos',p:'Um cartão para cada dia. Marque as tarefas à vontade: se você atrasar, nada é bloqueado.',nav:'plano'},
{t:'Biblioteca de materiais',p:'Escolha a disciplina e o tema para achar videoaulas e exercícios.',nav:'biblioteca'},
{t:'Redação',p:'Planeje a tese, os argumentos e a proposta de intervenção, e guarde seus rascunhos.',nav:'redacao'},
{t:'Meu progresso',p:'Registre questões e acertos. Seus dados ficam só neste navegador, então exporte um backup de vez em quando.',nav:'progresso'},
{t:'Dia da prova',p:'Um checklist para não esquecer nada. Sem pressão: um passo de cada vez!',nav:''},
{t:'Pronto!',p:'Que tal começar escrevendo seu nome e marcando a primeira tarefa?',nav:''}
];
STEPS[6].nav='prova';
let i=0,box=null;
const hl=r=>document.querySelectorAll('#nav a').forEach(a=>a.classList.toggle('tour-hl',a.dataset.r===r));
function close(){
  if(!box)return;
  box.remove();box=null;document.body.classList.remove('touring');hl('');
  document.removeEventListener('keydown',key);
  const a=document.getElementById('app');if(a)a.focus({preventScroll:true});
}
function done(){Store.update(s=>{s.prefs.tour=true;});close();}
function key(e){
  if(!box)return;
  if(e.key==='Escape'){e.preventDefault();done();}
  else if(e.key==='Tab'){
    const b=box.querySelectorAll('button'),f=b[0],l=b[b.length-1];
    if(e.shiftKey&&document.activeElement===f){e.preventDefault();l.focus();}
    else if(!e.shiftKey&&document.activeElement===l){e.preventDefault();f.focus();}
  }
}
function draw(){
  const s=STEPS[i],last=i===STEPS.length-1;
  box.innerHTML=`<div class="tour-box"><div>${svg(i===0||last?'wow':'happy',96)}</div><h2 id="tour-t">${s.t}</h2><p>${s.p}</p><div class="dots" aria-hidden="true">${STEPS.map((_,k)=>`<i class="${k===i?'on':''}"></i>`).join('')}</div><p class="muted" aria-live="polite">Passo ${i+1} de ${STEPS.length}</p><div class="row" style="justify-content:center">${last?'':'<button class="btn ghost sm" data-tb="skip">Pular</button>'}${i?'<button class="btn ghost sm" data-tb="back">Voltar</button>':''}<button class="btn" data-tb="next">${last?'Começar!':'Próximo'}</button></div></div>`;
  hl(s.nav);
  box.querySelector('[data-tb=next]').focus();
}
function start(){
  if(box)return;
  i=0;box=document.createElement('div');box.className='tour';
  box.setAttribute('role','dialog');box.setAttribute('aria-modal','true');box.setAttribute('aria-labelledby','tour-t');
  box.addEventListener('click',e=>{
    const b=e.target.closest('[data-tb]');if(!b)return;
    const a=b.dataset.tb;
    if(a==='skip')done();
    else if(a==='back'){i--;draw();}
    else if(i===STEPS.length-1)done();
    else{i++;draw();}
  });
  document.body.appendChild(box);document.body.classList.add('touring');
  document.addEventListener('keydown',key);draw();
}
window.Tour={start};
})();
