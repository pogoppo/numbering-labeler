import { render } from "@testing-library/svelte";

import "~/utils/i18n-auto-settings";

import MobileAccordion from "~/components/MobileAccordion.svelte";

test("正常にレンダリングされるか", async () => {
  const result = render(MobileAccordion);
  expect(result.container).toBeInstanceOf(HTMLElement);
});
