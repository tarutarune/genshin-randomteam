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
  
  function randomTeam() {

  if (selectedCharacters.length < 8) {

    selectedCharacters =
      characters.map(
        character => character.id
      );

    renderCharacters();
  }

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

  teamHistory.push({
  team: [...currentTeam],
  stars: 0
});



  selectedCharacters =
  selectedCharacters.filter(
    id =>
      !currentTeam.some(
        currentId => currentId === id
      )
  );



  currentTeam = [];



  renderCharacters();

  renderHistory();

 const historyCount =
  document.getElementById("history-count");

historyCount.classList.remove("history-pulse");

void historyCount.offsetWidth;

historyCount.classList.add("history-pulse");





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
    teamHistory.map((entry, index) => {
      
      const team = entry.team;

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

              if (!character) return "";

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
          
          <div class="star-rating">

  ${[1,2,3,4,5,6,7,8,9].map(star => `

    <span
      class="star ${star <= entry.stars ? 'filled' : ''}"
      onclick="setStars(${index}, ${star})"
    >

      ★

    </span>

  `).join("")}

</div>

        </div>
      `;
    }).join("");

  document.getElementById("history-count")
  .textContent =
    `(${teamHistory.length})`;
    
    
    
const totalStars =
  teamHistory.reduce(
    (sum, entry) =>
      sum + entry.stars,
    0
  );

const maxStars =
  teamHistory.length * 9;

document.getElementById("total-stars")
  .textContent =
    `合計 ★${totalStars}/${maxStars}`;
    
    
}


document
  .getElementById("save-button")
  .addEventListener("click", saveTeam);
  
  
function setStars(teamIndex, stars) {

  if (
    teamHistory[teamIndex].stars === stars
  ) {

    teamHistory[teamIndex].stars =
      stars - 1;

  } else {

    teamHistory[teamIndex].stars =
      stars;
  }

  renderHistory();
}

window.setStars = setStars;
