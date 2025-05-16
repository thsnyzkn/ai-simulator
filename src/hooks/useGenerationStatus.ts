import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";

import { LogoStatus } from "../types";

export function useGenerationStatus(docId: string) {
  const [status, setStatus] = useState<LogoStatus>("idle");

  useEffect(() => {
    if (!docId) return;

    const unsub = onSnapshot(doc(db, "generations", docId), (snapshot) => {
      const data = snapshot.data();
      if (data?.status) {
        setStatus(data.status);
      }
    });

    return () => unsub();
  }, [docId]);

  return status;
}
