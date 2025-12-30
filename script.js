// No início do arquivo JavaScript, após as variáveis:
document.addEventListener('DOMContentLoaded', function() {
    // Garante que apenas a tela inicial está visível
    document.getElementById("start-screen").style.display = "block";
    
    // Esconde todas as outras telas
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`q${i}`).style.display = "none";
    }
    document.getElementById("result").style.display = "none";
});

// ------------------ VARIÁVEIS ------------------
let answers = {};
let current = 1;
let perguntaAtual = 0;

// ------------------ NORMALIZAÇÃO ------------------
function norm(v) {
    if (!v) return "";
    return String(v)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}

// ------------------ SELECIONAR OPÇÃO ------------------
function select(question, value) {
    answers[question] = value;

    const container = document.getElementById(question);
    if (!container) return;

    container.querySelectorAll(".option").forEach(b => b.classList.remove("selected"));

    const botoes = container.querySelectorAll(".option");
    botoes.forEach(btn => {
        if (btn.getAttribute("onclick")?.includes(`'${question}','${value}'`)) {
            btn.classList.add("selected");
        }
    });
}

// ------------------ INICIAR QUIZ ------------------
function iniciarQuiz() {
    // Esconde tela inicial
    document.getElementById("start-screen").style.display = "none";
    
    // Mostra primeira pergunta COM display: block (que sobrescreve o CSS)
    document.getElementById("q1").style.display = "block";
    
    // Mostra primeira imagem
    mostrarImagemPergunta();
}

// ------------------ PRÓXIMA TELA ------------------
function nextScreen() {
    const qKey = `q${current}`;
    if (!answers[qKey]) {
        alert("Responde essa antes de ir.");
        return;
    }

    // última pergunta -> mostra resultado
    if (current === 4) {
        showResult();
        return;
    }

    document.getElementById(`q${current}`).style.display = "none";

    current++;
    document.getElementById(`q${current}`).style.display = "block";

    perguntaAtual++;
    mostrarImagemPergunta();
}

// ------------------ RESULTADO ------------------
function showResult() {
    document.getElementById("q4").style.display = "none";

    const resultado = getResult();

    document.getElementById("resultText").innerHTML = resultado;
    document.getElementById("result").style.display = "block";
}

// ------------------ REINICIAR ------------------
function restart() {
    location.reload();
}

// ------------------ IMAGEM DINÂMICA ------------------
function mostrarImagemPergunta() {
    const imagens = [
        "perguntas.jpg",
        "pergunta2.jpg", 
        "screenshot_15.jpg",
        "screenshot_19.jpg"
    ];

    const img = document.getElementById("img-pergunta");
    if (img && perguntaAtual < imagens.length) {
        img.src = imagens[perguntaAtual];
        img.style.display = "block";
    }
}

// ------------------ LÓGICA DO RESULTADO ------------------
function getResult() {
    const q1 = norm(answers.q1);
    const q2 = norm(answers.q2);
    const q3 = norm(answers.q3);
    const q4 = norm(answers.q4);

    const femOuAmbos = (q1 === "feminino" || q1 === "ambos");
    const masc = (q1 === "masculino" || q1 === "ambos");

    // -------- 1. Florais (Feminino) ----------
    if (
        femOuAmbos &&
        (q2 === "suave" || q2 === "equilibrado") &&
        (q3 === "algodao" || q3 === "baunilha") &&
        (q4 === "docura" || q4 === "floralidade")
    ) return `<img src="flower.jpg" style="width:200px;height:200px;object-fit:cover;border-radius:10px;margin:10px;"><br>Florais (Feminino)<br><br>01 — La Vie Est Belle (intenso)<br> 02 — Amor Amor (equilibrado)<br> 03 — 212 VIP Rosé (intenso)<br>09 — Miss Dior (equilibrado)<br>15 — Gabriela Sabatine (intenso)<br> 17 — J'adore (equilibrado)<br>23 — Lily (suave)<br><br> <strong>Cada um por R$ 35,00</strong>`;

    // -------- 2. Florais (Masculino) ----------
    if (
        masc &&
        (q2 === "suave" || q2 === "equilibrado" || q2 === "intenso") &&
        (q3 === "algodao" || q3 === "baunilha") &&
        (q4 === "docura" || q4 === "floralidade")
    ) return `<img src="flower.jpg" style="width:200px;height:200px;object-fit:cover;border-radius:10px;margin:10px;"><br>Florais (Masculino)<br><br>16 — Hugo Boss<br>25 — 212 Men<br><br><strong>Cada um por R$ 35,00</strong>`;

    // -------- 3. Cítricos (Feminino) ----------
    if (
        femOuAmbos &&
        (q2 === "suave" || q2 === "equilibrado") &&
        q3 === "limao" &&
        q4 === "revigorante"
    ) return `<img src="lemon.jpg" style="width:200px;height:200px;object-fit:cover;border-radius:10px;margin:10px;"><br>Cítricos (Feminino)<br><br>12 — 212 VIP Rosé<br>02 — Amor Amor<br>35 — Chance<br><br><strong>Cada um por R$ 35,00</strong>`;

    // -------- 4. Cítricos (Masculino) ----------
    if (
        masc &&
        (q2 === "suave" || q2 === "equilibrado") &&
        q3 === "limao" &&
        q4 === "revigorante"
    ) return `<img src="lemon.jpg" style="width:200px;height:200px;object-fit:cover;border-radius:10px;margin:10px;"><br>Cítricos (Masculino)<br><br>21 — Polo Sport<br>24 — Quasar<br>28 — Invictus<br><br><strong>Cada um por R$ 35,00</strong>`;

    // -------- 5. Chipre (Feminino) ----------
    if (
        femOuAmbos &&
        (q2 === "suave" || q2 === "equilibrado") &&
        q3 === "patchouli" &&
        q4 === "elegancia" 
    ) return `<img src="canela.jpg" style="width:200px;height:200px;object-fit:cover;border-radius:10px;margin:10px;"><br>Chipre (Feminino)<br><br>08 — Chanel Nº5<br>22 — Coco Mademoiselle<br>35 — Chance<br>09 — Miss Dior<br><br><strong>Cada um por R$ 35,00</strong>`;

    // -------- 6. Chipre (Masculino) ----------
    if (
        masc &&
        (q2 === "suave" || q2 === "equilibrado") &&
        q3 === "patchouli" &&
        q4 === "elegancia"
    ) return `<img src="canela.jpg" style="width:200px;height:200px;object-fit:cover;border-radius:10px;margin:10px;"><br>Chipre (Masculino)<br><br>33 — Explorer (Mont Blanc)<br>32 — Essencial<br><br><strong>Cada um por R$ 35,00</strong>`;

    // -------- 7. Âmbar (Feminino) ----------
    if (
        femOuAmbos &&
        q2 === "intenso" &&
        q3 === "jasmin" &&
        (q4 === "intensidade" || q4 === "elegancia")
    ) return `<img src="ylang.jpg" style="width:200px;height:200px;object-fit:cover;border-radius:10px;margin:10px;"><br>Âmbar (Feminino)<br><br>01 — La Vie Est Belle<br>04 — Angel<br>08 — Chanel Nº5<br>17 — J'adore<br>27 — Hypnose<br><br><strong>Cada um por R$ 35,00</strong>`;

    // -------- 8. Âmbar (Masculino) ----------
    if (
        masc &&
        q2 === "intenso" &&
        q3 === "jasmin" &&
        (q4 === "intensidade" || q4 === "elegancia")
    ) return `<img src="ylang.jpg" style="width:200px;height:200px;object-fit:cover;border-radius:10px;margin:10px;"><br>Âmbar (Masculino)<br><br>30 — Fahrenheit<br>34 — Malbec Absolut<br><br><strong>Cada um por R$ 35,00</strong>`;

    // -------- 9. Oriental (Feminino) ----------
    if (
        q1 === "feminino" &&
        q2 === "intenso" &&
        q3 === "limao" &&
        q4 === "elegancia"
    ) return `<img src="oriental.jpg" style="width:200px;height:200px;object-fit:cover;border-radius:10px;margin:10px;"><br>Oriental (Feminino)<br><br>04 — Angel<br>26 — Lady Million<br>01 — La Vie Est Belle<br><br><strong>Cada um por R$ 35,00</strong>`;

    // -------- 10. Oriental (Masculino) ----------
    if (
        masc &&
        q2 === "intenso" &&
        q3 === "limao" &&
        q4 === "elegancia"
    ) return `<img src="oriental.jpg" style="width:200px;height:200px;object-fit:cover;border-radius:10px;margin:10px;"><br>Oriental (Masculino)<br><br>06 — Azzaro Tradicional (intenso)<br>18 — Kouros (intenso)<br>19 — Lapidus (intenso)<br>14 — Ferrari Black (equilibrado)<br>29 — Ambercrombie (intenso)<br>34 — Malbec Absolut (intenso)<br><br><strong>Cada um por R$ 35,00</strong>`;

    // -------- 11. Fougère ----------
    if (
        q1 === "masculino" &&
        q2 === "equilibrado" &&
        q3 === "algodao" &&
        q4 === "revigorante"
    ) return `<img src="lavanda.jpg" style="width:200px;height:200px;object-fit:cover;border-radius:10px;margin:10px;"><br>Fougère<br><br>07 — Biografia<br>16 — Hugo Boss<br>24 — Quasar<br>25 — 212 Men<br><br><strong>Cada um por R$ 35,00</strong>`;

    // -------- 12. Amadeirado (Masculino) ----------
    if (
        masc &&
        q2 === "intenso" &&
        q3 === "patchouli" &&
        q4 === "intensidade"
    ) return `<img src="madeira.jpg" style="width:400px;height:200px;object-fit:cover;border-radius:10px;margin:10px;"><br>Amadeirado <br><br>06 — Azzaro Tradicional (intenso)<br>19 — Lapidus (intenso)<br>28 — Invictus (equilibrado)<br>29 — Ambercrombie (intenso)<br>30 — Fahrenheit (intenso)<br>32 — Essencial (intenso)<br><br><strong>Cada um por R$ 35,00</strong>`;

    // -------- 13. Amadeirado (Feminino) ----------
    if (
        femOuAmbos &&
        q2 === "intenso" &&
        q3 === "patchouli" &&
        q4 === "intensidade" 
    ) return `<img src="madeira.jpg" style="width:200px;height:200px;object-fit:cover;border-radius:10px;margin:10px;"><br>Amadeirado (Feminino)<br><br>22 — Coco Mademoiselle<br><br><strong>Cada um por R$ 35,00</strong>`;

    // -------- 14. Frutado ----------
    if (
        femOuAmbos &&
        (q2 === "suave" || q2 === "equilibrado") &&
        q3 === "baunilha" &&
        q4 === "docura" 
    ) return `<img src="frutas.jpg" style="width:200px;height:200px;object-fit:cover;border-radius:10px;margin:10px;"><br>Frutado<br><br>02 — Amor Amor<br>03 — 212 VIP Rosé<br>20 — Cherry<br><br><strong>Cada um por R$ 35,00</strong>`;
    
    // ========== FALLBACKS (SEMPRE RETORNA ALGO) ==========
    
    // Fallback 1: Baseado no gênero e intensidade
    if (masc) {
        if (q2 === "intenso") {
            return `<img src="madeira.jpg" style="width:200px;height:200px;object-fit:cover;border-radius:10px;margin:10px;"><br>Amadeirado (Masculino)<br><br>06 — Azzaro Tradicional (intenso)<br>19 — Lapidus (intenso)<br>28 — Invictus (equilibrado)<br>29 — Ambercrombie (intenso)<br>30 — Fahrenheit (intenso)<br>32 — Essencial (intenso)<br><br><strong>Cada um por R$ 35,00</strong>`;
        } else {
            return `<img src="flower.jpg" style="width:200px;height:200px;object-fit:cover;border-radius:10px;margin:10px;"><br>Florais (Masculino)<br><br>16 — Hugo Boss<br>25 — 212 Men<br><br><strong>Cada um por R$ 35,00</strong>`;
        }
    }
    
    // Fallback 2: Feminino ou Ambos
    if (femOuAmbos) {
        if (q2 === "intenso") {
            if (q3 === "jasmin" || q4 === "elegancia" || q4 === "intensidade") {
                return `<img src="ylang.jpg" style="width:200px;height:200px;object-fit:cover;border-radius:10px;margin:10px;"><br>Âmbar (Feminino)<br><br>01 — La Vie Est Belle<br>04 — Angel<br>08 — Chanel Nº5<br>17 — J'adore<br>27 — Hypnose<br><br><strong>Cada um por R$ 35,00</strong>`;
            } else {
                return `<img src="madeira.jpg" style="width:200px;height:200px;object-fit:cover;border-radius:10px;margin:10px;"><br>Amadeirado (Feminino)<br><br>22 — Coco Mademoiselle<br><br><strong>Cada um por R$ 35,00</strong>`;
            }
        } else {
            if (q3 === "limao" || q4 === "revigorante") {
                return `<img src="lemon.jpg" style="width:200px;height:200px;object-fit:cover;border-radius:10px;margin:10px;"><br>Cítricos (Feminino)<br><br>12 — 212 VIP Rosé<br>02 — Amor Amor<br>35 — Chance<br><br><strong>Cada um por R$ 35,00</strong>`;
            } else if (q3 === "patchouli" || q4 === "elegancia" || q4 === "intensidade") {
                return `<img src="canela.jpg" style="width:200px;height:200px;object-fit:cover;border-radius:10px;margin:10px;"><br>Chipre (Feminino)<br><br>08 — Chanel Nº5<br>22 — Coco Mademoiselle<br>35 — Chance<br>09 — Miss Dior<br><br><strong>Cada um por R$ 35,00</strong>`;
            } else {
                return `<img src="flower.jpg" style="width:200px;height:200px;object-fit:cover;border-radius:10px;margin:10px;"><br>Florais (Feminino)<br><br>01 — La Vie Est Belle (intenso)<br>02 — Amor Amor (equilibrado)<br>03 — 212 VIP Rosé (intenso)<br>09 — Miss Dior (equilibrado)<br>15 — Gabriela Sabatine (intenso)<br>17 — J'adore (equilibrado)<br>23 — Lily (suave)<br><br><strong>Cada um por R$ 35,00</strong>`;
            }
        }
    }
    
    // Fallback final (nunca deveria chegar aqui, mas por segurança)
    return `<img src="frutas.jpg" style="width:200px;height:200px;object-fit:cover;border-radius:10px;margin:10px;"><br>Frutado<br><br>02 — Amor Amor<br>03 — 212 VIP Rosé<br>20 — Cherry<br><br><strong>Cada um por R$ 35,00</strong>`;
}




