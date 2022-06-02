<template>
  <div class="prev">
    <button
      v-if="currentStep !== 0 && currentStep !== 3"
      type="button"
      class="btn prevBtn"
      @click="prevStep"
    >
      <i class="bi bi-chevron-left"></i>
    </button>
  </div>
</template>

<script>
import { prevStep, currentStep } from "../../assets/js/functions/btns"
export default {
  name: "BtnPrevious",
  components: {},
  setup: () => {
    return {
      currentStep,
      prevStep,
    };
  },
};
</script>

<style scoped>
i {
  color: var(--color-primary-0);
  font-size: 2rem;
  cursor: pointer;
}
.prev {
  margin-left: 140px;
}

.prevBtn {
  border-width: 0px;
}

@media screen and (-webkit-min-device-pixel-ratio: 2) and (-webkit-max-device-pixel-ratio: 3) and (max-width: 640px),
  (max-width: 640px) {
  .prev {
    margin-left: 0px;
  }
}
</style>
