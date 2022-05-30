import { IdentitiesApi } from "@trustedtwin/js-client";
import { useState } from "react";
import { handleResponseError } from "../utils/handleResponseError";
import { Panel } from "./Panel";
import { QueryButton } from "./QueryButton";

type Props = {
  identitiesApi: IdentitiesApi | undefined;
  twinId: string | undefined;
};

export const IdentitiesApiSubPanel = ({ identitiesApi, twinId }: Props) => {
  const [loading, setLoading] = useState(false);

  const identityId = "RFID#ae144bdc-0f6d-4a00-4091-1a6d793aaaa";

  const endpoints = [
    {
      name: "createTwinIdentity",
      method: "POST",
      path: "/twins/{twin}/identities",
      queryFn: async () => {
        setLoading(true);
        try {
          const identities = await identitiesApi?.createTwinIdentity({
            twin: twinId || "",
            postTwinIdentities: {
              identities: {
                [identityId]: {
                  validityTs: 1678270994.0,
                  visibility:
                    "USER.profession == 'accounting' or USER.profession == 'sales'",
                },
              },
            },
          });
          setLoading(false);
          //@ts-ignore
          alert(JSON.stringify(identities, null, 2));
        } catch (e) {
          await handleResponseError(e, setLoading);
        }
      },
    },
    {
      name: "getTwinIdentity",
      method: "GET",
      path: "/twins/{twin}/identities/{identity}",
      queryFn: async () => {
        setLoading(true);
        try {
          const identities = await identitiesApi?.getTwinIdentity({
            twin: twinId || "",
            identity: identityId,
          });
          setLoading(false);
          alert(JSON.stringify(identities, null, 2));
        } catch (e) {
          await handleResponseError(e, setLoading);
        }
      },
    },
    {
      name: "getTwinIdentities",
      method: "GET",
      path: "/twins/{twin}/identities",
      queryFn: async () => {
        setLoading(true);
        try {
          const identities = await identitiesApi?.getTwinIdentities({
            twin: twinId || "",
          });
          setLoading(false);
          alert(JSON.stringify(identities, null, 2));
        } catch (e) {
          await handleResponseError(e, setLoading);
        }
      },
    },
  ] as any[];

  return (
    <Panel
      title="Identities API"
      link="https://docs.trustedtwin.com/reference/identity.html"
      disabled={!twinId}
    >
      <ul role="list" className="divide-y divide-gray-200">
        {endpoints.map((endpoint) => (
          <li className="py-3 sm:py-4" key={endpoint.name}>
            {endpoint.name === "getTwinIdentity" ? (
              <p className=" mb-2 text-sm text-gray-300 text-ellipsis whitespace-nowrap overflow-hidden">
                Identity name:{" "}
                <span className="italic text-ellipsis">{identityId}</span>
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
      </ul>
    </Panel>
  );
};
