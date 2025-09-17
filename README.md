# Gerador de Cardápios em PDF 🍔📄

Este projeto é um **script em Node.js** desenvolvido para gerar cardápios em PDF de forma **rápida, prática e automatizada**.  
Ele foi criado para facilitar o dia a dia dos meus pais na hamburgueria, permitindo que os cardápios possam ser alterados facilmente através de um arquivo JSON.

A saída do script gera **dois arquivos PDF**:

- **Versão digital** → Com preços, ideal para envio pela internet (WhatsApp, redes sociais, etc.).
- **Versão para impressão** → Sem preços, exibindo apenas uma tarja no lugar deles, para que seja possível escrever o valor manualmente depois.

---

## 🚀 Tecnologias utilizadas

- [Node.js](https://nodejs.org/) → execução do projeto.
- [Puppeteer](https://pptr.dev/) → geração dos PDFs a partir de HTML/CSS.
- [EJS](https://ejs.co/) → templates dinâmicos para os cardápios.
- Scripts `.bat` → automação (instalação, geração e atualização).

---

## 📂 Estrutura básica do projeto

```bash
📦 gerador_cardapio_pdf
 ┣ 📂 assets                    # Pasta onde ficam as imagens, logos, etc.
 ┃ ┣ 📂 icons                   # Pasta dos ícones (Ex: ícones da seção de contato)
 ┃ ┗ 📂 images                  # Pasta das imagens que serão utilizadas no cardápio (Ex: foto dos lanches)
 ┣ 📂 entrada
 ┃ ┗ 📄 cardapio.json           # Arquivo onde os itens do cardápio são configurados
 ┣ 📂 saida
 ┃ ┣ 📄 cardapio.pdf            # Cardápio digital (com preços)
 ┃ ┗ 📄 cardapio-sem-preco.pdf  # Cardápio para impressão (sem preços)
 ┣ 📂 templates                 # Templates para geração dos PDFs
 ┃ ┣ 📄 index.html              # Estrutura HTML do cardápio
 ┃ ┣ 📄 cardapio.ejs            # Template EJS dinâmico
 ┃ ┣ 📄 cardapio-sem-preco.ejs  # Template EJS dinâmico para a geração do cardápio sem preço
 ┃ ┗ 📄 style.css               # Estilos CSS do cardápio
 ┣ 📄 app.js
 ┣ 📄 package.json
 ┣ 📄 package-lock.json
 ┣ 📄 1. Editar Cardapio.bat     # Script para abrir o arquivo JSON com o Sublime
 ┣ 📄 2. Gerar Cardapio.bat      # Script para gerar os PDFs
 ┣ 📄 3. Atualizar.bat           # Script para atualizar e reinstalar dependências
 ┣ 📄 4. Instalar Dependencias.bat # Script para instalar Git, Node e Sublime Text via Winget
 ┗ 📄 README.md
```

## ⚙️ Como rodar o projeto

### 1. Instalar dependências iniciais

Clique duas vezes no script **Instalar Dependencias.bat**. Ele irá instalar automaticamente:

- Git
- Node.js
- Sublime Text (opcional, para editar o JSON).

### 2. Editar o cardápio

Clique duas vezes no script **Editar Cardapio.bat**. Ele irá abrir o arquivo JSON para edição.
Ou, se preferir, abra o arquivo `entrada/cardapio.json` manualmente no Sublime (ou qualquer editor de texto).
Adicione, remova ou edite os itens do cardápio conforme desejar.

### 3. Gerar os PDFs

Clique no script **Gerar Cardapio.bat**. Os arquivos serão gerados dentro da pasta `saida/`:

- `cardapio.pdf` (digital).
- `cardapio-sem-preco.pdf` (para impressão).

### 4. Atualizar o projeto

Sempre que houver uma atualização no GitHub, clique no script **Atualizar.bat**. Ele irá puxar as atualizações, apagar a pasta `node_modules`, reinstalar as dependências e deixar tudo pronto novamente.
