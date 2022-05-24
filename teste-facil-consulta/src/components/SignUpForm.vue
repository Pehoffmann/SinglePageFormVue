<template>
    <div class="container">
      <div class="row">
        <div class="card m-auto">
          <Form @submit="nextStep" :validation-schema="currentSchema">
            <template v-if="currentStep === 0">
              <div class="form-group">
                <label for="name">Nome Completo*</label>
                <Field
                  name="name"
                  id="name"
                  class="form-control"
                  placeholder="Digite o nome completo"
                  v-model="formValues.name"
                />
                <ErrorMessage name="name" />
              </div>
              <div class="form-group">
                <label for="cpf">CPF*</label>
                <Field
                  name="cpf"
                  id="cpf"
                  class="form-control"
                  type="text"
                  placeholder="Digite um CPF"
                  v-model="formValues.cpf"
                />
                <ErrorMessage name="cpf" />
              </div>
              <div class="form-group">
              <label for="tel">TELEFONE*</label>
              <Field
                name="tel"
                id="tel"
                class="form-control"
                type="tel"
                placeholder="(00) 0 0000-0000"
                v-model="formValues.tel"
              />
              <ErrorMessage name="tel" />
              </div>
               <div class="form-group">
              <label for="estate">Estado*</label>
              <Field
                name="estate"
                id="estate"
                class="form-control"
                type="text"
                placeholder="Selecione"
                v-model="formValues.estate"
              />
              <ErrorMessage name="estate" />
              </div>
              <div class="form-group">
              <label for="city">Cidade*</label>
              <Field
                name="city"
                id="city"
                class="form-control"
                type="text"
                placeholder="Selecione"
                v-model="formValues.city"
              />
              <ErrorMessage name="city" />
              </div>
              <br>
              <div class="progress">
                 <div class="progress-bar" role="progressbar" style="width: 50%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <br>
            </template>

            <template v-if="currentStep === 1">
              <label for="password">Password</label>
        <Field
          name="password"
          type="password"
          id="password"
          v-model="formValues.password"
        />
        <ErrorMessage name="password" />

        <label for="confirmation">Confirm Password</label>
        <Field
          name="confirmPassword"
          type="password"
          id="confirmation"
          v-model="formValues.password"
        />
        <ErrorMessage name="confirmPassword" />
            </template>

            <template v-if="currentStep === 2">
              <label for="address">Address</label>
              <Field
                as="textarea"
                name="address"
                id="address"
                v-model="formValues.address"
              />
              <ErrorMessage name="address" />

              <label for="postalCode">Postal Code</label>
              <Field
                name="postalCode"
                id="postalCode"
                v-model="formValues.postalCode"
              />
              <ErrorMessage name="postalCode" />
            </template>

            <template v-if="currentStep === 3">
              <label for="terms">Agree to terms and conditions</label>
              <Field
                name="terms"
                type="checkbox"
                id="terms"
                :value="true"
                v-model="formValues.terms"
              />
              <ErrorMessage name="terms" />
            </template>

            <BtnPrevious  />

            <BtnNext />

            <button v-if="currentStep === 3" type="submit">Finish</button>
          </Form>
          </div>
        </div>
    </div>
</template>

<script>
import BtnNext from "./BtnNext.vue"
import BtnPrevious from "./BtnPrevious.vue"
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { ref, reactive, computed } from "vue";

export default {
  name: "SignUpForm",
  components: {
    Form,
    Field,
    ErrorMessage,
    BtnNext,
    BtnPrevious,
  },
  setup: () => {
    const currentStep = ref(0);
    const formValues = reactive({});

    const schemas = [
      yup.object({
        name: yup.string().required('Nome inválido').min(3, 'Minimo 3 caracteres').max(48, 'Maximo 48 caracteres'),
        // eslint-disable-next-line
        cpf: yup.string().required().matches(/([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/, "CPF inválido"),
        tel: yup.string().required(),
      }),
      yup.object({
        password: yup.string().required().min(6),
        confirmPassword: yup
          .string()
          .required()
          .min(6)
          .oneOf([yup.ref("password")], "Passwords must match"),
      }),
      yup.object({
        address: yup.string().required(),
        postalCode: yup
          .string()
          .required()
          .matches(/^[0-9]+$/, "Must be numeric"),
      }),
      yup.object({
        terms: yup.bool().required().equals([true]),
      }),
    ];

    const currentSchema = computed(() => {
      return schemas[currentStep.value];
    });

    function nextStep(values) {
      if (currentStep.value === 3) {
        console.log("Done: ", JSON.stringify(formValues, null, 2));
        return;
      }
      Object.assign(formValues, values);
      console.log("Current values: ");
      console.log(JSON.stringify(formValues, null, 2));
      currentStep.value++;
    }

    function prevStep() {
      if (currentStep.value <= 0) {
        return;
      }

      currentStep.value--;
    }

    return {
      currentStep,
      currentSchema,
      prevStep,
      formValues,
      nextStep,
    };
  },
};
</script>

<style scoped>

 .container {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin: 40px 0;
}

.container .card {
    position: relative;
    margin: 20px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
}


span {
  display: block;
  margin-bottom: 20px;
}

label {
  display: block;
  margin-top: 20px;
}

button {
  display: block;
  margin-top: 10px;
}

button[type="submit"] {
  margin-top: 10px;
}

form {
  padding: 20px;
}

.progress-bar {
  background-color: var(--color-primary-0);
}
</style>
