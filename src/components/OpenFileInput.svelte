<script lang="ts">
  import { image, render_ } from "~/stores/render-options";
  import labelList from "~/stores/label-list";

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
        $labelList = [];
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

<input
  type="file"
  on:change={readFile}
  style="display: none !important;"
  accept="image/jpeg,image/png"
/>
