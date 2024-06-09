const body = document.querySelector("body");
const changeContent = (elem, value) => {
  elem.textContent = value;
};
const changeLocalStorage = (key, value) => localStorage.setItem(key, value);
const changeKeybind = (event) => {
  const { className } = event.currentTarget;
  const elem = document.querySelector(`.${className.split(" ")[1]}`);
  elem.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();

    // NEED FIX with regEXP
    if (isUsedKey(key)) {
      // alert(`${key} is not avaliable`)
    } else {
      changeLocalStorage(className, key);
      changeContent(elem.firstChild, key);
    }
  });
};
const isUsedKey = (key) => {
  const defKeys = Object.keys(defaultKeys);
  for (let i = 0; i < defKeys.length; i += 1) {
    if (localStorage.getItem(`keybind ${defKeys[i]}`) === key) {
      return true;
    }
  }
  return false;
};
const redrawHtml = (event) => {
  if (typeof event === "string") {
    body.innerHTML = pagesData[event];
    pagesData[`${event}Scripts`]();
  } else {
    const targetClass = event.currentTarget.className.split("_").at(-1);
    body.innerHTML = pagesData[targetClass];
    pagesData[`${targetClass}Scripts`]();
  }
};
function preload(dir, files, type) {
  for (let i = 0; files.length > i; i += 1) {
    img = new Image(0, 0);
    img.src = `${dir}${files[i]}${type}`;
    img.className += "preload";
    body.insertAdjacentElement("afterbegin", img);
    body.removeChild(img);
  }
}
redrawHtml("menu");
preload("./img/", pngTypeNames, ".png");
Object.entries(defaultKeys).forEach(([key, value]) => {
  if (!localStorage.getItem(`keybind ${key}`)) {
    changeLocalStorage(`keybind ${key}`, value);
  }
});
