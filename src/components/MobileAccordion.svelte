<script lang="ts">
  import { _ } from "svelte-i18n";
  import SvgIcon from "@jamescoyle/svelte-icon";
  import { mdiPlus, mdiMinus } from "@mdi/js";

  export let disabled: boolean;
  export let expand: boolean;
  export let title: string;
</script>

<div
  class="MobileAccordion"
  class:MobileAccordion--expand={expand}
  class:MobileAccordion--disabled={disabled}
>
  <button class="MobileAccordion__switch" on:click={() => (expand = !expand)}>
    <SvgIcon type="mdi" path={expand ? mdiMinus : mdiPlus} />
    {title}
  </button>
  <div class="MobileAccordion__body">
    <slot />
  </div>
</div>

<style lang="scss">
  .MobileAccordion {
    &__switch {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      padding: 8px 16px;
      background-color: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #fff;
    }
    &__body {
      overflow: hidden;
      height: 0;
      opacity: 0;
      transition: opacity 0.2s ease-in 0.2s;
    }
    &--disabled {
      visibility: hidden;
    }
    @include responsive(laptop) {
      display: contents;
      &__switch {
        display: none;
      }
      &__body {
        display: contents;
        overflow: unset;
        height: unset;
        opacity: unset;
        transition: unset;
      }
      &--disabled .MobileAccordion__body > :global(*) {
        opacity: 0.5 !important;
        pointer-events: none;
      }
    }
  }
  .MobileAccordion--expand {
    .MobileAccordion__switch {
      background-color: rgba(255, 255, 255, 0.2);
    }
    .MobileAccordion__body {
      height: auto;
      opacity: 1;
    }
  }
</style>
