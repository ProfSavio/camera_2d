// ==========================================================
// CONFIGURAÇÕES DO MUNDO
// ==========================================================
const TAMANHO_BLOCO = 32;
const LARGURA_MUNDO = 100;
const ALTURA_MUNDO = 100;

// ==========================================================
// TIPOS DE BLOCO
// ==========================================================
//
// 0 = grama
// 1 = parede
// 2 = água
// 3 = areia
// 4 = pedra
//

const TIPOS_BLOCO = {
    // Grama
    0: {
        color: "#4CAF50",
        solid: false
    },

    // Parede
    1: {
        color: "#795548",
        solid: true
    },

    // Água
    2: {
        color: "#2196F3",
        solid: true
    },

    // Areia
    3: {
        color: "#E6C85C",
        solid: false
    },

    // Pedra
    4: {
        color: "#777777",
        solid: true
    }
};

// ==========================================================
// GERAÇÃO DO MAPA
// ==========================================================
// Matriz que armazenará o mapa do mundo
const MAPA = [];

function criarMundo() {
    // Percorre todas as linhas do mundo
    for (let y = 0; y < ALTURA_MUNDO; y++) {
        // Cria uma nova linha
        const linha = [];

        // Percorre todas as colunas da linha
        for (let x = 0; x < LARGURA_MUNDO; x++) {
            // Por padrão, o bloco será grama
            let bloco = 0;

            /*
                Cria uma borda sólida
                ao redor do mapa.
            */
            if (
                x === 0 ||
                y === 0 ||
                x === LARGURA_MUNDO - 1 ||
                y === ALTURA_MUNDO - 1
            ) {
                bloco = 1;
            }

            /*
                Cria alguns obstáculos aleatórios
                apenas para teste.
            */
            else {
                const aleatorio = Math.random();

                // Aproximadamente 8% de chance
                // de criar uma parede
                if (aleatorio < 0.08) {
                    bloco = 1;
                }

                // Aproximadamente 4% de chance
                // de criar água
                else if (aleatorio < 0.12) {
                    bloco = 2;
                }

                // Aproximadamente 4% de chance
                // de criar areia
                else if (aleatorio < 0.16) {
                    bloco = 3;
                }
            }

            // Adiciona o bloco à linha
            linha.push(bloco);
        }

        // Adiciona a linha ao mapa
        MAPA.push(linha);
    }

    /*
        Área inicial segura
        para o jogador nascer.
    */
    MAPA[2][2] = 0;
    MAPA[2][3] = 0;
    MAPA[3][2] = 0;
    MAPA[3][3] = 0;
}

// ==========================================================
// ACESSO AO BLOCO
// ==========================================================
function obterBloco(x, y) {
    /*
        Se a posição estiver fora
        dos limites do mundo,
        retorna uma parede.
    */
    if (
        x < 0 ||
        y < 0 ||
        x >= LARGURA_MUNDO ||
        y >= ALTURA_MUNDO
    ) {
        return 1;
    }

    // Retorna o bloco localizado
    // na posição informada.
    return MAPA[y][x];
}

// ==========================================================
// COLISÃO DO BLOCO
// ==========================================================
function eSolido(x, y) {
    // Descobre qual bloco existe nessa posição
    const bloco = obterBloco(x, y);

    // Retorna se o bloco é sólido
    return TIPOS_BLOCO[bloco].solid;
}

// ==========================================================
// INICIALIZA O MUNDO
// ==========================================================
// Cria o mapa assim que este módulo é carregado
criarMundo();
