import { getData, test } from "./index.js";
import { formatDistance, subDays } from "date-fns";


export const updateCard = function updateCard(data) {

}

export const getDate = function getDate(result) {
    const date = new Date(result).getDay();
    addDate(result)
  }

const addDate = function addDate(days) {
    const gridContainer = document.querySelectorAll('.grid-item');
    const currrentTemp = document.querySelectorAll('.current-temp');
    const gridItem = [...gridContainer];
    console.log(gridItem)
    let i = 0
    gridItem.some((e) => {
        e.firstElementChild.children[0].children[0].innerHTML = days[i].datetime;
        e.firstElementChild.children[0].children[1].innerHTML = days[i].temp;
        e.firstElementChild.children[0].children[2].innerHTML = days[i].conditions;
        e.lastElementChild.children[0].children[1].innerHTML = `${days[i].tempmax} / ${days[i].tempmin}`;
        e.lastElementChild.children[1].children[1].innerHTML = `${days[i].precipprob}%`;
        e.lastElementChild.children[2].children[1].innerHTML = `${days[i].humidity}%`;
        e.lastElementChild.children[3].children[1].innerHTML = `${days[i].visibility} mi`
        e.lastElementChild.children[4].children[1].innerHTML = `${days[i].windspeed} mph`;
        i++;
        console.log(i)
    })
}



