/**
 * Alterna a visibilidade das seções (Single Page Application)
 */
function switchPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(button => button.classList.remove('active'));

    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    const clickedButton = Array.from(buttons).find(btn => btn.getAttribute('onclick').includes(pageId));
    if (clickedButton) {
        clickedButton.classList.add('active');
    }
}

/**
 * Calcula os benefícios ecológicos e econômicos da adubação verde
 */
function calcularSolo() {
    const areaInput = document.getElementById('area').value;
    const culturaSelect = document.getElementById('cultura');
    const resultadoDiv = document.getElementById('resultado');

    // Validação
    if (!areaInput || areaInput <= 0) {
        resultadoDiv.className = "result-box";
        resultadoDiv.style.borderLeftColor = "#d32f2f"; // Vermelho erro
        resultadoDiv.style.backgroundColor = "#ffebee";
        resultadoDiv.innerHTML = "<strong>Atenção:</strong> Insira uma área em hectares válida para calcular.";
        return;
    }

    const area = parseFloat(areaInput);
    const tipoCultura = culturaSelect.value;

    let plantaCompanheira = "";
    let kgNitrogenioPorHectare = 0;
    let economiaPorHectare = 0; // Economia estimada em reais com base na substituição parcial de adubos nitrogenados

    // Dados baseados em estimativas médias de manejo sustentável (Embrapa/Senar)
    if (tipoCultura === "crotalaria") {
        plantaCompanheira = "Crotalária (<em>Crotalária-spectabilis</em>)";
        kgNitrogenioPorHectare = 150; // Fixa em média 150kg de N por hectare
        economiaPorHectare = 450;    // Economia estimada em R$ por ha em adubos químicos
    } else if (tipoCultura === "guandu") {
        plantaCompanheira = "Feijão-Guandu (<em>Cajanus cajan</em>)";
        kgNitrogenioPorHectare = 120; 
        economiaPorHectare = 380;
    } else if (tipoCultura === "ervilhaca") {
        plantaCompanheira = "Ervilhaca-comum (<em>Vicia sativa</em>)";
        kgNitrogenioPorHectare = 100;
        economiaPorHectare = 310;
    }

    // Cálculos Totais
    const nitrogenioTotal = kgNitrogenioPorHectare * area;
    const economiaTotal = economiaPorHectare * area;

    // Ajuste visual para exibição de sucesso
    resultadoDiv.className = "result-box";
    resultadoDiv.style.borderLeftColor = "#3d6a46";
    resultadoDiv.style.backgroundColor = "#f4faf6";

    // Inserção do resultado estruturado
    resultadoDiv.innerHTML = `
        <h3>Simulação de Impacto Concluída!</h3>
        <p>Para a sua rotação de culturas em <strong>${area} hectares</strong>, a planta de cobertura ideal para a entressafra é a <strong>${plantaCompanheira}</strong>.</p>
        
        <ul>
            <li><strong>Injeção Biológica de Nitrogênio:</strong> Cerca de <strong>${nitrogenioTotal.toLocaleString('pt-BR')} kg</strong> de Nitrogênio ($N$) serão fixados naturalmente no seu solo.</li>
            <li><strong>Saúde da Terra:</strong> Essa biomassa vai melhorar a matéria orgânica, reter mais umidade e reduzir a necessidade de capina química.</li>
            <li><strong>Economia Financeira Estimada:</strong> Você deixará de gastar aproximadamente <strong>R$ ${economiaTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</strong> em fertilizantes químicos industriais.</li>
        </ul>
        
        <small>*Cálculos estimados com base em dados de Fixação Biológica de Nitrogênio (FBN). Os resultados reais podem variar conforme o clima e as condições prévias do solo.</small>
    `;
}
