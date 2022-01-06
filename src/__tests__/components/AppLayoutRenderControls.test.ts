import { render } from "@testing-library/svelte";

import "~/utils/i18n-auto-settings";

import AppLayoutRenderControls from "~/components/AppLayoutRenderControls.svelte";

test("正常にレンダリングされるか", async () => {
  const result = render(AppLayoutRenderControls);
  expect(result.container).toBeInstanceOf(HTMLElement);
});
