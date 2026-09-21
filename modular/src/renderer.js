// ==========================================================
// RENDERIZADOR
// ==========================================================
let CONTEXTO = null;

// ==========================================================
// INICIALIZAÇÃO
// ==========================================================
function configurarRenderizacao(tela) {
    CONTEXTO = tela.getContext("2d");
    // Desativa o suavizado das imagens
    // para manter o estilo de pixel art.
    CONTEXTO.imageSmoothingEnabled = false;
}

// ==========================================================
// RENDERIZAÇÃO COMPLETA
// ==========================================================
function renderizar() {
    /*
        Limpa toda a tela antes
        de desenhar o próximo quadro.
    */
    CONTEXTO.clearRect(
        0,
        0,
        CONTEXTO.canvas.width,
        CONTEXTO.canvas.height
    );

    // Desenha o mapa
    desenharMundo();
    // Desenha o jogador
    desenharJogador();
}

// ==========================================================
// DESENHA O MAPA
// ==========================================================
function desenharMundo() {
    /*
        Calcula quais blocos aparecem
        dentro da área da câmera.
    */

    // Primeiro bloco visível no eixo X
    const inicioX =
        Math.floor(
            CAMERA.x / TAMANHO_BLOCO
        );

    // Primeiro bloco visível no eixo Y
    const inicioY =
        Math.floor(
            CAMERA.y / TAMANHO_BLOCO
        );

    // Último bloco visível no eixo X
    const fimX =
        Math.ceil(
            (CAMERA.x + CAMERA.largura) /
            TAMANHO_BLOCO
        );

    // Último bloco visível no eixo Y
    const fimY =
        Math.ceil(
            (CAMERA.y + CAMERA.altura) /
            TAMANHO_BLOCO
        );

    /*
        Renderiza somente os blocos
        que estão dentro da área visível
        da câmera.
    */
    for (let y = inicioY; y < fimY; y++) {
        for (let x = inicioX; x < fimX; x++) {
            /*
                Obtém o tipo de bloco
                existente nessa posição.
            */
            const bloco =
                obterBloco(x, y);

            // Define a cor do bloco.
            CONTEXTO.fillStyle = TIPOS_BLOCO[bloco].color;

            /*
                Desenha o bloco.
                A posição no mundo é convertida
                para a posição na tela subtraindo
                a posição atual da câmera.
            */

            CONTEXTO.fillRect(
                x * TAMANHO_BLOCO - CAMERA.x,
                y * TAMANHO_BLOCO - CAMERA.y,
                TAMANHO_BLOCO,
                TAMANHO_BLOCO
            );
        }
    }
}


// ==========================================================
// DESENHA O JOGADOR
// ==========================================================
function desenharJogador() {
    /*
        Define a cor do jogador.
    */
    CONTEXTO.fillStyle = JOGADOR.color;

    /*
        Desenha o jogador.
        A posição do jogador está relacionada
        ao mundo. Por isso, subtraímos a posição
        da câmera para descobrir onde ele deve
        aparecer na tela.
    */
    CONTEXTO.fillRect(
        JOGADOR.x - CAMERA.x,
        JOGADOR.y - CAMERA.y,
        JOGADOR.width,
        JOGADOR.height
    );
};
