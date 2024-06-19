const body = document.querySelector('body');
const changeContent = (elem, value) => {
  elem.textContent = value;
};
const changeLocalStorage = (key, value) => localStorage.setItem(key, value);
const changeKeybind = (event) => {
  const { className } = event.currentTarget;
  const elem = document.querySelector(`.${className.split(' ')[1]}`);
  elem.addEventListener('keyup', (e) => {
    const keyCode = e.code.toLowerCase();
    if (keyCode.startsWith('key')) {
      const key = keyCode.at(-1);
      if (!isUsedKey(key)) {
        changeLocalStorage(className, key);
        changeContent(elem.firstChild, key);
      }
    }
  });
};
const isUsedKey = (key) => {
  for (let i = 0; i < defKeys.length; i += 1) {
    if (localStorage.getItem(`keybind ${defKeys[i]}`) === key) {
      return true;
    }
  }
  return false;
};
const redrawPage = (event) => {
  const redraw = (className) => {
    const [target, additional = null] = className.split('_');
    if (target === 'menu') {
      body.classList = ['menu_bg'];
      body.querySelector('.content').innerHTML = pagesData[className];
      pagesData[`${className}Scripts`]();
    } else {
      body.classList = ['figth_stage_bg'];
      body.querySelector('.content').innerHTML = pagesData[target];
      pagesData[`${target}Scripts`](additional);
    }
  };
  redraw(event.currentTarget.className.split(' ').at(-1));
};

async function preload(dir, files, type, preloadI = 0) {
  img = new Image(0, 0);
  img.src = `${dir}${files[preloadI]}${type}`;
  img.className += 'preload';
  body.querySelector('.preload').insertAdjacentElement('afterbegin', img);
  img.onload = () => {
    setTimeout(() => {
      body.querySelector('.preload').removeChild(img);
      if (preloadI < files.length - 1) {
        preload(dir, files, type, preloadI + 1);
      } else body.removeChild(body.querySelector('.preload'));
    }, 50);
  };
}

Object.values(entities).forEach(({ imgUrl }) => pngTypeNames.push(imgUrl.split('.png')[0].split('/').at(-1)));

preload('./img/', pngTypeNames, '.png');
body.querySelector('.static').insertAdjacentHTML(
  'afterbegin',
  `<audio id="bg-audio" autoplay muted loop>
  <source src="./audio/sound-bg.mp3" type="audio/mpeg"> </audio>`,
);
const playAudio = () => {
  audio
    .play()
    .then(() => {
      audio.muted = false;
      window.removeEventListener('click', playAudio);
    })
    .catch(() => {});
};
const audio = document.getElementById('bg-audio');
const audioStatus = localStorage.getItem('audioStatus');
if (audioStatus === null) localStorage.setItem('audioStatus', 'play');
if (localStorage.getItem('audioVolume') === null) localStorage.setItem('audioVolume', '0.5');
audio.volume = localStorage.getItem('audioVolume');
if (localStorage.getItem('audioStatus') === 'play') window.addEventListener('click', playAudio);
redrawPage({ currentTarget: { className: 'menu' } });
Object.entries(defaultKeybinds).forEach(([key, value]) => {
  if (!localStorage.getItem(`keybind ${key}`)) {
    changeLocalStorage(`keybind ${key}`, value);
  }
});
if (!localStorage.getItem('currentStage')) {
  localStorage.setItem('currentStage', 1);
}
