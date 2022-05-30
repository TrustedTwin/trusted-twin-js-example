import { LogApi } from "@trustedtwin/js-client";
import { useState } from "react";
import { handleResponseError } from "../utils/handleResponseError";
import { Panel } from "./Panel";
import { QueryButton } from "./QueryButton";

type Props = { logApi: LogApi | undefined };

export const LogApiPanel = ({ logApi }: Props) => {
  const [loading, setLoading] = useState(false);

  const endpoints = [
    {
      name: "getLog",
      method: "GET",
      path: "/log",
      queryFn: async () => {
        setLoading(true);
        try {
          const log = await logApi?.getLog();
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
      title="Log API"
      link="https://docs.trustedtwin.com/reference/log.html"
      disabled={!logApi}
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
