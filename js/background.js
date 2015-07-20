chrome.runtime.onInstalled.addListener(function () {
    chrome.tabs.create({ url: 'http://www.usefl.co.kr' });
});