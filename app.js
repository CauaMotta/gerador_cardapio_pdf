const fs = require("fs");
const puppeteer = require("puppeteer");
const ejs = require("ejs");
const path = require("path");

function toBase64(filePath) {
  if (!fs.existsSync(path.join(__dirname, filePath))) {
    return null;
  }

  const file = fs.readFileSync(path.join(__dirname, filePath));
  let mimeType;
  switch (path.extname(filePath).toLowerCase()) {
    case ".svg":
      mimeType = "image/svg+xml";
      break;
    case ".png":
      mimeType = "image/png";
      break;
    case ".jpg":
    case ".jpeg":
      mimeType = "image/jpeg";
      break;
    default:
      throw new Error(`Extensão de arquivo não suportada: ${filePath}`);
  }
  return `data:${mimeType};base64,${file.toString("base64")}`;
}

async function gerarCardapioPDF() {
  let browser;
  try {
    const data = JSON.parse(
      fs.readFileSync(path.join(__dirname, "entrada", "cardapio.json"), "utf8")
    );
    const cssStyles = fs.readFileSync(
      path.join(__dirname, "templates", "styles.css"),
      "utf8"
    );

    const patternBase64 = toBase64("./assets/pattern-bg.png");

    const logo = toBase64(data.logo);

    const contatosComIcones = data.contato.map((contato) => {
      const iconesBase64 = contato.icones.map((tipo) => {
        const iconPath = `./assets/icons/${tipo}.svg`;
        return toBase64(iconPath);
      });
      return {
        ...contato,
        iconesBase64: iconesBase64,
      };
    });

    const secoesComImagens = {};
    for (const secao in data.secoes) {
      secoesComImagens[secao] = data.secoes[secao].map((item) => {
        const newItem = { ...item };

        let imageBase64 = null;

        if (item.imagem) {
          imageBase64 = toBase64(item.imagem);
        } else {
          const imagePath = `./assets/images/${item.nome}.jpeg`;
          imageBase64 = toBase64(imagePath);
        }

        if (imageBase64) {
          newItem.imagemUrl = imageBase64;
        }

        return newItem;
      });
    }

    const cardapio = await ejs.renderFile(
      path.join(__dirname, "templates", "cardapio.ejs"),
      {
        ...data,
        cssStyles,
        logo,
        contatos: contatosComIcones,
        secoes: secoesComImagens,
        patternBase64,
      }
    );

    const cardapioSemPreco = await ejs.renderFile(
      path.join(__dirname, "templates", "cardapio-sem-preco.ejs"),
      {
        ...data,
        cssStyles,
        logo,
        contatos: contatosComIcones,
        secoes: secoesComImagens,
        patternBase64,
      }
    );

    const date = new Date();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    const formattedDate = `${month}-${year}`;

    browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(cardapio);
    await page.pdf({
      path: path.join(__dirname, "saida", `cardapio-${formattedDate}.pdf`),
      format: "A5",
      printBackground: true,
      margin: {
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    });

    await page.setContent(cardapioSemPreco);
    await page.pdf({
      path: path.join(
        __dirname,
        "saida",
        `cardapio-sem-preco-${formattedDate}.pdf`
      ),
      format: "A5",
      printBackground: true,
      margin: {
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    });

    await browser.close();
    console.log("✅ Cardápio gerado com sucesso em: ./saida/");
  } catch (error) {
    console.error("❌ Erro ao gerar o PDF:", error);
    if (browser) browser.close();
    process.exit(1);
  }
}

gerarCardapioPDF();
