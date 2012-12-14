/*global document,chrome*/
var doc = document,
    area = doc.getElementById('clipboardDataHolder');
chrome.extension.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.command === 'copyToClipboard') {
            area.value = request.data;
            area.select();
			console.log('damn');
            sendResponse(document.execCommand('copy'));
        }
    }
);
