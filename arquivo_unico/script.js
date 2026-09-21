// ==========================================================
// CONFIGURAÇÕES
// ==========================================================

// Tamanho de cada bloco do mapa, em pixels
const TAMANHO_BLOCO = 32;

// Quantidade de blocos na largura e na altura do mundo
const LARGURA_MUNDO = 100;
const ALTURA_MUNDO = 100;

// Encontra o elemento <canvas> no HTML
const TELA = document.getElementById("game");

// Define o tamanho da tela do jogo
TELA.width = 640;
TELA.height = 360;

// Define o tipo de renderização do canvas.
// Neste caso, estamos usando uma renderização em 2D.
const CONTEXTO = TELA.getContext("2d");

// Desativa o suavizado das imagens.
// Isso ajuda a manter um visual de pixel art.
CONTEXTO.imageSmoothingEnabled = false;


// ==========================================================
// ENTRADAS DO JOGADOR
// ==========================================================

// Guarda o estado de cada tecla de movimento.
//
// false = tecla não está pressionada
// true  = tecla está pressionada
const ENTRADA = {
    cima: false,
    baixo: false,
    esquerda: false,
    direita: false
};


// Detecta quando uma tecla é pressionada
window.addEventListener("keydown", evento => {

    // Converte a tecla para letras minúsculas
    switch (evento.key.toLowerCase()) {
        // W ou seta para cima
        case "w":
        case "arrowup":
            ENTRADA.cima = true;
            break;
        // S ou seta para baixo
        case "s":
        case "arrowdown":
            ENTRADA.baixo = true;
            break;
        // A ou seta para esquerda
        case "a":
        case "arrowleft":
            ENTRADA.esquerda = true;
            break;
        // D ou seta para direita
        case "d":
        case "arrowright":
            ENTRADA.direita = true;
            break;
    }
});


// Detecta quando uma tecla é solta
window.addEventListener("keyup", evento => {
    switch (evento.key.toLowerCase()) {
        // W ou seta para cima
        case "w":
        case "arrowup":
            ENTRADA.cima = false;
            break;
        // S ou seta para baixo
        case "s":
        case "arrowdown":
            ENTRADA.baixo = false;
            break;
        // A ou seta para esquerda
        case "a":
        case "arrowleft":
            ENTRADA.esquerda = false;
            break;
        // D ou seta para direita
        case "d":
        case "arrowright":
            ENTRADA.direita = false;
            break;
    }
});


// ==========================================================
// MUNDO
// ==========================================================

// Define os tipos de blocos existentes no mundo.
//
// Cada bloco possui:
// - uma cor
// - uma informação dizendo se o jogador pode atravessá-lo
const TIPOS_BLOCO = {
    // 0 = grama
    0: {
        color: "#4CAF50",
        solid: false
    },
    // 1 = parede/obstáculo
    1: {
        color: "#795548",
        solid: true
    },
    // 2 = água
    2: {
        color: "#2196F3",
        solid: true
    },
    // 3 = areia
    3: {
        color: "#E6C85C",
        solid: false
    }
};

// Matriz que armazenará o mapa do mundo
const MAPA = [];

// Cria o mundo do jogo
function criarMundo() {
    // Percorre todas as linhas do mundo
    for (let y = 0; y < ALTURA_MUNDO; y++) {
        // Cria uma nova linha
        const linha = [];
        // Percorre todas as colunas da linha
        for (let x = 0; x < LARGURA_MUNDO; x++) {
            // Por padrão, o bloco será grama
            let bloco = 0;
            // Cria uma parede nas bordas do mapa
            if (
                x === 0 ||
                y === 0 ||
                x === LARGURA_MUNDO - 1 ||
                y === ALTURA_MUNDO - 1
            ) {
                bloco = 1;
            } else {
                // Gera um número aleatório entre 0 e 1
                const aleatorio = Math.random();
                // Aproximadamente 8% de chance de criar uma parede
                if (aleatorio < 0.08) {
                    bloco = 1;
                }
                // Aproximadamente 4% de chance de criar água
                else if (aleatorio < 0.12) {
                    bloco = 2;
                }
                // Aproximadamente 4% de chance de criar areia
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

    // Garante que a área inicial do jogador esteja livre
    MAPA[2][2] = 0;
    MAPA[2][3] = 0;
    MAPA[3][2] = 0;
    MAPA[3][3] = 0;
}

// Retorna o tipo de bloco localizado em determinada posição
function obterBloco(x, y) {
    // Se a posição estiver fora do mapa,
    // consideramos que existe uma parede.
    if (
        x < 0 ||
        y < 0 ||
        x >= LARGURA_MUNDO ||
        y >= ALTURA_MUNDO
    ) {
        return 1;
    }
    // Retorna o bloco daquela posição
    return MAPA[y][x];
}

// Verifica se determinado bloco é sólido
//
// true  = não pode atravessar
// false = pode atravessar
function eSolido(x, y) {
    return TIPOS_BLOCO[obterBloco(x, y)].solid;
}


// ==========================================================
// JOGADOR
// ==========================================================

// Todas as informações do jogador
const JOGADOR = {
    // Posição inicial
    x: TAMANHO_BLOCO * 2,
    y: TAMANHO_BLOCO * 2,

    // Tamanho do jogador
    width: 24,
    height: 24,

    // Velocidade do jogador
    speed: 180,

    // Cor do jogador
    color: "#ff3333"
};


// Atualiza a posição do jogador
function atualizarJogador(tempoDecorrido) {
    // Direção do movimento
    let movimentoX = 0;
    let movimentoY = 0;

    // Verifica quais teclas estão pressionadas
    if (ENTRADA.cima) movimentoY--;
    if (ENTRADA.baixo) movimentoY++;
    if (ENTRADA.esquerda) movimentoX--;
    if (ENTRADA.direita) movimentoX++;

    // Se o jogador estiver andando na diagonal,
    // precisamos normalizar o movimento.
    // Isso evita que o jogador fique mais rápido
    // quando estiver andando em duas direções ao mesmo tempo.
    if (movimentoX !== 0 && movimentoY !== 0) {
        const comprimento = Math.sqrt(
            movimentoX * movimentoX +
            movimentoY * movimentoY
        );
        movimentoX /= comprimento;
        movimentoY /= comprimento;
    }

    // Move o jogador levando em consideração:
    // direção × velocidade × tempo
    moverJogador(
        movimentoX * JOGADOR.speed * tempoDecorrido,
        movimentoY * JOGADOR.speed * tempoDecorrido
    );
}

// Tenta mover o jogador
function moverJogador(dx, dy) {
    // Primeiro tenta mover horizontalmente
    if (!verificarColisao(
        JOGADOR.x + dx,
        JOGADOR.y
    )) {
        JOGADOR.x += dx;
    }

    // Depois tenta mover verticalmente
    if (!verificarColisao(
        JOGADOR.x,
        JOGADOR.y + dy
    )) {
        JOGADOR.y += dy;
    }
}

// Verifica se o jogador colidiria com algum obstáculo
function verificarColisao(x, y) {
    // Descobre em qual bloco está o lado esquerdo
    const esquerda = Math.floor(
        x / TAMANHO_BLOCO
    );

    // Descobre em qual bloco está o lado direito
    const direita = Math.floor(
        (x + JOGADOR.width - 1) / TAMANHO_BLOCO
    );

    // Descobre em qual bloco está o topo
    const topo = Math.floor(
        y / TAMANHO_BLOCO
    );

    // Descobre em qual bloco está a parte inferior
    const baixo = Math.floor(
        (y + JOGADOR.height - 1) / TAMANHO_BLOCO
    );

    // Se qualquer um dos quatro cantos
    // estiver em um bloco sólido,
    // existe uma colisão.
    return (
        eSolido(esquerda, topo) ||
        eSolido(direita, topo) ||
        eSolido(esquerda, baixo) ||
        eSolido(direita, baixo)
    );
}

// ==========================================================
// CÂMERA
// ==========================================================

// Informações da câmera
const CAMERA = {
    x: 0,
    y: 0,
    width: TELA.width,
    height: TELA.height
};

// Atualiza a posição da câmera
function atualizarCamera() {
    // Coloca o jogador no centro horizontal da tela
    CAMERA.x =
        JOGADOR.x +
        JOGADOR.width / 2 -
        CAMERA.width / 2;

    // Coloca o jogador no centro vertical da tela
    CAMERA.y =
        JOGADOR.y +
        JOGADOR.height / 2 -
        CAMERA.height / 2;

    // Calcula o tamanho total do mundo em pixels
    const larguraMundo =
        LARGURA_MUNDO * TAMANHO_BLOCO;

    const alturaMundo =
        ALTURA_MUNDO * TAMANHO_BLOCO;

    // Impede a câmera de mostrar uma área
    // que esteja fora dos limites do mapa.
    CAMERA.x = Math.max(
        0,
        Math.min(
            CAMERA.x,
            larguraMundo - CAMERA.width
        )
    );

    CAMERA.y = Math.max(
        0,
        Math.min(
            CAMERA.y,
            alturaMundo - CAMERA.height
        )
    );

}

// ==========================================================
// RENDERIZAÇÃO
// ==========================================================

// Desenha todos os elementos do jogo
function renderizar() {
    // Limpa a tela antes de desenhar o próximo quadro
    CONTEXTO.clearRect(
        0,
        0,
        TELA.width,
        TELA.height
    );

    // Desenha o mundo
    desenharMundo();

    // Desenha o jogador
    desenharJogador();
}

// Desenha os blocos do mundo
function desenharMundo() {
    // Descobre o primeiro bloco visível na horizontal
    const inicioX = Math.floor(
        CAMERA.x / TAMANHO_BLOCO
    );

    // Descobre o primeiro bloco visível na vertical
    const inicioY = Math.floor(
        CAMERA.y / TAMANHO_BLOCO
    );

    // Descobre o último bloco visível na horizontal
    const fimX = Math.ceil(
        (CAMERA.x + CAMERA.width) /
        TAMANHO_BLOCO
    );

    // Descobre o último bloco visível na vertical
    const fimY = Math.ceil(
        (CAMERA.y + CAMERA.height) /
        TAMANHO_BLOCO
    );

    // Percorre somente os blocos que estão visíveis na tela
    for (let y = inicioY; y < fimY; y++) {

        for (let x = inicioX; x < fimX; x++) {
            // Descobre qual tipo de bloco está nessa posição
            const bloco = obterBloco(x, y);

            // Define a cor do bloco
            CONTEXTO.fillStyle =
                TIPOS_BLOCO[bloco].color;

            // --------------------------------------------------
            // POSIÇÃO NO MUNDO
            // --------------------------------------------------
            const mundoX = x * TAMANHO_BLOCO;
            const mundoY = y * TAMANHO_BLOCO;

            // --------------------------------------------------
            // TRANSFORMAÇÃO MUNDO → TELA
            // --------------------------------------------------

            // A câmera determina qual parte do mundo
            // está sendo mostrada na tela.
            const telaX = mundoX - CAMERA.x;
            const telaY = mundoY - CAMERA.y;

            // Desenha o bloco
            CONTEXTO.fillRect(
                telaX,
                telaY,
                TAMANHO_BLOCO,
                TAMANHO_BLOCO
            );

        }

    }

}


// Desenha o jogador
function desenharJogador() {
    // Define a cor do jogador
    CONTEXTO.fillStyle = JOGADOR.color;

    // --------------------------------------------------
    // POSIÇÃO DO JOGADOR NA TELA
    // --------------------------------------------------

    // A posição do jogador está relacionada ao mundo.
    // Precisamos subtrair a posição da câmera
    // para descobrir onde desenhá-lo na tela.
    const telaX = JOGADOR.x - CAMERA.x;
    const telaY = JOGADOR.y - CAMERA.y;

    // Desenha o jogador
    CONTEXTO.fillRect(
        telaX,
        telaY,
        JOGADOR.width,
        JOGADOR.height
    );

}


// ==========================================================
// LOOP PRINCIPAL DO JOGO
// ==========================================================

// Cria o mundo
criarMundo();

// Guarda o tempo do quadro anterior
let ultimoTempo = 0;

// Função executada continuamente pelo navegador
function loopDoJogo(tempo) {
    // Calcula quanto tempo passou desde o último quadro.
    // Dividimos por 1000 porque o navegador
    // fornece o tempo em milissegundos.
    const tempoDecorrido =
        Math.min(
            (tempo - ultimoTempo) / 1000,
            0.05
        );

    // Guarda o tempo atual para o próximo quadro
    ultimoTempo = tempo;

    // Atualiza o jogador
    atualizarJogador(tempoDecorrido);

    // Atualiza a câmera
    atualizarCamera();

    // Desenha o jogo
    renderizar();

    // Solicita ao navegador que execute
    // o próximo quadro do jogo
    requestAnimationFrame(loopDoJogo);
}

// Inicia o loop principal do jogo
requestAnimationFrame(loopDoJogo);