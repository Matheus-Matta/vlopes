# Vitória Lopes Design System

Site estático em HTML, CSS e JavaScript puro para a landing page da psicóloga Vitória Lopes.

## Estrutura

- `index.html`: página principal
- `style.css`: estilos, responsividade e animações
- `script.js`: interações leves de scroll, reveal e hover
- `assets/images/`: imagens usadas no site

## Rodar localmente

Abra `index.html` no navegador ou rode um servidor local:

```bash
python -m http.server 5177
```

Depois acesse:

```text
http://127.0.0.1:5177
```

## GitHub Pages

Este projeto já inclui uma GitHub Action em `.github/workflows/deploy-pages.yml`.

Para publicar:

1. Crie um repositório no GitHub.
2. Envie este projeto para a branch `main`.
3. No GitHub, vá em `Settings > Pages`.
4. Em `Build and deployment`, selecione `GitHub Actions`.
5. Faça um push na branch `main`.

A Action fará o deploy automaticamente.
