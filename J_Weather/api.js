
async function getData() {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=alwar&appid=1af77fe152bea2a7f96f45b102c97dbf";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error(error.message);
    }
  }

  getData();