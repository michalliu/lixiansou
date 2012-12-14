/*global document,chrome,setTimeout*/
void function () {

    var doc = document;
    
    void function () {
        var frag = doc.createDocumentFragment(),
    
            div = doc.createElement('div'),
    
            copyAll = doc.createElement('a'),
    
            textarea = doc.createElement('textarea');
    
        div.style.cssText = 'position:fixed;right:10px;top:10px;bottom:10px;width:300px;';
    
        textarea.style.cssText = 'border:0;width:100%;height:100%;resize:none;border:1px solid #FCA9C6;';
    
        copyAll.innerText = '全部复制到剪贴板';
    
        copyAll.href = '#';
    
        copyAll.onclick = function () {
           requestCopyData(textarea.value);
           return false;
        };
    
        div.appendChild(copyAll);
        div.appendChild(textarea);
        
        frag.appendChild(div);
    
        void function fillText() {
    
            var text = [];
    
            var files = doc.querySelectorAll('h3 > a.a_filename');
    
            for (var i=0,l=files.length,file; i<l && (file = files[i]); i++) {
    
                text.push(file.href);
    
            }
    
            textarea.value = text.join('\n\n');
    
        }();

        doc.body.appendChild(frag);
    }();

    void function () {

        var urls = doc.querySelectorAll('.url');

        var coreForEach = Array.prototype.forEach;

        coreForEach.call(urls, function (el) {
            var a = doc.createElement('a');
            var s = '复制到剪贴板';
            var l = el.lastElementChild;
            var link = l && l.getAttribute('qhref') || '';
            a.innerText = s;
            a.href = '#';
            a.title = s;
            a.setAttribute('qhref',link);
            a.setAttribute('role', 'copy');
            a.setAttribute('onclick', 'return false;');
            el.appendChild(a);
        });

    }();

    void function () {
        var result = document.getElementById('result');
        result.onclick = function (e) {
            var srcEl = e.srcElement;
            if (srcEl.getAttribute('role') === 'copy') {
                requestCopyData(srcEl.getAttribute('qhref'));
            }
        };
    }();

    function requestCopyData(data) {
       chrome.extension.sendMessage({'command':'copyToClipboard',data:data}, function (response) {
           showTip(response, '网址已成功复制到剪贴板');
       });
    }

    function showTip(success, message) {

        var tip = doc.getElementById('tip');

        if (!tip) {

            tip = doc.createElement('div');

            tip.id = 'tip';

            tip.style.cssText = 'position:fixed;left:50%;top:50%;width:160px;height:40px;line-height:40px;text-align:center;margin-top:-50px;margin-left:-80px;color:white;background-color:#0a4;opacity:0;-webkit-transition: opacity 200ms linear;border-radius:5px;';

            tip.innerHTML = message;

            document.body.appendChild(tip);

        }

        setTimeout(function () {

            tip.style.opacity = 1;

        }, 0);

        setTimeout(function () {

            tip.style.opacity = 0;

        }, 1000);

    }

}();
