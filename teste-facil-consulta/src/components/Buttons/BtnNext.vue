<template>
  <div class="d-grid gap-2">
    <button v-if="currentStep !== 3 && currentStep !==2" type="submit" class="btn" id="next-btn">PRÓXIMO</button>
  </div>
</template>

<script>
import {currentStep} from "../../js/functions/btns"
  export default {
    name: "BtnNext",
    components: {},
      setup: () => {
    return {
      currentStep
    };
  },
  };
</script>

<style scoped>
.btn {
  background-color: var(--color-primary-0);
  color: var(--color-secondary-0) ;
}
</style>
