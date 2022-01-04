import { image, label, list, render_ } from "~/stores/render-options";
import labelList from "~/stores/label-list";
import { get } from "svelte/store";

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
  const workspaceWidth = get(render_).workspace.clientWidth;
  const workspaceHeight = get(render_).workspace.clientHeight;

  reader.readAsDataURL(imageFile);
  return new Promise((resolve) => {
    reader.onload = async () => {
      const imageSize = await getImageSize(reader.result as string);
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

      const labelFontSize = get(label).fontSize * (1 / zoom);
      label.set(Object.assign(
        get(label),
        {
          fontSize: labelFontSize,
          maxFontSize: labelFontSize * 2
        }
      ));

      const listFontSize = get(list).fontSize * (1 / zoom);
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
