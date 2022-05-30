import { TimeseriesApi } from "@trustedtwin/js-client";
import { useState } from "react";
import { handleResponseError } from "../utils/handleResponseError";
import { Panel } from "./Panel";
import { QueryButton } from "./QueryButton";

type Props = { timeseriesApi: TimeseriesApi | undefined };

export const TimeseriesApiPanel = ({ timeseriesApi }: Props) => {
  const [table, setTable] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const endpoints = [
    {
      name: "createTimeseriesTable",
      method: "POST",
      path: "/account/services/timeseries",
      queryFn: async () => {
        setLoading(true);
        try {
          const id = "timeseries" + makeid(5);
          setTable(id);
          const log = await timeseriesApi?.createTimeseriesTable({
            timeseriesTables: {
              timeseries: {
                [id]: {
                  dimensions: {
                    names: ["jtd2ev2j_lz6ojpe5sclx42hiqipgzu5ar"],
                    types: ["int"],
                  },
                  measurements: {
                    names: ["ugd5v9z6xn"],
                    types: ["int"],
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
      name: "getTimeseriesTables",
      method: "GET",
      path: "/account/services/timeseries",
      queryFn: async () => {
        setLoading(true);
        try {
          const table = await timeseriesApi?.getTimeseriesTables();
          setLoading(false);
          alert(JSON.stringify(table, null, 2));
        } catch (e) {
          await handleResponseError(e, setLoading);
        }
      },
    },
    {
      name: "updateTimeseriesTable",
      method: "PATCH",
      path: "/account/services/timeseries",
      queryFn: async () => {
        setLoading(true);
        try {
          const log = await timeseriesApi?.updateTimeseriesTable({
            timeseries: table || "",
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
      title="Timeseries API"
      link="https://docs.trustedtwin.com/reference/timeseries.html"
      disabled={!timeseriesApi}
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
