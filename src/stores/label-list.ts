import { get, writable } from "svelte/store";

import { image, label } from "~/stores/render-options";
import labelList from "~/stores/label-list";

interface ListItem {
  text: string,
  x: number | null,
  y: number | null
}

const defaultXY = (index: number, fontSize: number, imageWidth: number) => {
  const labelSpan = fontSize * 2;
  const maxLabelXPos = imageWidth - fontSize;

  let x = index * labelSpan;
  let y = Math.floor(x / maxLabelXPos) * labelSpan;
  if (maxLabelXPos < x) {
    x = x % maxLabelXPos;
    x = x - (x % labelSpan);
  }

  return { x, y };
};

export default {
  ...writable([] as ListItem[]),
  add(text: string) {
    const { x, y } = defaultXY(
      get(labelList).length,
      get(label).fontSize,
      get(image).width
    );
    this.update((list) => [...list, { text, x, y }]);
  },
  remove(index: number) {
    this.update((list) => {
      list.splice(index, 1);
      return [...list];
    });
  }
};
