<script lang="ts">
  import { _ } from "svelte-i18n";
  import SvgIcon from "@jamescoyle/svelte-icon";
  import { mdiRestore } from "@mdi/js";

  import { readFile } from "~/utils/load-image";
</script>

<label class="RestartButton">
  <input
    type="file"
    on:change={readFile}
    style="display: none !important;"
    accept="image/jpeg,image/png"
  />
  <SvgIcon type="mdi" path={mdiRestore} />
  {$_("image.restart")}
</label>

<style lang="scss">
  .RestartButton {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    width: 100%;
    background-color: red;
    cursor: pointer;
    box-sizing: border-box;
  }
</style>
