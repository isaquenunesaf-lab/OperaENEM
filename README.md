# Operação ENEM

Site gratuito para organizar os estudos na reta final do ENEM. HTML, CSS e JavaScript puros, sem backend. Os dados ficam no `localStorage` do navegador.

## Executar localmente
Abra `index.html` no navegador (duplo clique). Ou, na pasta do projeto: `python3 -m http.server 8000` e acesse http://localhost:8000.

## Publicar gratuitamente
Site estático, basta enviar a pasta:
- **GitHub Pages**: suba o projeto para um repositório, em Settings > Pages escolha a branch `main` e a pasta raiz.
- **Netlify** ou **Cloudflare Pages**: arraste a pasta `operacao-enem` na área de deploy.

## Testar a persistência
1. Marque tarefas em Plano de estudos, registre um exercício e salve uma redação.
2. Atualize a página (F5) e feche e reabra o navegador: tudo deve continuar lá.
3. Em Meu progresso, exporte o backup, apague os dados e importe o arquivo para restaurar.

## Como editar
- `js/cronograma.js`: dias, tarefas, datas do ENEM (`CONFIG`) e etapa complementar.
- `js/biblioteca.js`: acrescente temas em `RES`, com links de exercícios e de videoaula. Só cadastre links reais.
- `js/storage.js`: leitura, validação, exportação e importação dos dados.
- `js/mascote.js`: o mascote Eni (SVG) e o tour de boas-vindas. `js/redacao.js`, `js/progresso.js`, `js/prova.js`: telas correspondentes. `js/app.js`: início e navegação.

## Depende do cursinho
Curadoria da biblioteca (hoje aponta para Toda Matéria e YouTube; vários botões de vídeo abrem uma busca), provas anteriores e gabaritos, revisão do cronograma e das datas oficiais, e, se desejado, logotipo em `assets/`.

Os conteúdos do cronograma são uma base editável: não são uma lista oficial de incidência do ENEM e não garantem nota.
