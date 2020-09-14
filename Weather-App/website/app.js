// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
const baseURL='https://api.openweathermap.org/data/2.5/weather?zip='; 
const apiKey='6006e098e58065687b0fc1b80adb76f9'; //account used to signup: yazeed.abdulhai@icloud.com

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e)
{   
    const feelings = document.getElementById('feelings').value;
    let date = new Date();
    let newDate = (date.getMonth()+1) + '/' + date.getDate() + '/' + date.getFullYear();  
    //Added 1 to the month as new Date() returns values ranging from 0 to 11
    
    const zipCode= document.getElementById("zip").value;
    const content = document.getElementById("feelings").value;
    getWeatherData(baseURL,zipCode,apiKey)    
    .then(function(data){
        postData('/addWeather',{city: data.name, temp: data.main.temp ,date: newDate, feelings: feelings});
        updateUI('/all');
    });
}

/* Function to GET Web API Data*/
const getWeatherData = async (baseURL, zipCode, apiKey) =>{
  const res = await fetch(baseURL + zipCode + '&appid=' + apiKey+'&units=metric') //used &units=metric to get the temp in celsius

  try {
    const data = await res.json();
    console.log(data);
    return data
  }  catch(err) { //error handling
    console.log("error", err);
  }
}

/* Function to GET Project Data */
const getWeather = async(url) =>{
    const result = await fetch(url);
    try{
        const entry = await result.json();
        console.log(entry);
        return entry
    }catch(err) { //handling error
        console.log("error", err)
    }
}

/* Function to POST data */
const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin', 
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });
    try {
      const newData = await response.json();
      console.log(newData);
      return newData;
    }catch(err) { //handling error
    console.log("error", err);
    }
};

/*Function to update the UI*/
const updateUI = async(url='')=>{
  const request = await fetch(url);

    try{
        const data = await request.json();
        console.log(data);
        //Updating the UI through accessing their ids by the selector
        document.getElementById('date').innerHTML= 'Date: '+data[0].date;
        document.getElementById('city').innerHTML= 'City: '+data[0].city+' , United States of America';
        document.getElementById('temp').innerHTML= 'Temperature: '+data[0].temp+'°C';          
        document.getElementById('content').innerHTML= 'Feelings: '+data[0].feelings;
      
      } catch(error){
        console.log("error", error);
    }
}

