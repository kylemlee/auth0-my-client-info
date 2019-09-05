function save_settings() {
    
    var auth0domain = document.getElementById('auth0domain').value;
    var auth0cliendid = document.getElementById('auth0cliendid').value;
    var auth0clientsecret = document.getElementById('auth0clientsecret').value;
    var auth0audience = document.getElementById('auth0audience').value;

    chrome.storage.sync.set({
        auth0domain: auth0domain,
        auth0cliendid: auth0cliendid,
        auth0clientsecret: auth0clientsecret,
        auth0audience: auth0audience,
    },function() {
        var status = document.getElementById('status');
        status.textContent = 'Saved..';
        setTimeout(function() {
          status.textContent = '';
        }, 800);
    });
}

function restore_settings() {

    chrome.storage.sync.get({  
        auth0domain: '',
        auth0cliendid: '',
        auth0clientsecret: '',
        auth0audience: '',
    }, function(items) {
        document.getElementById('auth0domain').value = items.auth0domain;
        document.getElementById('auth0cliendid').value = items.auth0cliendid;
        document.getElementById('auth0clientsecret').value = items.auth0clientsecret;
        document.getElementById('auth0audience').value = items.auth0audience;
    });
}

function reset_settings() {
    chrome.storage.sync.set({
        auth0domain: '',
        auth0cliendid: '',
        auth0clientsecret: '',
        auth0audience: '',
        access_token : '',
    },function() {
        var status = document.getElementById('status');
        status.textContent = 'Reset Complete..';
        document.getElementById('auth0domain').value = '';
        document.getElementById('auth0cliendid').value = '';
        document.getElementById('auth0clientsecret').value = '';
        document.getElementById('auth0audience').value = '';
        setTimeout(function() {
          status.textContent = '';
        }, 800);
    });
}


document.addEventListener('DOMContentLoaded', restore_settings);
document.getElementById('save').addEventListener('click', save_settings);
document.getElementById('reset').addEventListener('click', reset_settings);