<template>
  <div class="d-grid gap-2">
    <button v-if="currentStep !== 3" type="submit" class="btn">Próximo</button>
  </div>
</template>

<script>
import { ref, reactive } from "vue";

export default {
  name: "BtnNext",
  components: {},
};

const currentStep = ref(0);
const formValues = reactive({});

function nextStep(values) {
  if (currentStep.value === 3) {
    console.log("Done: ", JSON.stringify(formValues, null, 2));
    return;
  }
  Object.assign(formValues, values);
  console.log("Current values: ");
  console.log(JSON.stringify(formValues, null, 2));
  currentStep.value++;

  return {
    nextStep,
  };
}
</script>

<style scoped>
.btn {
  background-color: var(--color-primary-0);
}
</style>
