chrome.runtime.onConnect.addListener(function(connection) {
    chrome.cookies.get({
        url: "https://www.firebase.com/",
        name: "adminToken"
    }, function(cookie) {

        var xhr = new XMLHttpRequest();
        var firebases;
        xhr.open("GET", "https://admin.firebase.com/account?token=" + cookie.value, true);
        xhr.onreadystatechange = function() {
          if (xhr.readyState == 4) {
            firebases = JSON.parse(xhr.response).firebases;

            // Get Firebase secrets for each Firebase
            var cnt = 0;
            for(firebase in firebases) {
                cnt++;
                var xhr2 = new XMLHttpRequest(); // FIXME: XHRception
                xhr2.open("GET", "https://admin.firebase.com/firebase/" + firebase + "/token?token=" + cookie.value + "&namespace=" + firebase, false);
                xhr2.onreadystatechange = function() {
                    if(xhr2.readyState == 4) {
                        var tokens = JSON.parse(xhr2.response);
                        var personalToken = tokens.personalToken;
                        var xhr3 = new XMLHttpRequest();
                        xhr3.open("GET", "https://" + firebase + ".firebaseio.com/.settings/secrets.json?auth=" + personalToken, false);
                        xhr3.onreadystatechange = function() {
                            if(xhr3.readyState == 4) {
                                var secrets = JSON.parse(xhr3.response);
                                firebases[firebase]['secret'] = secrets[0];
                                if(cnt == Object.keys(firebases).length) {  // All Firebases enriched
                                    connection.postMessage(firebases);
                                }
                            }
                        };
                        xhr3.send();
                    }
                };
                xhr2.send();
            }
          }
        }
        xhr.send();
    });
});