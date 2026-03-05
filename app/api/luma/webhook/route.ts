import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const url = new URL(request.url);
  const secret = process.env.LUMA_WEBHOOK_SECRET;

  const providedSecret = url.searchParams.get("secret");

  if (secret && providedSecret !== secret) {
    return new NextResponse("Invalid secret", { status: 401 });
  }

  // Read the body so that the request stream is consumed. We are not
  // validating the payload here because Luma's webhook configuration is
  // flexible and this route only needs to trigger cache revalidation.
  await request.json().catch(() => null);

  // Revalidate the events index page. Individual event pages are statically
  // generated with ISR; they will be updated on the next visit after this
  // revalidation window.
  revalidatePath("/events");

  return NextResponse.json({ revalidated: true });
}

