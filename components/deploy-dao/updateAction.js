export default function updateAction(state, payload) {
  return {
    ...state,
    ...payload,
  }
}
