const storage = new Map()

declare let global: {
  browser: any
}

const PREVIOUS_GLOBAL_BROWSER = global.browser

global.browser = {
  storage: {
    local: {
      get: async (key: string) => {
        const value = storage.get(key)
        console.log("get", key, value)
        return { [key]: value }
      },
      set: async (items: Record<string, any>) => {
        console.log("set", items)
        Object.keys(items).forEach((key) => {
          const value = items[key]
          storage.set(key, value)
        })
      },
    },
  },
}

afterAll(() => {
  global.browser = PREVIOUS_GLOBAL_BROWSER
})

/** imports must come after the global mock above */

import {
  isPreAuthorized,
  preAuthorize,
} from "../src/background/preAuthorizations"

describe("preAuthorizations", () => {
  describe("isPreAuthorized", () => {
    test("testing", async () => {
      expect(await isPreAuthorized("localhost:3000")).toBeFalsy()
      await preAuthorize("localhost:3000")
      expect(await isPreAuthorized("localhost:3000")).toBeTruthy()
    })
  })
})
