<script lang="ts">
  import { onMount } from "svelte";
  import { _ } from "svelte-i18n";
  import ScrollBooster from "scrollbooster";
  import SvgIcon from "@jamescoyle/svelte-icon";
  import { mdiAutorenew, mdiMagnifyPlusOutline } from "@mdi/js";

  import {
    image,
    list,
    label as label_,
    render_,
  } from "~/stores/render-options";
  import labelList from "~/stores/label-list";

  import MainRender from "~/components/MainRender.svelte";
  import StartUp from "~/components/StartUp.svelte";
  import LabelItemList from "~/components/LabelItemList.svelte";
  import RenderOptionControl from "~/components/RenderOptionControls.svelte";
  import DownloadRender from "~/components/DownloadRenderButton.svelte";

  import { readFile } from "~/utils/load-image";

  const toHEX = (n: number) =>
    Math.round(n * 2.55)
      .toString(16)
      .padStart(2, "0");

  onMount(() => {
    $render_.sbInstance = new ScrollBooster({
      viewport: $render_.workspace,
      scrollMode: "native",
      emulateScroll: true,
      bounce: true,
      shouldScroll: (_, event) => {
        return event.target.dataset.noScroll == undefined;
      },
      onWheel: (_, event) => {
        event.preventDefault();
        $render_.zoom += event.deltaY * -0.001;
        $render_.zoom = Math.min(Math.max(0.125, $render_.zoom), 1);
      },
    });
  });
</script>

<main>
  <div
    class="AppLayout__control"
    class:AppLayout__control--disabled={!!!$labelList.length}
  >
    <RenderOptionControl />
  </div>

  <div class="AppLayout__workspace-wrapper">
    <div bind:this={$render_.workspace} class="AppLayout__workspace">
      <div bind:this={$render_.render} class="AppLayout__render">
        {#if $image.url}
          <MainRender
            zoom={$render_.zoom}
            --image-width={`${$image.width}px`}
            --image-height={`${$image.height}px`}
            --list-rgb={$list.color}
            --list-rgba={$list.color + toHEX($list.alpha)}
            --list-font-color={$list.fontColor}
            --list-font-size={`${$list.fontSize}px`}
            --label-rgb={$label_.color}
            --label-rgba={$label_.color + toHEX($label_.alpha)}
            --label-font-color={$label_.fontColor}
            --label-font-size={`${$label_.fontSize}px`}
          />
        {:else}
          <StartUp />
        {/if}
      </div>
    </div>
    {#if $image.url}
      <aside class="AppLayout__zoom-rate">
        <SvgIcon type="mdi" path={mdiMagnifyPlusOutline} />
        {Math.floor(100 * $render_.zoom * 100) / 100}%
      </aside>
    {/if}
  </div>

  <div class="AppLayout__list" class:AppLayout__list--disabled={!!!$image.url}>
    <LabelItemList />
    <DownloadRender renderElement={$render_.render} />
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label class="AppLayout__open-file">
      <input
        type="file"
        on:change={readFile}
        style="display: none !important;"
        accept="image/jpeg,image/png"
      />
      <SvgIcon type="mdi" path={mdiAutorenew} />
      {$_("image.restart")}
    </label>
  </div>
</main>

<style lang="scss">
  main {
    display: grid;
    grid-template-columns: 320px 1fr 320px;
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    user-select: none;
  }
  .AppLayout {
    &__workspace {
      display: flex;
      overflow: auto;
      width: 100%;
      height: 100%;
      scrollbar-color: rgba(255, 255, 255, 0.2);
      scrollbar-width: thin;
      &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 10px;
      }
      &::-webkit-scrollbar-button,
      &::-webkit-scrollbar-track,
      &::-webkit-scrollbar-track-piece,
      &::-webkit-scrollbar-corner,
      &::-webkit-resizer {
        display: none;
      }
    }
    &__render {
      width: max-content;
      height: max-content;
      margin: auto;
    }
    &__workspace-wrapper {
      position: relative;
      overflow: hidden;
    }
    &__zoom-rate {
      display: flex;
      align-items: center;
      gap: 4px;
      position: absolute;
      right: 32px;
      bottom: 32px;
      z-index: 8;
      opacity: 0.5;
      pointer-events: none;
      text-align: right;
    }
    &__control,
    &__list {
      max-height: 100vh;
      background-color: rgba(0, 0, 0, 0.1);
      &--disabled {
        opacity: 0.5;
        pointer-events: none;
      }
    }
    &__list {
      display: grid;
      grid-template-rows: 1fr 48px 48px;
    }
    &__open-file {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 4px;
      width: 100%;
      background-color: red;
      cursor: pointer;
      box-sizing: border-box;
    }
  }
</style>
