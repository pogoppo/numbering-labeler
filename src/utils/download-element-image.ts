import downloadjs from "downloadjs";
import html2canvas from "html2canvas";

export const elementToJpeg = async (target: HTMLElement): Promise<Blob> => {
  const canvas = await html2canvas(target);
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob);
    }, "image/jpeg", 1);
  });
}

export const downloadElementImage = async (target: HTMLElement) => {
  const jpeg = await elementToJpeg(target);
  downloadjs(jpeg, "labeled-image.jpg");
};
