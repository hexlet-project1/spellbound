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
      body.innerHTML = pagesData[className];
      pagesData[`${className}Scripts`]();
    } else {
      body.classList = ['figth_stage_bg'];
      body.innerHTML = pagesData[target];
      pagesData[`${target}Scripts`](additional);
    }
  };
  redraw(event.currentTarget.className.split(' ').at(-1));
};
function preload(dir, files, type) {
  for (let i = 0; files.length > i; i += 1) {
    img = new Image(0, 0);
    img.src = `${dir}${files[i]}${type}`;
    img.className += 'preload';
    body.insertAdjacentElement('afterbegin', img);
    body.removeChild(img);
  }
}

Object.values(entities).forEach(({ imgUrl }) => pngTypeNames.push(imgUrl.split('.png')[0].split('/').at(-1)));

preload('./img/', pngTypeNames, '.png');
redrawPage({ currentTarget: { className: 'menu' } });
Object.entries(defaultKeybinds).forEach(([key, value]) => {
  if (!localStorage.getItem(`keybind ${key}`)) {
    changeLocalStorage(`keybind ${key}`, value);
  }
});
if (!localStorage.getItem('currentStage')) {
  localStorage.setItem('currentStage', 1);
}
