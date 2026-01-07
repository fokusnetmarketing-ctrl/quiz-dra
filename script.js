const perguntas = [
    "A dra realiza avaliação antes dos procedimentos?",
    "A dra realiza Harmonização Facial completa?",
    "A dra utiliza apenas produtos originais e aprovados pela Anvisa?",
    "A dra realiza aplicação de toxina botulínica (Botox)?",
    "A dra realiza preenchimento (lábios, mandíbula, bigode chinês etc.)?",
    "A dra realiza bioestimuladores de colágeno?",
    "A dra realiza skinbooster / hidratação injetável?",
    "A dra realiza lipo enzimática de papada?",
    "A dra realiza fios de PDO?",
    "A dra realiza microagulhamento / tratamentos de pele?"
];

const quizContainer = document.getElementById("quiz-container");

perguntas.forEach((texto, index) => {
    const div = document.createElement("div");
    div.className = "pergunta";

    const label = document.createElement("p");
    label.textContent = `${index + 1}. ${texto}`;

    const sim = criarRadio(index, "SIM");
    const nao = criarRadio(index, "NÃO");
    const depende = criarRadio(index, "DEPENDE");

    div.appendChild(label);
    div.appendChild(sim);
    div.appendChild(nao);
    div.appendChild(depende);

    quizContainer.appendChild(div);
});

function criarRadio(numPergunta, valor) {
    const label = document.createElement("label");
    const input = document.createElement("input");

    input.type = "radio";
    input.name = "pergunta_" + numPergunta;
    input.value = valor;

    label.appendChild(input);
    label.appendChild(document.createTextNode(" " + valor + " "));

    return label;
}

document.getElementById("enviar").addEventListener("click", () => {
    
    const respostas = {};

    perguntas.forEach((pergunta, index) => {
        const selecionada = document.querySelector(
            `input[name="pergunta_${index}"]:checked`
        );

        const valor = selecionada ? selecionada.value : "SEM RESPOSTA";

        respostas[pergunta] = valor;
    });

    enviarParaPlanilha(respostas);
});

function enviarParaPlanilha(respostas) {
    const url = "URL_DO_APPS_SCRIPT";

    fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(respostas)
    })
    .then(() => {
        window.location.href = "confirmacao.html";
    });
}
