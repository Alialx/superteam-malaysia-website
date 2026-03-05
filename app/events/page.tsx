import Link from "next/link";
import { getPastEvents, getUpcomingEvents } from "@/lib/luma/queries";

export const revalidate = 60;

export default async function EventsPage() {
  const [upcoming, past] = await Promise.all([
    getUpcomingEvents(),
    getPastEvents(),
  ]);

  const hasUpcoming = upcoming.length > 0;
  const hasPast = past.length > 0;

  return (
    <main className="min-h-screen bg-neutral-950 px-4 py-16 text-neutral-50">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Community events
          </h1>
          <p className="max-w-2xl text-sm text-neutral-400 sm:text-base">
            Upcoming meetups, workshops, and online sessions hosted by Superteam
            Malaysia and friends. Events are powered by Luma.
          </p>
        </header>

        {!hasUpcoming && !hasPast ? (
          <p className="text-sm text-neutral-400 sm:text-base">
            No events are listed yet. Once you create events in Luma, they will
            appear here.
          </p>
        ) : (
          <div className="space-y-10">
            {hasUpcoming && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  Upcoming
                </h2>
                <ul className="grid gap-4 sm:grid-cols-2">
                  {upcoming.map((event) => (
                    <li
                      key={event.id}
                      className="flex flex-col gap-3 rounded-xl border border-neutral-800 bg-neutral-900/40 p-4 shadow-sm"
                    >
                      <div className="space-y-1">
                        <h3 className="text-base font-medium leading-tight sm:text-lg">
                          <Link
                            href={`/events/${event.slug}`}
                            className="hover:underline"
                          >
                            {event.title}
                          </Link>
                        </h3>
                        <p className="text-xs text-neutral-400 sm:text-sm">
                          {new Date(event.start_at).toLocaleString(undefined, {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                          {event.location ? ` · ${event.location}` : null}
                        </p>
                      </div>
                      <div className="mt-auto flex items-center gap-3 pt-1 text-xs sm:text-sm">
                        <Link
                          href={event.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-medium text-emerald-950 transition hover:bg-emerald-400"
                        >
                          View on Luma
                        </Link>
                        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-emerald-300">
                          Upcoming
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {hasPast && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  Past events
                </h2>
                <ul className="grid gap-4 sm:grid-cols-2">
                  {past.map((event) => (
                    <li
                      key={event.id}
                      className="flex flex-col gap-3 rounded-xl border border-neutral-800 bg-neutral-900/40 p-4 shadow-sm"
                    >
                      <div className="space-y-1">
                        <h3 className="text-base font-medium leading-tight sm:text-lg">
                          <Link
                            href={`/events/${event.slug}`}
                            className="hover:underline"
                          >
                            {event.title}
                          </Link>
                        </h3>
                        <p className="text-xs text-neutral-400 sm:text-sm">
                          {new Date(event.start_at).toLocaleDateString(
                            undefined,
                            {
                              dateStyle: "medium",
                            },
                          )}
                          {event.location ? ` · ${event.location}` : null}
                        </p>
                      </div>
                      <div className="mt-auto flex items-center gap-3 pt-1 text-xs sm:text-sm">
                        <Link
                          href={event.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 rounded-full bg-neutral-800 px-3 py-1.5 text-xs font-medium text-neutral-100 transition hover:bg-neutral-700"
                        >
                          View recap on Luma
                        </Link>
                        <span className="rounded-full bg-neutral-800 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-neutral-300">
                          Past
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        )}
      </section>
    </main>
  );
}

