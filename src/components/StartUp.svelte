<script lang="ts">
  import { _ } from "svelte-i18n";

  import { image, render_ } from "~/stores/render-options";

  let file: FileList;

  const readFile = (event: any) => {
    const reader = new FileReader();
    const imageFile = event.target.files[0];
    const workspaceWidth = $render_.workspace.clientWidth;
    const workspaceHeight = $render_.workspace.clientHeight;

    reader.readAsDataURL(imageFile);
    reader.onload = () => {
      const img = new Image();

      img.onload = () => {
        const widthRate = workspaceWidth / img.width;
        const heightRate = workspaceHeight / img.height;
        const zoom = Math.min(1, widthRate * 0.9, heightRate * 0.9);

        image.set({
          width: img.width,
          height: img.height,
          url: reader.result as string,
        });
        // 初期化処理 //
        $render_.labels = [];
        $render_.zoom = zoom;
        $render_.sbInstance.setPosition({
          x: (img.width - img.width * widthRate) / 2,
          y: (img.height - img.height * heightRate) / 2,
        });
        ///////////////
      };

      img.src = reader.result as string;
    };
  };
</script>

<div class="StartUp">
  <label class="StartUp__file-select-button">
    <input
      type="file"
      bind:files={file}
      on:change={readFile}
      style="display: none !important;"
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
  }
  .StartUp__file-select-button {
    padding: 16px 48px;
    background-color: var(--color-blue);
    border-radius: 4px;
    font-size: 1.2rem;
    cursor: pointer;
  }
</style>
