import { render } from "@testing-library/svelte";

import "~/utils/i18n-auto-settings";

import AppLayoutWorkSpace from "~/components/AppLayoutWorkSpace.svelte";

test("正常にレンダリングされるか", async () => {
  const result = render(AppLayoutWorkSpace);
  expect(result.container).toBeInstanceOf(HTMLElement);
});
