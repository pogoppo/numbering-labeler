<script lang="ts">
  import { _ } from "svelte-i18n";
  import { readFile } from "~/utils/load-image";
</script>

<div class="StartUp">
  <div class="StartUp__guide">
    <div class="StartUp__guide-section">
      <h2>Step 1</h2>
      <p>画像を開く</p>
    </div>
    <div class="StartUp__guide-section">
      <h2>Step 2</h2>
      <p>ラベル名を入力してラベルを追加する</p>
    </div>
    <div class="StartUp__guide-section">
      <h2>Step 3</h2>
      <p>画像上のラベル番号、ラベル一覧を調整する</p>
    </div>
    <div class="StartUp__guide-section">
      <h2>Step 4</h2>
      <p>画像をダウンロードして完了</p>
    </div>
  </div>

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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 32px;
    max-width: 100%;
    margin: 16px auto;
    padding: 32px;
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
        margin: 0;
        font-family: "Times New Roman", Times, serif;
        font-size: 2em;
        font-style: italic;
      }
      > p {
        margin: 0;
        opacity: 0.9;
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
