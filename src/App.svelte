<script lang="ts">
  import { onMount } from "svelte";
  import ScrollBooster from "scrollbooster";

  import { image, render_ } from "~/stores/render-options";
  import labelList from "~/stores/label-list";

  import AppLayoutWorkSpace from "~/components/AppLayoutWorkSpace.svelte";
  import AppLayoutLabelList from "~/components/AppLayoutLabelList.svelte";
  import AppLayoutRenderControls from "~/components/AppLayoutRenderControls.svelte";
  import MobileAccordion from "~/components/MobileAccordion.svelte";

  onMount(() => {
    $render_.sbInstance = new ScrollBooster({
      viewport: $render_.workspace,
      scrollMode: "native",
      lockScrollOnDragDirection: false,
      bounce: false,
      pointerMode: "mouse",
      shouldScroll: (_, event) => {
        return event.target.dataset.noScroll == undefined;
      },
    });
  });
</script>

<main>
  <AppLayoutWorkSpace />
  <MobileAccordion
    disabled={!!!$image.url}
    expand={false}
    title="ラベルの追加と画像のダウンロード"
  >
    <AppLayoutLabelList />
  </MobileAccordion>
  <MobileAccordion
    disabled={!!!$image.url}
    expand={false}
    title="スタイルの編集"
  >
    <AppLayoutRenderControls />
  </MobileAccordion>
</main>

<style lang="scss">
  main {
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    user-select: none;
    @include responsive(mobile) {
      display: grid;
      grid-template-columns: 100vw;
      grid-template-rows:
        1fr
        auto
        auto;
      grid-template-areas: "workspace" "list" "control";
    }
    @include responsive(tablet) {
      display: grid;
      grid-template-columns: 100vw;
      grid-template-rows:
        1fr
        auto
        auto;
      grid-template-areas: "workspace" "list" "control";
    }
    @include responsive(laptop) {
      display: grid;
      grid-template-columns: 320px 1fr 320px;
      grid-template-rows: 100vh;
      grid-template-areas: "control workspace list";
    }
  }
</style>
