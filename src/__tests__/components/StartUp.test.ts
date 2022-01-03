import { render } from "@testing-library/svelte";

import "~/utils/i18n-auto-settings";

import StartUp from "~/components/StartUp.svelte";

test("正常にレンダリングされるか", async () => {
  const result = render(StartUp);
  expect(result.container).toBeInstanceOf(HTMLElement);
});
