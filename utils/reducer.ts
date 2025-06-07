export type Action<T> =
  | { type: "ADD"; payload: { key: keyof T; value: T[keyof T] } }
  | { type: "DELETE"; payload: keyof T }
  | { type: "SET"; payload: { key: keyof T; value: T[keyof T] } };

export function reducer<T>(state: T, action: Action<T>): T {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    case "SET":
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    case "DELETE":
      delete state[action.payload];

      return state;
    default:
      return state;
  }
}
