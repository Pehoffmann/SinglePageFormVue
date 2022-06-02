import { ref, reactive, computed } from "vue";
import schemas from "./schemas"

export const currentStep = ref(0);
export const formValues = reactive({});

export function nextStep(values) {
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

export const currentSchema = computed(() => {
    return schemas[currentStep.value];
});

export function prevStep() {
    if (currentStep.value <= 0) {
      return;
    }

    currentStep.value--;
}

export function firstStep() {
  if (currentStep.value == 2) {
    return currentStep.value = 0
  }
}