import './style.css';
import { updateDom, unhideGrid, updateLocation, updateTemp } from './dom.js';
import { is } from 'date-fns/locale';
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
const checkbox = document.querySelector('#checkbox');
  form.addEventListener('click', (e) => {
    if(e.target.matches('#submit')) {
        getData(input.value)
          .then(result => {
            updateLocation(result.resolvedAddress)
            updateDom(result.days)
            unhideGrid()
            storeItem('temps', result.days)
          })
          .catch(error => {
            console.log(error)
            return;
          })
        input.value = '';
        e.preventDefault();
    }
  })
  checkbox.addEventListener('click', (e) => {
    convertDegree();

  })

const returnCelcius = function convert(value) {

    let x = (5 / 9) * (value - 32);
    return String(x).slice(0, 4)
}  

const returnFahrenheit = function convert(value) {
    return (value * (9 / 5)) + 32;
}

const convertDegree = function convertDegree(value) {
    const isActive = checkbox.checked;
    const celcius = (5 / 9) * (value - 32);
    const fahrenheit =  (value * (9 / 5)) + 32;

    if (isActive) {
      let newArr = [];
      const arr = retrieveItem('temps')
      console.log('break')
      arr.forEach(e => {
        console.log('test')
          let obj = { 
            tempmax: returnCelcius(e.tempmax),
            tempmin: returnCelcius(e.tempmin),
            temp: returnCelcius(e.temp)
          }
          newArr.push(obj);
      });
      console.log(newArr)
      updateTemp(newArr, 'C')
      storeItem('celc', newArr)
    }
    if (!isActive) {
      let newArr = []
      const arr = retrieveItem('temps')
      arr.forEach(e => {
        let obj = {
          tempmax: (e.tempmax),
          tempmin: (e.tempmin),
          temp: (e.temp)
        }
        newArr.push(obj);
      })
      updateTemp(newArr, 'F')
      console.log(newArr)
    }
}

const storeItem = function storeItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

const retrieveItem = function retrieveItem(value) {
    return JSON.parse(localStorage.getItem(value))
}