import { deepFreeze } from "../../util/misc";

export function setUser(state, user) {
  state.user = user ? deepFreeze(user) : null;
}
