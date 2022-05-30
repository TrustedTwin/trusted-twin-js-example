import { IndexesApi } from "@trustedtwin/js-client";
import { useState } from "react";
import { handleResponseError } from "../utils/handleResponseError";
import { Panel } from "./Panel";
import { QueryButton } from "./QueryButton";

type Props = { indexesApi: IndexesApi | undefined };

export const IndexesApiPanel = ({ indexesApi }: Props) => {
  const [index, setIndex] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const endpoints = [
    {
      name: "createIndexesTable",
      method: "POST",
      path: "/account/services/indexes",
      queryFn: async () => {
        setLoading(true);
        try {
          const id = "index" + makeid(5);
          setIndex(id);
          const log = await indexesApi?.createIndexesTable({
            indexTables: {
              indexes: {
                [id]: {
                  rule: "LEDGER.gdansk_temperature > 10",
                  properties: {
                    names: [
                      "gdansk_temperature",
                      "gdansk_ozone",
                      "gdansk_relative_humidity",
                    ],
                    types: ["real", "real", "real"],
                  },
                  templates: {
                    properties: {
                      gdansk_temperature: "{LEDGER[gdansk_temperature]}",
                      gdansk_ozone: "{LEDGER[gdansk_ozone]}",
                      gdansk_relative_humidity:
                        "{LEDGER[gdansk_relative_humidity]}",
                    },
                  },
                },
              },
            },
          });
          setLoading(false);
          alert(JSON.stringify(log, null, 2));
        } catch (e) {
          await handleResponseError(e, setLoading);
        }
      },
    },
    {
      name: "getIndexesTable",
      method: "GET",
      path: "/account/services/indexes/{index}",
      queryFn: async () => {
        setLoading(true);
        try {
          const table = await indexesApi?.getIndexesTable({
            index: index || "",
          });
          setLoading(false);
          alert(JSON.stringify(table, null, 2));
        } catch (e) {
          await handleResponseError(e, setLoading);
        }
      },
    },
    {
      name: "updateIndexesTable",
      method: "PATCH",
      path: "/account/services/indexes/{index}",
      queryFn: async () => {
        setLoading(true);
        try {
          const log = await indexesApi?.updateIndexesTable({
            index: index || "",
            indexTableUpdate: { rule: "LEDGER.gdansk_temperature > 5" },
          });
          setLoading(false);
          alert(JSON.stringify(log, null, 2));
        } catch (e) {
          await handleResponseError(e, setLoading);
        }
      },
    },
  ] as any[];

  return (
    <Panel
      title="Indexes API"
      link="https://docs.trustedtwin.com/reference/indexes.html"
      disabled={!indexesApi}
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

function makeid(length: number) {
  var result = "";
  var characters = "abcdefghijklmnopqrstuvwxyz";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
