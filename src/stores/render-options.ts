import { writable } from "svelte/store";

export const image = writable({
  url: "",
  width: 0,
  height: 0,
});

export const list = writable({
  pos: "bottom",
  overlay: false,
  color: "#000000",
  alpha: 100,
  fontColor: "#ffffff",
  fontSize: 16,
});

export const label = writable({
  color: "#000000",
  alpha: 100,
  fontColor: "#ffffff",
  fontSize: 24,
});

export const numberingItems = writable([]);

export const renderElement = writable(null as HTMLElement);
