<script lang="ts">
  import { tick } from "svelte";
  import SvgIcon from "@jamescoyle/svelte-icon";
  import { mdiViewList, mdiLabel } from "@mdi/js";

  import { list, label as label_, render_ } from "~/stores/render-options";
  import { _ } from "svelte-i18n";

  $: {
    // リストに変更があった際にScrollBoosterの領域を再計算 //
    $list.pos;
    $list.overlay;
    (async () => {
      await tick();
      $render_.sbInstance?.updateMetrics();
    })();
    /////////////////////////////////////////////////////
  }
</script>

<div class="RenderControls">
  <div class="RenderControls__section">
    <h3>
      <SvgIcon type="mdi" path={mdiViewList} />
      {$_("control.heading.list")}
    </h3>
    <div class="RenderControls__item">
      <h4>{$_("control.heading.position")}</h4>
      <div class="RenderControls__switch">
        <span
          class:active={$list.pos == "bottom"}
          on:click={() => ($list.pos = "bottom")}
        >
          {$_("control.position.bottom")}
        </span>
        <span
          class:active={$list.pos == "right"}
          on:click={() => ($list.pos = "right")}
        >
          {$_("control.position.right")}
        </span>
        <span
          class:active={$list.overlay}
          on:click={() => ($list.overlay = !$list.overlay)}
        >
          {$_("control.position.stack")}
        </span>
      </div>
    </div>
    <div class="RenderControls__item">
      <h4>{$_("control.heading.background-color")}</h4>
      <label>
        <input type="color" bind:value={$list.color} />
        <span class="RenderControls__button">
          {$_("control.change")}
        </span>
      </label>
    </div>
    {#if $list.overlay}
      <div class="RenderControls__item">
        <h4>{$_("control.heading.background-opacity")}</h4>
        <input
          type="range"
          bind:value={$list.alpha}
          min="0"
          max="100"
          step="10"
        />
      </div>
    {/if}
    <div class="RenderControls__item">
      <h4>{$_("control.heading.font-color")}</h4>
      <label>
        <input type="color" bind:value={$list.fontColor} />
        <span class="RenderControls__button">
          {$_("control.change")}
        </span>
      </label>
    </div>
    <div class="RenderControls__item">
      <h4>{$_("control.heading.font-size")}</h4>
      <input
        type="range"
        bind:value={$list.fontSize}
        min={$list.maxFontSize / 10}
        max={$list.maxFontSize}
        step={$list.maxFontSize / 10}
      />
    </div>
  </div>

  <div class="RenderControls__section">
    <h3>
      <SvgIcon type="mdi" path={mdiLabel} />
      {$_("control.heading.label")}
    </h3>
    <div class="RenderControls__item">
      <h4>{$_("control.heading.background-color")}</h4>
      <label>
        <input type="color" bind:value={$label_.color} />
        <span class="RenderControls__button">
          {$_("control.change")}
        </span>
      </label>
    </div>
    <div class="RenderControls__item">
      <h4>{$_("control.heading.background-opacity")}</h4>
      <input
        type="range"
        bind:value={$label_.alpha}
        min="0"
        max="100"
        step="10"
      />
    </div>
    <div class="RenderControls__item">
      <h4>{$_("control.heading.font-color")}</h4>
      <label>
        <input type="color" bind:value={$label_.fontColor} />
        <span class="RenderControls__button">
          {$_("control.change")}
        </span>
      </label>
    </div>
    <div class="RenderControls__item">
      <h4>{$_("control.heading.font-size")}</h4>
      <input
        type="range"
        bind:value={$label_.fontSize}
        min={$label_.maxFontSize / 10}
        max={$label_.maxFontSize}
        step={$label_.maxFontSize / 10}
      />
    </div>
  </div>
</div>

<style lang="scss">
  .RenderControls {
    display: flex;
    flex-direction: column;
    gap: 32px;
    padding: 16px;
    font-size: 0.9em;
    &__section {
      display: flex;
      flex-direction: column;
      gap: 16px;
      > h3 {
        display: flex;
        align-items: center;
        gap: 4px;
        margin: 0;
        padding-bottom: 8px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.25);
      }
    }
    &__item {
      display: flex;
      flex-direction: column;
      gap: 4px;
      > h4 {
        margin: 0;
      }
      > label {
        display: inline-flex;
        align-items: center;
        width: fit-content;
      }
      input[type="color"] {
        height: 40px;
        margin-right: 8px;
      }
      input[type="range"] {
        width: 100%;
        max-width: 160px;
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 8px;
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
    &__button {
      padding: 4px 8px;
      background-color: var(--color-blue);
    }
    &__switch {
      > span {
        display: inline-flex;
        align-items: center;
        margin: 8px 4px;
        padding: 4px 12px;
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 12px;
        opacity: 0.6;
        cursor: pointer;
        &.active {
          background-color: var(--color-blue);
          opacity: 1;
        }
      }
    }
  }
</style>
