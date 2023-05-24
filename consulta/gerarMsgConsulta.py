import pyodbc
import os
from datetime import date, timedelta, datetime

def apagar_linhas_arquivo(nome_arquivo, num_linhas):
    with open(nome_arquivo, 'r') as arquivo:
        linhas = arquivo.readlines()

    with open(nome_arquivo, 'w') as arquivo:
        arquivo.writelines(linhas[num_linhas:])

def consulta():
    # Define a conexão com o banco de dados
    cnxn = pyodbc.connect('')
    
    # Define uma consulta SQL
    query = ""
    # Executa a consulta e retorna os resultados em uma lista de dicionários
    cursor = cnxn.cursor()
    print('Executando query')
    cursor.execute(query)
    print('Passei')
    results = [dict(zip([column[0] for column in cursor.description], row)) for row in cursor.fetchall()]
    print('Passei de results')
    # Exibe os resultados
    vetor = []
    for resultado in results:
        vetor.append(resultado)
    #print(vetor)

    with open('resultado.txt', 'w') as arquivoMain:
        for dicionario in vetor:
            telefone = dicionario['telefone']
            nome = dicionario['Nome']
            valor_da_divida = dicionario['Valor da Divida']
            valor_do_boleto = dicionario['Valor do Boleto']
            linha_digitada = dicionario['Linha digitada']
            cpf = dicionario['CPF']
            contrato = dicionario['Contrato']
            data_vencimento = dicionario['Data de Vencimento']
            produto = dicionario['Produto']
            
        
            arquivoMain.write(str(telefone) + ',')
            arquivoMain.write(str(nome) + ',')
            arquivoMain.write(str(valor_da_divida) + ',')
            arquivoMain.write(str(valor_do_boleto) + ',')
            arquivoMain.write(str(linha_digitada) + ',')
            arquivoMain.write(str(cpf) + ',')
            arquivoMain.write(str(contrato) + ',')
            arquivoMain.write(str(data_vencimento) + ',')
            arquivoMain.write(str(produto))
            
            arquivoMain.write('\n')

    hora = datetime.now().strftime("%d/%m/%Y, %H:%M:%S")
    with open('resultadoBackup.txt', 'w') as arquivoMain:
        arquivoMain.write(str(hora) + '\n')
        for dicionario in vetor:
            telefone = dicionario['telefone']
            nome = dicionario['Nome']
            valor_do_boleto = dicionario['Valor do Boleto']
            linha_digitada = dicionario['Linha digitada']
            
            arquivoMain.write(str(telefone) + ',')
            arquivoMain.write(str(nome) + ',')
            arquivoMain.write(str(valor_do_boleto) + ',')
            arquivoMain.write(str(linha_digitada))
            arquivoMain.write('\n')

def preenchimento():
    contador = 0
    with open('resultado.txt', 'r') as arquivoMain:
        with open('txt1.txt', 'w') as arquivo:
            with open('txt2.txt', 'w') as arquivo2:
                with open('txt3.txt', 'w') as arquivo3:
                    for linha in arquivoMain:
                        contador+=1
                        if contador <= 250:
                            arquivo.write(str(linha))
                        # elif contador <= 500:
                        #     arquivo2.write(str(linha))
                        # elif contador <= 750:
                        #     arquivo3.write(str(linha))

    nome_arquivo = 'resultado.txt'
    num_linhas_apagar = 1
    apagar_linhas_arquivo(nome_arquivo, num_linhas_apagar)


with open('resultado.txt', 'r') as file:
    # Ler todas as linhas do arquivo
    linhas = file.readlines()

if len(linhas) == 0:
    print("O arquivo está vazio!")
    consulta()
else:
    # Obter a quantidade de linhas
    quantidade_linhas = len(linhas)
    print("O arquivo possui", quantidade_linhas, "linhas.")
    preenchimento()



print('FIM')



