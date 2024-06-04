const pagesData = {
  menu: `
  <div class="text_center">
  <p class="text_gameName">SPELLBOUND</p>
  <!-- Большой текст с названием игры -->
  </div>
  <div>
  <a href="continue.html"
    ><button class="button_menu menu_continue">
      <p class="text_menu_but">CONTINUE</p>
    </button></a
  >
  <!-- Кнопка "продолжить" -->
  
    <button class="button_menu menu_newGame">
      <p class="text_menu_but">NEW GAME</p>
    </button></a
  >
  <!-- Кнопка "новая игра" -->

    <button class="button_menu menu_settings">
      <p class="text_menu_but">SETTINGS</p>
    </button>
  <!-- Кнопка "настройки" -->
  </div>
  `,
  menuScripts() {
    document
      .querySelectorAll(".button_menu")
      .forEach((button) => button.addEventListener("click", redrawHtml));
  },
  newGame: `
  <a href="javascript:redrawHtml('menu')" class="text_back">&larr; Go Back</a>
  <div class="stages">
  </div>
  `,
  newGameScripts() {
    const stagesDiv = document.querySelector(".stages");
    function createStages(stages) {
      for (let i = 0; i < stages; i += 1) {
        const stageIndex = i % 3;
        if (stageIndex === 0) {
          stagesDiv.insertAdjacentHTML(
            "beforeend",
            `
        <div class="stages_group">
        </div>`,
          );
        }

        stagesDiv.lastChild.insertAdjacentHTML(
          "beforeend",
          `
          <button class="stage stage_margin stage${i + 1}">
            <span class="text_stage">STAGE ${i + 1}</span>
          </button>`,
        );
        const stageStyle = document.getElementsByClassName(`stage${i + 1}`)[0]
          .style;
        stageStyle["background-size"] = "cover";
        stageStyle["background-image"] = `url(img/stage${i + 1}.png)`;
      }
    }
    createStages(9);
  },
  settings: `
<a href="javascript:redrawHtml('menu')" class="text_back">&larr; Go Back</a>
<div class="settings">
  <p class="text_control">CONTROLLS</p>
  <div class = "skills">
  <img src="img/skill_water.png" class="skill_img" /><span class="text_keybind">
    - Q </span
  ><br />
  <img src="img/skill_fire.png" class="skill_img" /><span
    class="text_keybind"
  >
    - W </span><br />
  <img src="img/skill_air.png" class="skill_img" /><span
    class="text_keybind"
  >
    - E </span
  ><br />
  <img src="img/skill_earth.png" class="skill_img" /><span
    class="text_keybind"
  >
    - R
  </span>
  </div>
  <div class="set_keybind">
  <p class="text_binding">
  Set keybinds
  <button class="keybinds_reset"><span class="text_reset">RESET</span></button>
</p>
<button class="keybind water"><span class="text_bin_key"></span></button>
<button class="keybind fire"><span class="text_bin_key"></span></button>
<button class="keybind air"><span class="text_bin_key"></span></button>
<button class="keybind earth"><span class="text_bin_key"></span></button>
  </div>
</div>`,
  settingsScripts() {
    document
      .querySelector(".keybinds_reset")
      .addEventListener("click", resetKeybinds);

    const buttons = document.querySelectorAll(".keybind");

    buttons.forEach((button) => {
      const name = button.className;
      if (!localStorage.getItem(name)) {
        changeLocalStorage(name, defaultKeys[name.split(" ")[1]]);
      }
      changeContent(
        button.firstChild,
        localStorage.getItem(button.className) ??
          defaultKeys[button.className.split(" ")[1]],
      );
      button.addEventListener("click", (event) => changeKeybind(event));
    });

    function resetKeybinds() {
      Object.entries(defaultKeys).forEach(([key, value]) => {
        changeLocalStorage(`keybind ${key}`, value);
        changeContent(
          document.querySelector(`.keybind.${key}`).firstElementChild,
          value,
        );
      });
    }
  },
};

const defaultKeys = {
  water: "q",
  fire: "w",
  air: "e",
  earth: "r",
};
