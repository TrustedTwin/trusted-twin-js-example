import { TwinsApi } from "@trustedtwin/js-client";
import { useState } from "react";
import { QueryButton } from "./QueryButton";

type Props = { TwinsApi: TwinsApi | undefined };

export const TwinsApiPanel = ({ TwinsApi }: Props) => {
  const [twinId, setTwinId] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const endpoints = [
    {
      name: "createTwin",
      method: "POST",
      path: "/twins",
      queryFn: async () => {
        setLoading(true);
        try {
          const twinAlive = await TwinsApi?.createTwin();
          setLoading(false);
          setTwinId(twinAlive?.creationCertificate?.uuid);
          alert(JSON.stringify(twinAlive, null, 2));
        } catch (e) {
          alert(JSON.stringify(e, null, 2));
          setLoading(false);
        }
      },
    },
    {
      name: "getTwin",
      method: "GET",
      path: "/twins/{twin}",
      queryFn: async () => {
        setLoading(true);
        try {
          const twin = await TwinsApi?.getTwin({ twin: twinId || "" });
          setLoading(false);
          alert(JSON.stringify(twin, null, 2));
        } catch (e) {
          alert(JSON.stringify(e, null, 2));
          setLoading(false);
        }
      },
    },
    {
      name: "terminateTwin",
      method: "DELETE",
      path: "/twins/{twin}",
      queryFn: async () => {
        setLoading(true);
        try {
          const terminationCertificate = await TwinsApi?.terminateTwin({
            twin: twinId || "",
          });
          setLoading(false);
          alert(JSON.stringify(terminationCertificate, null, 2));
        } catch (e) {
          alert(JSON.stringify(e, null, 2));
          setLoading(false);
        }
      },
    },
  ] as any[];

  return (
    <div>
      <div
        className={`relative m-3 p-4 max-w-2xl bg-slate-800 rounded sm:p-8 text-slate-200 ${
          !TwinsApi ? "pointer-events-none" : undefined
        }"`}
      >
        <div className="flex justify-between items-center mb-4">
          <h5 className="text-xl font-bold leading-none">Twins API</h5>
          <a
            href="https://docs.trustedtwin.com/reference/twin.html"
            className="text-sm font-medium text-blue-500 hover:underline"
          >
            See reference docs
          </a>
        </div>
        <div className="flow-root">
          <ul role="list" className="divide-y divide-gray-200">
            {endpoints.map((endpoint) => (
              <li className="py-3 sm:py-4">
                {endpoint.name === "getTwin" ? (
                  <p className=" mb-2 text-sm text-gray-300 text-ellipsis whitespace-nowrap overflow-hidden">
                    Twin uuid:{" "}
                    <span className="italic text-ellipsis">
                      {twinId || "not created"}
                    </span>
                  </p>
                ) : null}
                <div className="flex items-center space-x-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {endpoint.name}
                    </p>
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
        </div>
        {!TwinsApi ? <div className="absolute inset-0 bg-black/50" /> : null}
      </div>
    </div>
  );
};
