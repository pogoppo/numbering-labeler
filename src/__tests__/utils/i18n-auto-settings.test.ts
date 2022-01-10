import { get } from "svelte/store";
import { _ } from "svelte-i18n";

import "~/utils/i18n-auto-settings";

test("i18nが機能しているか", async () => {
  expect(get(_)("unit-test")).toEqual("単体テスト");
});
