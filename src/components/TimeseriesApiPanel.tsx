import { TimeseriesApi } from "@trustedtwin/js-client";
import { useState } from "react";
import { Panel } from "./Panel";
import { QueryButton } from "./QueryButton";

type Props = { timeseriesApi: TimeseriesApi | undefined };

export const TimeseriesApiPanel = ({ timeseriesApi }: Props) => {
  const [loading, setLoading] = useState(false);

  const endpoints = [
    {
      name: "createTimeseriesTable",
      method: "POST",
      path: "/account/services/timeseries",
      queryFn: async () => {
        setLoading(true);
        try {
          const log = await timeseriesApi?.createTimeseriesTable({
            timeseriesTables: {
              timeseries: {
                additionalProp1: {
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
          alert(JSON.stringify(e, null, 2));
          setLoading(false);
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
          const log = await timeseriesApi?.getTimeseriesTables();
          setLoading(false);
          alert(JSON.stringify(log, null, 2));
        } catch (e) {
          alert(JSON.stringify(e, null, 2));
          setLoading(false);
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
