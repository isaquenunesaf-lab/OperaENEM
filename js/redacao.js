(function(){
'use strict';
const CONN=[['Adição','Além disso · Ademais · Bem como · Soma-se a isso'],['Oposição','No entanto · Contudo · Todavia · Embora · Em contrapartida'],['Causa','Visto que · Uma vez que · Já que · Em virtude de'],['Consequência','Portanto · Logo · Por conseguinte · Dessa forma'],['Exemplo','Por exemplo · A exemplo de · Como evidencia'],['Conclusão','Em suma · Diante do exposto · Por fim · Portanto']];
const CHECK=[['c1','Compreensão do tema'],['c2','Defesa de um ponto de vista'],['c3','Argumentação coerente'],['c4','Coesão entre parágrafos'],['c5','Norma-padrão da língua portuguesa'],['c6','Proposta de intervenção compatível com os direitos humanos']];
const F=['tema','tese','a1','a2','prop','texto'];
let editing=null,msg='';
const V=window.Views=window.Views||{};
V.redacao={
  render(){
    const s=Store.get(),ed=editing&&s.essays.find(e=>e.id===editing),v=ed||s.draft,m=msg;msg='';
    const fld=(k,l,rows,extra)=>`<label class="field">${l}${extra?`<span class="muted"> ${extra}</span>`:''}<textarea name="${k}" rows="${rows}">${U.esc(v[k]||'')}</textarea></label>`;
    return `<h1>Redação</h1>
<section class="card"><h2>Estrutura dissertativo-argumentativa</h2><p>Introdução: apresente o tema e a tese. Desenvolvimento: dois parágrafos, cada um com um argumento, explicação e repertório. Conclusão: retome a tese e apresente a proposta de intervenção.</p><p class="muted">Esta ferramenta ajuda a planejar e revisar. Ela não atribui nota e não reproduz a correção oficial do ENEM.</p></section>
<form id="fred" class="card"><h2>${ed?'Editando redação':'Planejar e escrever'}</h2>
<label class="field">Tema<input type="text" name="tema" value="${U.esc(v.tema||'')}"></label>
${fld('tese','Tese',2)}${fld('a1','Argumento 1',3)}${fld('a2','Argumento 2',3)}
${fld('prop','Proposta de intervenção',3,'Inclua: ação, agente, meio de execução, finalidade e detalhamento, quando aplicáveis.')}
${fld('texto','Rascunho da redação',12)}
<div class="row"><button class="btn" type="submit">${ed?'Salvar alterações':'Salvar no histórico'}</button>${ed?'<button class="btn ghost" type="button" id="cancel">Cancelar edição</button>':''}</div><p role="status" class="ok">${m}</p>
<p class="muted">${ed?'':'O que você digita é guardado automaticamente como rascunho neste navegador.'}</p></form>
<section class="card"><h2>Checklist de revisão</h2><ul class="tasks">${CHECK.map(([id,l])=>`<li><label><input type="checkbox" data-ec="${id}"${s.essayCheck[id]?' checked':''}><span>${l}</span></label></li>`).join('')}</ul></section>
<section class="card"><h2>Conectivos</h2><dl>${CONN.map(([a,b])=>`<dt><strong>${a}</strong></dt><dd>${b}</dd>`).join('')}</dl></section>
<section class="card"><h2>Histórico de redações</h2>${s.essays.length?`<ul class="list">${s.essays.slice().reverse().map(e=>`<li><span><strong>${U.esc(e.tema||'Sem tema')}</strong><br><span class="muted">${U.br(e.date)}</span></span><span class="row"><button class="btn ghost sm" data-edit="${e.id}">Editar</button><button class="btn danger sm" data-del="${e.id}">Excluir</button></span></li>`).join('')}</ul>`:'<p class="muted">Nenhuma redação salva ainda.</p>'}</section>`;
  },
  bind(a){
    const f=a.querySelector('#fred'),vals=()=>{const o={};F.forEach(k=>o[k]=f.elements[k].value);return o;};
    f.addEventListener('input',()=>{if(!editing)Store.update(s=>{s.draft=vals();});});
    f.onsubmit=e=>{e.preventDefault();const o=vals();
      if(!F.some(k=>o[k].trim())){msg='Escreva algo antes de salvar.';return App.render();}
      Store.update(s=>{if(editing){Object.assign(s.essays.find(x=>x.id===editing),o);}else{s.essays.push(Object.assign(o,{id:U.uid(),date:U.today()}));s.draft=vals();F.forEach(k=>s.draft[k]='');}});
      editing=null;msg='Salvo no histórico.';App.render();};
    const c=a.querySelector('#cancel');if(c)c.onclick=()=>{editing=null;App.render();};
    a.querySelectorAll('[data-ec]').forEach(i=>i.onchange=()=>{Store.update(s=>{if(i.checked)s.essayCheck[i.dataset.ec]=true;else delete s.essayCheck[i.dataset.ec];});});
    a.querySelectorAll('[data-edit]').forEach(b=>b.onclick=()=>{editing=b.dataset.edit;App.render();window.scrollTo(0,0);});
    a.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{if(confirm('Excluir esta redação do histórico?')){Store.update(s=>{s.essays=s.essays.filter(x=>x.id!==b.dataset.del);});if(editing===b.dataset.del)editing=null;App.render();}});
  }
};
})();
