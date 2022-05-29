import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { Spinner } from "./Spinner";
import classNames from "classnames";
import {
  TwinsApi,
  LogApi,
  ConfigurationParameters,
  Configuration,
  IdentitiesApi,
  LedgerApi,
  DocsApi,
  AccountApi,
  TimeseriesApi,
  RolesApi,
  UsersApi,
  SecretsApi,
} from "@trustedtwin/js-client";

type Props = {
  apiClient: TrustedTwinApi | undefined;
  setApiClient: Dispatch<SetStateAction<TrustedTwinApi | undefined>>;
  apiConnection: boolean | undefined;
  setApiConnection: Dispatch<SetStateAction<boolean | undefined>>;
};

export type TrustedTwinApi = {
  twinsApi: TwinsApi;
  logApi: LogApi;
  identitiesApi: IdentitiesApi;
  ledgerApi: LedgerApi;
  docsApi: DocsApi;
  accountApi: AccountApi;
  timeseriesApi: TimeseriesApi;
  rolesApi: RolesApi;
  usersApi: UsersApi;
  secretsApi: SecretsApi;
};

export const CreateApiClient = (apiKey: string) => {
  const configParams: ConfigurationParameters = {
    basePath: "/api", // in tailwind.config.js file there is a rewrite that defines proxy to bypass CORS on the rest server
    apiKey,
  };
  const apiConfig = new Configuration(configParams);

  const api: TrustedTwinApi = {
    twinsApi: new TwinsApi(apiConfig),
    logApi: new LogApi(apiConfig),
    identitiesApi: new IdentitiesApi(apiConfig),
    ledgerApi: new LedgerApi(apiConfig),
    docsApi: new DocsApi(apiConfig),
    accountApi: new AccountApi(apiConfig),
    rolesApi: new RolesApi(apiConfig),
    secretsApi: new SecretsApi(apiConfig),
    timeseriesApi: new TimeseriesApi(apiConfig),
    usersApi: new UsersApi(apiConfig),
  };
  return api;
};

export function ConnectToApiForm({
  apiClient,
  setApiClient,
  apiConnection,
  setApiConnection,
}: Props) {
  const inputEl = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setApiConnection(undefined);
    apiClient?.logApi
      .getLogRaw({})
      .then((r) => {
        if (r.raw.ok) {
          setApiConnection(true);
          if (inputEl.current) {
            inputEl.current.value = "";
          }
        } else {
          setApiConnection(false);
        }
      })
      .catch(() => setApiConnection(false));
  }, [apiClient]);

  const contitionalInputClasses = classNames({
    "bg-red-50 border-red-500 text-red-900 focus:ring-red-500 focus:border-red-500":
      apiClient && apiConnection === false,
  });

  if (apiConnection) {
    return (
      <p className="text-green-400 ">
        Connected to the Trusted Twin API server ✅
      </p>
    );
  } else {
    return (
      <form
        className="max-w-screen-sm"
        onSubmit={(event) => {
          event.preventDefault();
          setApiClient(CreateApiClient(event.currentTarget.apiKey.value));
        }}
      >
        <label htmlFor="apiKey" className="inline-block mb-2">
          {apiClient && apiConnection
            ? null
            : "To send requests enter your Trusted Twin rest API key"}
        </label>
        <div className="flex gap-2 flex-wrap items-start">
          <div className="flex-grow">
            <input
              type="text"
              name="apiKey"
              ref={inputEl}
              className={`w-full form-control px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${contitionalInputClasses}`}
              id="apiKey"
            />
            {apiClient && apiConnection === false ? (
              <label
                htmlFor="apiKey"
                className="block mb-2 text-sm text-red-600 "
              >
                Couldn't connect to the Trusted Twin API server
              </label>
            ) : null}
          </div>
          {apiClient !== undefined && apiConnection === undefined ? (
            <Spinner />
          ) : (
            <button
              type="submit"
              className="text-black hover:text-white bg-primary-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center"
            >
              submit
            </button>
          )}
        </div>
      </form>
    );
  }
}
