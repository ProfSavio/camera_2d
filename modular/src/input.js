// ==========================================================
// SISTEMA DE ENTRADA
// ==========================================================
const ENTRADA = {
    cima: false,
    baixo: false,
    esquerda: false,
    direita: false
};

// ==========================================================
// TECLAS PRESSIONADAS
// ==========================================================
window.addEventListener("keydown",function(event) {
        switch (event.key.toLowerCase()) {
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
    }
);

// ==========================================================
// TECLAS LIBERADAS
// ==========================================================
window.addEventListener("keyup",function(event) {
        switch (event.key.toLowerCase()) {
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
    }
);
