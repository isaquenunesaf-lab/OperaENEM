(function(){
'use strict';
const R=[['inicio','Início','🏠'],['plano','Plano de estudos','📅','Plano'],['biblioteca','Biblioteca de materiais','📚','Materiais'],['redacao','Redação','✍️'],['progresso','Meu progresso','📈','Progresso'],['prova','Dia da prova','🎯','Prova']];
const V=window.Views=window.Views||{};
V.inicio={
  render(){
    const s=Store.get(),t=Plan.today(),n=Plan.next(),ex=Plan.nextExam(),st=Plan.stats(s),p=Prog.totals(s),fp=Plan.firstPending(s);
    const hr=new Date().getHours(),g=hr<12?'Bom dia':hr<18?'Boa tarde':'Boa noite';
    const dd=ex?U.days(ex.date):null,cd=ex?(dd===0?'É hoje!':dd+(dd===1?' dia':' dias')):'—';
    const tip=st.done===0?'Vamos começar? Escolha uma tarefa pequena para hoje.':st.done===st.total?'Você concluiu todas as tarefas! Que tal revisar com calma?':'Você já concluiu '+st.done+' de '+st.total+' tarefas. Siga no seu ritmo!';
    let pri;
    if(t){
      const pend=t.items.map((x,i)=>[x,i]).filter(([x,i])=>!s.tasks[Plan.key(t,i)]);
      pri=pend.length?`<p class="muted">${t.label}: ${t.tema}</p><ul class="tasks">${pend.map(([x,i])=>`<li><label><input type="checkbox" data-task="${Plan.key(t,i)}"><span>${x}</span></label></li>`).join('')}</ul>`:'<p class="ok">Você concluiu as tarefas de hoje. Bom trabalho!</p>';
    }else pri=n?`<p>Não há tarefa prevista para hoje. Próxima tarefa disponível: <strong>${n.label}</strong> (${U.br(n.date)}), ${n.tema}.</p><button class="btn ghost sm" data-go="plano" data-target="${n.id}">Ver no plano</button>`:'<p>O cronograma configurado já terminou. Você pode revisar o que ficou pendente no plano.</p>';
    return `<section class="hero"><div>${Mascot.svg('happy',110)}</div><div class="hero-t"><label class="field" for="nome">Como podemos te chamar? (opcional)</label><input type="text" id="nome" maxlength="40" autocomplete="given-name" value="${U.esc(s.prefs.name)}"><h1 style="margin-top:.7rem">${g}${s.prefs.name?', '+U.esc(s.prefs.name):''}!</h1><p>${tip}</p><p class="hero-d">Operação ENEM · ${new Date().toLocaleDateString('pt-BR',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</p></div></section>
<section class="card" aria-labelledby="sobre-t"><h2 id="sobre-t">Uma mensagem de quem criou o site</h2>
<p>Olá, estudante! Eu sou o <strong>Isaque Nunes</strong>, aluno de Engenharia de Controle e Automação no IF-SJBV. Criei este site como bolsista do projeto de extensão <strong>Cursinho Popular Saojoanense</strong>, para ajudar você a chegar mais tranquilo ao ENEM.</p>
<p>Aqui você encontra um protocolo de estudos passo a passo, materiais, espaço para treinar a redação e o acompanhamento do seu progresso, tudo no seu ritmo.</p>
<p>Ficou com alguma dúvida ou tem uma sugestão? Fale comigo pelo e-mail ou pelo WhatsApp. Bons estudos e boa sorte!</p>
<div class="row"><a class="btn sm" href="mailto:isaquenunesaf@gmail.com">E-mail</a><a class="btn ghost sm" href="https://wa.me/5535998487543" target="_blank" rel="noopener noreferrer">WhatsApp: (35) 99848-7543</a></div></section>
<div class="row"><button class="btn ghost sm" id="tour-again">Rever o tour com o Eni</button></div>
<div class="grid c2"><section class="card"><h2>${ex?'Contagem regressiva: '+ex.label:'Datas da prova'}</h2><p class="big">${cd}</p><p class="muted">${ex?U.br(ex.date):'As datas configuradas já passaram.'}</p></section>
<section class="card"><h2>Seu progresso</h2><progress max="${st.total}" value="${st.done}" aria-label="Progresso geral"></progress><p><strong>${st.done}</strong> de ${st.total} tarefas concluídas${st.total?' ('+Math.round(st.done/st.total*100)+'%)':''}</p><p class="muted">${p.rate===null?'Nenhuma questão registrada ainda.':'Taxa de acerto: '+p.rate+'% ('+p.h+' de '+p.q+')'}</p></section></div>
<section class="card"><h2>Prioridades de hoje</h2>${pri}<div class="row"><button class="btn" data-go="plano"${fp?` data-target="${fp.id}"`:''}>Continuar meus estudos</button><button class="btn ghost" data-go="redacao">Ir para a redação</button><button class="btn ghost" data-go="biblioteca" data-lib="">Ver materiais</button></div></section>
<section class="card"><h2>Próxima etapa</h2><p>${n?`<strong>${n.label}</strong> em ${U.br(n.date)}: ${n.tema}.`:'Não há próximas etapas no cronograma.'}</p></section>
<p class="muted">Seus dados ficam salvos neste navegador e dispositivo. Sem pressão: estude no seu ritmo.</p>`;
  },
  bind(a){a.querySelector('#tour-again').onclick=()=>Tour.start();}
};
function route(){const h=location.hash.slice(1);return R.some(r=>r[0]===h)?h:'inicio';}
function render(navigated){
  const id=route(),app=document.getElementById('app'),y=window.scrollY,ae=document.activeElement,f=ae&&ae.dataset&&ae.dataset.task;
  app.innerHTML=(Store.ok()?'':'<p class="alert" role="alert">Não foi possível salvar neste navegador (armazenamento cheio ou bloqueado). Exporte um backup em Meu progresso.</p>')+V[id].render();
  if(V[id].bind)V[id].bind(app);
  document.querySelectorAll('#nav a').forEach(a=>a.dataset.r===id?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current'));
  document.title=R.find(r=>r[0]===id)[1]+' · Operação ENEM';
  if(App.target){const el=document.getElementById(App.target);App.target=null;if(el){el.scrollIntoView();const b=el.querySelector('input,textarea');if(b)b.focus({preventScroll:true});}}
  else if(navigated===true){window.scrollTo(0,0);app.focus({preventScroll:true});}
  else{window.scrollTo(0,y);if(f){const n=app.querySelector('[data-task="'+f+'"]');if(n)n.focus({preventScroll:true});}}
}
const App=window.App={target:null,render:()=>render(false),go(r,t){App.target=t||null;if(location.hash==='#'+r)render(!t);else location.hash=r;}};
document.getElementById('nav').innerHTML=R.map(r=>`<li><a href="#${r[0]}" data-r="${r[0]}"><span aria-hidden="true">${r[2]}</span><span class="lbl"><span class="f">${r[1]}</span><span class="s">${r[3]||r[1]}</span></span></a></li>`).join('');
const app=document.getElementById('app');
app.addEventListener('change',e=>{
  const t=e.target;
  if(t.dataset.task){Store.update(s=>{if(t.checked)s.tasks[t.dataset.task]=U.today();else delete s.tasks[t.dataset.task];});App.render();}
  else if(t.dataset.note){Store.update(s=>{if(t.value.trim())s.notes[t.dataset.note]=t.value;else delete s.notes[t.dataset.note];});}
  else if(t.id==='nome'){Store.update(s=>{s.prefs.name=t.value.trim().slice(0,40);});App.render();}
});
app.addEventListener('click',e=>{
  const b=e.target.closest('[data-go]');if(!b)return;
  if(b.dataset.lib!==undefined)V.biblioteca.preset(b.dataset.lib);
  App.go(b.dataset.go,b.dataset.target);
});
window.addEventListener('hashchange',()=>render(true));
const br=document.querySelector('.brand');if(br)br.innerHTML='<span aria-hidden="true">'+Mascot.svg('happy',40)+'</span> Operação ENEM';
render(false);
if(!Store.get().prefs.tour)Tour.start();
})();
