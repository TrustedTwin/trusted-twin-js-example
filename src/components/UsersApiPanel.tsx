import { useState } from "react";
import { handleResponseError } from "../utils/handleResponseError";
import { TrustedTwinApi } from "./ConnectToApiForm";
import { Panel } from "./Panel";
import { QueryButton } from "./QueryButton";
import { SecretsApiSubPanel } from "./SecretsApiSubPanel";

type Props = { apiClient: TrustedTwinApi | undefined };

export const UsersApiPanel = ({ apiClient }: Props) => {
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [accountId, setAccountId] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const endpoints = [
    {
      name: "createUser",
      method: "POST",
      path: "/users",
      queryFn: async () => {
        setLoading(true);
        try {
          const user = await apiClient?.usersApi.createUser({
            postNewUser: {
              role: "a639b00e-51c6-4b2b-a400-ddead965a2cb",
              name: "testName",
            },
          });
          setLoading(false);
          setUserId(user?.uuid);
          setAccountId(user?.account);
          alert(JSON.stringify(user, null, 2));
        } catch (e) {
          await handleResponseError(e, setLoading);
        }
      },
    },
    {
      name: "getUser",
      method: "GET",
      path: "/roles",
      queryFn: async () => {
        setLoading(true);
        try {
          const log = await apiClient?.usersApi.getUser({ user: userId || "" });
          setLoading(false);
          alert(JSON.stringify(log, null, 2));
        } catch (e) {
          await handleResponseError(e, setLoading);
        }
      },
    },
    {
      name: "createUserSecretPIN",
      method: "POST",
      path: "/users/{user}/secrets",
      queryFn: async () => {
        setLoading(true);
        try {
          const response = await apiClient?.usersApi.createUserSecretPIN({
            user: userId || "",
          });
          setLoading(false);
          alert(JSON.stringify(response, null, 2));
        } catch (e) {
          await handleResponseError(e, setLoading);
        }
      },
    },
  ] as any[];

  return (
    <Panel
      title="Users API"
      link="https://docs.trustedtwin.com/reference/user.html"
      disabled={!apiClient}
    >
      <ul role="list" className="divide-y divide-gray-200">
        {endpoints.map((endpoint) => (
          <li className="py-3 sm:py-4" key={endpoint.name}>
            {endpoint.name === "getUser" ? (
              <p className=" mb-2 text-sm text-gray-300 text-ellipsis whitespace-nowrap overflow-hidden">
                User uuid:{" "}
                <span className="italic text-ellipsis">
                  {userId || "not created"}
                </span>
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
        <SecretsApiSubPanel
          secretsApi={apiClient?.secretsApi}
          userId={userId}
          accountId={accountId}
        />
      </ul>
    </Panel>
  );
};
