import { getData, test } from "./index.js";
import { formatDistance, subDays } from "date-fns";

export const updateDom = function updateDom(days) {
    const gridContainer = document.querySelectorAll('.grid-item');
    const currrentTemp = document.querySelectorAll('.current-temp');
    const gridItem = [...gridContainer];
    console.log(gridItem)
    let i = 0
    gridItem.some((e) => {
        e.firstElementChild.children[0].children[0].innerHTML = convertDate(days[i].datetime);
        e.firstElementChild.children[0].children[1].innerHTML = `${days[i].temp}\u00B0`;
        e.firstElementChild.children[0].children[2].innerHTML = days[i].conditions;
        e.firstElementChild.children[1].firstElementChild.src = determineIcon(days[i].icon);
        e.lastElementChild.children[0].children[1].innerHTML = `${days[i].tempmax}\u00B0 / ${days[i].tempmin}\u00B0`;
        e.lastElementChild.children[1].children[1].innerHTML = `${days[i].precipprob}%`;
        e.lastElementChild.children[2].children[1].innerHTML = `${days[i].humidity}%`;
        e.lastElementChild.children[3].children[1].innerHTML = `${days[i].visibility} mi`
        e.lastElementChild.children[4].children[1].innerHTML = `${days[i].windspeed} mph`;
        i++;
        console.log(i)
    })
}

export const convertDate = function convertDate(value) {
    const date = new Date(value);
    const options = { 
        weekday: 'long',
        month: 'numeric',
        day: 'numeric'
    };
    return (Intl.DateTimeFormat('en-US',
        options).format(date));
  }

const determineIcon = function determineIcon(value) {
    console.log(value)
    switch (value) {
        case 'partly-cloudy-day':
            return '../svg/cloudy-1-day.svg';
        case 'rain':
            return '../svg/rainy-3.svg'; 
        case 'cloudy':
            return '../svg/cloudy.svg'; 
        case 'clear-day':
            return '../svg/clear-day.svg';  
        case 'snow':
            return '../svg/snowy-3.svg';  
        // default:
        //     return 'http://localhost:8080/81f5f6bda5defad4bb66.svg';    
    }
}

// http://localhost:8080/81f5f6bda5defad4bb66.svg