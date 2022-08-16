import { useEffect, useState } from "react";
import { NextPage } from "next";
import { trpc } from "src/utils/trpc";
import { Gauge } from "@components/result";

const Result: NextPage<Record<string, unknown>> = () => {
  const [sessionId, setSessionId] = useState<string>("");
  const [isQueryEnabled, setIsQueryEnabled] = useState(false);
  const { data, isLoading, isError } = trpc.useQuery(
    ["resultBySessionId", sessionId],
    {
      enabled: isQueryEnabled,
    }
  );
  useEffect(() => {
    const session = sessionStorage.getItem("sessionId");
    if (session) {
      setSessionId(session);
      setIsQueryEnabled(true);
    }
  }, []);
  return (
    <div style={{ textAlign: "center" }}>
      {data ? (
        <Gauge
          label="Introver/extrover result:"
          units="Being 0 most introvert to 100 most extrovert"
          value={data?.score}
        />
      ) : isError ? (
        <p>Error fetching data</p>
      ) : (
        isLoading && <p>Loding...</p>
      )}
    </div>
  );
};

export default Result;
