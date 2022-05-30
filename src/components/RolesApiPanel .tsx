import { RolesApi } from "@trustedtwin/js-client";
import { useState } from "react";
import { handleResponseError } from "../utils/handleResponseError";
import { Panel } from "./Panel";
import { QueryButton } from "./QueryButton";

type Props = { rolesApi: RolesApi | undefined };

export const RolesApiPanel = ({ rolesApi }: Props) => {
  const [role, setRole] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const endpoints = [
    {
      name: "createUserRole",
      method: "POST",
      path: "/roles",
      queryFn: async () => {
        setLoading(true);
        try {
          const role = await rolesApi?.createUserRole({
            postNewRole: { name: "newRoleName2" },
          });
          setRole(role?.uuid);
          setLoading(false);
          alert(JSON.stringify(role, null, 2));
        } catch (e) {
          await handleResponseError(e, setLoading);
        }
      },
    },
    {
      name: "getUserRole",
      method: "GET",
      path: "/roles/{role}",
      queryFn: async () => {
        setLoading(true);
        try {
          const response = await rolesApi?.getUserRole({ role: role || "" });
          setLoading(false);
          alert(JSON.stringify(response, null, 2));
        } catch (e) {
          await handleResponseError(e, setLoading);
        }
      },
    },
    // {
    //   name: "updateUserRole",
    //   method: "PATCH",
    //   path: "/roles/{role}",
    //   queryFn: async () => {
    //     setLoading(true);
    //     try {
    //       const response = await rolesApi?.updateUserRole({
    //         role: role || "",
    //         updateRole: {
    //           name: "role_1",
    //           statement: {
    //             effect: "allow",
    //             actions: ["createTwin", "getTwin", "getTwinIdentities"],
    //           },
    //           rules: {
    //             twinRule: "string",
    //             entryRule: "string",
    //           },
    //         },
    //       });
    //       setLoading(false);
    //       alert(JSON.stringify(response, null, 2));
    //     } catch (e) {
    //       await handleResponseError(e, setLoading);
    //     }
    //   },
    // },
    {
      name: "getUserRoles",
      method: "GET",
      path: "/roles",
      queryFn: async () => {
        setLoading(true);
        try {
          const roles = await rolesApi?.getUserRoles();
          setLoading(false);
          alert(JSON.stringify(roles, null, 2));
        } catch (e) {
          await handleResponseError(e, setLoading);
        }
      },
    },
  ] as any[];

  return (
    <Panel
      title="Roles/Account API"
      link="https://docs.trustedtwin.com/reference/role.html"
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
