import { writable } from "svelte/store";

interface ListItem {
  text: string,
  x: number | null,
  y: number | null
}

export default {
  ...writable([] as ListItem[]),
  add(text: string) {
    this.update((list) => [...list, { text, x: null, y: null }]);
  },
  remove(index: number) {
    this.update((list) => {
      list.splice(index, 1);
      return [...list];
    });
  }
};
