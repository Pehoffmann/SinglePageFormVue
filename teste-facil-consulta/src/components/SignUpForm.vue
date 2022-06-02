<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mainCol">
        <BtnPrevious />
        <br />
        <div class="card m-auto">
          <Form
            @submit="nextStep"
            :validation-schema="currentSchema"
            class="container"
          >
            <div class="row mainRow">
              <template v-if="currentStep === 0">
                <div class="col-md-6 col-sm-12">
                  <MainTittle text="Sobre o profissional"></MainTittle>
                  <SubTittle text="Dados do profissional"></SubTittle>
                  <br />
                  <div class="row">
                    <div class="col-md-12">
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
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-8">
                      <div class="form-group">
                        <label for="cpf">CPF*</label>
                        <Field
                          name="cpf"
                          id="cpf"
                          class="form-control"
                          type="text"
                          placeholder="Digite um CPF"
                          maxlength="14"
                          v-model="formValues.cpf"
                          @change="validateCPF(formValues.cpf)"
                          @keyup="formatarCpf()"
                        />
                        <ErrorMessage name="cpf" />
                        <span id="duplicateCpf" class="hide" role="alert">CPF já cadastrado em nosso sistema</span>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-8">
                      <div class="form-group">
                        <label for="tel">Telefone*</label>
                        <Field
                          name="tel"
                          id="tel"
                          class="form-control"
                          type="tel"
                          placeholder="(00) 0 0000-0000"
                          maxlength="16"
                          @keydown="formatarTel()"
                          v-model="formValues.tel"
                        />
                        <ErrorMessage name="tel" />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-6 col-sm-6">
                      <div class="form-group">
                        <label for="estate">Estado*</label>
                        <Field
                          name="estate"
                          id="estate"
                          class="form-select"
                          as="select"
                          v-model="formValues.estate"
                          @change="estadoCidades()"
                        >
                          <option disabled value="">Selecione</option>
                          <option v-for="(estado, index) in estados" :value="estado.nome" :key="index" :id="estado.id">
                            {{ estado.nome }}
                          </option>
                        </Field>
                        <ErrorMessage name="estate" />
                      </div>
                    </div>
                    <div class="col-6 col-sm-6">
                      <div class="form-group">
                        <label for="city">Cidade*</label>
                        <Field
                          name="city"
                          id="city"
                          class="form-select"
                          as="select"
                          v-model="formValues.city"
                        >
                          <option disabled value="">Selecione</option>
                          <option v-for="(cidade, index) in cidades" :value="cidade.nome" :id="cidade.id" class="hide" :key="index" :name="cidade.estadoId">
                            {{ cidade.nome }}
                          </option>
                        </Field>
                        <ErrorMessage name="city" />
                      </div>
                    </div>
                  </div>
                  <br />
                  <div class="row">
                    <div class="col-10">
                      <div class="progress">
                        <div
                          class="progress-bar"
                          role="progressbar"
                          style="width: 50%"
                          aria-valuenow="50"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                    <div class="col-2">
                      <p class="steps">1 de 2</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 col-sm-12 imgs">
                  <img src="./../assets/imgs/desktop-pagina-1.png" alt="" />
                </div>
              </template>
              <template v-if="currentStep === 1">
                <div class="col-md-6 col-sm-12">
                  <MainTittle text="Sobre o atendimento"></MainTittle>
                  <SubTittle text="Detalhes do atendimento"></SubTittle>
                  <br />
                  <div class="form-group">
                    <label for="specialist">Especialidade Principal*</label>
                    <Field
                      name="specialist"
                      id="specialist"
                      class="form-select"
                      as="select"
                      v-model="formValues.specialist"
                    >
                      <option disabled value="">
                        Selecione a especialidade
                      </option>
                      <option v-for="(especialidade, index) in especialidades" :value="especialidade.nome" :key="index">
                        {{ especialidade.nome }}
                      </option>
                    </Field>
                    <ErrorMessage name="specialist" />
                  </div>
                  <div class="row">
                    <div class="col-10">
                      <div class="form-group">
                        <label for="price">Informe o valor da consulta*</label>
                        <div class="input-group flex-nowrap">
                          <span class="input-group-text sifrao" id="addon-wrapping">R$</span>
                          <Field
                            name="price"
                            type="text"
                            id="price"
                            class="form-control"
                            placeholder="Valor"
                            maxlength="6"
                            @keyup="formatarMoeda()"
                            v-model="formValues.price"
                          />
                        </div>
                      </div>
                    </div>
                    <ErrorMessage name="price" />
                  </div>
                  <div class="form-group">
                    <label>Formas de pagamento da consulta*</label>
                    <br />
                    <div class="form-check">
                      <Field
                        name="payMethod"
                        id="dinheiro"
                        class="form-check-input"
                        type="checkbox"
                        :value="1"
                        v-model="formValues.payMethod"
                      />
                      <label class="form-check-label" for="dinheiro">Em dinheiro</label >
                    </div>
                    <br />
                    <div class="form-check">
                      <Field
                        name="payMethod"
                        id="pix"
                        class="form-check-input"
                        type="checkbox"
                        :value="2"
                        v-model="formValues.payMethod"
                      />
                      <label class="form-check-label" for="pix">Pix</label>
                    </div>
                    <br />
                    <div class="form-check">
                      <Field
                        name="payMethod"
                        id="cartao"
                        class="form-check-input"
                        type="checkbox"
                        :value="3"
                        v-model="formValues.payMethod"
                        @click="showRadio()"
                      />
                      <label class="form-check-label" for="cartao">Cartão de crédito</label>
                      <div id="radioBoxes" class="radio hide">
                        <br />
                        <label class="form-check-label installments-tittle" for="cartao">Parcelamento em</label>
                        <br />
                        <Field
                          name="parcelamento"
                          id="parcelamento"
                          class="form-check-input installments"
                          type="radio"
                          value="1x, sem juros"
                          v-model="formValues.parcelamento"
                        />
                        <label class="form-check-label installments" for="parcelamento">1x, sem juros</label>
                        <br />
                        <Field
                          name="parcelamento"
                          id="parcelamento"
                          class="form-check-input installments"
                          type="radio"
                          value="2x, sem juros"
                          v-model="formValues.parcelamento"
                        />
                        <label class="form-check-label installments" for="parcelamento">2x, sem juros</label>
                        <br />
                        <Field
                          name="parcelamento"
                          id="parcelamento"
                          class="form-check-input installments"
                          type="radio"
                          value="3x, sem juros"
                          v-model="formValues.parcelamento"
                        />
                        <label class="form-check-label installments" for="parcelamento" >3x, sem juros</label>
                      </div>
                    </div>
                    <ErrorMessage name="payMethod" />
                  </div>
                  <br />
                  <div class="row">
                    <div class="col-10">
                      <div class="progress">
                        <div
                          class="progress-bar"
                          role="progressbar"
                          style="width: 100%"
                          aria-valuenow="100"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                    <div class="col-2">
                      <p class="steps">2 de 2</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 col-sm-12 imgs">
                  <img src="./../assets/imgs/desktop-pagina-2.png" alt="" />
                </div>
              </template>
              <template v-if="currentStep === 2">
                <div class="row">
                  <div class="col-md-6 col-sm-12">
                    <MainTittle text="Revisão do cadastro"></MainTittle>
                    <h4 class="params">Nome completo</h4>
                    <p>{{ formValues.name }}</p>
                    <br />
                    <h4 class="params">CPF</h4>
                    <p>{{ formValues.cpf }}</p>
                    <br />
                    <h4 class="params">Número de celular ou telefone</h4>
                    <p>{{ formValues.tel }}</p>
                    <br />
                    <h4 class="params">Estado/Cidade</h4>
                    <p>{{ formValues.estate }} - {{ formValues.city }}</p>
                    <br />
                    <h4 class="params">Especialidade principal</h4>
                    <p>{{ formValues.specialist }}</p>
                    <br />
                    <h4 class="params">Preço da consulta</h4>
                    <p>R$ {{ formValues.price }}</p>
                    <br />
                    <h4 class="params">Formas de pagamento da consulta</h4>
                    <p>
                      {{ formaPagamento(formValues.payMethod) }}
                      {{
                        formaPagamento(formValues.payMethod).includes( "Cartão de crédito - " ) ? formValues.parcelamento : ""
                      }}
                    </p>
                    <br />
                  </div>
                  <div class="col-md-6 col-sm-12 imgs">
                    <img src="./../assets/imgs/desktop-pagina-3.png" alt="" />
                  </div>
                </div>
              </template>
              <template v-if="currentStep === 3">
                <div class="row">
                  <div class="col-12">
                    <MainTittle text="Cadastro concluído!"></MainTittle>
                    <SubTittle text="Obrigado por chegar até aqui!"></SubTittle>
                    <br />
                    <p class="finalText">
                      Parabéns,
                      <strong class="params">
                        Dr(a) {{ formValues.name }}
                      </strong>
                      seu cadastro acaba de ser concluído, dentro de alguns dias
                      entraremos em contato através do telefone
                      <strong class="params"> {{ formValues.tel }} </strong>,
                      para a confirmação dos seus dados. <br />
                    </p>
                    <p class="finalText">
                      Se estiver com alguma dúvida sobrando sobre seu cadastro
                      ou sobre nossa plataforma, só entrar na nossa central de
                      ajuda, aqui mesmo no site.
                      <strong><a href="https://facilconsulta.com.br/site/ajuda">Me leve até lá.</a></strong>
                    </p>
                    <p class="finalText">
                      <strong>Os melhores médicos estão no Fácil Consulta!</strong>
                    </p>
                    <br />
                    <div class="imgs">
                      <img src="./../assets/imgs/desktop-pagina-4.jpeg" alt=""/>
                    </div>
                  </div>
                </div>
              </template>
              <div class="row">
                <div class="col-md-6 col-sm-12">
                  <BtnNext @submit="nextStep" />
                  <BtnRegister @submit="nextStep" />
                  <BtnEdit />
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainTittle from "./Tittles/MainTittle.vue";
import SubTittle from "./Tittles/SubTittle.vue";
import BtnRegister from "././Buttons/BtnRegister.vue";
import BtnNext from "././Buttons/BtnNext.vue";
import BtnPrevious from "././Buttons/BtnPrevious.vue";
import BtnEdit from "././Buttons/BtnEdit.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import api from "./../services/api";

//functions
import {
  nextStep,
  prevStep,
  currentSchema,
  currentStep,
  formValues,
} from "../js/functions/btns.js";
import {
  showRadio,
  estadoCidades,
  validateCPF,
  formaPagamento,
  formatarCpf,
  formatarTel,
  formatarMoeda,
} from "../js/functions/utils";

export default {
  name: "SignUpForm",
  components: {
    Form,
    Field,
    ErrorMessage,
    BtnNext,
    BtnPrevious,
    BtnRegister,
    BtnEdit,
    MainTittle,
    SubTittle,
  },
  data() {
    return {
      estados: [],
      cidades: [],
      especialidades: [],
    };
  },
  mounted() {
    api.get("/estados").then((response) => {
      this.estados = response.data;
    });
    api.get("/cidades").then((response) => {
      this.cidades = response.data;
    });
    api.get("/especialidades").then((response) => {
      this.especialidades = response.data;
    });
  },
  setup: () => {
    return {
      currentStep,
      currentSchema,
      prevStep,
      formValues,
      nextStep,
      showRadio,
      estadoCidades,
      validateCPF,
      formaPagamento,
      formatarCpf,
      formatarTel,
      formatarMoeda,
    };
  },
};
</script>