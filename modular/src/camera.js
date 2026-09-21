// ==========================================================
// CONFIGURAÇÃO DA CÂMERA
// ==========================================================

const CAMERA = {
    x: 0,
    y: 0,
    largura: 0,
    altura: 0
};

// ==========================================================
// INICIALIZAÇÃO
// ==========================================================
function configurarCamera(canvas) {
    // A câmera terá o mesmo tamanho da tela
    CAMERA.largura = canvas.width;
    CAMERA.altura = canvas.height;
}

// ==========================================================
// SEGUE O JOGADOR
// ==========================================================
function atualizarCamera(jogador) {
    /*
        Mantém o jogador no centro da tela
    */
    CAMERA.x =
        jogador.x +
        jogador.width / 2 -
        CAMERA.largura / 2;

    CAMERA.y =
        jogador.y +
        jogador.height / 2 -
        CAMERA.altura / 2;

    /*
        Calcula o tamanho total do mundo em pixels
    */
    const larguraMundoEmPixels =
        LARGURA_MUNDO * TAMANHO_BLOCO;

    const alturaMundoEmPixels =
        ALTURA_MUNDO * TAMANHO_BLOCO;

    /*
        Calcula até onde a câmera pode se mover
    */
    const limiteMaximoX =
        larguraMundoEmPixels -
        CAMERA.largura;

    const limiteMaximoY =
        alturaMundoEmPixels -
        CAMERA.altura;

    /*
        Impede a câmera de sair do mapa
    */
    CAMERA.x = Math.max(
        0,
        Math.min(
            CAMERA.x,
            limiteMaximoX
        )
    );

    CAMERA.y = Math.max(
        0,
        Math.min(
            CAMERA.y,
            limiteMaximoY
        )
    );
}
