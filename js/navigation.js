const body = document.querySelector("body");

const changeContent = (elem, value) => (elem.textContent = value);
const changeLocalStorage = (key, value) => localStorage.setItem(key, value);
const changeKeybind = (event) => {
  const className = event.currentTarget.className;
  const elem = document.querySelector(`.${className.split(" ")[1]}`);
  elem.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();

    // NEED FIX with regEXP
    if (isUsedKey(key)) {
      //alert(`${key} is not avaliable`)
    } else {
      changeLocalStorage(className, key);
      changeContent(elem.firstChild, key);
    }
  });
};

const isUsedKey = (key) => {
  for (const deffKey of Object.keys(defaultKeys)) {
    if (localStorage.getItem(`keybind ${deffKey}`) === key) {
      return true;
    }
  }

  return false;
};

function redrawHtml(event) {
  if (typeof event === "string") {
    body.innerHTML = pagesData[event];
    pagesData[`${event}Scripts`]();
  } else {
    const targetClass = event.currentTarget.className.split("_").at(-1);
    body.innerHTML = pagesData[targetClass];
    pagesData[`${targetClass}Scripts`]();
  }
}

redrawHtml("menu");

Object.entries(defaultKeys).forEach(([key, value]) => {
  if (!localStorage.getItem(`keybind ${key}`)) {
    changeLocalStorage(`keybind ${key}`, value);
  }
});
