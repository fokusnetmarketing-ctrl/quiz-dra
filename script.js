const perguntas = [
    // Quiz original
    "A dra realiza avaliação antes dos procedimentos?",
    "A dra realiza Harmonização Facial completa?",
    "A dra utiliza apenas produtos originais e aprovados pela Anvisa?",
    "A dra realiza aplicação de toxina botulínica (Botox)?",
    "A dra realiza preenchimento (lábios, mandíbula, bigode chinês etc.)?",
    "A dra realiza bioestimuladores de colágeno?",
    "A dra realiza skinbooster / hidratação injetável?",
    "A dra realiza lipo enzimática de papada?",
    "A dra realiza fios de PDO?",
    "A dra realiza microagulhamento / tratamentos de pele?",
    "O preenchimento dura quanto tempo?",
    "Após o Botox, em quanto tempo vejo o resultado?",
    "Quantas sessões são necessárias para bioestimuladores?",
    "A doutora realiza tratamentos para olheiras?",
    "A doutora realiza peeling químico?",
    "A doutora oferece acompanhamento após os procedimentos?",
    "Estou amamentando: posso fazer procedimentos?",
    "A avaliação tem custo?",
    "A doutora faz planejamento facial completo?",
    "Faz parcelamento?",
    "Qual o tempo médio de duração dos procedimentos?",
    "O preenchimento pode ser revertido caso eu não goste?",
    "Grávidas podem fazer?",
    "Quem tem doenças autoimunes pode realizar procedimentos?",
    "Quem tem alergia pode fazer preenchimento?"
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

// --- Evento de envio ---
document.getElementById("enviar").addEventListener("click", () => {
    const respostas = {};

    // Captura respostas do quiz
    perguntas.forEach((pergunta, index) => {
        const selecionada = document.querySelector(
            `input[name="pergunta_${index}"]:checked`
        );
        respostas[pergunta] = selecionada ? selecionada.value : "SEM RESPOSTA";
    });

    // Captura respostas das novas perguntas FAQ
    const respostasFAQ = {
        "Dói?": document.querySelector('input[name="faq_doi"]').value || "SEM RESPOSTA",
        "Quanto tempo dura?": document.querySelector('input[name="faq_duracao"]').value || "SEM RESPOSTA",
        "Quando posso treinar?": document.querySelector('input[name="faq_treino"]').value || "SEM RESPOSTA",
        "Quando vejo o resultado final?": document.querySelector('input[name="faq_resultado"]').value || "SEM RESPOSTA",
        "Posso tomar bebida alcoólica?": document.querySelector('input[name="faq_bebida"]').value || "SEM RESPOSTA",
        "Posso viajar depois?": document.querySelector('input[name="faq_viagem"]').value || "SEM RESPOSTA"
    };

    // Captura dados da profissional
    const dadosProfissional = {
        "Nome": document.querySelector('input[name="prof_nome"]').value || "SEM RESPOSTA",
        "Formação": document.querySelector('input[name="prof_formacao"]').value || "SEM RESPOSTA",
        "Especializações": document.querySelector('input[name="prof_especializacoes"]').value || "SEM RESPOSTA",
        "Anos de experiência": document.querySelector('input[name="prof_anos"]').value || "SEM RESPOSTA"
    };

    // Captura dados das clínicas
    const dadosClinicas = {
        "Endereço": document.querySelector('input[name="clin_endereco"]').value || "SEM RESPOSTA",
        "Horário de funcionamento": document.querySelector('input[name="clin_horario"]').value || "SEM RESPOSTA",
        "Dias de funcionamento": document.querySelector('input[name="clin_dias"]').value || "SEM RESPOSTA",
        "Dias de atendimento em Prudente": document.querySelector('input[name="clin_prudente"]').value || "SEM RESPOSTA",
        "Dias de atendimento em Dracena": document.querySelector('input[name="clin_dracena"]').value || "SEM RESPOSTA",
        "Forma de agendamento": document.querySelector('input[name="clin_agendamento"]').value || "SEM RESPOSTA",
        "Políticas de cancelamento": document.querySelector('input[name="clin_cancelamento"]').value || "SEM RESPOSTA",
        "Formas de pagamento": document.querySelector('input[name="clin_pagamento"]').value || "SEM RESPOSTA",
        "Políticas de agendamento": document.querySelector('input[name="clin_politicas_agendamento"]').value || "SEM RESPOSTA",
        "Políticas de avaliação": document.querySelector('input[name="clin_politicas_avaliacao"]').value || "SEM RESPOSTA"
    };

    // Junta todas as respostas
    const todasRespostas = { ...respostas, ...respostasFAQ, ...dadosProfissional, ...dadosClinicas };

    // Envia tudo para a planilha
    enviarParaPlanilha(todasRespostas);
});

function enviarParaPlanilha(respostas) {
    const url = "https://script.google.com/macros/s/AKfycbwllg4t66a-HRMLUQOtvTU-sNbgMJwTI-zmzJ80nzp5IPPVrr7GiHnVvz92ro6AYp3flw/exec";

    fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(respostas)
    })
    .then(() => {
        window.location.href = "confirmacao.html";
    })
    .catch(err => {
        console.error("Erro ao enviar:", err);
        alert("Erro ao enviar respostas.");
    });
}
