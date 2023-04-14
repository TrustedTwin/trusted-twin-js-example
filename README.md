# trusted twin js client example app

## Running the app locally

You can run the app locally by cloning it to your repository:

```bash
git clone git@github.com:TrustedTwin/TrustedTwin-js-client.git
cd TrustedTwin-js-example
npm install
```

run `npm run dev`, navigate in your browser to `localhost:3000` and after providing your api key you should be able to make requests to the trustetTwin server.

## @trustedtwin/js-client usage

@trustedtwin/js-client library can be used in the browser or node.js environment. It has a Promise-based methods that wrap individual REST API endpoint calls.

This example app shows how to use the @trustedtwin/js-client package in the web app. First, you have to create object with configuration and initialise api service object for the API module you will be using:

```tsx
import {
  Configuration,
  ConfigurationParameters,
  TwinsApi,
} from "@trustedtwin/js-client";

export const CreateApiClient = (apiKey: string) => {
  const configParams: ConfigurationParameters = {
    basePath: "/api", // if you use client  proxy to bypass CORS on the rest server
    apiKey,
    headers: {
      "X-TrustedTwin":
        "your-x-trustedTwin-header",
      Authorization: apiKey,
    },
  };
  const apiConfig = new Configuration(configParams);

  return new TwinsApi(apiConfig);
```

then uou can use the servce object to make requests. If you are only interested in the data returned by the endpoint, use regular api methods:

```tsx
[...]
const twinAlive = await twinsApi.createTwin();
setTwinId(twinAlive?.creationCertificate?.uuid);
[...]
```

or use the methods with the 'Raw' suffix if you want to read the response metadata:

```tsx
[...]
const response = await twinsApi.createTwinRaw();
const {headers, ok, redirected, status, statusText, type, url} = response.raw;
[...]
```

List of REST API endpoints id available at the TrustedTwin docs: [https://docs.trustedtwin.com/reference/twin.html](https://docs.trustedtwin.com/reference/twin.html)

> :warning: **don't publish app with your api key in the source code or enter it on untrusted websites**

## Credits

Created by [@mcalus3](https://github.com/mcalus3/) for [Trusted Twin](https://trustedtwin.com/)

Licensed under the MIT License, Copyright © 2022

See [LICENSE](LICENSE) for more information.
