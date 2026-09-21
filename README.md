# 📷 Camera 2D — Trabalhando com Câmeras

Este projeto apresenta uma implementação simples de uma **câmera 2D** para auxiliar no estudo de um conceito fundamental no desenvolvimento de Jogos Digitais:

> **A câmera é responsável por definir qual região do mundo do jogo será apresentada ao jogador.**

Mais do que simplesmente "seguir" um personagem, a câmera estabelece uma relação entre dois espaços importantes:

```text
MUNDO DO JOGO
      │
      │ região observada
      ▼
   CÂMERA
      │
      │ representação
      ▼
     TELA
```

A partir desse conceito, podemos estudar como objetos possuem posições no mundo e como essas posições são transformadas para serem apresentadas na tela.

Este projeto também apresenta duas versões da mesma implementação:

* `arquivo_unico`
* `modular`

Essa duplicação foi feita propositalmente para apresentar, além do conceito de câmera, uma introdução ao conceito de **modularização**.

---

# 📋 Requisitos do projeto

Antes de observar o código, é importante entender o que queremos que uma câmera faça.

De maneira simplificada, nosso sistema precisa:

* possuir um mundo maior que a área visível;
* possuir um personagem ou objeto que possa se movimentar;
* permitir que a câmera acompanhe esse objeto;
* determinar qual região do mundo será apresentada;
* atualizar a visualização conforme a câmera se movimenta.

Podemos representar essa ideia:

```text
                 MUNDO
┌──────────────────────────────────────────┐
│                                          │
│                                          │
│              🏠                          │
│                                          │
│                         🧍               │
│                                          │
│             ┌───────────────┐            │
│             │    CÂMERA     │            │
│             │               │            │
│             │  área visível │            │
│             └───────────────┘            │
│                                          │
│                                          │
└──────────────────────────────────────────┘
```

O mundo pode ser maior do que aquilo que conseguimos mostrar simultaneamente na tela.

A câmera determina qual parte desse mundo será visualizada.

---

# 🎥 O que é uma câmera?

Quando pensamos em uma câmera no mundo real, imaginamos um dispositivo que determina aquilo que será capturado em uma imagem.

Em um jogo, a ideia é semelhante.

A câmera define **o que o jogador consegue visualizar**.

Podemos imaginar o mundo como um grande mapa:

```text
┌───────────────────────────────────────────────┐
│                                               │
│     🏠                    🌳                  │
│                                               │
│                         🧍                    │
│                                               │
│                 ┌───────────────┐             │
│                 │               │             │
│                 │    CÂMERA     │             │
│                 │               │             │
│                 └───────────────┘             │
│                                               │
│                            🏔️                 │
│                                               │
└───────────────────────────────────────────────┘
```

A tela apresenta apenas uma parte do mundo:

```text
┌───────────────────────┐
│                       │
│       🌳              │
│                       │
│             🧍        │
│                       │
└───────────────────────┘
```

Quando a câmera se movimenta, outra região do mundo passa a ser apresentada.

---

# 🌎 Mundo × Tela

Um dos conceitos mais importantes para compreender câmeras é diferenciar:

* **posição no mundo**
* **posição na tela**

Imagine que o personagem esteja na posição:

```text
(500, 300)
```

Essa posição representa uma coordenada no mundo do jogo.

Isso não significa necessariamente que o personagem será desenhado no pixel `(500, 300)` da tela.

A câmera interfere nessa relação.

De forma simplificada:

```text
posição na tela
      ≈
posição no mundo
      -
posição da câmera
```

Por exemplo:

```text
Personagem:
(500, 300)

Câmera:
(400, 200)

Resultado visual aproximado:
(100, 100)
```

Podemos representar:

```text
        MUNDO
          │
          │ posição do personagem
          ▼
       (500,300)
          │
          │ - posição da câmera
          ▼
       (400,200)
          │
          ▼
       (100,100)
          │
          │
          ▼
         TELA
```

Esse é um modelo mental importante para entender o funcionamento de uma câmera 2D.

---

# 🧭 A câmera não move o mundo

Uma confusão bastante comum quando começamos a estudar câmeras é imaginar que:

> "Quando a câmera se movimenta, o mundo está sendo movimentado."

Conceitualmente, não é isso que está acontecendo.

O mundo continua existindo em suas próprias coordenadas.

O que muda é a **região do mundo que está sendo observada**.

Imagine:

```text
MUNDO

┌───────────────────────────────────────┐
│                                       │
│    🏠                                 │
│                                       │
│                🧍                     │
│                                       │
│                       🌳              │
│                                       │
└───────────────────────────────────────┘
```

A câmera pode observar primeiro:

```text
┌───────────────────┐
│                   │
│       🏠          │
│                   │
│          🧍       │
│                   │
└───────────────────┘
```

E depois:

```text
┌───────────────────┐
│                   │
│       🧍          │
│                   │
│              🌳   │
│                   │
└───────────────────┘
```

Os objetos continuam nas mesmas posições no mundo.

Foi a câmera que mudou sua região de observação.

---

# 🎮 Câmera acompanhando o jogador

Um comportamento muito comum em jogos 2D é fazer a câmera acompanhar o personagem.

Podemos representar:

```text
Jogador
   │
   │ posição
   ▼
Câmera
   │
   │ região observada
   ▼
Tela
```

Durante o jogo:

```text
┌───────────────────────┐
│                       │
│          🧍           │
│                       │
└───────────────────────┘
          ↓
      personagem
       se move
          ↓
┌───────────────────────┐
│                       │
│             🧍        │
│                       │
└───────────────────────┘
```

A câmera acompanha o movimento e passa a apresentar outra região do mundo.

Esse comportamento é conhecido como **camera follow**.

---

# 🧩 O fluxo da câmera

Podemos simplificar o funcionamento do projeto da seguinte maneira:

```text
┌───────────────┐
│    JOGADOR    │
└───────┬───────┘
        │
        │ possui uma posição
        ▼
┌───────────────┐
│    CÂMERA     │
└───────┬───────┘
        │
        │ determina a região observada
        ▼
┌───────────────┐
│     MUNDO     │
└───────┬───────┘
        │
        │ representação visual
        ▼
┌───────────────┐
│     TELA      │
└───────────────┘
```

A câmera funciona como um elemento intermediário entre as coordenadas do mundo e a representação visual apresentada ao jogador.

---

# 🗂️ Organização do projeto

O repositório possui duas implementações:

```text
camera_2d/
│
├── arquivo_unico/
│
├── modular/
│
└── README.md
```

As duas versões possuem o mesmo objetivo didático: apresentar uma implementação de câmera 2D.

A principal diferença está na **organização do código**.

---

# 📄 Versão `arquivo_unico`

Na pasta:

```text
arquivo_unico/
```

a implementação está concentrada em um único arquivo.

Essa organização é interessante para uma primeira apresentação porque permite observar o funcionamento do exemplo de maneira mais direta.

Podemos imaginar:

```text
┌──────────────────────────────┐
│                              │
│       ARQUIVO ÚNICO          │
│                              │
│  ├── configuração            │
│  ├── jogador                 │
│  ├── câmera                  │
│  ├── movimento               │
│  └── renderização            │
│                              │
└──────────────────────────────┘
```

Para um exemplo pequeno, essa organização pode facilitar a compreensão inicial.

O estudante consegue acompanhar o fluxo do programa sem precisar navegar por diversos arquivos.

---

# 🧱 Versão `modular`

Na pasta:

```text
modular/
```

o mesmo conceito é apresentado utilizando uma organização modular.

A ideia é separar responsabilidades.

Podemos representar conceitualmente:

```text
┌───────────────┐
│    JOGADOR    │
└───────────────┘

┌───────────────┐
│    CÂMERA     │
└───────────────┘

┌───────────────┐
│ OUTRAS PARTES │
└───────────────┘
```

Cada parte do programa pode ficar responsável por um determinado conjunto de comportamentos.

---

# 🧩 Por que existem duas versões?

A existência das duas versões é **intencional**.

O objetivo é utilizar o mesmo problema para apresentar uma ideia importante de desenvolvimento de software:

> **A organização do código também faz parte do desenvolvimento de um jogo.**

A primeira versão permite observar o conceito de maneira concentrada.

A segunda versão permite discutir como podemos organizar esse código em partes menores e com responsabilidades mais específicas.

Podemos pensar na evolução:

```text
FUNCIONAMENTO
     │
     ▼
"Meu código funciona."
     │
     ▼
ORGANIZAÇÃO
     │
     ▼
"Como posso separar suas responsabilidades?"
     │
     ▼
MODULARIZAÇÃO
```

---

# 🧠 O que é modularização?

Modularização é uma estratégia de organização na qual dividimos um sistema em partes menores, procurando atribuir responsabilidades mais específicas a cada parte.

Por exemplo:

```text
JOGO
│
├── Jogador
│
├── Câmera
│
├── Entrada
│
└── Mundo
```

Em vez de concentrar tudo em um único lugar, podemos organizar o projeto de acordo com suas responsabilidades.

Isso pode facilitar:

* leitura;
* manutenção;
* reutilização;
* localização de problemas;
* evolução do projeto;
* trabalho em equipe.

---

# ⚠️ Modularizar não significa apenas criar arquivos

É importante evitar uma interpretação simplificada:

> "Modularização é colocar cada coisa em um arquivo."

Criar vários arquivos, por si só, não garante uma boa arquitetura.

A pergunta mais importante é:

> **Qual responsabilidade deveria estar neste módulo?**

Por exemplo:

```text
CÂMERA
│
├── posição
├── atualização
└── comportamento da câmera
```

enquanto:

```text
JOGADOR
│
├── posição
├── movimento
└── comportamento do jogador
```

A separação deve fazer sentido em relação às responsabilidades do sistema.

---

# 🔄 Comparando as duas abordagens

Podemos resumir a proposta do projeto:

| `arquivo_unico`                           | `modular`                              |
| ----------------------------------------- | -------------------------------------- |
| Código concentrado                        | Código dividido em módulos             |
| Mais simples para acompanhar inicialmente | Maior separação de responsabilidades   |
| Interessante para exemplos pequenos       | Interessante para discutir organização |
| Facilita observar o fluxo completo        | Facilita localizar responsabilidades   |
| Menos arquivos                            | Mais arquivos/componentes              |

O objetivo não é determinar que uma abordagem seja sempre melhor que a outra.

A questão é compreender **quando e por que uma determinada organização pode ser adequada ao projeto**.

---

# 🔍 O que observar no código?

Ao estudar as duas versões, procure responder:

### 1. Onde está a lógica da câmera?

Identifique a parte responsável por atualizar a câmera.

### 2. Qual informação a câmera utiliza?

Observe quais dados são necessários para determinar sua posição.

### 3. Quem controla o movimento?

Identifique onde o personagem ou outro objeto tem sua posição alterada.

### 4. Como a câmera se relaciona com o jogador?

Pergunte:

```text
Quem conhece quem?

Jogador → Câmera?
Câmera → Jogador?
Sistema → Câmera?
```

Essa relação é importante para compreender a organização do código.

### 5. O que aconteceria se adicionássemos uma nova funcionalidade?

Imagine adicionar:

* limites da câmera;
* zoom;
* suavização;
* deslocamento;
* *dead zone*;
* diferentes comportamentos de acompanhamento.

Pergunte:

> Onde essa nova lógica deveria ficar?

Essa pergunta ajuda a perceber o valor da separação de responsabilidades.

---

# 🗺️ Câmera e limites do mundo

Imagine um cenário com bordas:

```text
┌──────────────────────────────┐
│                              │
│          MUNDO               │
│                              │
│               🧍             │
│                              │
└──────────────────────────────┘
```

Se o jogador chegar próximo da borda:

```text
┌──────────────────────────────┐
│                        🧍    │
│                              │
└──────────────────────────────┘
```

O que deveria acontecer com a câmera?

Se ela continuar seguindo o jogador indefinidamente, podemos acabar mostrando uma região que não pertence ao cenário:

```text
┌──────────────────────────────┐
│                    🧍        │
│                              │
│                        ???   │
└──────────────────────────────┘
```

Por isso, câmeras frequentemente precisam conhecer os **limites do mundo**.

Podemos pensar:

```text
posição da câmera
        │
        ▼
┌───────────────────────┐
│                       │
│       MUNDO           │
│                       │
│   ┌───────────────┐   │
│   │ área visível  │   │
│   └───────────────┘   │
│                       │
└───────────────────────┘
```

A câmera deve respeitar uma determinada região válida.

---

# 🎯 Câmera como ferramenta de design

A câmera não é apenas uma solução técnica.

Ela também influencia a experiência do jogador.

Imagine duas situações.

### Câmera centralizada

```text
┌─────────────────────────┐
│                         │
│          🧍             │
│                         │
└─────────────────────────┘
```

### Câmera deslocada

```text
┌─────────────────────────┐
│                         │
│   🧍                    │
│                         │
└─────────────────────────┘
```

A segunda configuração pode permitir que o jogador veja mais espaço à frente do personagem.

Esse tipo de escolha pode influenciar:

* exploração;
* antecipação de obstáculos;
* percepção espacial;
* ritmo;
* orientação;
* experiência de jogo.

Portanto:

> **A câmera também é uma ferramenta de design.**

---

# 🧪 Atividade 1 — Observe a câmera

Execute o projeto e observe o comportamento da câmera.

Tente responder:

1. O que acontece quando o jogador se movimenta?
2. A câmera acompanha o jogador?
3. O jogador permanece sempre no centro?
4. O que acontece quando o jogador se aproxima das extremidades?
5. O mundo parece estar se movimentando ou a câmera está mudando sua região de observação?

---

# 🧪 Atividade 2 — Altere o acompanhamento

Modifique o comportamento da câmera para que ela não fique exatamente centralizada no jogador.

Experimente criar um deslocamento:

```text
             direção
                →
┌─────────────────────────┐
│                    🧍   │
│                         │
└─────────────────────────┘
```

Observe como essa pequena alteração modifica a experiência visual.

---

# 🧪 Atividade 3 — Crie limites para a câmera

Faça com que a câmera respeite os limites do cenário.

Pergunte:

* qual é o limite esquerdo?
* qual é o limite direito?
* qual é o limite superior?
* qual é o limite inferior?

Uma representação simplificada seria:

```text
┌───────────────────────────────┐
│ ← limite                limite│
│                               │
│            CÂMERA             │
│                               │
│ limite                  limite│
└───────────────────────────────┘
```

---

# 🧪 Atividade 4 — Suavize o movimento

Em vez de fazer a câmera acompanhar imediatamente o jogador, experimente criar um movimento gradual.

Podemos imaginar:

```text
Jogador
   🧍
    │
    │
    ▼
  posição desejada

Câmera
   📷
    │
    │ movimento gradual
    ▼
posição atual
```

O objetivo é criar uma sensação de movimento mais suave.

---

# 🧪 Atividade 5 — Compare as versões

Abra:

```text
arquivo_unico/
```

e:

```text
modular/
```

Agora tente localizar:

* a lógica do jogador;
* a lógica da câmera;
* a atualização da posição;
* a renderização;
* as relações entre os componentes.

Depois responda:

1. Onde cada responsabilidade está localizada?
2. Qual versão exige mais navegação entre arquivos?
3. Qual versão permite identificar mais claramente cada responsabilidade?
4. O que aconteceria se o projeto tivesse dez vezes mais código?
5. Qual das organizações parece mais adequada para um projeto maior?
6. O que poderia ser melhorado em cada versão?

---

# 🧪 Atividade 6 — Adicione uma nova responsabilidade

Escolha uma funcionalidade para a câmera:

```text
☐ Zoom
☐ Limites
☐ Suavização
☐ Offset
☐ Dead zone
```

Primeiro pense em como implementá-la na versão:

```text
arquivo_unico/
```

Depois pense em como implementá-la na versão:

```text
modular/
```

Compare as alterações necessárias.

O objetivo não é simplesmente fazer funcionar.

O objetivo é observar:

> **Como a organização do código influencia o trabalho necessário para modificar o sistema?**

---

# 🧠 Perguntas para discussão

Durante a análise do projeto, tente responder:

1. O que é uma câmera em um jogo 2D?
2. Qual é a diferença entre mundo e tela?
3. Por que a posição do jogador no mundo não precisa ser igual à posição dele na tela?
4. O que acontece quando a câmera se movimenta?
5. A câmera precisa sempre seguir o jogador?
6. O jogador precisa sempre estar no centro da tela?
7. Como os limites do mundo afetam a câmera?
8. O que é *camera follow*?
9. O que é *offset*?
10. O que poderia ser uma *dead zone*?
11. Como o comportamento da câmera influencia o design do jogo?
12. Qual é a responsabilidade de uma câmera?
13. O que é modularização?
14. Qual é a diferença entre separar arquivos e separar responsabilidades?
15. Por que este projeto possui uma versão em arquivo único e outra modularizada?
16. O que acontece com a manutenção do código conforme o projeto cresce?
17. Onde você colocaria uma nova funcionalidade da câmera?
18. Que outras responsabilidades poderiam ser transformadas em módulos?

---

# 🎓 Objetivos de aprendizagem

Ao analisar e modificar este projeto, espera-se que o estudante seja capaz de:

* compreender o conceito de câmera em jogos 2D;
* diferenciar espaço de mundo e espaço de tela;
* compreender a relação entre posição da câmera e posição dos objetos;
* compreender o funcionamento básico de uma câmera que acompanha o jogador;
* identificar a câmera como parte da experiência de jogo;
* reconhecer a importância dos limites do mundo;
* experimentar diferentes comportamentos de câmera;
* compreender o conceito de *camera follow*;
* reconhecer a influência da câmera no design de jogos;
* compreender o conceito de modularização;
* identificar responsabilidades distintas em um sistema;
* comparar uma implementação em arquivo único com uma implementação modularizada;
* refletir sobre organização, manutenção e evolução de código.

---

# 🎮 Câmera como parte da experiência

É possível construir um jogo em que o personagem se movimenta corretamente, os cenários estão presentes e todos os sistemas funcionam, mas ainda assim ter uma experiência ruim por causa da câmera.

Isso acontece porque a câmera determina **aquilo que o jogador consegue perceber**.

Podemos pensar:

```text
                    JOGO
                      │
          ┌───────────┴───────────┐
          │                       │
        MUNDO                   CÂMERA
          │                       │
          │                       │
          └───────────┬───────────┘
                      │
                      ▼
                    TELA
                      │
                      ▼
                  JOGADOR
```

O mundo fornece o conteúdo.

A câmera determina qual parte desse conteúdo será apresentada.

O jogador interpreta essa informação e toma suas decisões.

Por isso:

> **Projetar uma câmera também significa projetar a forma como o jogador percebe o mundo do jogo.**

---

# 🔧 Possíveis extensões

Depois de compreender a implementação básica, este projeto pode ser expandido para estudar outros comportamentos.

### 🔍 Zoom

Permitir aproximar ou afastar a câmera:

```text
ZOOM OUT

┌─────────────────────────┐
│   🏠       🧍      🌳   │
└─────────────────────────┘


ZOOM IN

┌───────────────┐
│      🧍       │
└───────────────┘
```

### 🧲 Suavização

Fazer a câmera acompanhar o jogador gradualmente.

### 🚧 Limites

Impedir que a câmera ultrapasse os limites do cenário.

### 🎯 Dead zone

Criar uma região na qual o jogador pode se movimentar sem provocar imediatamente o movimento da câmera.

### ↔️ Offset

Manter a câmera deslocada em relação ao jogador.

### 🎬 Câmeras especiais

Criar comportamentos diferentes para:

* gameplay;
* cutscenes;
* menus;
* diálogos;
* áreas específicas do mapa.

Essas extensões permitem perceber como um conceito aparentemente simples pode evoluir para um sistema importante dentro de um jogo.

---

# 📚 Conceitos trabalhados

Este projeto pode ser utilizado para introduzir ou revisar:

* Câmera 2D;
* Coordenadas;
* Espaço de mundo;
* Espaço de tela;
* Transformação de coordenadas;
* Posição;
* Movimento;
* *Camera follow*;
* Limites de câmera;
* Offset;
* Zoom;
* *Dead zone*;
* Design de câmera;
* Separação de responsabilidades;
* Modularização;
* Organização de código.

---

# 📌 Resumo

O objetivo principal deste repositório é estudar **câmeras em jogos 2D** a partir de uma implementação simples.

O projeto também utiliza duas versões do mesmo exemplo para introduzir um segundo conceito:

```text
CÂMERA
  +
ORGANIZAÇÃO DO CÓDIGO
  ↓
COMPREENSÃO DO SISTEMA
```

A versão `arquivo_unico` permite observar a implementação de maneira concentrada.

A versão `modular` permite discutir como responsabilidades podem ser separadas em diferentes módulos.

Dessa forma, o projeto pode ser utilizado para trabalhar simultaneamente duas questões importantes no desenvolvimento de Jogos Digitais:

> **Como o jogador enxerga o mundo?**

e:

> **Como organizamos o código que constrói esse mundo?**
