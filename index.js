import { create } from 'venom-bot';
import fs from 'fs';

function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

let minhaVariavel; // Definindo a variável fora da função

fs.readFile('Q:/TI/Vilesley/bot-whatsapp/data.txt', 'utf8', function(err, data) {
  if (err) {
    console.error('Erro ao ler o arquivo:', err);
    return;
  }

  minhaVariavel = data; // Atribuindo o valor à variável
  console.log(minhaVariavel);
});

async function startSession1(client) {

    //-------------------------------NUMEROS DE TELEFONE-------------------------------
    const contatosTxt = fs.readFileSync('./consulta/txt2.txt', 'utf8'); //lendo txt
    let linhasNum = contatosTxt.split('\n'); //separando por espaco
    let numerosEsquerdaBarra = []; //iniciando vetor de numeros na esquerda da / no txt

    for (let i = 0; i < linhasNum.length; i++) {
        // preenchendo vetor de numeros EX: ['5531989293584', '5531983375591']
        let linha = linhasNum[i];
        let numeros = linha.split(',')[0];
        numerosEsquerdaBarra.push(numeros);
    }
    const listaContatos = numerosEsquerdaBarra.map(num => `${num}@c.us`); //concatenando @c.us no fim de cada numero
    //--------------------------------LINHA DIGITAVEL-------------------------------------

    let linhasPdf = contatosTxt.split('\n'); //separando por espaco
    let vetorLinhadigitavel = []; //iniciando vetor de numeros na direita da / no txt

    for (let i = 0; i < linhasPdf.length; i++) {
        // preenchendo vetor de numeros EX: ['23793.39407 60001.479652 16000.196408 3 93560000058256', '23793.39407 60001.479652 16000.196408 3 93560000058257']
        let linha = linhasPdf[i];
        let numeros = linha.split(',')[4];
        vetorLinhadigitavel.push(numeros);
    }
    //-----------------------NOME CLIENTE--------------------------------------

    let linhasNome = contatosTxt.split('\n');
    let vetorNomes = [];

    for (let i = 0; i < linhasNome.length; i++) {
        let linha = linhasNome[i];
        let numeros = linha.split(',')[1];
        vetorNomes.push(numeros);
    }
    //----------------------VALOR BOLETO------------------------------------
    let linhasValor = contatosTxt.split('\n');
    let vetorValores = [];

    for (let i = 0; i < linhasValor.length; i++) {
        let linha = linhasValor[i];
        let numeros = linha.split(',')[3];
        vetorValores.push(numeros);
    }

    //-----------------------VALOR TOTAL---------------------------------------
    let linhasValorTotal = contatosTxt.split('\n');
    let vetorValoresTotal = [];

    for (let i = 0; i < linhasValorTotal.length; i++) {
        let linha = linhasValorTotal[i];
        let numeros = linha.split(',')[2];
        vetorValoresTotal.push(numeros);
    }

    //-----------------------------CPF---------------------------------------
    let linhasCpf = contatosTxt.split('\n');
    let vetorCpf = [];

    for (let i = 0; i < linhasCpf.length; i++) {
        let linha = linhasCpf[i];
        let numeros = linha.split(',')[5];
        vetorCpf.push(numeros);
    }

    //----------------------------CONTRATO-----------------------------------------
    let linhasContrato = contatosTxt.split('\n');
    let vetorContrato = [];

    for (let i = 0; i < linhasContrato.length; i++) {
        let linha = linhasContrato[i];
        let numeros = linha.split(',')[6];
        vetorContrato.push(numeros);
    }

    //----------------------------PRODUTO-----------------------------------------
    let linhasProduto = contatosTxt.split('\n');
    let vetorProduto = [];

    for (let i = 0; i < linhasProduto.length; i++) {
        let linha = linhasProduto[i];
        let numeros = linha.split(',')[8];
        vetorProduto.push(numeros);
    }

    //------------------------------------/FIM/--------------------------------

    let indice = 0; //inicializando contador que percorre a lista

    for (const contato of listaContatos) {
        const dado = vetorLinhadigitavel[indice]; //pegando da lista da direita na posicao n que vai ser incrementada no final
        const nome = vetorNomes[indice];
        const valor = vetorValores[indice];
        const valorTotal = vetorValoresTotal[indice];
        //const dataVenc = vetorCpf[indice];////////////
        const cpf = vetorCpf[indice];
        const contrato = vetorContrato[indice];
        const produto = vetorProduto[indice];
        const mensagem = `*${nome} - CPF* ${cpf}\nSegue abaixo os dados do seu boleto:\n*Produto/Linha:* ${produto}\n*Contrato:* ${contrato}\n*Valor original:* R$ ${valorTotal}\n*Valor à vista:* R$ ${valor}\n*Data de vencimento:* ${minhaVariavel}\n\nSegue abaixo a linha digitável do boleto:`;
        const mensagem2 = `${dado}`;
        try {
            //await wait(Math.random() * 60000 + 60000); // Timer aleatório de 10 a 30 segundos (Math.random() * 20000 + 10000), (Math.random() * 30000 + 30000) 30 a 60 / (Math.random() * 5000)
            const result = await client.sendText(contato, mensagem);
            console.log('Result: ', result);
            const result2 = await client.sendText(contato, mensagem2);
            console.log('Result 2: ', result2); //return object success 
            //const resultString = JSON.stringify(result) + '\n';
            const currentDate = new Date().toLocaleString();
            const resultString = `${currentDate}: ${JSON.stringify(result)}\n`;
            fs.appendFile('./txts/contador.txt', resultString, (err) => {
                if (err) {
                  console.error('Erro ao gravar o arquivo:', err);
                } else {
                  console.log('Arquivo gravado com sucesso!');
                }
            });

        } catch (error) {
            console.error('Error when sending: ', error);
        }
        //removeLineFromFile('./consulta/txt2.txt',{indice})
        console.log('Mensagens Enviadas: ', indice)
        indice++; //incrementando a posicao n da lista
        
        // const conteudo = indice.toString();
        // fs.writeFile('./txts/contador.txt', conteudo, 'utf8', (error) => {
        //     if (error) {
        //       console.error('Ocorreu um erro ao gravar o arquivo:', error);
        //       return;
        //     }
        //     console.log('Arquivo gravado com sucesso!');
        //   });

    }
}

function startProcess() {
  create({
      session: 'session1' ,
      multidevice: true,
      headless: false,
  })
    .then(async (client1) => {
    await startSession1(client1);
    await client1.close();
    process.exit(0);
  })
    .catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

startProcess()
