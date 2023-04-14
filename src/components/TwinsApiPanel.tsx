import { useState } from "react";
import { handleResponseError } from "../utils/handleResponseError";
import { TrustedTwinApi } from "./ConnectToApiForm";
import { DocsApiSubPanel } from "./DocsApiSubPanel";
import { IdentitiesApiSubPanel } from "./IdentitiesApiSubPanel";
import { LedgerApiSubPanel } from "./LedgerApiSubPanel";
import { Panel } from "./Panel";
import { QueryButton } from "./QueryButton";

type Props = { apiClient: TrustedTwinApi | undefined };

export const TwinsApiPanel = ({ apiClient }: Props) => {
  const twinsApi = apiClient?.twinsApi;
  const [twinId, setTwinId] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const endpoints = [
    {
      name: "createTwin",
      method: "POST",
      path: "/twins",
      queryFn: async () => {
        setLoading(true);
        try {
          const twinAlive = await twinsApi?.createTwin({
            description: { description: { key1: "testDescription" } },
          });
          setLoading(false);
          setTwinId(twinAlive?.creationCertificate?.uuid);
          alert(JSON.stringify(twinAlive, null, 2));
        } catch (e) {
          await handleResponseError(e, setLoading);
        }
      },
    },
    {
      name: "getTwin",
      method: "GET",
      path: "/twins/{twin}",
      queryFn: async () => {
        setLoading(true);
        try {
          const twin = await twinsApi?.getTwin({ twin: twinId || "" });
          setLoading(false);
          alert(JSON.stringify(twin, null, 2));
        } catch (e) {
          await handleResponseError(e, setLoading);
        }
      },
    },
    {
      name: "terminateTwin",
      method: "DELETE",
      path: "/twins/{twin}",
      queryFn: async () => {
        setLoading(true);
        try {
          const terminationCertificate = await twinsApi?.terminateTwin({
            twin: twinId || "",
          });
          setLoading(false);
          alert(JSON.stringify(terminationCertificate, null, 2));
        } catch (e) {
          await handleResponseError(e, setLoading);
        }
      },
    },
  ] as any[];

  return (
    <Panel
      title="Twins API"
      link="https://docs.trustedtwin.com/reference/twin.html"
      disabled={!apiClient}
    >
      <ul role="list" className="divide-y divide-gray-200">
        {endpoints.map((endpoint) => (
          <li className="py-3 sm:py-4" key={endpoint.name}>
            {endpoint.name === "getTwin" ? (
              <p className=" mb-2 text-sm text-gray-300 text-ellipsis whitespace-nowrap overflow-hidden">
                Twin uuid:{" "}
                <span className="italic text-ellipsis">
                  {twinId || "not created"}
                </span>
              </p>
            ) : null}
            <div className="flex items-center space-x-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{endpoint.name}</p>
                <p className="text-sm text-gray-400 truncate">
                  {endpoint.method} {endpoint.path}
                </p>
              </div>
              <QueryButton onClick={endpoint.queryFn} loading={loading}>
                execute request
              </QueryButton>
            </div>
          </li>
        ))}
        <IdentitiesApiSubPanel
          identitiesApi={apiClient?.identitiesApi}
          twinId={twinId}
        />
        <LedgerApiSubPanel ledgerApi={apiClient?.ledgerApi} twinId={twinId} />
        <DocsApiSubPanel docsApi={apiClient?.docsApi} twinId={twinId} />
      </ul>
    </Panel>
  );
};
