import { SecretsApi } from "@trustedtwin/js-client";
import { useState } from "react";
import { Panel } from "./Panel";
import { QueryButton } from "./QueryButton";

type Props = {
  secretsApi: SecretsApi | undefined;
  userId: string | undefined;
};

export const SecretsApiSubPanel = ({ secretsApi, userId }: Props) => {
  const [loading, setLoading] = useState(false);

  const endpoints = [
    {
      name: "createUserSecret",
      method: "POST",
      path: "/users/{user}/secrets",
      queryFn: async () => {
        setLoading(true);
        try {
          const response = await secretsApi?.createUserSecret({
            account: userId || "",
            pin: "testPin",
          });
          setLoading(false);
          alert(JSON.stringify(response, null, 2));
        } catch (e) {
          alert("error: " + JSON.stringify(e, null, 2));
          setLoading(false);
        }
      },
    },
    {
      name: "getUserSecret",
      method: "GET",
      path: "/users/{user}/secrets",
      queryFn: async () => {
        setLoading(true);
        try {
          const identities = await secretsApi?.getUserSecret({
            user: userId || "",
          });
          setLoading(false);
          alert(JSON.stringify(identities, null, 2));
        } catch (e) {
          alert("error: " + JSON.stringify(e, null, 2));
          setLoading(false);
        }
      },
    },
  ] as any[];

  return (
    <Panel
      title="Secrets API"
      link="https://docs.trustedtwin.com/reference/doc.html"
      disabled={!userId}
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
