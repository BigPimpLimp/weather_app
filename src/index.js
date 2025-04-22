import './style.css';
import { updateDom } from './dom.js';
console.log('test');

export const getData = async function getData(location) {
  try {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=S8PT6R6SWQ2SNK6EUXGTYJKGD&include=current,days&elements=datetime,conditions,temp,tempmin,tempmax,humidity,precipprob,windspeed,visibility,conditions,icon`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch {
    alert('Error fetching data');
    return;
  } 
}
  
const form = document.querySelector('#form');
const input = document.querySelector('#search-bar');
  form.addEventListener('click', (e) => {
    if(e.target.matches('#submit')) {
        getData(input.value)
          .then(result => {
            updateDom(result.days)
          })
          .catch(error => {
            console.log(error)
            return;
          })
        input.value = '';
        e.preventDefault();
    }
  })

//?key=S8PT6R6SWQ2SNK6EUXGTYJKGD
