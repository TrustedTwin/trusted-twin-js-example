import { RolesApi } from "@trustedtwin/js-client";
import { useState } from "react";
import { Panel } from "./Panel";
import { QueryButton } from "./QueryButton";

type Props = { rolesApi: RolesApi | undefined };

export const RolesApiPanel = ({ rolesApi }: Props) => {
  const [loading, setLoading] = useState(false);

  const endpoints = [
    {
      name: "createUserRole",
      method: "POST",
      path: "/roles",
      queryFn: async () => {
        setLoading(true);
        try {
          const log = await rolesApi?.createUserRole({
            postNewRole: { name: "newRoleName2" },
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
      name: "getUserRoles",
      method: "GET",
      path: "/roles",
      queryFn: async () => {
        setLoading(true);
        try {
          const log = await rolesApi?.getUserRoles();
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
      title="Roles API"
      link="https://docs.trustedtwin.com/reference/log.html"
      disabled={!rolesApi}
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
