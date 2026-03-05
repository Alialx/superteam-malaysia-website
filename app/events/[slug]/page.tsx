import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getEventBySlug,
  getPastEvents,
  getUpcomingEvents,
} from "@/lib/luma/queries";

type EventPageParams = {
  slug: string;
};

export const revalidate = 60;

export async function generateStaticParams(): Promise<EventPageParams[]> {
  const [upcoming, past] = await Promise.all([
    getUpcomingEvents(),
    getPastEvents(),
  ]);

  const all = [...upcoming, ...past];

  return all
    .filter((event) => !!event.slug)
    .map((event) => ({
      slug: event.slug,
    }));
}

export default async function EventDetailPage({
  params,
}: {
  params: EventPageParams;
}) {
  const event = await getEventBySlug(params.slug);

  if (!event) {
    notFound();
  }

  const startDate = new Date(event.start_at);
  const endDate = event.end_at ? new Date(event.end_at) : null;

  const isUpcoming = event.status === "upcoming";

  return (
    <main className="min-h-screen bg-neutral-950 px-4 py-16 text-neutral-50">
      <article className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-wide text-neutral-500">
            {isUpcoming ? "Upcoming event" : "Event"}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {event.title}
          </h1>
          <p className="text-sm text-neutral-400 sm:text-base">
            {startDate.toLocaleString(undefined, {
              dateStyle: "medium",
              timeStyle: "short",
            })}
            {endDate
              ? ` – ${endDate.toLocaleTimeString(undefined, {
                  timeStyle: "short",
                })}`
              : null}
            {event.location ? ` · ${event.location}` : null}
          </p>
        </header>

        <section className="space-y-3 rounded-xl border border-neutral-800 bg-neutral-900/40 p-4">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={event.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-4 py-1.5 text-sm font-medium text-emerald-950 transition hover:bg-emerald-400"
            >
              {isUpcoming ? "Register on Luma" : "View on Luma"}
            </Link>
            {event.host_names && event.host_names.length > 0 && (
              <p className="text-xs text-neutral-400 sm:text-sm">
                Hosted by{" "}
                {event.host_names
                  .filter(Boolean)
                  .filter((name) => name.trim().length > 0)
                  .join(", ")}
              </p>
            )}
          </div>
        </section>

        <section className="space-y-3 text-sm text-neutral-300 sm:text-base">
          <p>
            This event is managed via Luma. Full details, agenda, and
            registration are available on the Luma event page.
          </p>
        </section>
      </article>
    </main>
  );
}

