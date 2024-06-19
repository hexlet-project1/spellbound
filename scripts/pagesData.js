const pagesData = {
  menu: `
  <div class="text_center">
    <p class="text_gameName">SPELLBOUND</p>
  </div>
  <button class="button_menu menu_newGame">
    <p class="text_menu_but">NEW GAME</p>
  </button>
  <button class="button_menu menu_settings">
    <p class="text_menu_but">SETTINGS</p>
  </button>`,
  menuScripts() {
    if (localStorage.getItem('currentStage') > 1) {
      document.querySelector('.menu_newGame').insertAdjacentHTML(
        'beforebegin',
        `
      <button class="button_menu menu_continue">
        <p class="text_menu_but">CONTINUE</p>
      </button>`,
      );
    }
    document
      .querySelectorAll('.button_menu')
      .forEach((button) => button.addEventListener('click', redrawPage));
  },
  menu_continue: `
  <a href="javascript:redrawPage(menu)" class="text_back">&larr; Go Back</a>
  <div class="stages">
  </div>`,
  menu_continueScripts() {
    const stagesDiv = document.querySelector('.stages');
    const insertStages = (stages) => {
      for (let i = 0; i < stages; i += 1) {
        const stageIndex = i % 3;
        if (stageIndex === 0) {
          stagesDiv.insertAdjacentHTML(
            'beforeend',
            `<div class="stages_group">
            </div>`,
          );
        }
        stagesDiv.lastChild.insertAdjacentHTML(
          'beforeend',
          `
          <button class="stage stage_margin stage_${i + 1}">
            <span class="text_stage">STAGE ${i + 1}</span>
          </button>`,
        );
        const stageElem = document.getElementsByClassName(`stage_${i + 1}`)[0];
        const stageStyle = stageElem.style;
        stageStyle['background-size'] = 'cover';
        stageStyle['background-image'] = `url(img/stage${i + 1}.png)`;
        stageElem.addEventListener('click', redrawPage);
      }
    };
    insertStages(Number(localStorage.getItem('currentStage')));
  },
  menu_newGame: '',
  menu_newGameScripts() {
    redrawPage({ currentTarget: { className: 'stage_1' } });
  },
  menu_settings: `
  <a href="javascript:redrawPage(menu)" class="text_back">&larr; Go Back</a>
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
  <div class="settings-audio">
    <p class="text_binding">Audio settings</p>
    <div class="audio_elements">
      <button class="change-pause">
        <span class="text_bin_key">
          ${localStorage.getItem('audioStatus') === 'play' ? 'pause' : 'play'} music
        </span>
      </button>
    <div class="volume">
      <input type="range" id="volume" name="volume" min="0" max="1" step="0.01"/><br>
      <label class="text_bin_key" for="volume">music volume</label>
    </div>
    </div>
  </div>
  </div>
  `
  ,
  menu_settingsScripts() {
    const buttons = document.querySelectorAll('.keybind');
    buttons.forEach((button) => {
      const { className } = button;
      const skillName = className.split(' ')[1];
      if (!localStorage.getItem(className)) {
        changeLocalStorage(className, defaultKeybinds[skillName]);
      }
      changeContent(
        button.firstChild,
        localStorage.getItem(className) ?? defaultKeybinds[skillName],
      );
      button.addEventListener('click', (event) => changeKeybind(event));
    });
    const resetKeybinds = () => {
      Object.entries(defaultKeybinds).forEach(([key, value]) => {
        changeLocalStorage(`keybind ${key}`, value);
        changeContent(
          document.querySelector(`.keybind.${key}`).firstElementChild,
          value,
        );
      });
    };
    body
      .querySelector('.keybinds_reset')
      .addEventListener('click', resetKeybinds);
    body.querySelector('.change-pause').addEventListener('click', () => {
      const audio = document.getElementById('bg-audio');
      const audioButSpan = body.querySelector('.change-pause').querySelector('span');
      if (audio.paused) {
        audio.play()
        audioButSpan.innerText = 'pause music';
        localStorage.setItem('audioStatus', 'play')
      }
      else {
        audio.pause()
        audioButSpan.innerText = 'play music';
        localStorage.setItem('audioStatus', 'pause')
      }
    })
    const volumeForm = document.getElementById('volume')
    volumeForm.value = localStorage.getItem('audioVolume');
    volumeForm.addEventListener('input', () => {
      audio.volume = volume.value;
      localStorage.setItem('audioVolume', volume.value)
    })
  },
  stage: `
    <a href="javascript:redrawPage(menu);" class="text_back">&larr; Go Back</a>
    <div class="cont">
    <div>
      <div class="hp player-hp"></div>
      <div class= "player-energy"></div>
      <div class="hp enemy-hp"></div>
      <div class="enemy-energy"></div>
    </div>
      <div class ="entities">
        <div class="player">
          <img>
        </div>
        <div class="enemy">
          <img>
        </div>
      </div>
      <div class="interaction">
        <div class="fight_skills">
          <div class="skill_position water">
            <img src="img/skill_water.png" class ="skill_img"/>
            <p class="fight_skills_text"></p>
          </div>
          <div class="skill_position fire">
            <img src="img/skill_fire.png" class ="skill_img"/>
            <p class="fight_skills_text"></p>
          </div>
          <div class="skill_position air">
            <img src="img/skill_air.png" class ="skill_img"/>
            <p class="fight_skills_text"></p>
          </div>
          <div class="skill_position earth">
            <img src="img/skill_earth.png" class ="skill_img"/>
            <p class="fight_skills_text"></p>
          </div>
          <div class="skill_postion dodge">
            <img src="img/skill_dodge.png" class="dodge_img"/>
            <p class="fight_skills_text"><span>space</span></p>
          </div>
        </div>
        <div class="arrows">
          <img src="img/arrow_horizon.png" class="arrow arrow_left" />
          <img src="img/arrow_vertical.png" class="arrow arrow_up" />
          <img src="img/arrow_vertical.png" class="arrow arrow_down" />
          <img src="img/arrow_horizon.png" class="arrow arrow_right" />
        </div>
      </div>
    </div>
  `,
  stageScripts(stage) {
    body.style['background-image'] = `url(img/stage${stage}.png)`;
    defKeys.forEach((skillName) => {
      const skillDiv = document.getElementsByClassName(skillName)[0];
      const skillP = skillDiv.querySelector('p');
      skillP.innerText = localStorage.getItem(`keybind ${skillName}`);
    });
    function changeBorder(skillName, imgClass) {
      Object.values(document.getElementsByClassName(imgClass)).forEach((e) => {
        e.style.borderColor = '#381015';
      });
      document
        .getElementsByClassName(skillName)[0]
        .querySelector('img').style.borderColor = 'rgb(236, 236, 61)';
    }
    function keyAction(event) {
      if (player.info.currentHp < 0) {
        document.removeEventListener('keyup', keyAction);
        return;
      }
      const codeKey = event.code.toLowerCase();
      if (codeKey.startsWith('key')) {
        const keys = Object.keys(defaultKeybinds);
        for (let i = 0; i < keys.length; i += 1) {
          const skillName = keys[i];
          if (codeKey.at(-1) === localStorage.getItem(`keybind ${skillName}`)) {
            changeBorder(skillName, 'skill_img');
            game.clearArrows();
            game.changeArrow();
            game.choosenElement = skillName;
            return;
          }
        }
      } else if (codeKey.startsWith('arrow')) {
        if (game.choosenElement === null) return;
        if (!game.arrowActions(codeKey)) {
          document.removeEventListener('keyup', keyAction);
          game.choosenElement = null;
          game.clearArrows();
        }
      } else if (codeKey === 'space') {
        if (game.dodgeReady) {
          game.dodgeReady = false;
          document.documentElement.style.setProperty(
            '--player-energy-color',
            'aqua',
          );
          const dodgeImgStyle = body.querySelector('.dodge_img').style;
          dodgeImgStyle['border-color'] = 'cyan';
          game.enemyDmg = 25;
          setTimeout(() => {
            document.documentElement.style.setProperty(
              '--player-energy-color',
              'rgb(236, 236, 61)',
            );
            game.enemyDmg = 100;
            dodgeImgStyle['border-color'] = 'rgba(221, 24, 24, 0.835)';
            document.documentElement.style.setProperty(
              '--player-energy-color',
              'rgba(221, 24, 24, 0.835)',
            );
            setTimeout(() => {
              game.dodgeReady = true;
              dodgeImgStyle['border-color'] = 'rgb(236, 236, 61)';
              document.documentElement.style.setProperty(
                '--player-energy-color',
                'rgb(236, 236, 61)',
              );
            }, 2500);
          }, 1100);
        }
      }
    }
    document.addEventListener('keyup', keyAction);
    const player = new Entity(entities.player);
    const enemies = getEnemiesStage(stage);
    const game = new GameTurns(player, enemies, stage);
    document.querySelector('.player').querySelector('img').src = player.info.imgUrl;
    const playerStyles = Object.entries(player.info.styles);
    for (let i = 0; playerStyles.length > i; i += 1) {
      document.querySelector('.player').querySelector('img').style[playerStyles[i][0]] = playerStyles[i][1];
    }
    document.querySelector('.enemy').querySelector('img').src = enemies.at(-1).info.imgUrl;
    const enemyStyles = Object.entries(enemies.at(-1).info.styles);
    for (let i = 0; enemyStyles.length > i; i += 1) {
      document.querySelector('.enemy').querySelector('img').style[enemyStyles[i][0]] = enemyStyles[i][1];
    }
    game.changeHpbar('--enemy-hp-percent');
    game.changeHpbar('--player-hp-percent');
    game.changeEnergy('--enemy-energy');
    game.changeEnergy('--player-energy');
    game.choosenElement = null;
    game.dodgeReady = true;
    game.clearArrows();
    const id = setInterval(() => {
      if (!document.querySelector('.cont')) {
        clearInterval(id);
        game.changeHpbar('--player-hp-percent');
        game.changeHpbar('--enemy-hp-percent');
        game.clearEnemies();
        game.choosenElement = null;
        return;
      }
      if (!game.tryAttack('enemies')) {
        clearInterval(id);
      }
    }, 1000);
  },
};
const menu = { currentTarget: { className: 'menu' } };
const defaultKeybinds = {
  water: 'q',
  fire: 'w',
  air: 'e',
  earth: 'r',
};
const arrowsDirections = ['left', 'up', 'down', 'right'];
const cssDirections = {
  left: 'right',
  up: 'bottom',
  down: 'top',
  right: 'left',
};
const defKeys = Object.keys(defaultKeybinds);
const maxStage = 9;
const pngTypeNames = [
  'menu_bg',
  'skill_air',
  'skill_earth',
  'skill_fire',
  'skill_water',
  'skill_dodge',
  'arrow_horizon',
  'arrow_vertical',
];
for (let i = 0; i < maxStage; i += 1) {
  pngTypeNames.push(`stage${i + 1}`);
}
