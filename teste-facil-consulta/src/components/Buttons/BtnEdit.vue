<template>
  <div class="d-grid gap-2">
    <button v-if="currentStep == 2" type="reset" class="btn" @click="firstStep">Editar cadastro</button>
  </div>
</template>

<script>
import {currentStep, firstStep} from "../../assets/js/functions/btns"
  export default {
    name: "BtnEdit",
    components: {},
      setup: () => {
    return {
      currentStep,
      firstStep
    };
  },
  };
</script>

<style scoped>
.btn {
  color: var(--color-primary-0) ;
  font-weight: bold;
  border-radius: 15px;
}
</style>
