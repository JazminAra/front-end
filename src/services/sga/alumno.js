import axiosIntranet from "../../boot/axios";

export async function getPersona(token, nromatricula) {
  axiosIntranet.defaults.headers.common["Authorization"] = "Bearer " + token;
  return axiosIntranet
    .get("/personasga" + "?per_login=" + nromatricula);
}

export async function resendVerification(email) {
  return axiosIntranet.post("/authManagement", {
    action: "resendVerifySignup",
    value: { email: email }
  });
}

export function getHijosApoderado(token, apo_id) {
    axiosIntranet.defaults.headers.common["Authorization"] = "Bearer " + token;
    return axiosIntranet
      .get("/apoderadohijos" + "?apo_id=" + apo_id);
  }
