<script>
import * as yup from "yup";

const schemas = [
  yup.object({
    name: yup
      .string()
      .required("Campo nome precisa ser preenchido!")
      .min(3, "Mínimo 3 caracteres")
      .max(48, "Máximo 48 caracteres"),
    cpf: yup
      .string()
      .required("Campo CPF precisa ser preenchido!")
      .max(14, "CPF inválido!")
      .matches(
        // eslint-disable-next-line
        /([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/,
        "CPF inválido!"
      ),
    tel: yup
      .string()
      .required("Campo telefone precisa ser preenchido!")
      .max(16, "Telefone inválido!")
      .matches(
        // eslint-disable-next-line
        /^[\(]?[1-9]{2}[\)] 9 [0-9]{4}[-]?[0-9]{4}$/,
        "Telefone inválido!"
      ),
    estate: yup.string().required("Campo estado precisa ser preenchido!"),
    city: yup.string().required("Campo cidade precisa ser preenchido!"),
  }),
  yup.object({
    specialist: yup
      .string()
      .required("Campo especialidade precisa ser preenchido!"),
    price: yup
      .number()
      .required("Campo valor precisa ser preenchido!")
      .min(30, "Valor mínimo R$ 30,00")
      .max(350, "Valor máximo de R$ 350,00"),
    payMethod: yup
      .number()
      .required("Campo forma de pagamento deve ser preenchido!")
      .oneOf([1, 2, 3], "Obrigatorio"),
    parcelamento: yup.string(),
  }),
  yup.object({}),
];

export default schemas;
</script>
