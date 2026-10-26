(function(){
'use strict';
let msg='';
const sum=(a,k)=>a.reduce((t,x)=>t+x[k],0);
const fm=m=>m>=60?Math.floor(m/60)+' h '+(m%60)+' min':m+' min';
window.Prog={totals(s){const q=sum(s.perf,'total'),h=sum(s.perf,'hits'),m=sum(s.perf,'min');return{q,h,m,rate:q>0?Math.round(h/q*1000)/10:null};}};
const V=window.Views=window.Views||{};
V.progresso={
  render(){
    const s=Store.get(),t=Prog.totals(s),st=Plan.stats(s),m=msg;msg='';
    const by={};s.perf.forEach(p=>{if(!p.disc||!p.total)return;const b=by[p.disc]=by[p.disc]||{q:0,h:0};b.q+=p.total;b.h+=p.hits;});
    const days={},D=d=>days[d]=days[d]||{t:0,q:0,h:0,m:0};
    Object.values(s.tasks).forEach(d=>D(d).t++);s.perf.forEach(p=>{const x=D(p.date);x.q+=p.total;x.h+=p.hits;x.m+=p.min;});
    const hist=Object.keys(days).sort().reverse();
    return `<h1>Meu progresso</h1><p class="muted">Seus números são só seus: não há ranking nem comparação com outros alunos. Cada passo conta.</p>
<div class="grid c3"><div class="card"><p class="big">${st.done}</p><p class="muted">tarefas concluídas</p></div><div class="card"><p class="big">${st.total-st.done}</p><p class="muted">tarefas pendentes</p></div><div class="card"><p class="big">${t.q}</p><p class="muted">questões respondidas</p></div>
<div class="card"><p class="big">${t.h}</p><p class="muted">acertos</p></div><div class="card"><p class="big">${t.rate===null?'—':t.rate+'%'}</p><p class="muted">${t.rate===null?'taxa de acerto (registre questões)':'taxa de acerto'}</p></div><div class="card"><p class="big">${fm(t.m)}</p><p class="muted">tempo de estudo registrado</p></div></div>
<form id="fperf" class="card"><h2>Registrar desempenho</h2>
<label class="field">Disciplina ou assunto<input type="text" name="disc" list="discs" maxlength="60"></label><datalist id="discs">${['Português','Inglês','Espanhol','História','Geografia','Filosofia','Sociologia','Matemática','Biologia','Química','Física','Redação','Misto'].map(d=>`<option value="${d}">`).join('')}</datalist>
<div class="grid c3"><label class="field">Questões feitas<input type="number" name="total" min="0" inputmode="numeric" value="0"></label><label class="field">Acertos<input type="number" name="hits" min="0" inputmode="numeric" value="0"></label><label class="field">Minutos de estudo<input type="number" name="min" min="0" inputmode="numeric" value="0"></label></div>
<label class="field">Data<input type="date" name="date" value="${U.today()}"></label>
<button class="btn" type="submit">Salvar registro</button><p role="status" class="ok">${m}</p></form>
${s.perf.length?`<section class="card"><h2>Registros</h2><ul class="list">${s.perf.slice().reverse().slice(0,20).map(p=>`<li><span>${U.br(p.date)} · ${U.esc(p.disc||'Sem disciplina')}<br><span class="muted">${p.total} questões, ${p.hits} acertos, ${p.min} min</span></span><button class="btn danger sm" data-dp="${p.id}">Excluir</button></li>`).join('')}</ul></section>`:''}
${Object.keys(by).length?`<section class="card"><h2>Taxa de acerto por disciplina</h2><table><tr><th>Disciplina</th><th>Acertos/Questões</th><th>Taxa</th></tr>${Object.entries(by).map(([k,b])=>`<tr><td>${U.esc(k)}</td><td>${b.h}/${b.q}</td><td>${Math.round(b.h/b.q*100)}%</td></tr>`).join('')}</table></section>`:''}
<section class="card"><h2>Assuntos para revisar</h2><form id="frev" class="row"><label class="field" style="flex:1;margin:0">Novo assunto<input type="text" name="text" maxlength="80" required></label><button class="btn" type="submit" style="align-self:flex-end">Adicionar</button></form>
${s.review.length?`<ul class="list">${s.review.map(r=>`<li><span>${U.esc(r.text)}</span><button class="btn ghost sm" data-rv="${r.id}">Já revisei</button></li>`).join('')}</ul>`:'<p class="muted">Nenhum assunto marcado para revisão.</p>'}</section>
<section class="card"><h2>Histórico diário</h2>${hist.length?`<table><tr><th>Dia</th><th>Tarefas</th><th>Acertos/Questões</th><th>Tempo</th></tr>${hist.map(d=>`<tr><td>${U.br(d)}</td><td>${days[d].t}</td><td>${days[d].h}/${days[d].q}</td><td>${fm(days[d].m)}</td></tr>`).join('')}</table>`:'<p class="muted">O histórico aparece quando você concluir tarefas ou registrar exercícios.</p>'}</section>
<section class="card"><h2>Seus dados</h2><p class="muted">Tudo fica salvo neste navegador e neste dispositivo. Limpar os dados do navegador pode apagar seu progresso, e não há sincronização automática entre aparelhos. Exporte um backup de vez em quando. Não guardamos senhas nem dados pessoais sensíveis.</p>
<div class="row"><button class="btn" id="exp">Exportar backup (JSON)</button><label class="btn ghost" for="imp">Importar backup</label><input type="file" id="imp" accept=".json,application/json" hidden><button class="btn danger" id="rst">Apagar todos os dados</button></div></section>`;
  },
  bind(a){
    a.querySelector('#fperf').onsubmit=e=>{e.preventDefault();const f=e.target,total=Math.round(+f.total.value)||0,hits=Math.round(+f.hits.value)||0,min=Math.round(+f.min.value)||0;
      if(total<0||hits<0||min<0||hits>total){msg='Confira os números: os acertos não podem passar do total de questões.';return App.render();}
      if(!total&&!min){msg='Informe as questões ou o tempo de estudo.';return App.render();}
      Store.update(s=>s.perf.push({id:U.uid(),date:f.date.value||U.today(),disc:f.disc.value.trim(),total,hits,min}));msg='Registro salvo.';App.render();};
    a.querySelector('#frev').onsubmit=e=>{e.preventDefault();const v=e.target.text.value.trim();if(v)Store.update(s=>s.review.push({id:U.uid(),text:v}));App.render();};
    a.querySelectorAll('[data-dp]').forEach(b=>b.onclick=()=>{Store.update(s=>{s.perf=s.perf.filter(p=>p.id!==b.dataset.dp);});App.render();});
    a.querySelectorAll('[data-rv]').forEach(b=>b.onclick=()=>{Store.update(s=>{s.review=s.review.filter(p=>p.id!==b.dataset.rv);});App.render();});
    a.querySelector('#exp').onclick=()=>{const u=URL.createObjectURL(new Blob([Store.exportJSON()],{type:'application/json'})),l=document.createElement('a');l.href=u;l.download='operacao-enem-backup-'+U.today()+'.json';document.body.appendChild(l);l.click();l.remove();setTimeout(()=>URL.revokeObjectURL(u),1000);};
    a.querySelector('#imp').onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{if(!confirm('Importar este backup substitui os dados atuais. Continuar?'))return;try{Store.importJSON(r.result);msg='Backup importado.';}catch(x){alert('Não foi possível importar: arquivo de backup inválido.');}App.render();};r.readAsText(f);};
    a.querySelector('#rst').onclick=()=>{if(confirm('Apagar TODOS os dados deste navegador? Isso não pode ser desfeito. Exporte um backup antes, se quiser guardar.')){Store.reset();App.render();}};
  }
};
})();
