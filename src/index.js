import './style.css';

console.log('test');

const getData = async function getData(location) {
  try {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=S8PT6R6SWQ2SNK6EUXGTYJKGD&include=current,days&elements=datetime,temp,tempmin,tempmax,precipprob,windspeed,conditions,icon`);
    const data = await response.json();
    console.log(data);
  } catch {
    console.log('Did not work');
  } 

}

const form = document.querySelector('#form');
const input = document.querySelector('#search-bar');
  form.addEventListener('click', (e) => {
    if(e.target.matches('#submit')) {
        getData(input.value)
        input.value = '';
        e.preventDefault();
    }
  })
// getData('Elizabethtown');

//?key=S8PT6R6SWQ2SNK6EUXGTYJKGD

//&include+days&elements=temp,tempmin,tempmax,precipprob,windspeed,conditions,icon