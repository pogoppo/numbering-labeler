import { render } from "@testing-library/svelte";

import "~/utils/i18n-auto-settings";

import DownloadRenderButton from "~/components/DownloadRenderButton.svelte";

test("正常にレンダリングされるか", async () => {
  const dummyDOM = document.createElement("div");
  const result = render(DownloadRenderButton, { renderElement: dummyDOM });
  expect(result.container).toBeInstanceOf(HTMLElement);
});
