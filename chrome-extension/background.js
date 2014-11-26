chrome.runtime.onConnect.addListener(function(connection) {
    chrome.cookies.get({
        url: "https://www.firebase.com/",
        name: "adminToken"
    }, function(cookie) {
        console.log(cookie.value);

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://admin.firebase.com/account?token=" + cookie.value, true);
        xhr.onreadystatechange = function() {
          if (xhr.readyState == 4) {
            var firebases = JSON.parse(xhr.response).firebases;
            connection.postMessage(firebases);
          }
        }
        xhr.send();
    });
});