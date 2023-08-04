<script lang="ts">
  import { _ } from "svelte-i18n";
  import { readFile } from "~/utils/load-image";
</script>

<div class="StartUp">
  <div class="StartUp__image">
    <img src="completion-image.png" alt="" />
  </div>
  <div class="StartUp__guide">
    <div class="StartUp__guide-section">
      <h2>Step 1</h2>
      <p>{$_("guide.step1")}</p>
    </div>
    <div class="StartUp__guide-section">
      <h2>Step 2</h2>
      <p>{$_("guide.step2")}</p>
    </div>
    <div class="StartUp__guide-section">
      <h2>Step 3</h2>
      <p>{$_("guide.step3")}</p>
    </div>
    <div class="StartUp__guide-section">
      <h2>Step 4</h2>
      <p>{$_("guide.step4")}</p>
    </div>
  </div>

  <label class="StartUp__open-file-button">
    <input
      type="file"
      on:change={readFile}
      style="display: none !important;"
      accept="image/jpeg,image/png"
    />
    {$_("guide.start")}
  </label>
</div>

<style lang="scss">
  .StartUp {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 32px;
    max-width: 100%;
    margin: 16px auto;
    padding: 32px;
    &__image {
      display: flex;
      justify-content: center;
      > img {
        max-width: 100%;
      }
    }
    &__guide {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    &__guide-section {
      display: flex;
      align-items: center;
      gap: 32px;
      > h2 {
        min-width: fit-content;
        margin: 0;
        font-family: "Times New Roman", Times, serif;
        font-size: 1.5em;
        font-style: italic;
      }
      > p {
        margin: 0;
        font-size: 0.9em;
        opacity: 0.9;
      }
      @include responsive(laptop) {
        > h2 {
          font-size: 2em;
        }
        > p {
          font-size: 1em;
        }
      }
    }
    &__open-file-button {
      padding: 16px 32px;
      background-color: var(--color-blue);
      border-radius: 32px;
      font-size: 1.1rem;
      cursor: pointer;
    }
  }
</style>
