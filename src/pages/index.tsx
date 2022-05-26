import { useState } from "react";
import { Header } from "../components/Header";
import {
  ConnectToApiForm,
  TrustedTwinApi,
} from "../components/ConnectToApiForm";
import { TwinsApiPanel } from "../components/TwinsApiPanel";

const Index = () => {
  const [apiClient, setApiClient] = useState<TrustedTwinApi | undefined>(
    undefined
  );
  const [apiConnection, setApiConnection] = useState<true | false | undefined>(
    undefined
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <ConnectToApiForm
        apiClient={apiClient}
        setApiClient={setApiClient}
        apiConnection={apiConnection}
        setApiConnection={setApiConnection}
      />

      <TwinsApiPanel TwinsApi={apiClient?.twinApi} />

      <footer className="text-center text-black bg-white mt-auto">
        © Copyright {new Date().getFullYear()}{" "}
        <a href="https://trustedtwin.com/">Trusted Twin</a>
      </footer>
    </div>
  );
};

export default Index;
