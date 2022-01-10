import { writable } from "svelte/store";
import type ScrollBooster from "scrollbooster";

export const image = writable({
  url: "",
  width: 0,
  height: 0,
});

export const list = {
  ...writable({
    pos: "bottom",
    overlay: true,
    color: "#000000",
    alpha: 100,
    fontColor: "#ffffff",
    fontSize: 16,
    maxFontSize: 16 * 2
  }),
  baseFontSize() {
    return 16;
  }
};

export const label = {
  ...writable({
    color: "#000000",
    alpha: 100,
    fontColor: "#ffffff",
    fontSize: 24,
    maxFontSize: 24 * 2
  }),
  baseFontSize() {
    return 24;
  }
};

export const render_ = writable({
  render: null as HTMLElement,
  workspace: null as HTMLElement,
  zoom: 1,
  sbInstance: null as ScrollBooster
});
