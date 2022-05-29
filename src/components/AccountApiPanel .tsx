import { AccountApi } from "@trustedtwin/js-client";
import { useState } from "react";
import { Panel } from "./Panel";
import { QueryButton } from "./QueryButton";

type Props = { accountApi: AccountApi | undefined };

export const AccountApiPanel = ({ accountApi }: Props) => {
  const [loading, setLoading] = useState(false);

  const endpoints = [
    {
      name: "createUserSecret",
      method: "POST",
      path: "/secrets/{account}/{pin}",
      queryFn: async () => {
        setLoading(true);
        try {
          const log = await accountApi?.createUserSecret({
            account: "",
            pin: "",
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
      name: "createUserRole",
      method: "POST",
      path: "/roles",
      queryFn: async () => {
        setLoading(true);
        try {
          const log = await accountApi?.createUserRole({
            postNewRole: { name: "roleName" },
          });
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
      title="Account API"
      link="https://docs.trustedtwin.com/reference/user-authentication.html"
      disabled={!accountApi}
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
