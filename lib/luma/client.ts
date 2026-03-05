const LUMA_BASE_URL = "https://public-api.luma.com";

function getEnv(name: string): string | null {
  const value = process.env[name];
  return value ?? null;
}

const LUMA_API_KEY = getEnv("LUMA_API_KEY");

if (!LUMA_API_KEY) {
  throw new Error(
    "Luma client is not configured. Please set the LUMA_API_KEY environment variable.",
  );
}

type SearchParams =
  | Record<string, string | number | boolean | null | undefined>
  | URLSearchParams;

function buildUrl(path: string, searchParams?: SearchParams): string {
  const url = new URL(path, LUMA_BASE_URL);

  if (searchParams instanceof URLSearchParams) {
    searchParams.forEach((value, key) => {
      url.searchParams.append(key, value);
    });
  } else if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value === null || value === undefined) return;
      url.searchParams.append(key, String(value));
    });
  }

  return url.toString();
}

export async function lumaFetch<TResponse>(
  path: string,
  init: RequestInit & { searchParams?: SearchParams } = {},
): Promise<TResponse> {
  const { searchParams, headers, ...rest } = init;

  const url = buildUrl(path, searchParams);

  const response = await fetch(url, {
    ...rest,
    headers: {
      "content-type": "application/json",
      "x-luma-api-key": LUMA_API_KEY!,
      ...headers,
    },
    // Luma API is JSON-based; GET requests should not send a body by default.
    body: rest.body,
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(
      `Luma API request failed with ${response.status} ${response.statusText}${
        text ? `: ${text}` : ""
      }`,
    );
  }

  return (await response.json()) as TResponse;
}

