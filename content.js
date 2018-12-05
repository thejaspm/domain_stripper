var newurl;

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        String.prototype.replaceAll = function(search, replacement) {
            var target = this;
            return target.replace(new RegExp(search, 'g'), replacement);
        };

        var ipr = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/; //http://www.regular-expressions.info/examples.html
        var url_to_process = details.url
        var pattern = /compute.internal/;

        if (pattern.test(url_to_process)) // if it matches pattern defined above
        {
            const path = url_to_process.split('/')[2]
            var ip_component = path.replace("ip-", "").replaceAll('-', ".")
            const url_params = "/" + url_to_process.split('/').map((p, index) => index > 2 ? p : null).filter(p => p).join("/")
            var port
            if (path.indexOf(":") > -1) {
                const spl = path.split(":")
                port = ":" + spl[spl.length - 1]
            }
            const final = "http://" + ip_component.match(ipr)[0] + port + url_params
            return {
                redirectUrl: final
            };
        }
        return {
            redirectUrl: details.url
        }
    }, {
        urls: ["<all_urls>"]
    }, ["blocking"]);
