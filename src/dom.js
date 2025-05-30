const icons = {
  "partly-cloudy-day": () => import("./svg/cloudy-1-day.svg"),
  rain: () => import("./svg/rainy-3.svg"),
  cloudy: () => import("./svg/cloudy.svg"),
  "clear-day": () => import("./svg/clear-day.svg"),
  snow: () => import("./svg/snowy-3.svg"),
};

export const unhideGrid = function unhideGrid() {
  document.getElementById("grid-container").style.visibility = "visible";
};

const loadSVG = async function (key) {
  try {
    const module = await icons[key]();
    return module.default;
  } catch (error) {
    console.log("SVGs did not load");
    return null;
  }
};

export const updateDom = async function updateDom(days) {
  const gridContainer = document.querySelectorAll(".grid-item");
  const gridItem = [...gridContainer];

  for (let i = 0; i < gridItem.length; i++) {
    const e = gridItem[i];

    e.firstElementChild.children[0].children[0].innerHTML = convertDate(
      days[i].datetime,
    );
    e.firstElementChild.children[0].children[1].innerHTML = `${days[i].temp}\u00B0F`;
    e.firstElementChild.children[0].children[2].innerHTML = days[i].conditions;
    e.firstElementChild.children[1].firstElementChild.src = await determineIcon(
      days[i].icon,
    );
    e.lastElementChild.children[0].children[1].innerHTML = `${days[i].tempmax}\u00B0F / ${days[i].tempmin}\u00B0F`;
    e.lastElementChild.children[1].children[1].innerHTML = `${days[i].precipprob}%`;
    e.lastElementChild.children[2].children[1].innerHTML = `${days[i].humidity}%`;
    e.lastElementChild.children[3].children[1].innerHTML = `${days[i].visibility} mi`;
    e.lastElementChild.children[4].children[1].innerHTML = `${days[i].windspeed} mph`;
  }
};

const convertDate = function convertDate(value) {
  const date = new Date(value + "T00:00:00");
  const options = {
    weekday: "long",
    month: "numeric",
    day: "numeric",
  };
  return Intl.DateTimeFormat("en-US", options).format(date);
};

const determineIcon = async function determineIcon(value) {
  if (icons[value]) {
    return await loadSVG(value);
  } else {
    console.log(`Unknown icon value ${value}`);
  }
};

export const updateLocation = function updateLocation(value) {
  const e = document.getElementById("location");
  e.innerHTML = `${value}`;
};

export const updateTemp = function updateTemp(arr, symbol) {
  const gridContainer = document.querySelectorAll(".grid-item");
  const gridItem = [...gridContainer];

  for (let i = 0; i < gridItem.length; i++) {
    const e = gridItem[i];

    e.firstElementChild.children[0].children[1].innerHTML = `${arr[i].temp}\u00B0${symbol}`;
    e.lastElementChild.children[0].children[1].innerHTML = `${arr[i].tempmax}\u00B0${symbol} / ${arr[i].tempmin}\u00B0${symbol}`;
  }
};
