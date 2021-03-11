# referer

Chrome plugin to override the referrer and the origin request header on each request. If any, they will be changed by the hostname of the requested url.

Example:

Request url from https://medium.com: `https://accounts.google.com/gsi/status`

Requested unchanged header:

```
origin: https://medium.com
referer: https://yahoo.fr.com
```

Requested changed header:

```
origin: https://google.com
referer: https://google.com
```

This example is also an example to warn you that this will break (on purpose) the google SSO because they check the `origin` to allow or not a request attempt. (So be aware that this may break other services that use the same header).

## How to install

- Download this repo
- Unzip it
- Go to `chrome://extensions` or `brave://extensions`
- Enable dev mode
- Drag and drop the folder
