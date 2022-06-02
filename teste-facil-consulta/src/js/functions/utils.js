import api from "../../services/api";

export const showRadio = () => {
  const radio = document.getElementById("radioBoxes");
  const cartao = document.getElementById("cartao");
  const showRadio = "showRadio";
  if (cartao.checked == true) {
    radio.classList.add(showRadio);
  } else {
    radio.classList.remove(showRadio);
    let parcelamento = document.getElementsByName("parcelamento");
    for (let i = 0; i < parcelamento.length; i++) {
      parcelamento[i].checked = false;
    }
  }
};
export const estadoCidades = () => {
  const estado = document.getElementById("estate");
  const optionsEstado = estado.options;
  const estadoId = optionsEstado[optionsEstado.selectedIndex].id;

  document.querySelectorAll("#city option[name]").forEach(function (i) {
    i.classList.add("hide");
  });

  if (estadoId) {
    document
      .querySelectorAll('#city option[name="' + estadoId + '"]')
      .forEach(function (i) {
        i.classList.remove("hide");
      });
  }
};
export const validateCPF = (cpf) => {
  cpf = cpf.replace(/\D/g, "");
  api.get("/profissionais?cpf=" + cpf).then((response) => {
    const profissionais = response.data;
    const duplicateCpf = document.getElementById("duplicateCpf");
    const disableCpf = document.getElementById("next-btn");
    if (profissionais.length > 0) {
      duplicateCpf.classList.remove("hide");
      disableCpf.setAttribute("disabled", "");
    } else {
      duplicateCpf.classList.add("hide");
      disableCpf.removeAttribute("disabled", "");
    }
  });
};
export const formaPagamento = (forma) => {
  const formaFinal = [];
  forma.forEach((element, index) => {
    switch (true) {
      case element === 1:
        forma[index] = formaFinal.push("Em dinheiro");
        break;
      case element === 2:
        forma[index] = formaFinal.push("Pix");
        break;
      case element === 3:
        forma[index] = formaFinal.push("Cartão de crédito - ");
        break;
    }
  });
  console.log(forma);
  console.log(formaFinal);

  return formaFinal.join(", ");
};
export const formatarCpf = () => {
  const cpfId = document.getElementById("cpf");
  const cpf = cpfId.value.length;
  if (cpf === 3 || cpf === 7) {
    cpfId.value = cpfId.value + ".";
  } else if (cpf === 11) {
    cpfId.value = cpfId.value + "-";
  }
};
export const formatarTel = () => {
  const telId = document.getElementById("tel");
  const tel = telId.value.length;
  if (tel === 0) {
    telId.value = telId.value + "(";
  } else if (tel === 3) {
    telId.value = telId.value + ") ";
  } else if (tel === 4) {
    telId.value = telId.value + " ";
  } else if (tel === 6) {
    telId.value = telId.value + " ";
  } else if (tel === 11) {
    telId.value = telId.value + "-";
  }
};
export const formatarMoeda = () => {
  const price = document.getElementById("price");
  price.value = price.value + "";
  price.value = parseInt(price.value.replace(/[\D]+/g, ""));
  price.value = price.value + "";
  price.value = price.value.replace(/([0-9]{2})$/g, ".$1");
  if (price.value == "NaN") price.value = "";
};
