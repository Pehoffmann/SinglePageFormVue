<template>
  <div class="d-grid gap-2">
    <button v-if="currentStep == 2" type="submit" class="btn">CADASTRAR PROFISSIONAL</button>
  </div>
</template>

<script>
import {currentStep} from "../../assets/js/functions/btns"
  export default {
    name: "BtnRegister",
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
  background-color: var(--color-cta-0);
  color: var(--color-secondary-4) ;
  font-weight: bold;
  border-radius: 15px;
}
</style>
