<template>
  <div>
    <button
      v-if="currentStep !== 0"
      type="button"
      class="btn"
      @click="prevStep"
    ></button>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "BtnPrevious",
  components: {},
};

const currentStep = ref(0);
function prevStep() {
  if (currentStep.value <= 0) {
    return;
  }

  currentStep.value--;

  return {
    prevStep,
  };
}
</script>

<style scoped></style>
