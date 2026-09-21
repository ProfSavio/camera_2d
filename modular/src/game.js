// ==========================================================
// CONFIGURAÇÃO DO CANVAS
// ==========================================================
let tela = null;

// ==========================================================
// CONTROLE DO LOOP
// ==========================================================
let ultimoTempo = 0;

// ==========================================================
// INICIALIZAÇÃO DO JOGO
// ==========================================================
function iniciarJogo() {
    tela = document.getElementById("game");
    /*
        Define a resolução interna
        do canvas.

        Não usamos 100% da tela
        para manter uma escala
        semelhante a jogos de pixel art.
    */
    tela.width = 640;
    tela.height = 360;

    configurarRenderizacao(tela);
    configurarCamera(tela);

    // Inicia o loop principal do jogo
    requestAnimationFrame(loopDoJogo);
}


// ==========================================================
// LOOP PRINCIPAL
// ==========================================================
function loopDoJogo(tempo) {
    /*
        Converte milissegundos
        para segundos.
    */
    const tempoDecorrido =
        (tempo - ultimoTempo) / 1000;
    ultimoTempo = tempo;

    /*
        Evita problemas quando
        a aba fica congelada
        ou o jogo sofre uma pausa.
    */
    const tempoLimitado =
        Math.min(
            tempoDecorrido,
            0.05
        );

    // Atualiza todos os sistemas do jogo
    atualizar(
        tempoLimitado
    );

    // Desenha o jogo na tela
    renderizar();

    // Solicita o próximo quadro
    requestAnimationFrame(
        loopDoJogo
    );
}

// ==========================================================
// ATUALIZAÇÃO DOS SISTEMAS
// ==========================================================
function atualizar(tempoDecorrido) {
    // Atualiza a posição do jogador
    atualizarJogador(
        tempoDecorrido
    );

    // Atualiza a posição da câmera
    atualizarCamera(
        JOGADOR
    );
}
