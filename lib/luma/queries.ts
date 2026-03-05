import { lumaFetch } from "./client";

export type LumaEventStatus = "upcoming" | "past" | "draft" | "cancelled";

export type LumaEvent = {
  id: string;
  title: string;
  slug: string;
  start_at: string;
  end_at?: string | null;
  location?: string | null;
  url: string;
  status: LumaEventStatus;
  host_names?: string[] | null;
};

type LumaEventsResponse = {
  events: LumaEvent[];
};
// All events are fetched from the Superteam Malaysia Luma account.
// Profile: https://luma.com/user/SuperteamMY
const LUMA_USER_HANDLE = "SuperteamMY";

/**
 * Fetch upcoming events from Luma.
 *
 * Note: The exact endpoint and filter parameters are based on the current
 * Luma API docs and may need adjustment depending on how your calendar
 * and events are configured in Luma.
 */
export async function getUpcomingEvents(): Promise<LumaEvent[]> {
  const data = await lumaFetch<LumaEventsResponse>("/v1/events", {
    method: "GET",
    searchParams: {
      status: "upcoming",
      user_handle: LUMA_USER_HANDLE,
    },
  });

  return data.events ?? [];
}

export async function getPastEvents(): Promise<LumaEvent[]> {
  const data = await lumaFetch<LumaEventsResponse>("/v1/events", {
    method: "GET",
    searchParams: {
      status: "past",
      user_handle: LUMA_USER_HANDLE,
    },
  });

  return data.events ?? [];
}

export async function getEventBySlug(
  slug: string,
): Promise<LumaEvent | null> {
  const data = await lumaFetch<LumaEventsResponse>("/v1/events", {
    method: "GET",
    searchParams: {
      slug,
      user_handle: LUMA_USER_HANDLE,
    },
  });

  const events = data.events ?? [];
  return events[0] ?? null;
}

