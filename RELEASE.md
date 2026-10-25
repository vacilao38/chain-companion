# Chain Companion 1.0.0

Extensão para Chrome e Microsoft Edge no Windows 10/11 x64. **Instale Chain 1.2.0 ou superior pelo Setup antes de usar.**

Extraia o ZIP em pasta permanente. Em chrome://extensions ou edge://extensions, ative modo de desenvolvedor e escolha Carregar sem compactação, selecionando a pasta com manifest.json. O ZIP contém LEIA-ME.md. Esta é distribuição manual pela Clustter, sem publicação em Chrome Web Store/Edge Add-ons.

O ícone captura a aba escolhida; o menu contextual envia página/link. Uma janela própria do Chain permite escolher/criar coleção, título, trilha e etiquetas antes de confirmar. A resposta da ponte significa abertura da janela: não significa que o link foi salvo.

Permissões: activeTab temporária, contextMenus, nativeMessaging e consulta do feed público Update. Sem content scripts, histórico ou cookies. Nenhum URL/título/biblioteca é enviado à rede pela extensão. A atualização consulta metadados do catálogo e abre a página oficial, sem instalar automaticamente.

Dois testes automatizados da extensão passaram. A ponte nativa real e a janela foram validadas no Windows com dados sintéticos. O fluxo completo após carregar a extensão em Chrome/Edge ainda precisa de validação; Android usa Compartilhar no aplicativo, sem extensão. Não há suporte incluído para Firefox, navegador móvel ou outros sistemas.

Confira SHA256SUMS.txt. A identidade incluída contém somente chave pública. Nenhuma credencial ou dado de uso acompanha o ZIP.
