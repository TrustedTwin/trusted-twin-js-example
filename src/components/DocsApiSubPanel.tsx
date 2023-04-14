import { DocsApi } from "@trustedtwin/js-client";
import { useState } from "react";
import { handleResponseError } from "../utils/handleResponseError";
import { Panel } from "./Panel";
import { QueryButton } from "./QueryButton";

type Props = {
  docsApi: DocsApi | undefined;
  twinId: string | undefined;
};

export const DocsApiSubPanel = ({ docsApi, twinId }: Props) => {
  const [loading, setLoading] = useState(false);

  const endpoints = [
    {
      name: "createUploadURL",
      method: "POST",
      path: "/cache",
      queryFn: async () => {
        setLoading(true);
        try {
          const response = await docsApi?.createUploadUrl();
          setLoading(false);
          alert(JSON.stringify(response, null, 2));
        } catch (e) {
          await handleResponseError(e, setLoading);
        }
      },
    },
    {
      name: "getTwinDocs",
      method: "GET",
      path: "/twins/{twin}/docs",
      queryFn: async () => {
        setLoading(true);
        try {
          const response = await docsApi?.getTwinDocs({
            twin: twinId || "",
          });
          setLoading(false);
          alert(JSON.stringify(await response, null, 2));
        } catch (e) {
          await handleResponseError(e, setLoading);
        }
      },
    },
    {
      name: "deleteTwinDocs",
      method: "GET",
      path: "/twins/{twin}/docs",
      queryFn: async () => {
        setLoading(true);
        try {
          const response = await docsApi?.deleteTwinDocs({
            twin: twinId || "",
          });
          setLoading(false);
          alert(JSON.stringify(await response, null, 2));
        } catch (e) {
          await handleResponseError(e, setLoading);
        }
      },
    },
  ] as any[];

  return (
    <Panel
      title="Docs API"
      link="https://docs.trustedtwin.com/reference/doc.html"
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
