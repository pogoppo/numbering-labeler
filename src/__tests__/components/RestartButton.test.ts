import { render } from "@testing-library/svelte";

import "~/utils/i18n-auto-settings";

import RestartButton from "~/components/RestartButton.svelte";

test("正常にレンダリングされるか", async () => {
  const result = render(RestartButton);
  expect(result.container).toBeInstanceOf(HTMLElement);
});
