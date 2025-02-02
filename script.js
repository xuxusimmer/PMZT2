// URL do Google Sheets (substitua pela sua)
const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRUxZieTH1_7toXLmqZPC65Aka0Eoj5z4FWQjsLKAh049yegunSFfvewcLUgbcfBS5oNsLan4Kx9LZ0/pub?output=csv";

async function fetchRanking() {
    const response = await fetch(sheetURL);
    const data = await response.text();
    
    const rows = data.split("\n").slice(1); // Ignorar cabeçalhos
    let players = [];

    rows.forEach(row => {
        const cols = row.split(",");
        if (cols.length >= 3) {
            players.push({
                nome: cols[0].trim(),
                foto: cols[1].trim(),
                pontos: parseInt(cols[2].trim(), 10)
            });
        }
    });

    // Ordenar por pontuação (do maior para o menor)
    players.sort((a, b) => b.pontos - a.pontos);
    displayRanking(players);
}

function displayRanking(players) {
    const container = document.getElementById("ranking-container");
    container.innerHTML = "";

    players.forEach(player => {
        const playerDiv = document.createElement("div");
        playerDiv.classList.add("player");

        playerDiv.innerHTML = `
            <img src="${player.foto}" alt="${player.nome}">
            <span>${player.nome} - ${player.pontos} pts</span>
        `;

        container.appendChild(playerDiv);
    });
}

// Chamar a função ao carregar a página
fetchRanking();
