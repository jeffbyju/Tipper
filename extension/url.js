chrome.tabs.query({'active': true, 'lastFocusedWindow': true, 'currentWindow': true}, function (tabs) {
    var url = tabs[0].url;
    if(url == "https://www.doordash.com/en-US" || url == "https://www.grubhub.com/" || url == "https://www.instacart.com/" || url == "https://www.ubereats.com/"){
        p = document.createElement("p");
        p.setAttribute('style', 'text-align: center;');
        p.innerHTML = "URL: " + url;
        document.body.appendChild(p);
        console.log(url);
    }  
});