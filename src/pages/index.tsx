import { useState } from "react";
import { Header } from "../components/Header";
import {
  ConnectToApiForm,
  TrustedTwinApi,
} from "../components/ConnectToApiForm";
import { TwinsApiPanel } from "../components/TwinsApiPanel";
import { LogApiPanel } from "../components/LogApiPanel";
import { GithubLink } from "../components/GithubLink";
import { TimeseriesApiPanel } from "../components/TimeseriesApiPanel";
import { UsersApiPanel } from "../components/UsersApiPanel";
import { RolesApiPanel } from "../components/RolesApiPanel ";
import { IndexesApiPanel } from "../components/IndexesApiPanel";

const Index = () => {
  const [apiClient, setApiClient] = useState<TrustedTwinApi | undefined>(
    undefined
  );
  const [apiConnection, setApiConnection] = useState<true | false | undefined>(
    undefined
  );

  return (
    <div className="flex flex-col min-h-screen gap-3">
      <Header />
      <div className="max-w-5xl w-full self-center px-3 space-y-3">
        <ConnectToApiForm
          apiClient={apiClient}
          setApiClient={setApiClient}
          apiConnection={apiConnection}
          setApiConnection={setApiConnection}
        />

        <TwinsApiPanel apiClient={apiConnection ? apiClient : undefined} />

        <TimeseriesApiPanel
          timeseriesApi={apiConnection ? apiClient?.timeseriesApi : undefined}
        />

        <IndexesApiPanel
          indexesApi={apiConnection ? apiClient?.indexesApi : undefined}
        />

        <UsersApiPanel apiClient={apiConnection ? apiClient : undefined} />

        <RolesApiPanel
          rolesApi={apiConnection ? apiClient?.rolesApi : undefined}
        />

        <LogApiPanel logApi={apiConnection ? apiClient?.logApi : undefined} />
      </div>
      <GithubLink />
      <footer className="text-center text-black bg-white mt-auto">
        © Copyright {new Date().getFullYear()}{" "}
        <a href="https://trustedtwin.com/">Trusted Twin</a>
      </footer>
    </div>
  );
};

export default Index;
