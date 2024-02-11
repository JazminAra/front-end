import { LocalStorage, SessionStorage } from "quasar";
import { axiosApp } from "boot/axiosapp";
import Constants from "../../utils/constants";

const ORGAN_TYPE_CREATE = "/organ-type/create-one";
const ORGAN_TYPE_PATCH = "/organ-type/update-one";
const ORGAN_TYPE_FIND_ALL = "/organ-type/find-all";
const ORGAN_TYPE_DELETE = "/organ-type/soft-delete";


function headersAxios() {
  const token = LocalStorage.getItem("token"); // Obtener token user
  axiosApp.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export async function organtypeFindAll(state) {
  headersAxios();
  
  const result = await axiosApp.get(ORGAN_TYPE_FIND_ALL);
  try {
    if (result.status == Constants.HTTP_Status_Codes.OK) {
      return { status: result.data.status, data: result.data.data };
    } else {
      return { status: false, data: null };
    }
  } catch (err) {
    return { status: false, data: null, error: err };
  }
}

export async function saveOrganType(state, data) {
  headersAxios();

  const req = {
  tor_nombre: data.tor_nombre,
  // tor_estado: data.tor_estado,
};


  // const result = await axiosApp.post(ORGAN_TYPE_CREATE, req);
  try {
    const result = await axiosApp.post(ORGAN_TYPE_CREATE, req);
    if (result.status == Constants.HTTP_Status_Codes.CREATED) {
      return { status: result.data.status, data: result.data.data };
    } else {
      return { status: false, data: null };
    }
  } catch (err) {
    return { status: false, data: null, error: err };
  }
}

export async function updateOrganType(state, data) {
  headersAxios();

  const req = {
    tor_nombre: data.tor_nombre,
    // tor_estado: data.tor_estado,
  };

  // const result = await axiosApp.patch(
  //   `${ORGAN_TYPE_PATCH}/${data.id_tipo_organo}`,
  //   req
  // );
  
  try {
    const result = await axiosApp.patch(
      `${ORGAN_TYPE_PATCH}/${data.id_tipo_organo}`,
      req
    );
    if (result.status == Constants.HTTP_Status_Codes.OK) {
      return { status: result.data.status, data: result.data.data };
    } else {
      return { status: false, data: null };
    }
  } catch (err) {
    return { status: false, data: null, error: err };
  }
}

export async function softdeleteOrganType(state, data) {
  headersAxios();

  const req = {
    tor_nombre: data.tor_nombre,
    tor_estado: data.tor_estado,
  };

  // const result = await axiosApp.patch(
  //   `${ORGAN_TYPE_PATCH}/${data.id_tipo_organo}`,
  //   req
  // );
  
  try {
    const result = await axiosApp.patch(
      `${ORGAN_TYPE_DELETE}/${data.id_tipo_organo}`,
      req
    );
    if (result.status == Constants.HTTP_Status_Codes.OK) {
      return { status: result.data.status, data: result.data.data };
    } else {
      return { status: false, data: null };
    }
  } catch (err) {
    return { status: false, data: null, error: err };
  }
}
