import { useGambaEventListener, useGambaEvents } from "gamba-react-v2";
import { useMemo, useState } from "react";

import { GambaTransaction } from "gamba-core-v2";
import { PLATFORM_CREATOR_ADDRESS } from "../../config";
import { useRouter } from "next/router";

export function useRecentPlays(platformOnly = false, filterUser?: string) {
  const router = useRouter();
  const eventFilter = platformOnly ? { address: PLATFORM_CREATOR_ADDRESS } : {};
  const previousEvents = useGambaEvents("GameSettled", eventFilter);
  const [newEvents, setNewEvents] = useState<GambaTransaction<"GameSettled">[]>(
    [],
  );

  useGambaEventListener(
    "GameSettled",
    (event: GambaTransaction<"GameSettled">) => {
      if (
        platformOnly &&
        !event.data.creator.equals(PLATFORM_CREATOR_ADDRESS)
      ) {
        return;
      }

      if (filterUser && event.data.user.toBase58() !== filterUser) {
        return;
      }

      const eventExists = newEvents.some(
        (e) => e.signature === event.signature,
      );
      if (!eventExists) {
        setNewEvents((prevEvents) => [event, ...prevEvents]);
      }
    },
    [router.pathname, platformOnly, filterUser],
  );

  const combinedEvents = useMemo(() => {
    const allEvents = [...newEvents, ...previousEvents];
    const filteredEvents = filterUser
      ? allEvents.filter((event) => event.data.user.toBase58() === filterUser)
      : allEvents;
    const uniqueEvents = filteredEvents.filter(
      (event, index, self) =>
        index === self.findIndex((e) => e.signature === event.signature),
    );
    return uniqueEvents.sort((a, b) => b.time - a.time);
  }, [newEvents, previousEvents, filterUser]);

  return combinedEvents;
}
