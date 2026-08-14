# checkuppessoal-site

Conteúdo do site **CheckupPessoal**, servido por GitHub Pages e exibido dentro do
`checkuppessoal.com` (site Wix, plano Matriz) através de um bloco de HTML incorporado.

## Arquitetura

```
checkuppessoal.com   →  DNS no Wix
      └─ site Wix
            └─ página única, tela cheia
                  └─ <iframe> → https://ptgsouza.github.io/checkuppessoal-site/
```

## Como atualizar o site

Editar o arquivo, `commit` e `push`. O GitHub Pages republica sozinho em ~1 minuto e o
`checkuppessoal.com` passa a mostrar a versão nova. **Nada a mexer no Wix.**

```bash
git add -A && git commit -m "descrição da mudança" && git push
```

## Conteúdo

| Arquivo | O que é |
|---|---|
| `index.html` | home completa |
| `privacidade.html` | Política de Privacidade |
| `termos.html` | Termos de Uso |
| `assets/img/` | logo + 6 capturas do app (dados fictícios) |
| `robots.txt` | bloqueio de indexação |

## ⚠️ Regras

- As três páginas trazem `<meta name="robots" content="noindex,nofollow">`. Isso é
  **proposital**: só o endereço `checkuppessoal.com` deve aparecer nas buscas, nunca a URL
  crua do GitHub Pages. Não remover sem trocar a estratégia de publicação.
- Os instaladores e os manuais **não ficam aqui** — vêm das releases de
  `checkuppessoal-android` e `checkuppessoal-windows`, pelo link `latest`, que nunca muda.
- Nenhuma captura pode conter dados reais de pessoas. As atuais já foram anonimizadas.

---
© 2026 PTGSouza Administração e Consultoria
