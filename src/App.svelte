<script lang="ts">
  import { onMount } from "svelte";
  import { _ } from "svelte-i18n";
  import ScrollBooster from "scrollbooster";
  import SvgIcon from "@jamescoyle/svelte-icon";
  import {
    mdiRestore,
    mdiMagnifyPlusOutline,
    mdiMagnifyMinusOutline,
  } from "@mdi/js";

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
      lockScrollOnDragDirection: false,
      bounce: true,
      shouldScroll: (_, event) => {
        return event.target.dataset.noScroll == undefined;
      },
    });
  });
</script>

<main>
  <div class="AppLayout__workspace-area">
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
      <div class="AppLayout__zoom-control">
        <div class="AppLayout__zoom-range">
          <SvgIcon type="mdi" path={mdiMagnifyMinusOutline} />
          <input
            class="AppLayout__zoom-range"
            type="range"
            bind:value={$render_.zoom}
            min="0.1"
            max="1"
            step="0.1"
          />
          <SvgIcon type="mdi" path={mdiMagnifyPlusOutline} />
        </div>
        <div class="AppLayout__zoom-rate">
          {Math.floor(100 * $render_.zoom * 100) / 100}%
        </div>
      </div>
    {/if}
  </div>

  <div class="AppLayout__list" class:AppLayout__list--disabled={!!!$image.url}>
    <LabelItemList />
    {#if $labelList.length}
      <DownloadRender renderElement={$render_.render} />
    {/if}
    {#if $image.url}
      <label class="AppLayout__restart">
        <input
          type="file"
          on:change={readFile}
          style="display: none !important;"
          accept="image/jpeg,image/png"
        />
        <SvgIcon type="mdi" path={mdiRestore} />
        {$_("image.restart")}
      </label>
    {/if}
  </div>

  <div
    class="AppLayout__control"
    class:AppLayout__control--disabled={!!!$labelList.length}
  >
    <RenderOptionControl />
  </div>
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
      grid-template-rows: 50vh 1fr 1fr;
      grid-template-areas: "workspace" "list" "control";
    }
    @include responsive(tablet) {
      display: grid;
      grid-template-columns: 100vw;
      grid-template-rows: 50vh 1fr 1fr;
      grid-template-areas: "workspace" "list" "control";
    }
    @include responsive(laptop) {
      display: grid;
      grid-template-columns: 320px 1fr 320px;
      grid-template-rows: 100vh;
      grid-template-areas: "control workspace list";
    }
  }
  .AppLayout {
    &__workspace,
    &__control,
    &__list {
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
    &__workspace-area {
      grid-area: workspace;
      position: relative;
      overflow: hidden;
    }
    &__workspace {
      display: flex;
      overflow: auto;
      width: 100%;
      height: 100%;
    }
    &__render {
      width: max-content;
      height: max-content;
      margin: auto;
    }
    &__list,
    &__control {
      overflow-y: auto;
      max-height: 100vh;
      background-color: rgba(0, 0, 0, 0.1);
      &--disabled {
        opacity: 0.5;
        pointer-events: none;
      }
    }
    &__list {
      grid-area: list;
      display: grid;
      grid-template-rows: 1fr 48px 48px;
    }
    &__control {
      grid-area: control;
    }
    &__zoom-control {
      display: flex;
      align-items: center;
      gap: 8px;
      position: absolute;
      right: 8px;
      bottom: 8px;
      z-index: 8;
      opacity: 0.75;
      user-select: none;
    }
    &__zoom-range {
      display: flex;
      align-items: center;
      gap: 4px;
      > input[type="range"] {
        width: 120px;
        height: 2px;
        background-color: rgba(255, 255, 255, 0.5);
        cursor: pointer;
        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px;
          height: 16px;
          background-color: var(--color-blue);
          border-radius: 50%;
        }
        &::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background-color: var(--color-blue);
          border-radius: 50%;
          border: none;
        }
        &::-moz-focus-outer {
          border: 0;
        }
      }
    }
    &__zoom-rate {
      width: 4ch;
    }
    &__restart {
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
