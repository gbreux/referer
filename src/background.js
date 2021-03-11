chrome.webRequest.onBeforeSendHeaders.addListener(
	function (details) {
		var gotRef = false;
		var gotOrigin = false;
		for (var n in details.requestHeaders) {
			gotRef = /referer/.test(details.requestHeaders[n].name.toLowerCase());
			gotOrigin = /origin/.test(details.requestHeaders[n].name.toLowerCase());
			if (gotOrigin || gotRef) {
				details.requestHeaders[n].value =
					"https://" + parseDomain(new URL(details.url).hostname);
			}
		}
		return { requestHeaders: details.requestHeaders };
	},
	{
		urls: ["<all_urls>"],
	},
	[
		"requestHeaders",
		"blocking",
		chrome.webRequest.OnBeforeSendHeadersOptions.EXTRA_HEADERS,
	].filter(Boolean)
);

function parseDomain(url) {
	var elts = url.split(".");
	var offset = 2;
	if (elts[elts.length - 2] == "co") {
		offset = 3;
	}
	return elts.slice(elts.length - offset, elts.length).join(".");
}
