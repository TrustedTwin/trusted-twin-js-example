# trusted twin js client example app

## Running the app locally

You can run the app locally by cloning it to your repository:

```bash
git clone git@github.com:TrustedTwin/TrustedTwin-js-client.git
cd TrustedTwin-js-example
npm install
```

then creating a `.env` file by copying the `.env.example` and entering your Trusted Twin api key in the API_KEY variable.

run `npm run dev`, navigate in your browser to `localhost:3000` and you should be able to make requests to the trustetTwin server.

## @trustedtwin/js-client usage

This example app shows how to use the @trustedtwin/js-client package. First, you have to create object with configuration:

```tsx
import {
  Configuration,
  ConfigurationParameters,
  TwinsApi,
} from "@trustedtwin/js-client";

const configParams: ConfigurationParameters = {
  basePath: process.env.API_PATH,
  apiKey: process.env.API_KEY,
};
const apiConfig = new Configuration(configParams);

export const apiClient = {
  twinApi: new TwinsApi(apiConfig),
};

export type ApiClient = typeof apiClient;
```

> :warning: **don't publish app with your api key in the source code or enter it on untrusted websites**

## Credits

Created by [@mcalus3](https://github.com/mcalus3/) for [Trusted Twin](https://trustedtwin.com/)

Licensed under the MIT License, Copyright © 2022

See [LICENSE](LICENSE) for more information.
