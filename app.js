// Configuração da interface de entrada para interação com o usuário (leitura de dados)
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const rl = readline.createInterface({
    input,
    output
});
// Função request, response.
function toAsk(question) {
    return new Promise((response) => {
        rl.question(question, response);
    });
}

// Função para realizar o cálculo de salário do Exercício 1
async function calculateSalary() {
    console.log("\nVocê escolheu o Exercício 1 - Calcular Salário");
    console.log("======================================================");

    const hourSalary = Number(
        await toAsk("\nInforme o valor do salário hora usando ponto(.) para os centavos: ")
    );

    // Validação de entrada de dados
    if (isNaN(hourSalary) || hourSalary <= 0) {
        console.log("\nDigite um número válido!");
        return;
    }

    const hoursWorked = Number(
        await toAsk("\nInforme as horas trabalhadas no mês: ")
    );

    if (isNaN(hoursWorked) || hoursWorked < 0) {
        console.log("\nDigite um número válido!");
        return;
    }

    const children = Number(
        await toAsk("\nDigite a quantidade de filhos menores de 14 anos:")
    );

    if (isNaN(children)) {
        console.log("\nDigite um número válido!");
        return;
    }

    const grossSalary = hourSalary * hoursWorked;
    let familySalary;

    if (grossSalary <= 788) {
        familySalary = 30.50 * children;
    } else if (grossSalary > 788 && grossSalary <= 1100) {
        familySalary = 18.50 * children;
    } else {
        familySalary = 11.90 * children;
    }

    const netSalary = grossSalary + familySalary;

    console.log("\n\n=== Resultado da pesquisa: ===")
    console.log(`\nSalário Bruto: R$ ${grossSalary.toFixed(2)}`);
    console.log(`\nSalário Família: R$ ${familySalary.toFixed(2)}`);
    console.log(`\nSalário Líquido: R$ ${netSalary.toFixed(2)}`);
}

async function numericalSequence() {
    console.log("\nVocê escolheu o Exercício 2 - Sequência Numérica");
    console.log("\n=========================================================");

    const x = Number(
        await toAsk("\nInforme a quantidade de números que será digitada: ")
    );

    if (isNaN(x) || x <= 0) {
        console.log("\nDigite uma quantidade válida!")
    }

    const sequence = [];

    // number = Número digitado pelo usuário
    for (let counter = 1; counter <= x; counter++) {
        const number = Number(
            await toAsk(`\nInforme o ${counter}º número da sequência:`)
        );

        if (isNaN(number)) {
            console.log("\nDigite apenas números!");
            return;
        };

        sequence.push(number);
    }

    console.log("\n\nSequência numérica finalizada!");

    // Declaração de maior e menor número dentro do array
    let biggest = sequence[0];
    let smallest = sequence[0];

    for (let n = 1; n < sequence.length; n++) {
        if (sequence[n] > biggest) {
            biggest = sequence[n];
        }

        if (sequence[n] < smallest) {
            smallest = sequence[n];
        }
    }

    console.log("\n\n=== Resultado: ===")
    console.log(`\nSequência digitada: ${sequence}`);
    console.log(`\nMaior número da sequência: ${biggest}.`);
    console.log(`\nMenor número da sequência: ${smallest}.\n\n`);
}

async function fibonacci() {
    console.log("\n\nVocê escolheu o Exercício 3 - Fibonacci");
    console.log("=====================================================");

    //y = valor informado pelo user
    const y = Number(
        await toAsk("\n\nNeste sistema, a sequência será gerada com a quantidade de termos informada. Em seguida, será verificado se o número digitado faz parte da sequência de Fibonacci. Por favor, insira quantos termos deseja gerar: ")
    );

    if (isNaN(y) || y <= 0) {
        console.log("\nDigite uma quantidade válida!");
        return;
    }

    let sequenceFibo = [1, 1];

    //Validação para o array imprimir apenas 1 número da sequência se o número digitado for 1.
    if (y === 1) {
        sequenceFibo = [1];
    } else {
        sequenceFibo = [1, 1];
    }

    for (let cont = 2; cont < y; cont++) {
        const last = sequenceFibo[sequenceFibo.length - 1];
        const penultimate = sequenceFibo[sequenceFibo.length - 2];
        const next = last + penultimate;

        sequenceFibo.push(next);
    }

    console.log("\n\n=== Resultado: ===")
    console.log(`Sequência de Fibonacci de acordo com a quantidade de termos escolhida: ${sequenceFibo}...`);

    // Vrificação se o número digitado pelo usuário está dentro da sequência de Fibonacci
    if (sequenceFibo.includes(y)) {
        console.log(`\n\nO número ${y} está inserido na sequência.\n\n`)
    } else {
        console.log(`\n\nO número ${y} não está inserido na sequência.\n\n`)
    }
}

// Criação de função com menu para interação com usuário.
async function menu() {
    let running = true;
    while (running) {
        const option = await toAsk(`
            =============================
            AVALIAÇÃO TÉCNICA - ACEDATA
            =============================
           
            1 - Calcular Salário
            2 - Sequência Numérica
            3 - Fibonacci
            0 - Sair
           
            Escolha uma opção: `);

        // Estrutura Condicional para as opções do menu.
        switch (option) {
            case '1':
                await calculateSalary();
                break;

            case '2':
                await numericalSequence();
                break;

            case '3':
                await fibonacci();
                break;

            case '0':
                running = false;
                console.log("\n\nPROGRAMA ENCERRADO!\n\n");
                break;

            default:
                console.log("Opção Inválida!");
        }
    }
    rl.close();
}

menu();
