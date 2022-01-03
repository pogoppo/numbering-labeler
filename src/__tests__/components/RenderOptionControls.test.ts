import { render } from "@testing-library/svelte";

import "~/utils/i18n-auto-settings";

import RenderOptionControls from "~/components/RenderOptionControls.svelte";

test("正常にレンダリングされるか", async () => {
  const result = render(RenderOptionControls);
  expect(result.container).toBeInstanceOf(HTMLElement);
});
