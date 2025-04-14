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
    const gridItem = [...gridContainer];
    let i = 0
    gridItem.some((e) => {
        e.firstElementChild.children[0].innerHTML = days[i].datetime;
        e.lastElementChild.children[0].innerHTML = days[i].temp;
        e.lastElementChild.children[1].innerHTML = days[i].tempmax;
        e.lastElementChild.children[2].innerHTML = days[i].tempmin;
        e.lastElementChild.children[3].innerHTML = days[i].precipprob;
        i + 1;
    })
}



