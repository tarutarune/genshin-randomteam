const elementIcons = {

  "炎": "icons/pyro.png",
  "水": "icons/hydro.png",
  "雷": "icons/electro.png",
  "氷": "icons/cryo.png",
  "草": "icons/dendro.png",
  "岩": "icons/geo.png",
  "風": "icons/anemo.png",
  "全元素": "icons/star.png"
};


function playTick() {

  const audioContext =
    new (
      window.AudioContext ||
      window.webkitAudioContext
    )();

  const oscillator =
    audioContext.createOscillator();

  const gainNode =
    audioContext.createGain();

  oscillator.connect(gainNode);

  gainNode.connect(
    audioContext.destination
  );

  oscillator.type = "square";

  oscillator.frequency.value =
    1200;

  gainNode.gain.value = 0.03;

  oscillator.start();

  oscillator.stop(
    audioContext.currentTime +
    0.015
  );
}



let lastSoundTime = 0;


let selectedCharacters =
  JSON.parse(
    localStorage.getItem(
      "selectedCharacters"
    )
  ) ||
  characters.map(
    character => character.id
  );

let currentTeam = []

let randomPool = [];

let currentSlot = 0;

let isDrawing = false;


let teamHistory =
  JSON.parse(
    localStorage.getItem("teamHistory")
  ) || [];


document.getElementById("save-button")
  .disabled = true;



function startTeamBuild() {

  randomPool =
    [...selectedCharacters]
      .sort(() => 0.5 - Math.random());

  currentTeam = [];

  currentSlot = 0;

  document.getElementById("result").innerHTML =
    [...Array(8)].map((_, index) => `
      <div
  class="empty-slot"
  data-slot="${index}"
  onclick="drawCharacter(${index})"
></div>
    `).join("");
}


function drawCharacter(slotIndex) {

  if (isDrawing) return;

  
  const slot =
    document.querySelector(
      `[data-slot="${slotIndex}"]`
    );

  if (!slot) return;

  // 決定済みなら何もしない
  if (
    slot.dataset.locked === "true"
  ) {
    return;
  }

 if (
  slot.dataset.spinning === "true"
) {
  return;
} 

const finalCharacterId =
  randomPool.shift();

if (!finalCharacterId) return;

 isDrawing = true;
  
slot.dataset.spinning = "true";

  if (!finalCharacterId) return;

  slot.className =
    "character-card";

  let count = 0;

  
  
  function animateReveal(speed) {

    const randomCharacter =
      characters[
        Math.floor(
          Math.random() *
          characters.length
        )
      ];

    slot.className =
      `character-card rarity-${randomCharacter.rarity}`;

    slot.innerHTML = `
      <img
        src="${randomCharacter.image}"
        class="character-image"
      />

      <img
        src="${elementIcons[randomCharacter.element]}"
        class="element-icon"
      />
    `;

playTick();
    

    count++;

    if (count >= 22) {

      const finalCharacter =
        characters.find(
          c =>
            c.id === finalCharacterId
        );

      slot.className =
        `character-card rarity-${finalCharacter.rarity}`;

      slot.innerHTML = `
        <img
          src="${finalCharacter.image}"
          class="character-image"
        />

        <img
          src="${elementIcons[finalCharacter.element]}"
          class="element-icon"
        />
      `;

      // この枠は確定済み
      slot.dataset.locked = "true";
      slot.dataset.spinning = "false";

      currentTeam.push(
        finalCharacterId
      );

      if (
  currentTeam.length < 8 &&
  randomPool.length === 0
) {

  const needCount =
    8 - currentTeam.length;

  document.getElementById(
    "message-area"
  ).innerHTML = `
      <button
        class="fill-team-button"
        onclick="fillRemainingTeam()"
      >
        ＋${needCount}人補充して完成
      </button>
  `;
}

      selectedCharacters =
  selectedCharacters.filter(
    id => id !== finalCharacterId
  );

saveSelectedCharacters();

renderCharacters();

      // 8人揃ったら保存ボタン解放
      if (
        currentTeam.length === 8
      ) {
        document.getElementById(
          "save-button"
        ).disabled = false;
      }

      isDrawing = false;
      return;
    }

    let nextSpeed = speed;

    if (count < 12) {

      nextSpeed = speed + 10;

    } else if (count < 18) {

      nextSpeed = speed + 30;

    } else {

      nextSpeed = speed + 80;

    }

    setTimeout(
      () => animateReveal(nextSpeed),
      speed
    );
  }

  animateReveal(30);
}




function saveSelectedCharacters() {

  localStorage.setItem(
    "selectedCharacters",
    JSON.stringify(
      selectedCharacters
    )
  );
}



function toggleCharacter(characterId) {

  if (selectedCharacters.includes(characterId)) {

    selectedCharacters =
      selectedCharacters.filter(id => id !== characterId);

  } else {

    selectedCharacters.push(characterId);

  }

  renderCharacters();
  saveSelectedCharacters();

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
  renderRemainingInfo();
}


function randomTeam() {
  
  
if (
  selectedCharacters.length > 0 &&
  selectedCharacters.length < 8
) {
  
  currentTeam = [...selectedCharacters];

  const needCount =
    8 - selectedCharacters.length;

  const remainCards =
    selectedCharacters.map(characterId => {

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
    }).join("");

  const emptySlots =
    '<div class="empty-slot"></div>'
      .repeat(needCount);

 document.getElementById("result").innerHTML =
  remainCards + emptySlots;

document.getElementById("message-area")
  .innerHTML = `
<button
  class="fill-team-button"
  onclick="fillRemainingTeam()"
>
  ＋${needCount}人補充して完成
</button>
  `;
  
  
  return;
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
  renderHistory();


startTeamBuild();;



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

saveHistory();





  currentTeam = [];



  renderCharacters();

  renderHistory();

 const historyCount =
  document.getElementById("history-count");

historyCount.classList.remove("history-pulse");

void historyCount.offsetWidth;

historyCount.classList.add("history-pulse");

document.getElementById(
  "save-button"
).disabled = true;

  currentTeam = [];
currentSlot = 0;

startTeamBuild();

  
}

function renderHistory() {

  const historyList =
    document.getElementById("history-list");

  if (teamHistory.length === 0) {

  historyList.innerHTML =
    "<p>まだ履歴がありません</p>";

  document.getElementById(
    "history-count"
  ).textContent = "(0)";

  document.getElementById(
    "total-stars"
  ).textContent = "合計 ★0 / 0";

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
    `合計 ★${totalStars} / ${maxStars}`;
    
    
}


document
  .getElementById("save-button")
  .addEventListener("click", saveTeam);

document
  .getElementById("reset-link")
  .addEventListener(
    "click",
    event => {

      event.preventDefault();

      resetAll();
    }
  );
  
  
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
saveHistory();
  renderHistory();
}

window.setStars = setStars;



window.fillRemainingTeam =
  fillRemainingTeam;

window.drawCharacter =
  drawCharacter;


function resetAndRandom() {

  document.querySelector(".button-area")
    .style.display = "block";

  selectedCharacters =
    characters.map(
      character => character.id
    );

  renderCharacters();

  renderHistory();

  randomTeam();
}

window.resetAndRandom =
  resetAndRandom;



function saveHistory() {

  localStorage.setItem(
    "teamHistory",
    JSON.stringify(teamHistory)
  );
}



function resetAll() {

  if (
    !confirm(
      "履歴と抽選状態をすべてリセットしますか？"
    )
  ) {
    return;
  }

  teamHistory = [];

  selectedCharacters =
    characters.map(
      character => character.id
    );

  saveSelectedCharacters();

  currentTeam = [];

  localStorage.removeItem(
    "teamHistory"
  );

  localStorage.removeItem(
    "selectedCharacters"
  );

  renderCharacters();

  renderHistory();

  document.getElementById(
    "history-count"
  ).textContent = "(0)";

  document.getElementById(
    "total-stars"
  ).textContent = "合計 ★0 / 0";

  startTeamBuild();

  document.getElementById(
    "save-button"
  ).disabled = true;
}



function renderRemainingInfo() {

  const remainingCharacters =
    characters.filter(
      character =>
        selectedCharacters.includes(
          character.id
        )
    );

  const fiveStars =
    remainingCharacters.filter(
      character =>
        character.rarity === 5
    ).length;

  const fourStars =
    remainingCharacters.filter(
      character =>
        character.rarity === 4
    ).length;

  const elements = [
    "炎",
    "水",
    "雷",
    "氷",
    "草",
    "岩",
    "風"
  ];

  const elementHtml =
    elements.map(element => {

      const count =
        remainingCharacters.filter(
          character =>
            character.element === element
        ).length;

      return `
        <span class="element-count">

          <img
            src="${elementIcons[element]}"
            class="remaining-element-icon"
          >

          ${count}

        </span>
      `;
    }).join("");

document.getElementById(
  "remaining-info"
).innerHTML = `
  <div class="rarity-counts">

    <span>
      <span class="five-star">★</span>
      ${fiveStars}人
    </span>

    ／

    <span>
      <span class="four-star">★</span>
      ${fourStars}人
    </span>

  </div>

  <div>

    ${elementHtml}

  </div>
`;
}



function fillRemainingTeam() {

  const needCount =
    8 - currentTeam.length;

  const additionalMembers =
    characters
      .filter(
        character =>
          !currentTeam.includes(
            character.id
          )
      )
      .sort(() => 0.5 - Math.random())
      .slice(0, needCount)
      .map(character => character.id);

  randomPool.push(
    ...additionalMembers
  );

  document.getElementById(
    "message-area"
  ).innerHTML = "";
}

window.fillRemainingTeam =
  fillRemainingTeam;
