import { getMembers } from "@/lib/supabase/queries";

export const revalidate = 60;

export default async function MembersPage() {
  const members = await getMembers();

  return (
    <main className="min-h-screen px-4 py-16 text-neutral-50">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Community members
          </h1>
          <p className="max-w-2xl text-sm text-neutral-400 sm:text-base">
            A directory of builders, founders, and contributors in the
            Superteam Malaysia ecosystem.
          </p>
        </header>

        {members.length === 0 ? (
          <p className="text-sm text-neutral-400">
            No members found yet. Once you add rows to the{" "}
            <code className="rounded bg-neutral-900 px-1.5 py-0.5 text-xs">
              members
            </code>{" "}
            table in Supabase, they will show up here.
          </p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member) => (
              <li
                key={member.id}
                className="flex flex-col gap-2 rounded-xl border border-neutral-800 bg-neutral-900/40 p-4 shadow-sm"
              >
                <div>
                  <h2 className="text-base font-medium leading-tight sm:text-lg">
                    {member.full_name}
                  </h2>
                  {(member.role || member.company) && (
                    <p className="mt-1 text-xs text-neutral-400 sm:text-sm">
                      {[member.role, member.company]
                        .filter(Boolean)
                        .join(" @ ")}
                    </p>
                  )}
                </div>

                {member.bio && (
                  <p className="mt-1 line-clamp-3 text-xs text-neutral-400 sm:text-sm">
                    {member.bio}
                  </p>
                )}

                {member.tags && member.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {member.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-neutral-900 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-neutral-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

