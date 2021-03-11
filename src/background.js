chrome.webRequest.onBeforeSendHeaders.addListener(
	(details) => {
		for (let header in details.requestHeaders) {
			const name = details.requestHeaders[header].name.toLowerCase();
			if (/referer|origin/.test(name)) {
				details.requestHeaders[header].value =
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
	const elts = url.split(".");
	let offset = 2;
	if (elts[elts.length - 2] == "co") {
		offset = 3;
	}
	return elts.slice(elts.length - offset, elts.length).join(".");
}
