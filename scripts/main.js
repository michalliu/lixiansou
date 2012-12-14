/*global document,chrome,setTimeout*/
void function () {

    var doc = document,

        files = doc.querySelectorAll('h3 > a.a_filename'),
    
        frag = doc.createDocumentFragment(),

        div = doc.createElement('div'),

        textarea = doc.createElement('textarea');

    div.style.cssText = 'position:fixed;right:10px;top:10px;bottom:10px;width:300px;border:1px solid #FCA9C6;';

    textarea.style.cssText = 'border:0;width:100%;height:100%;resize:none;';

    textarea.id = 'tet';

    textarea.onmouseover = function (e) {
       e.stopPropagation();
       this.select();
       chrome.extension.sendRequest({'command':'copyToClipboard',data:textarea.value}, function (response) {
           showTip(response, '网址已成功复制到剪贴板');
       });
    }

    textarea.onmouseout = function (e) {
        e.stopPropagation();
        this.blur();
    }

    div.appendChild(textarea);
    
    frag.appendChild(div);

    function fillText() {

        var text = [];

        for (var i=0,l=files.length,file; i<l && (file = files[i]); i++) {

            text.push(file.href);

        }

        textarea.value = text.join('\n\n');

    }

    fillText();

    function showTip(success, message) {

        var tip = doc.getElementById('tip');

        if (!tip) {

            tip = doc.createElement('div');

            tip.id = 'tip';

            tip.style.cssText = 'position:absolute;left:50%;top:50%;width:160px;height:40px;line-height:40px;text-align:center;margin-top:-50px;margin-left:-80px;color:white;background-color:#0a4;opacity:0;-webkit-transition: opacity 200ms linear;border-radius:5px;';

            tip.innerHTML = message;

            document.body.appendChild(tip);

        }

        setTimeout(function () {

            tip.style.opacity = 1;

        },0);

        setTimeout(function () {

            tip.style.opacity = 0;

        },1000);

    }

    doc.body.appendChild(frag);

}();
