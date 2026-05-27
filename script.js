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
          >

          <img
            src="${elementIcons[character.element]}"
            class="element-icon"
          >

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
