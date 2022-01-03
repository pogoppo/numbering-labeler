<script lang="ts">
  import { _ } from "svelte-i18n";
  import { readFile } from "~/utils/load-image";
</script>

<div class="StartUp">
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label class="StartUp__open-file-button">
    <input
      type="file"
      on:change={readFile}
      style="display: none !important;"
      accept="image/jpeg,image/png"
    />
    {$_("image.file")}
  </label>
</div>

<style lang="scss">
  .StartUp {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 960px;
    max-width: 100%;
    margin: 16px auto;
    padding: 32px;
    &__open-file-button {
      padding: 16px 48px;
      background-color: var(--color-blue);
      border-radius: 4px;
      font-size: 1.2rem;
      cursor: pointer;
    }
  }
</style>
