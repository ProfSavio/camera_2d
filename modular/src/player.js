// ==========================================================
// JOGADOR
// ==========================================================
const JOGADOR = {
    x: TAMANHO_BLOCO * 2,
    y: TAMANHO_BLOCO * 2,
    width: 24,
    height: 24,
    speed: 180,
    color: "#ff3333"
};

// ==========================================================
// ATUALIZAÇÃO DO JOGADOR
// ==========================================================
function atualizarJogador(tempoDecorrido) {
    let movimentoX = 0;
    let movimentoY = 0;

    /*
        Leitura dos comandos
    */
    if (ENTRADA.cima) {
        movimentoY -= 1;
    }
    if (ENTRADA.baixo) {
        movimentoY += 1;
    }
    if (ENTRADA.esquerda) {
        movimentoX -= 1;
    }
    if (ENTRADA.direita) {
        movimentoX += 1;
    }

    /*
        Normalização do movimento diagonal
        Sem isso, o jogador se moveria
        mais rápido quando estivesse
        andando na diagonal.
    */
    if (movimentoX !== 0 && movimentoY !== 0) {
        const comprimento =
            Math.sqrt(
                movimentoX * movimentoX +
                movimentoY * movimentoY
            );
        movimentoX /= comprimento;
        movimentoY /= comprimento;
    }

    /*
        Calcula a velocidade horizontal
    */
    const velocidadeX =
        movimentoX *
        JOGADOR.speed *
        tempoDecorrido;

    /*
        Calcula a velocidade vertical
    */
    const velocidadeY =
        movimentoY *
        JOGADOR.speed *
        tempoDecorrido;

    /*
        Tenta mover o jogador
    */
    moverJogador(
        velocidadeX,
        velocidadeY
    );
}

// ==========================================================
// MOVIMENTO COM COLISÃO
// ==========================================================
function moverJogador(dx, dy) {
    /*
        Movimento horizontal
        Primeiro verificamos se o jogador
        pode se mover para a nova posição.
    */
    if (!verificarColisao(
        JOGADOR.x + dx,
        JOGADOR.y
    )) {
        JOGADOR.x += dx;
    }

    /*
        Movimento vertical
        Depois verificamos se o jogador
        pode se mover verticalmente.
    */

    if (!verificarColisao(
        JOGADOR.x,
        JOGADOR.y + dy
    )) {
        JOGADOR.y += dy;
    }
}

// ==========================================================
// COLISÃO
// ==========================================================
function verificarColisao(x, y) {
    /*
        Descobre em qual bloco
        está o lado esquerdo
        do jogador.
    */
    const esquerda =
        Math.floor(
            x / TAMANHO_BLOCO
        );

    /*
        Descobre em qual bloco
        está o lado direito
        do jogador.
    */
    const direita =
        Math.floor(
            (x + JOGADOR.width) /
            TAMANHO_BLOCO
        );

    /*
        Descobre em qual bloco
        está o topo do jogador.
    */
    const topo =
        Math.floor(
            y / TAMANHO_BLOCO
        );

    /*
        Descobre em qual bloco
        está a parte inferior
        do jogador.
    */
    const baixo =
        Math.floor(
            (y + JOGADOR.height) /
            TAMANHO_BLOCO
        );

    /*
        Verifica os quatro cantos
        do personagem.
        Se qualquer um dos cantos
        estiver em um bloco sólido,
        existe uma colisão.
    */
    return (
        eSolido(esquerda, topo) ||
        eSolido(direita, topo) ||
        eSolido(esquerda, baixo) ||
        eSolido(direita, baixo)
    );
};
