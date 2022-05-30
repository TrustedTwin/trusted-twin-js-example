import { LedgerApi } from "@trustedtwin/js-client";
import { useState } from "react";
import { handleResponseError } from "../utils/handleResponseError";
import { Panel } from "./Panel";
import { QueryButton } from "./QueryButton";

type Props = {
  ledgerApi: LedgerApi | undefined;
  twinId: string | undefined;
};

export const LedgerApiSubPanel = ({ ledgerApi, twinId }: Props) => {
  const [loading, setLoading] = useState(false);

  const endpoints = [
    {
      name: "addTwinLedgerEntry",
      method: "POST",
      path: "/twins/{twin}/ledgers/{ledger}",
      queryFn: async () => {
        setLoading(true);
        try {
          const identities = await ledgerApi?.addTwinLedgerEntry({
            twin: twinId || "",
            ledger: "personal",
            postLedgerEntries: {
              entries: {
                key1: {
                  value: "123",
                },
              },
            },
          });
          setLoading(false);
          alert(JSON.stringify(identities, null, 2));
        } catch (e) {
          await handleResponseError(e, setLoading);
        }
      },
    },
    {
      name: "getTwinLedgerEntry",
      method: "GET",
      path: "/twins/{twin}/ledgers/{ledger}",
      queryFn: async () => {
        setLoading(true);
        try {
          const identities = await ledgerApi?.getTwinLedgerEntry({
            twin: twinId || "",
            ledger: "personal",
          });
          setLoading(false);
          alert(JSON.stringify(identities, null, 2));
        } catch (e) {
          await handleResponseError(e, setLoading);
        }
      },
    },
    {
      name: "updateTwinLedgerEntry",
      method: "PATCH",
      path: "/twins/{twin}/ledgers/{ledger}",
      queryFn: async () => {
        setLoading(true);
        try {
          const identities = await ledgerApi?.updateTwinLedgerEntry({
            twin: twinId || "",
            ledger: "personal",
            patchUserLedger: {
              entries: {
                key1: {
                  value: "456",
                },
              },
            },
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
      title="Ledger API"
      link="https://docs.trustedtwin.com/reference/ledger.html"
      disabled={!twinId}
    >
      <ul role="list" className="divide-y divide-gray-200">
        {endpoints.map((endpoint) => (
          <li className="py-3 sm:py-4" key={endpoint.name}>
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
