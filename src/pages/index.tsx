import { useState } from "react";
import { Header } from "../components/Header";
import {
  ConnectToApiForm,
  TrustedTwinApi,
} from "../components/ConnectToApiForm";

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

      {!apiConnection ? (
        <ConnectToApiForm
          apiClient={apiClient}
          setApiClient={setApiClient}
          apiConnection={apiConnection}
          setApiConnection={setApiConnection}
        />
      ) : (
        <p className="m-3 text-green-600 ">
          Connected to the Trusted Twin API server ✅
        </p>
      )}

      {apiClient && apiConnection ? (
        <div className="flex flex-col gap-3 m-3">{"make requests"}</div>
      ) : null}

      <footer className="text-center text-black bg-white mt-auto">
        © Copyright {new Date().getFullYear()}{" "}
        <a href="https://trustedtwin.com/">Trusted Twin</a>
      </footer>
    </div>
  );
};

export default Index;
