(function(){
'use strict';
// Cronograma editável: altere datas, temas e tarefas aqui, sem mexer na interface.
// Cada tarefa termina com o tempo estimado, no formato (N min). O tempo do dia é a soma delas.
const mins=items=>items.reduce((t,x)=>t+(+((/\((\d+) min\)/.exec(x)||[0,0])[1])),0);
const D=(n,date,area,lib,tema,items)=>({id:'d'+n,label:'Dia '+n,date,area,lib,tema,min:mins(items),items});
const DAYS=[
D(1,'2026-10-27','Todas as áreas','Geral','Diagnóstico e planejamento',[
'Na Biblioteca, abra Geral > Questões do ENEM e resolva 5 questões de cada área (Linguagens, Humanas, Natureza e Matemática), cronometrando o tempo (60 min)',
'Confira as respostas e escreva, no campo Dificuldades deste cartão, os 5 temas em que você mais errou (20 min)',
'Em Meu progresso, registre o total de questões e de acertos (5 min)',
'Em Meu progresso, adicione esses 5 temas em Assuntos para revisar (5 min)',
'No papel, defina o horário fixo de estudo de cada dia até 07/11 e cole em um lugar visível (15 min)',
'Leia os cartões dos próximos dias e veja o que vai precisar (livros, caderno, calculadora, se for permitida) (10 min)']),
D(2,'2026-10-28','Linguagens','Português','Linguagens',[
'Na Biblioteca, escolha Português e assista a 1 videoaula de interpretação de texto (20 min)',
'Resolva 10 questões de interpretação de texto e anote ao lado de cada erro o motivo (pegadinha, pressa ou falta de vocabulário) (40 min)',
'Liste 5 gêneros textuais (por exemplo notícia, charge, crônica) e escreva uma frase sobre o objetivo de cada um (15 min)',
'Monte um quadro com as 6 funções da linguagem e um exemplo de cada (20 min)',
'Resolva 5 questões de variação linguística e 5 de figuras de linguagem (30 min)',
'Resolva 5 questões de inglês ou espanhol, lendo o texto inteiro antes das perguntas (20 min)',
'Em Meu progresso, registre as questões e os acertos do dia (5 min)']),
D(3,'2026-10-29','Ciências Humanas','História','História',[
'Desenhe uma linha do tempo em uma folha com: Brasil Colônia e escravidão, República, Era Vargas, ditadura militar e redemocratização (25 min)',
'Na Biblioteca, escolha História e assista a 1 videoaula sobre a Era Vargas (20 min)',
'Resolva 8 questões sobre Brasil Colônia e escravidão (30 min)',
'Resolva 8 questões sobre República e Era Vargas (30 min)',
'Resolva 8 questões sobre ditadura militar e redemocratização (30 min)',
'Escreva 5 linhas sobre cidadania e movimentos sociais com um exemplo que você possa usar como repertório na redação (15 min)',
'Em Meu progresso, registre as questões e os acertos do dia (5 min)']),
D(4,'2026-10-30','Ciências Humanas','Geografia','Geografia, Filosofia e Sociologia',[
'Resolva 8 questões de urbanização e população (30 min)',
'Resolva 8 questões de globalização e questões ambientais (30 min)',
'Resolva 6 questões de clima e agricultura (25 min)',
'Leia um resumo de Sociologia sobre cultura e desigualdade social e escreva 3 exemplos do dia a dia (20 min)',
'Resolva 5 questões de Filosofia sobre ética, cidadania e pensamento político (20 min)',
'Escolha 2 temas deste dia e escreva 1 frase de repertório para cada um, para usar na redação (10 min)',
'Em Meu progresso, registre as questões e os acertos do dia (5 min)']),
D(5,'2026-10-31','Matemática','Matemática','Matemática I',[
'Na Biblioteca, escolha Matemática > Porcentagem e assista à videoaula (20 min)',
'Resolva 8 questões de porcentagem (25 min)',
'Resolva 8 questões de razão e proporção (25 min)',
'Resolva 8 questões de regra de três, simples e composta (25 min)',
'Resolva 5 questões de escala, lendo mapas e plantas com calma (20 min)',
'Resolva 6 questões de média e mediana e 4 de interpretação de gráficos (30 min)',
'Refaça no caderno, escrevendo cada conta, as questões que você errou (15 min)',
'Em Meu progresso, registre as questões e os acertos do dia (5 min)']),
D(6,'2026-11-01','Redação','Redação','Redação I',[
'Abra a aba Redação e leia a explicação da estrutura dissertativo-argumentativa (10 min)',
'Escolha um tema de redação de uma prova anterior (5 min)',
'No formulário da aba Redação, preencha o tema, a tese, o argumento 1, o argumento 2 e a proposta de intervenção (ação, agente, meio, finalidade e detalhamento) (25 min)',
'Anote 2 repertórios socioculturais (um fato histórico, um dado, um filme ou um livro) que combinem com o tema (10 min)',
'Escreva a redação completa, em até 60 minutos, seguindo seu planejamento (60 min)',
'Revise o texto usando o checklist de revisão da aba Redação (15 min)',
'Troque 3 conectivos repetidos por outros da lista de conectivos (10 min)',
'Clique em Salvar no histórico (5 min)']),
D(7,'2026-11-02','Ciências da Natureza','Biologia','Biologia',[
'Resolva 8 questões de ecologia e relações ecológicas (30 min)',
'Desenhe uma teia alimentar com 6 seres vivos e escreva o que acontece se um deles desaparecer (20 min)',
'Resolva 6 questões de genética básica (cruzamentos simples) (25 min)',
'Escreva em 3 linhas como funciona a seleção natural e resolva 4 questões de evolução (20 min)',
'Resolva 8 questões de fisiologia humana e saúde (30 min)',
'Refaça as questões que você errou, explicando em voz alta o porquê da resposta certa (15 min)',
'Em Meu progresso, registre as questões e os acertos do dia (5 min)']),
D(8,'2026-11-03','Ciências da Natureza','Química','Química',[
'Resolva 6 questões de misturas e processos de separação (25 min)',
'Resolva 6 exercícios de estequiometria, sempre escrevendo a reação equilibrada e a regra de três (30 min)',
'Resolva 6 questões de soluções e concentração (25 min)',
'Resolva 5 questões de pH e desenhe a escala ácido-base com 3 exemplos (20 min)',
'Resolva 5 questões de química ambiental (20 min)',
'Resolva 4 questões de eletroquímica básica (pilhas) (20 min)',
'Refaça as questões que você errou (15 min)',
'Em Meu progresso, registre as questões e os acertos do dia (5 min)']),
D(9,'2026-11-04','Ciências da Natureza','Física','Física',[
'Resolva 6 questões de cinemática (velocidade média e gráficos) (25 min)',
'Resolva 6 questões sobre as leis de Newton (25 min)',
'Resolva 6 questões de energia, trabalho e potência (25 min)',
'Resolva 6 questões de eletricidade e circuitos simples (25 min)',
'Resolva 4 questões de calorimetria (15 min)',
'Calcule o consumo mensal, em kWh, de 3 aparelhos da sua casa, usando a potência e as horas de uso (15 min)',
'Refaça as questões que você errou (15 min)',
'Em Meu progresso, registre as questões e os acertos do dia (5 min)']),
D(10,'2026-11-05','Matemática','Matemática','Matemática II',[
'Resolva 6 questões de geometria plana e áreas (25 min)',
'Resolva 5 questões de geometria espacial e volumes (25 min)',
'Meça seu quarto e calcule a área do piso e o volume de uma caixa ou garrafa (15 min)',
'Resolva 5 questões de semelhança (20 min)',
'Resolva 6 questões de probabilidade básica (25 min)',
'Na Biblioteca, escolha Matemática > Funções e assista à videoaula (20 min)',
'Resolva 6 questões de funções com interpretação de gráficos (30 min)',
'Refaça as questões que você errou (10 min)',
'Em Meu progresso, registre as questões e os acertos do dia (5 min)']),
D(11,'2026-11-06','Linguagens e Ciências Humanas','Geral','Revisão integrada do primeiro dia',[
'Faça um mini-simulado de Linguagens: 15 questões em 40 minutos, cronometrado (40 min)',
'Faça um mini-simulado de Ciências Humanas: 15 questões em 40 minutos, cronometrado (40 min)',
'Para cada erro, anote o motivo: falta de conteúdo, falta de atenção ou erro de interpretação (30 min)',
'Refaça 5 das questões que você errou (20 min)',
'Releia a redação do Dia 6 com o checklist e reescreva a introdução e a proposta de intervenção (30 min)',
'Em Meu progresso, revise os assuntos da lista e remova os que você já revisou (15 min)',
'Em Meu progresso, registre as questões e os acertos do dia (5 min)']),
D(12,'2026-11-07','Preparação','Geral','Revisão leve e preparação para a prova',[
'Releia suas anotações e a lista de Assuntos para revisar, sem tentar aprender nada novo (20 min)',
'Abra a página Dia da prova e marque os itens do checklist que já estão prontos (15 min)',
'Confira no seu cartão de confirmação o local, a sala e o horário da prova (10 min)',
'Defina como vai chegar ao local e a que horas vai sair de casa, com folga para imprevistos (10 min)',
'Separe o documento de identificação e os materiais permitidos conforme o edital, e deixe tudo junto na bolsa (10 min)',
'Resolva no máximo 5 questões leves de uma área de que você goste, só para manter o ritmo (15 min)',
'Planeje a noite: jantar leve, água por perto e hora de dormir definida (5 min)'])
];
// Etapa complementar: entre o 1º e o 2º dia de prova. Distribua as tarefas ao longo da semana.
const COMP_ITEMS=[
'Refaça pelo menos 15 questões de Matemática que você errou ou ainda não fez (45 min)',
'Resolva 10 questões de Física (30 min)',
'Resolva 10 questões de Química (30 min)',
'Resolva 10 questões de Biologia (30 min)',
'Releia as dificuldades anotadas nos Dias 5 a 10 e adicione os temas em Assuntos para revisar (20 min)',
'Em Meu progresso, registre as questões e os acertos (5 min)',
'Na véspera do 2º dia, confira de novo o checklist da página Dia da prova (10 min)'];
const COMP={id:'c',label:'Etapa complementar',date:'2026-11-09',end:'2026-11-14',area:'Matemática e Ciências da Natureza',lib:'',tema:'Revisão de Matemática e Ciências da Natureza (distribua ao longo da semana)',min:mins(COMP_ITEMS),items:COMP_ITEMS};
const CONFIG={provas:[{id:'d1',label:'1º dia do ENEM 2026',date:'2026-11-08'},{id:'d2',label:'2º dia do ENEM 2026',date:'2026-11-15'}]};
const ALL=DAYS.concat([COMP]);
const key=(d,i)=>d.id+'-'+i;
const Plan=window.Plan={CONFIG,DAYS,COMP,ALL,key,
  stats(s,list){let t=0,d=0;(list||ALL).forEach(x=>x.items.forEach((_,i)=>{t++;if(s.tasks[key(x,i)])d++;}));return{total:t,done:d};},
  nextExam:()=>CONFIG.provas.find(p=>p.date>=U.today())||null,
  isToday:d=>{const t=U.today();return d.date<=t&&t<=(d.end||d.date);},
  today:()=>ALL.find(Plan.isToday)||null,
  next:()=>ALL.find(d=>d.date>U.today())||null,
  firstPending:s=>ALL.find(d=>d.items.some((_,i)=>!s.tasks[key(d,i)]))||null,
  card(d,s){
    const st=Plan.stats(s,[d]),c=st.done===st.total?'done':st.done?'doing':'todo',lab={done:'Concluído',doing:'Em andamento',todo:'Pendente'}[c];
    return `<article class="card day ${c}" id="${d.id}"><div class="day-h"><span class="badge">${d.label}</span><span>${d.end?U.short(d.date)+' a '+U.short(d.end):U.short(d.date)}${Plan.isToday(d)?' · <strong>hoje</strong>':''}</span><span class="state ${c}">${lab}</span></div>
<h3>${d.tema}</h3><p class="muted">${d.area} · tempo estimado: cerca de ${d.min} min</p>
<ul class="tasks">${d.items.map((t,i)=>`<li><label><input type="checkbox" data-task="${key(d,i)}"${s.tasks[key(d,i)]?' checked':''}><span>${t}</span></label></li>`).join('')}</ul>
<progress max="${st.total}" value="${st.done}" aria-label="Progresso de ${d.label}"></progress><p class="muted">${st.done} de ${st.total} tarefas</p>
<label class="field">Dificuldades (opcional)<textarea data-note="${d.id}" rows="2">${U.esc(s.notes[d.id]||'')}</textarea></label>
<button class="btn ghost" data-go="biblioteca" data-lib="${d.lib}">Abrir materiais relacionados</button></article>`;}
};
const V=window.Views=window.Views||{};
let flt='todos';
V.plano={
  render(){
    const s=Store.get(),t=U.today();
    const fs={todos:()=>1,ant:d=>(d.end||d.date)<t,hoje:Plan.isToday,prox:d=>d.date>t};
    const list=ALL.filter(fs[flt]);
    return `<h1>Plano de estudos</h1><p class="muted">Cronograma-base editável, sem lista oficial de incidência do ENEM e sem garantia de nota. Siga os passos de cada dia na ordem, no seu ritmo: as quantidades de questões e os tempos são sugestões que você pode ajustar. Marque e desmarque tarefas livremente: nenhum dia é bloqueado se você atrasar.</p>
<div class="row" role="group" aria-label="Filtrar dias">${[['todos','Todos'],['ant','Anteriores'],['hoje','Hoje'],['prox','Próximos']].map(([k,l])=>`<button class="btn ghost sm" data-flt="${k}" aria-pressed="${flt===k}">${l}</button>`).join('')}</div>
${list.length?list.map(d=>Plan.card(d,s)).join(''):'<p class="card">Nenhum dia neste filtro. Tente outra opção.</p>'}
<p class="muted">Etapa complementar: após o 1º dia de prova, revise Matemática e Ciências da Natureza até o 2º dia (datas configuráveis em js/cronograma.js).</p>`;
  },
  bind(a){a.querySelectorAll('[data-flt]').forEach(b=>b.onclick=()=>{flt=b.dataset.flt;App.render();});}
};
})();
