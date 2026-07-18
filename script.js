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

const audioContext =
  new (
    window.AudioContext ||
    window.webkitAudioContext
  )();


function toggleHelp() {

  if (typeof gtag !== "undefined") {
    gtag("event", "open_help");
  }

  const help =
    document.getElementById(
      "help-text"
    );

  help.style.display =
    help.style.display === "none"
      ? "block"
      : "none";
}



function playTick() {

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




function playSuccess() {


  const oscillator =
    audioContext.createOscillator();

  const gainNode =
    audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(
    audioContext.destination
  );

  oscillator.type = "sine";

  oscillator.frequency.setValueAtTime(
    2200,
    audioContext.currentTime
  );

  gainNode.gain.setValueAtTime(
    0.08,
    audioContext.currentTime
  );

  gainNode.gain.exponentialRampToValueAtTime(
    0.001,
    audioContext.currentTime + 0.3
  );

  oscillator.start();

  oscillator.stop(
    audioContext.currentTime + 0.3
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

let initialSelectedCharacters = [];

let remainingCharacters = [...selectedCharacters];

// これまでの組で使い切ったキャラ
let usedCharacters = [];

let currentTeam = [];


let currentSlot = 0;

let isDrawing = false;


let teamHistory =
  JSON.parse(
    localStorage.getItem("teamHistory")
  ) || [];


document.getElementById("save-button")
  .disabled = true;






function startTeamBuild() {
  

  console.trace("startTeamBuild");

 console.log("startTeamBuild実行");

  console.log(
  "start",
  selectedCharacters.length,
  [...selectedCharacters]
);

  initialSelectedCharacters = [...selectedCharacters];

  remainingCharacters = [...selectedCharacters];

  usedCharacters = [];
  currentTeam = [];

  currentSlot = 0;

  document.getElementById("result").innerHTML =
    [...Array(8)].map((_, index) => `
      <div
        class="empty-slot"
        data-slot="${index}"
        onclick="drawCharacter(${index})"
      >
        ✦
      </div>
    `).join("");

  renderCharacters();
}






function drawCharacter(slotIndex) {

  console.log(
  "drawCharacter",
  slotIndex,
  isDrawing
);

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

const randomIndex = Math.floor(
  Math.random() * remainingCharacters.length
);

const finalCharacterId =
  remainingCharacters[randomIndex];

if (!finalCharacterId) return;

// 抽選済みとして取り除く
remainingCharacters.splice(randomIndex, 1);

// 一度使い切ったキャラとして記録
if (!usedCharacters.includes(finalCharacterId)) {
    usedCharacters.push(finalCharacterId);
}
  

  if (typeof gtag !== "undefined") {
  gtag("event", "draw_character");
}
  

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

   console.log(
  "抽選後",
  currentTeam.length,
  remainingCharacters.length,
  [...remainingCharacters]
);

playSuccess();


renderCharacters();
      

if (
  currentTeam.length < 8 &&
  remainingCharacters.length === 0
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

    remainingCharacters =
  remainingCharacters.filter(id => id !== characterId);

  } else {

    selectedCharacters.push(characterId);

    remainingCharacters.push(characterId);

  }

  renderCharacters();

  console.log(
  "toggle",
  selectedCharacters.length,
  [...selectedCharacters]
);

  
  saveSelectedCharacters();


}

window.toggleCharacter = toggleCharacter;




function renderCharacters() {

  document.getElementById("character-list").innerHTML =
    [...characters].reverse().map(character => {

  const selected =
    selectedCharacters.includes(character.id) &&
    remainingCharacters.includes(character.id)
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

  if (typeof gtag !== "undefined") {
  gtag("event", "next_team");
}

  teamHistory.push({
  team: [...currentTeam],
  stars: [0, 0, 0]
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

  ${[0,1,2].map(floor => `

    <div class="floor-stars">

      ${[1,2,3].map(star => `

<span
  class="star ${
    star <= entry.stars[floor]
      ? "filled"
      : ""
  }"
  onclick="
    setStars(
      ${index},
      ${floor},
      ${star}
    )
  "
>
  ${
    star <= entry.stars[floor]
      ? "★"
      : "☆"
  }
</span>

      `).join("")}

    </div>

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
      sum +
      entry.stars.reduce(
        (a, b) => a + b,
        0
      ),
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
  
function setStars(
  teamIndex,
  floor,
  stars
) {

  if (
    teamHistory[teamIndex]
      .stars[floor] === stars
  ) {

    teamHistory[teamIndex]
      .stars[floor] = stars - 1;

  } else {

    teamHistory[teamIndex]
      .stars[floor] = stars;
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

  remainingCharacters = [...selectedCharacters];

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

  console.log(
  "renderRemainingInfo",
  remainingCharacters.length,
  [...remainingCharacters]
);

const remainingList =
  characters.filter(
    character =>
      remainingCharacters.includes(character.id)
  );

  const fiveStars =
    remainingList.filter(
      character =>
        character.rarity === 5
    ).length;

  const fourStars =
    remainingList.filter(
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
        remainingList.filter(
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

  console.log(
  "usedCharacters",
  usedCharacters.length,
  [...usedCharacters]
);

console.log(
  "currentTeam",
  currentTeam.length,
  [...currentTeam]
);

  // 補充対象を作る（現在の組にいるキャラは除外）
  remainingCharacters = usedCharacters.filter(
    id => !currentTeam.includes(id)
  );

  console.log(
  "補充候補",
  remainingCharacters.length,
  [...remainingCharacters]
);

  document.getElementById("message-area").innerHTML = "";

  // 空いている枠を取得
  const emptySlots = [];

  for (let slotIndex = 0; slotIndex < 8; slotIndex++) {

    const slot = document.querySelector(
      `[data-slot="${slotIndex}"]`
    );

    if (
      slot &&
      slot.dataset.locked !== "true"
    ) {
      emptySlots.push(slotIndex);
    }
  }

  // 1人ずつ抽選する
  function drawNext() {

    if (emptySlots.length === 0) {
      return;
    }

    const slotIndex = emptySlots.shift();

    console.log(
  "補充開始",
  slotIndex,
  remainingCharacters.length,
  [...remainingCharacters]
);

    drawCharacter(slotIndex);

    // アニメーション終了待ち
    const timer = setInterval(() => {

      if (!isDrawing) {

        clearInterval(timer);

        drawNext();

      }

    }, 50);

  }

  drawNext();

}



window.fillRemainingTeam =
  fillRemainingTeam;



function generateShareCard() {

  const totalStars =
  teamHistory.reduce(
    (sum, entry) =>
      sum +
      entry.stars.reduce(
        (a, b) => a + b,
        0
      ),
    0
  );

  const averageStars =
    teamHistory.length > 0
      ? (
          totalStars /
          teamHistory.length
        ).toFixed(1)
      : 0;

  const usedCharacters =
    new Set(
      teamHistory.flatMap(
        entry => entry.team
      )
    ).size;

  const now =
    new Date();

  const dateText =
    now.toLocaleString(
      "ja-JP"
    );

  document.getElementById(
    "share-card"
  ).innerHTML = `

  
  <h1>挑戦結果</h1>

<div class="share-date">
  ${dateText}
</div>

<div class="share-summary">

  <div>
    出演 ${usedCharacters}人
  </div>

  <div>
    編成 ${teamHistory.length}組
  </div>

  <div>
    評価 ★${totalStars}
    / ${teamHistory.length * 9}
  </div>

  <div>
    平均 ★${averageStars}
  </div>

</div>

    <hr>

    ${teamHistory.map(
      (entry, index) => `

<div class="share-grid">

  ${entry.team.map(
    characterId => {

      const character =
        characters.find(
          c =>
            c.id ===
            characterId
        );

      return `
        <div
          class="
            share-character
            rarity-${character.rarity}
          "
        >

          <img
            src="${character.image}"
            class="share-character-image"
          >

        </div>
      `;
    }
  ).join("")}

</div>

<div class="share-team-header">

  <span class="team-number">
    ${index + 1}組目
  </span>

  <div class="share-stars">

  ${entry.stars.map(
    stars =>
      "★".repeat(stars) +
      "☆".repeat(3 - stars)
  ).join("｜")}

</div>

</div>

      `
    ).join("")}
  `;



  
  document.getElementById(
    "share-modal"
  ).style.display =
    "block";
}


document
  .getElementById(
    "show-share-card-button"
  )
  .addEventListener(
    "click",
    generateShareCard
  );

document
  .getElementById(
    "save-share-button"
  )
  .addEventListener(
    "click",
    saveShareCardAsImage
  );




async function saveShareCardAsImage() {

  const card =
    document.getElementById(
      "share-card"
    );

if (typeof gtag !== "undefined") {
  gtag("event", "save_image");
}
  
  if (!card) return;

  const canvas =
    await html2canvas(
      card,
      {
        backgroundColor:
          "#111111",
        scale: 2
      }
    );

canvas.toBlob(blob => {

  const url =
    URL.createObjectURL(blob);

  const isIPhone =
    /iPhone|iPod/.test(
      navigator.userAgent
    );

  const isIPad =
    /iPad/.test(
      navigator.userAgent
    );

  if (isIPhone) {

    location.href = url;

  } else if (isIPad) {

    window.open(url, "_blank");

  } else {

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      "genshin-random-team.png";

    link.click();
  }

}, "image/png");;
}



document
  .getElementById("share-button")
  .addEventListener(
    "click",
    shareResult
  );

async function shareResult() {

  const totalStars =
  teamHistory.reduce(
    (sum, entry) =>
      sum +
      entry.stars.reduce(
        (a, b) => a + b,
        0
      ),
    0
  );

  const usedCharacters =
    new Set(
      teamHistory.flatMap(
        entry => entry.team
      )
    ).size;

  const shareText =

`挑戦結果

出演 ${usedCharacters}人
編成 ${teamHistory.length}組
評価 ★${totalStars}/${teamHistory.length * 9}

ランダム編成メーカー:
${location.href}`;

  if (typeof gtag !== "undefined") {
  gtag("event", "share_result");
}

  if (navigator.share) {

    await navigator.share({
      title: "原神ランダム編成",
      text: shareText
    });

  } else {

    await navigator.clipboard.writeText(
      shareText
    );

    alert(
      "共有文をコピーしました"
    );
  }
}



window.shareResult = shareResult;





document
  .getElementById(
    "close-share-modal"
  )
  .addEventListener(
    "click",
    () => {

      document.getElementById(
        "share-modal"
      ).style.display =
        "none";
    }
  );
