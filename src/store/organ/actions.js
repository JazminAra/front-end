import { LocalStorage, SessionStorage } from "quasar";
import { axiosApp } from "boot/axiosapp";
import Constants from "../../utils/constants";

const ORGAN_CREATE = "/organ/create-one";
const ORGAN_DELETE = "/organ/soft-delete";
const ORGAN_FIND_ALL = "/organ/find-all";
const ORGAN_PATCH = "/organ/update-one";

function headersAxios() {
  const token = LocalStorage.getItem("token"); // Obtener token user
  axiosApp.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export async function organFindAll(state) {
  headersAxios();
  
  const result = await axiosApp.get(ORGAN_FIND_ALL);
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

export async function saveOrgan(state, data) {
  headersAxios();

  const req = {
   
    org_nombre: data.org_nombre,
    id_sede: data.id_sede,
    id_escuela: data.id_escuela,
    id_facultad: data.id_facultad,
    id_tipo_organo: data.id_tipo_organo,
    // org_estado: data.org_estado,
};


  // const result = await axiosApp.post(FACULTY_CREATE, req);
  try {
    const result = await axiosApp.post(ORGAN_CREATE, req);
    if (result.status == Constants.HTTP_Status_Codes.CREATED) {
      return { status: result.data.status, data: result.data.data };
    } else {
      return { status: false, data: null };
    }
  } catch (err) {
    return { status: false, data: null, error: err };
  }
}

export async function updateOrgan(state, data) {
  headersAxios();

  const req = {    
    org_nombre: data.org_nombre,
    id_sede: data.id_sede,
    id_escuela: data.id_escuela,
    id_facultad: data.id_facultad,
    id_tipo_organo: data.id_tipo_organo,
    // org_estado: data.org_estado,
  };

  // const result = await axiosApp.patch(
  //   `${ORGAN_PATCH}/${data.id_organo}`,
  //   req
  // );
  
  try {
    const result = await axiosApp.patch(
      `${ORGAN_PATCH}/${data.id_organo}`,
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

export async function softdeleteOrgan(state, data) {
  headersAxios();

  const req = {    
    org_nombre: data.org_nombre,
    id_sede: data.id_sede,
    id_escuela: data.id_escuela,
    id_facultad: data.id_facultad,
    id_tipo_organo: data.id_tipo_organo,
    org_estado: data.org_estado,
  };

  // const result = await axiosApp.patch(
  //   `${ORGAN_PATCH}/${data.id_organo}`,
  //   req
  // );
  
  try {
    const result = await axiosApp.patch(
      `${ORGAN_DELETE}/${data.id_organo}`,
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
