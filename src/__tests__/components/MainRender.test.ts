import { render } from "@testing-library/svelte";

import "~/utils/i18n-auto-settings";
import labelList from "~/stores/label-list";
import { image } from "~/stores/render-options";

import MainRender from "~/components/MainRender.svelte";

const dummyImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAAXNSR0IArs4c6QAAABNJREFUGFdjZGBg+M+ABhhpIAgAJ4wFAdoS1GgAAAAASUVORK5CYII=";

test("正常にレンダリングされるか", async () => {
  image.set({
    url: dummyImage,
    width: 5,
    height: 5
  });

  const result = render(MainRender);
  expect(result.container).toBeInstanceOf(HTMLElement);
});

test("ラベルリストに項目がある時にラベルが正常にレンダリングされるか", async () => {
  image.set({
    url: dummyImage,
    width: 5,
    height: 5
  });

  labelList.set([]);
  labelList.add("item-1");

  const result = render(MainRender);
  const listItemNumber = result.container.querySelector(".MainRender__labels .MainRender__item-number");
  expect(listItemNumber.textContent).toEqual("1");
});

test("ラベルリストに項目がある時にリストが正常にレンダリングされるか", async () => {
  image.set({
    url: dummyImage,
    width: 5,
    height: 5
  });

  labelList.set([]);
  labelList.add("item-1");

  const result = render(MainRender);
  const listItemText = result.container.querySelector(".MainRender__list .MainRender__item-text");
  expect(listItemText.textContent).toEqual("item-1");
});
