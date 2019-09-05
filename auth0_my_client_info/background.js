
chrome.storage.sync.get({  
    auth0domain: '',
    auth0cliendid: '',
    auth0clientsecret: '',
    auth0audience: '',
}, function(items) {

    if ( items.auth0domain && items.auth0cliendid && items.auth0clientsecret && items.auth0audience) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", items.auth0domain, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var json = JSON.parse(xhr.responseText);
                chrome.storage.sync.set({
                    access_token: json.access_token,
                });
            }
        };
        var data = JSON.stringify({"client_id": items.auth0cliendid, "client_secret": items.auth0clientsecret, "audience" : items.auth0audience, "grant_type": "client_credentials"});
        xhr.send(data);
    }


});
