import { writable } from "svelte/store";

interface ListItem {
  text: string,
  x: number | null,
  y: number | null
}

const { subscribe, set, update } = writable([] as ListItem[]);

export default {
  subscribe,
  set,
  update,
  add(text: string) {
    update((list) => [...list, { text, x: null, y: null }]);
  },
  remove(index: number) {
    update((list) => {
      list.splice(index, 1);
      return [...list];
    });
  }
};
