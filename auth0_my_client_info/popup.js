function open_options_window() {
    chrome.tabs.create({url:'settings.html'});
}

function fetch_client_information() {

    chrome.storage.sync.get({  
        auth0domain: '',
        access_token: '',
        auth0audience: '',
    }, function(items) {
    
        var xhr = new XMLHttpRequest();
        xhr.open("GET", items.auth0audience + 'clients', true);
        xhr.setRequestHeader("Authorization", "Bearer "+ items.access_token);
        xhr.onreadystatechange = function () {

            if (xhr.readyState === 4 && xhr.status === 200) {

                var json = JSON.parse(xhr.responseText);

                console.log(json);

                var table = '<table>';
                table += '<tr><th>Tenant</th><th>App Name</th><th>App Type</th><th>Client Id</th>';

                json.forEach(function(el) {                
                    if (typeof el.app_type === 'undefined') {
                        return;
                    }
                
                    table += '<tr>';
                    table += '<td>' + el.tenant + '</td>';
                    table += '<td>' + el.name + '</td>';
                    table += '<td>' + el.app_type + '</td>';
                    table += '<td>' + el.client_id + '</td>';
                    table += '</tr>';
                });

                table += '</table>';
                document.getElementById("tableWrapper").innerHTML = table;
                
            }
        };
        xhr.send();
    });


}

document.getElementById('settings').addEventListener('click', open_options_window);
document.getElementById('info').addEventListener('click', fetch_client_information);
