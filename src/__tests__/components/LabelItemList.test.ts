import { render, fireEvent } from "@testing-library/svelte";
import { get } from "svelte/store";

import "~/utils/i18n-auto-settings";
import labelList from "~/stores/label-list";

import LabelItemList from "~/components/LabelItemList.svelte";
import { tick } from "svelte";

test("正常にレンダリングされるか", async () => {
  const result = render(LabelItemList);
  expect(result.container).toBeInstanceOf(HTMLElement);
});

test("ラベルリストへの追加", async () => {
  labelList.set([]);

  const result = render(LabelItemList);
  const addNew: HTMLInputElement = result.container.querySelector('.LabelItemList__item--new input');
  addNew.value = "item-1";
  await fireEvent.blur(addNew);
  await tick();

  expect(get(labelList)[0]).toMatchObject({
    text: "item-1", x: null, y: null
  });
});

test("ラベルリストの変更", async () => {
  labelList.set([]);
  labelList.add("item-1");

  const result = render(LabelItemList);
  const change: HTMLInputElement = result.container.querySelector('.LabelItemList__labels .LabelItemList__item input');
  await fireEvent.input(change, { target: { value: "item-2" } });
  await tick();

  expect(get(labelList)[0]).toMatchObject({
    text: "item-2", x: null, y: null
  });
});

test("ラベルリストからの削除（ボタン）", async () => {
  labelList.set([]);
  labelList.add("item-1");

  const result = render(LabelItemList);
  const remove = result.container.querySelector('.LabelItemList__labels .LabelItemList__item-icon--remove');
  await fireEvent.click(remove);
  await tick();

  expect(get(labelList).length).toEqual(0);
});

test("ラベルリストからの削除（テキストインプット）", async () => {
  labelList.set([]);
  labelList.add("item-1");

  const result = render(LabelItemList);
  const change: HTMLInputElement = result.container.querySelector('.LabelItemList__labels .LabelItemList__item input');
  await fireEvent.input(change, { target: { value: "" } });
  await tick();
  await fireEvent.blur(change);
  await tick();

  expect(get(labelList).length).toEqual(0);
});
