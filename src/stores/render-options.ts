import { tick } from "svelte";
import { get, writable } from "svelte/store";
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
    alpha: 75,
    fontColor: "#ffffff",
    fontSize: 14,
    maxFontSize: 14 * 2
  }),
  baseFontSize() {
    return 14;
  }
};

export const label = {
  ...writable({
    color: "#000000",
    alpha: 100,
    fontColor: "#ffffff",
    fontSize: 18,
    maxFontSize: 18 * 2
  }),
  baseFontSize() {
    return 18;
  }
};

export const render_ = {
  ...writable({
    render: null as HTMLElement,
    workspace: null as HTMLElement,
    zoom: 1,
    sbInstance: null as ScrollBooster
  }),
  async updateScroll() {
    await tick();
    get(render_).sbInstance?.updateMetrics();
    const workspaceWidth = get(render_).workspace.clientWidth;
    const workspaceHeight = get(render_).workspace.clientHeight;
    const renderWidth = get(render_).render.clientWidth;
    const renderHeight = get(render_).render.clientHeight;
    get(render_).sbInstance?.setPosition({
      x: (renderWidth - workspaceWidth) / 2,
      y: (renderHeight - workspaceHeight) / 2,
    });
  }
};
