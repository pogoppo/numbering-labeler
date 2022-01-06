import { render } from "@testing-library/svelte";

import "~/utils/i18n-auto-settings";

import RenderControls from "~/components/RenderControls.svelte";

test("正常にレンダリングされるか", async () => {
  const result = render(RenderControls);
  expect(result.container).toBeInstanceOf(HTMLElement);
});
