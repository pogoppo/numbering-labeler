import { get } from "svelte/store";
import { _ } from "svelte-i18n";

import { image, label, list, render_ } from "~/stores/render-options";
import labelList from "~/stores/label-list";
import { tick } from "svelte";

const getImageSize = async (dataURL: string): Promise<{ width: number, height: number }> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    }
    img.src = dataURL;
  });
}

export const readFile = (event: any) => {
  const reader = new FileReader();
  const imageFile = event.target.files[0];

  reader.readAsDataURL(imageFile);
  return new Promise((resolve) => {
    reader.onload = async () => {
      const imageSize = await getImageSize(reader.result as string);
      const workspaceWidth = get(render_).workspace.clientWidth;
      const workspaceHeight = get(render_).workspace.clientHeight;
      const widthRate = workspaceWidth / imageSize.width;
      const heightRate = workspaceHeight / imageSize.height;
      const zoom = Math.min(1, widthRate * 0.9, heightRate * 0.9);

      image.set({
        width: imageSize.width,
        height: imageSize.height,
        url: reader.result as string,
      });

      // 初期化処理 //
      labelList.set([]);
      await tick();
      labelList.add(get(_)('label.sample'));

      const labelFontSize = label.baseFontSize() * (1 / zoom);
      label.set(Object.assign(
        get(label),
        {
          fontSize: labelFontSize,
          maxFontSize: labelFontSize * 2
        }
      ));

      const listFontSize = list.baseFontSize() * (1 / zoom);
      list.set(Object.assign(
        get(list),
        {
          fontSize: listFontSize,
          maxFontSize: listFontSize * 2
        }
      ));

      render_.set(Object.assign(get(render_), { zoom }));
      get(render_).sbInstance.setPosition({
        x: (imageSize.width - imageSize.width * widthRate) / 2,
        y: (imageSize.height - imageSize.height * heightRate) / 2,
      });
      ///////////////

      resolve(true);
    };
  });
};
