(function(){
'use strict';
// Biblioteca simples: um cartão por tema, com videoaula e exercícios.
// Para acrescentar: adicione uma linha com T(disciplina, tema, [links de exercícios], [rótulo, url do vídeo]).
// Se o vídeo for omitido, o botão abre uma busca no YouTube. Só cadastre links reais.
const TM='https://www.todamateria.com.br/';
const L=(l,p)=>[l,TM+p];
const yt=q=>'https://www.youtube.com/results?search_query='+encodeURIComponent(q);
const hub=(n,ex,en)=>[L('Exercícios de '+n,'exercicios/'+ex+'/'),L(n+' no ENEM','enem/'+en+'/')];
const PT=hub('Português','exercicios-de-portugues','portugues'),HI=hub('História','exercicios-de-historia','historia'),GE=hub('Geografia','exercicios-de-geografia','geografia'),FI=hub('Filosofia','exercicios-filosofia','filosofia'),SO=hub('Sociologia','exercicios-de-sociologia','sociologia'),BI=hub('Biologia','exercicios-de-biologia','biologia'),QU=hub('Química','exercicios-de-quimica','quimica'),FS=hub('Física','exercicios-de-fisica','fisica');
const ID=[L('Exercícios de Inglês','exercicios/exercicios-de-ingles/'),L('Exercícios de Espanhol','exercicios/exercicios-de-espanhol/')];
const RED=[L('Corretor de redação (Toda Matéria)','corretor-de-redacao/')];
const m=(l,p)=>L(l,p+'/');
const T=(disc,tema,links,v)=>({disc,tema,links,v});
const RES=[
T('Português','Interpretação e compreensão textual',PT),
T('Português','Gêneros textuais',PT),
T('Português','Funções da linguagem',PT),
T('Português','Variação linguística',PT),
T('Português','Figuras de linguagem',PT),
T('Inglês/Espanhol','Leitura em inglês ou espanhol',ID,['Buscar videoaulas no YouTube',yt('aula leitura inglês ENEM')]),
T('História','Brasil Colônia e escravidão',HI),
T('História','República brasileira e Era Vargas',HI),
T('História','Ditadura militar e redemocratização',HI),
T('História','Cidadania e movimentos sociais',HI),
T('Geografia','Urbanização e população',GE),
T('Geografia','Globalização e questões ambientais',GE),
T('Geografia','Clima e agricultura',GE),
T('Filosofia','Ética, cidadania e pensamento político',FI),
T('Sociologia','Cultura e desigualdade social',SO),
T('Matemática','Porcentagem',[m('Exercícios de porcentagem','exercicios-de-porcentagem')],['Assistir videoaula (Toda Matéria)','https://youtu.be/1B_HAdLci7o']),
T('Matemática','Razão e proporção',[m('Exercícios de razão e proporção','razao-e-proporcao-exercicios')]),
T('Matemática','Regra de três',[m('Exercícios de regra de três','exercicios-de-regra-de-tres')]),
T('Matemática','Escalas',[m('Exercícios de razão e proporção','razao-e-proporcao-exercicios')]),
T('Matemática','Média, mediana e interpretação de gráficos',[m('Exercícios de média, moda e mediana','exercicios-de-media-moda-e-mediana'),m('Exercícios sobre tipos de gráficos','exercicios-sobre-tipos-de-graficos-com-gabarito-explicado')]),
T('Matemática','Geometria plana e espacial',[m('Exercícios de geometria plana','area-de-figuras-planas-exercicios'),m('Exercícios sobre cilindros','exercicios-sobre-cilindros')]),
T('Matemática','Áreas e volumes',[m('Exercícios sobre área e perímetro','area-e-perimetro-exercicios'),m('Exercícios sobre cilindros','exercicios-sobre-cilindros')]),
T('Matemática','Semelhança',[m('Exercícios sobre semelhança de triângulos','semelhanca-de-triangulos-exercicios')]),
T('Matemática','Probabilidade básica',[m('Exercícios de probabilidade','exercicios-sobre-probabilidade')]),
T('Matemática','Funções e interpretação de gráficos',[m('Exercícios sobre funções','exercicios-sobre-funcoes'),m('Exercícios sobre tipos de gráficos','exercicios-sobre-tipos-de-graficos-com-gabarito-explicado')],['Assistir videoaula (Universo Narrado)','https://www.youtube.com/watch?v=w8QCKpv67wI']),
T('Biologia','Ecologia e relações ecológicas',BI),
T('Biologia','Cadeias e teias alimentares',BI),
T('Biologia','Genética básica e evolução',BI),
T('Biologia','Fisiologia humana e saúde',BI),
T('Química','Misturas e separação de materiais',QU),
T('Química','Estequiometria básica',QU),
T('Química','Soluções e concentração',QU),
T('Química','pH',QU),
T('Química','Química ambiental',QU),
T('Química','Eletroquímica básica',QU),
T('Física','Cinemática',FS),
T('Física','Leis de Newton',FS),
T('Física','Energia, trabalho e potência',FS),
T('Física','Eletricidade e circuitos simples',FS),
T('Física','Calorimetria',FS),
T('Física','Consumo de energia',FS),
T('Redação','Estrutura dissertativo-argumentativa',RED),
T('Redação','Construção da tese',RED),
T('Redação','Desenvolvimento de argumentos',RED),
T('Redação','Repertório sociocultural',RED),
T('Redação','Coesão e conectivos',RED),
T('Geral','Questões do ENEM (diagnóstico e revisão)',[L('Exercícios do ENEM','exercicios-enem/'),L('Questões de Matemática no ENEM','questoes-de-matematica-enem/'),L('Simulados ENEM (pode exigir assinatura)','enem/simulados/')],['Buscar resoluções de prova no YouTube',yt('resolução prova ENEM')]),
T('Geral','Canal Pedro Assaad',[],['Abrir canal no YouTube','https://www.youtube.com/@PedroAssaad']),
T('Geral','Canal Universo Narrado',[],['Abrir canal no YouTube','https://www.youtube.com/@UniversoNarrado'])
];
let F={disc:'',tema:''};
const vid=r=>r.v||['Buscar videoaulas no YouTube',yt('aula '+r.tema+' '+r.disc+' ENEM')];
const opts=(a,v)=>'<option value="">Todos</option>'+a.map(o=>`<option${o===v?' selected':''}>${U.esc(o)}</option>`).join('');
const a=(h,t,c)=>`<a class="btn ${c}" href="${U.esc(h)}" target="_blank" rel="noopener noreferrer">${U.esc(t)}</a>`;
function list(){
  const l=RES.filter(r=>(!F.disc||r.disc===F.disc)&&(!F.tema||r.tema===F.tema));
  return l.length?l.map(r=>{const v=vid(r);return `<article class="card"><h3>${U.esc(r.tema)}</h3><p><span class="chip">${U.esc(r.disc)}</span></p><div class="row">${a(v[1],'▶ '+v[0],'sm')}${r.links.map(k=>a(k[1],k[0],'ghost sm')).join('')}</div></article>`;}).join(''):'<p class="card">Nenhum material encontrado.</p>';
}
const V=window.Views=window.Views||{};
V.biblioteca={
  preset(d){F={disc:d||'',tema:''};},
  render(){
    const discs=[...new Set(RES.map(r=>r.disc))],temas=RES.filter(r=>!F.disc||r.disc===F.disc).map(r=>r.tema);
    return `<h1>Biblioteca de materiais</h1><p class="muted">Cada tema tem uma videoaula e links de exercícios em sites gratuitos. Os botões “Buscar videoaulas” abrem os resultados do YouTube para você escolher a aula que preferir.</p>
<div class="card"><div class="grid c2"><label class="field">Disciplina<select data-filter="disc">${opts(discs,F.disc)}</select></label><label class="field">Tema<select data-filter="tema">${opts(temas,F.tema)}</select></label></div></div>
<div aria-live="polite">${list()}</div>`;
  },
  bind(el){el.querySelectorAll('[data-filter]').forEach(s=>s.onchange=()=>{F[s.dataset.filter]=s.value;if(s.dataset.filter==='disc')F.tema='';App.render();});}
};
})();
