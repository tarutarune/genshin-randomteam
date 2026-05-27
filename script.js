const elementIcons = {

  "炎": "icons/pyro.png",
  "水": "icons/hydro.png",
  "雷": "icons/electro.png",
  "氷": "icons/cryo.png",
  "草": "icons/dendro.png",
  "岩": "icons/geo.png",
  "風": "icons/anemo.png"
};

let selectedCharacters =
  characters.map(character => character.id);

let currentTeam = [];

let teamHistory = [];

function toggleCharacter(characterId) {

  if (selectedCharacters.includes(characterId)) {

    selectedCharacters =
      selectedCharacters.filter(id => id !== characterId);

  } else {

    selectedCharacters.push(characterId);

  }

  renderCharacters();
}

window.toggleCharacter = toggleCharacter;

function renderCharacters() {

  document.getElementById("character-list").innerHTML =
    [...characters].reverse().map(character => {

      const selected =
        selectedCharacters.includes(character.id)
          ? "selected"
          : "";

      return `
        <div
          class="
            character-card
            selectable-card
            rarity-${character.rarity}
            ${selected}
          "
          onclick="toggleCharacter('${character.id}')"
        >

          <img
            src="${character.image}"
            alt="${character.name}"
            class="character-image"
          />

          <img
            src="${elementIcons[character.element]}"
            alt="${character.element}"
            class="element-icon"
          />

        </div>
      `;
    }).join("");
}

function randomTeam() {

  if (selectedCharacters.length === 0) {

    document.getElementById("result").innerHTML =
      "キャラを選択してください";

    return;
  }

  const shuffled = [...selectedCharacters]
    .sort(() => 0.5 - Math.random());

  const team = shuffled.slice(0, 8);

  currentTeam = team;

  document.getElementById("result").innerHTML =
    '<div class="empty-slot"></div>'.repeat(8);

  const slots =
    document.querySelectorAll("#result .empty-slot");

  for (let i = 0; i < 8; i++) {

    setTimeout(() => {

      const characterId = team[i];

      if (!characterId) return;

      const character =
        characters.find(
          c => c.id === characterId
        );

      slots[i].outerHTML = `
        <div
          class="
            character-card
            rarity-${character.rarity}
            reveal-animation
          "
        >

          <img
            src="${character.image}"
            alt="${character.name}"
            class="character-image"
          />

          <img
            src="${elementIcons[character.element]}"
            class="element-icon"
          />

        </div>
      `;

    }, i * 350);
  }
}

renderCharacters();

document
  .getElementById("random-button")
  .addEventListener("click", randomTeam);

document.getElementById("result").innerHTML =
  '<div class="empty-slot"></div>'.repeat(8);



function showTab(tab) {

  const generatorTab =
    document.getElementById("generator-tab");

  const historyTab =
    document.getElementById("history-tab");

  const generatorButton =
    document.getElementById("generator-button");

  const historyButton =
    document.getElementById("history-button");

  if (tab === "generator") {

    generatorTab.style.display = "block";

    historyTab.style.display = "none";

    generatorButton.classList.add("active");

    historyButton.classList.remove("active");

  } else {

    generatorTab.style.display = "none";

    historyTab.style.display = "block";

    generatorButton.classList.remove("active");

    historyButton.classList.add("active");
  }
}


function saveTeam() {

  if (currentTeam.length === 0) return;

  teamHistory.push([...currentTeam]);



  selectedCharacters =
    selectedCharacters.filter(
      id => !currentTeam.includes(id)
    );



  currentTeam = [];



  renderCharacters();

  renderHistory();



  document.getElementById("result").innerHTML =
    '<div class="empty-slot"></div>'.repeat(8);
}

function renderHistory() {

  const historyList =
    document.getElementById("history-list");

  if (teamHistory.length === 0) {

    historyList.innerHTML =
      "<p>まだ履歴がありません</p>";

    return;
  }

  historyList.innerHTML =
    teamHistory.map((team, index) => {

      return `

        <div class="history-team">

          <h3>
            ${index + 1}組目
          </h3>

          <div class="history-grid">

            ${team.map(characterId => {

              const character =
                characters.find(
                  c => c.id === characterId
                );

              return `

                <div
                  class="
                    character-card
                    rarity-${character.rarity}
                  "
                >

                  <img
                    src="${character.image}"
                    class="character-image"
                  >

                  <img
                    src="${elementIcons[character.element]}"
                    class="element-icon"
                  >

                </div>
              `;
            }).join("")}

          </div>

        </div>
      `;
    }).join("");
}

document
  .getElementById("save-button")
  .addEventListener("click", saveTeam);
