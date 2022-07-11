import fetch from "cross-fetch"

try {
  global.fetch = fetch
} catch {
  // do nothing
}
try {
  window.fetch = fetch
} catch {
  // do nothing
}

global.chrome = {
  ...global.chrome,
  runtime: {
    ...(global.chrome?.runtime ?? {}),
    id: "testid",
  },
}
