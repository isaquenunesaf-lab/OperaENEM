(function(){
'use strict';
const G=[
['Documentos',[['p1','Cartão de confirmação conferido (impresso ou no celular)'],['p2','Documento de identificação válido separado (confira no edital quais são aceitos)']]],
['Local e transporte',[['p3','Local de prova conferido no meu cartão de confirmação'],['p4','Trajeto e meio de transporte planejados, com plano B'],['p5','Horário de saída definido, com folga para imprevistos']]],
['Materiais',[['p6','Materiais permitidos separados (confira a lista no edital)']]],
['Alimentação e descanso',[['p7','Lanche e água separados, conforme as regras do edital'],['p8','Noite de sono planejada na véspera']]],
['Durante a prova',[['p9','Lembrete: distribuir o tempo entre as questões e a redação'],['p10','Lembrete: respirar, beber água e não travar numa questão difícil']]]];
const V=window.Views=window.Views||{};
V.prova={
  render(){
    const s=Store.get(),ex=Plan.CONFIG.provas;
    return `<h1>Dia da prova</h1><p>Datas previstas: ${ex.map(p=>`${p.label}: <strong>${U.br(p.date)}</strong>`).join(' · ')}.</p>
<p>Consulte o local da sua prova no seu cartão de confirmação, na <a href="https://enem.inep.gov.br/participante" target="_blank" rel="noopener noreferrer">página oficial do participante do ENEM</a>.</p>
${G.map(([t,its])=>`<section class="card"><h2>${t}</h2><ul class="tasks">${its.map(([id,l])=>`<li><label><input type="checkbox" data-pc="${id}"${s.check[id]?' checked':''}><span>${l}</span></label></li>`).join('')}</ul></section>`).join('')}
<button class="btn ghost" id="rc">Reiniciar checklist</button>`;
  },
  bind(a){
    a.querySelectorAll('[data-pc]').forEach(i=>i.onchange=()=>{Store.update(s=>{if(i.checked)s.check[i.dataset.pc]=true;else delete s.check[i.dataset.pc];});});
    a.querySelector('#rc').onclick=()=>{if(confirm('Desmarcar todos os itens do checklist?')){Store.update(s=>{s.check={};});App.render();}};
  }
};
})();
