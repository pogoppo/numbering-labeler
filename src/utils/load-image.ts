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

const restrictImageSize = (size: { width: number, height: number }): typeof size => {
  let base = 0;

  if (size.width > size.height) {
    base = size.width;
  } else {
    base = size.height;
  }

  if (base > 1920) // 解像度1080p TODO: 非マジックナンバーにする
  {
    const rate = base / 1920;
    return {
      width: size.width / rate,
      height: size.height / rate,
    }
  } else {
    return size;
  }
}

export const readFile = (event: any) => {
  const reader = new FileReader();
  const imageFile = event.target.files[0];

  reader.readAsArrayBuffer(imageFile);
  return new Promise((resolve) => {
    reader.onload = async () => {
      const imageBlob = new Blob([reader.result], { type: imageFile.type });
      const imageURL = URL.createObjectURL(imageBlob);
      const imageSize = restrictImageSize(await getImageSize(imageURL));

      URL.revokeObjectURL(get(image).url);

      image.set({
        width: imageSize.width,
        height: imageSize.height,
        url: imageURL,
      });

      // 初期化処理 //
      labelList.set([]);
      labelList.add(get(_)('label.sample'));
      await tick();

      const workspaceWidth = get(render_).workspace.clientWidth;
      const workspaceHeight = get(render_).workspace.clientHeight;
      const widthRate = workspaceWidth / imageSize.width;
      const heightRate = workspaceHeight / imageSize.height;
      const zoom = Math.min(1, widthRate * 0.9, heightRate * 0.9);

      const labelFontSize = label.baseFontSize() * (1 / zoom);
      label.set(Object.assign(
        get(label),
        {
          fontSize: labelFontSize,
          maxFontSize: labelFontSize * 3
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
      render_.updateScroll();
      await tick();
      ///////////////

      resolve(true);
    };
  });
};
