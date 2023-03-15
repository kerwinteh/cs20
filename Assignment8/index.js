//AJAX
const req = new XMLHttpRequest();
req.onreadystatechange = function () {
  if(req.readyState === 4 && req.status === 200) {
      const json = JSON.parse(req.responseText);
      $("#AJAX").append("Name: " + json.data[0]["id"] + "<br/>");
      $("#AJAX").append("Symbol: " + json.data[0]["symbol"] + "<br/>");
      price = parseInt(json.data[0]["priceUsd"]);
      $("#AJAX").append("Price (USD):  " + price.toFixed(2));
  }
};
req.open("GET", "https://api.coincap.io/v2/assets?ids=bitcoin", true);
req.send();


fetch("https://api.coincap.io/v2/assets?ids=bitcoin")
    .then(res => res.json())
    .then(json => {
        $("#fetch").append("Name: " + json.data[0]["id"] + "<br/>");
        $("#fetch").append("Symbol: " + json.data[0]["symbol"] + "<br/>");
        price = parseInt(json.data[0]["priceUsd"]);
        $("#fetch").append("Price (USD):  " + price.toFixed(2));
    })