chrome.runtime.onInstalled.addListener(function() {
    // ...

    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
        // changeInfo object: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/onUpdated#changeInfo
        // status is more reliable (in my case)
        // use "alert(JSON.stringify(changeInfo))" to check what's available and works in your case
        if (changeInfo.status === 'complete') {
            if (tab.url.includes('https://opensea.io/assets/')) {
                chrome.tabs.executeScript(tab.id, {
                    file: 'socket.io.min.js'
                }, function() {
                    chrome.tabs.executeScript(tab.id, { file: 'Anubis.js' });
                });

            }

            chrome.tabs.sendMessage(tabId, {
                message: 'TabUpdated'
            });
        }
    })
});