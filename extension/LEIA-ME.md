# Chain Companion 1.0.0

Extensão Manifest V3 para **Chrome e Microsoft Edge no Windows**. Guarde a página atual ou um link pelo menu de contexto em uma janela rápida do Chain, sem navegar pela biblioteca. A janela permite escolher/criar coleção, nome do link, nome opcional da trilha e etiquetas, e exige confirmação antes de salvar.

## Instalar

1. Instale **Chain 1.2.0 ou superior** pelo instalador Windows da [Clustter](https://vacilao38.github.io/clustter-cores-downloads/#chain). A ponte local é registrada para o usuário atual, sem administrador.
2. Baixe o ZIP do Companion na Clustter e extraia em uma pasta permanente.
3. Em `chrome://extensions` ou `edge://extensions`, ative o modo de desenvolvedor, escolha **Carregar sem compactação** e selecione a pasta que contém `manifest.json`. Mantenha a pasta, pois ela é a instalação da extensão.
4. Fixe o ícone se desejar. Na página escolhida, clique nele e em **Escolher coleção no Chain**. Também há **Guardar no Chain** no menu de contexto da página/link.

Esta distribuição é para instalação manual, não uma publicação na Chrome Web Store ou Edge Add-ons. Firefox, navegadores móveis e outros sistemas não foram incluídos nesta versão. No Android, use diretamente **Compartilhar → Guardar no Chain** no app; não é necessária extensão.

## Privacidade e permissões

`activeTab` fornece o título/URL da aba acionada pelo usuário; `contextMenus` cria o atalho e `nativeMessaging` fala com a ponte local. Sem cookies, histórico, content scripts ou leitura contínua das páginas. Nenhum link, título, etiqueta ou biblioteca é enviado à rede por esta extensão. A ponte aceita apenas a identidade pública fixa do Companion e abre uma janela de revisão, não salva silenciosamente.

A única consulta HTTP é ao feed público **Update** da Clustter ao abrir a extensão. Compara a versão e oferece a página oficial para baixar quando houver versão superior; não instala automaticamente. A hospedagem recebe os metadados HTTP normais, incluindo IP. Sem rede, a captura local continua disponível.

`identity.json` contém apenas uma chave **pública** para preservar o ID da extensão instalada manualmente; não é credencial de conta nem chave de assinatura de loja. Uma futura versão de loja deverá coordenar sua identidade e o allowed_origins da ponte.

## Desenvolvimento

Node.js (sem dependências npm) e `tar.exe` do Windows para empacotar:

```powershell
node --test test/*.test.mjs
node tool/package.mjs
```

`extension/` contém o produto carregável. O empacotador valida a identidade e gera `manifest.json`, ZIP e SHA256SUMS em `dist/1.0.0/`, ignorado pelo Git. A ponte e a janela ficam no repositório privado do Chain, em `tool/browser_host.dart`, `tool/prepare-browser.ps1` e `lib/quick_capture.dart`. Só o executável compilado acompanha o instalador do app.

Protocolo da mensagem local: JSON UTF-8 com `schema:1`, `url` HTTP/HTTPS, `title` e opcionais `track`, `tags`, `collection`. Limite de 32 KiB, framing de Native Messaging e origem exata. Resposta `ok:true` significa que a janela foi acionada; o link só é salvo após a confirmação na janela.
