import { SecretsApi } from "@trustedtwin/js-client";
import { useState } from "react";
import { handleResponseError } from "../utils/handleResponseError";
import { Panel } from "./Panel";
import { QueryButton } from "./QueryButton";

type Props = {
  secretsApi: SecretsApi | undefined;
  userId: string | undefined;
  accountId: string | undefined;
};

export const SecretsApiSubPanel = ({
  secretsApi,
  userId,
  accountId,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [pin, setPin] = useState<string | undefined>(undefined);

  const endpoints = [
    {
      name: "createUserSecretPIN",
      method: "POST",
      path: "/users/{user}/secrets",
      queryFn: async () => {
        setLoading(true);
        try {
          const response = await secretsApi?.createUserSecretPIN({
            user: userId || "",
          });
          setLoading(false);
          setPin(response?.pin);
          alert(JSON.stringify(response, null, 2));
        } catch (e) {
          await handleResponseError(e, setLoading);
        }
      },
    },
    {
      name: "createUserSecret",
      method: "POST",
      path: "/secrets/{accounr}/{pin}",
      queryFn: async () => {
        setLoading(true);
        try {
          const identities = await secretsApi?.createUserSecret({
            account: accountId || "",
            pin: pin || "",
          });
          setLoading(false);
          alert(JSON.stringify(identities, null, 2));
        } catch (e: any) {
          await handleResponseError(e, setLoading);
        }
      },
    },
    {
      name: "getUserSecret",
      method: "GET",
      path: "/secrets/{accounr}/{pin}",
      queryFn: async () => {
        setLoading(true);
        try {
          const identities = await secretsApi?.getUserSecret({
            user: userId || "",
          });
          setLoading(false);
          alert(JSON.stringify(identities, null, 2));
        } catch (e: any) {
          await handleResponseError(e, setLoading);
        }
      },
    },
  ] as any[];

  return (
    <Panel
      title="Secrets API"
      link="https://docs.trustedtwin.com/reference/user-authentication.html"
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
