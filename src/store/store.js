import { useMemo } from "react"
import { createStore, action, persist } from "easy-peasy"

let store

const initialState = {
  translations: {},
  isLoaded: false,
}

// const translationsModel = {
//   ...initialState.translations,
//   setItem: action((state, items) => {
//     state.translations = items
//   }),
// }

const storeModel = {
  isLoaded: false,
  translations: {},
  setTranslations: action((state, items) => {
    state.translations = items
  }),
  setIsLoaded: action((state, flag) => {
    state.isLoaded = flag
  }),
}

function initStore(preloadedState = initialState) {
  return createStore(persist(storeModel, { allow: ["translations"] }), {
    initialState: preloadedState,
  })
}

export const initializeStore = preloadedState => {
  let _store = store ?? initStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}
