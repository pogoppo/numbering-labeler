import downloadjs from "downloadjs";
import { toJpeg } from "html-to-image";

export const elementToJpeg = (target: HTMLElement) => {
  const options = {
    width: target.clientWidth,
    height: target.clientHeight,
    style: { margin: "0" },
  };
  return toJpeg(target, options);
}

export const downloadElementImage = async (target: HTMLElement) => {
  const dataURL = await elementToJpeg(target);
  downloadjs(dataURL, "labeled-image.jpg");
};
