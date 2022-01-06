import { render } from "@testing-library/svelte";

import "~/utils/i18n-auto-settings";

import AppLayoutLabelList from "~/components/AppLayoutLabelList.svelte";

test("正常にレンダリングされるか", async () => {
  const result = render(AppLayoutLabelList);
  expect(result.container).toBeInstanceOf(HTMLElement);
});
