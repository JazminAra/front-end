import { LocalStorage, SessionStorage } from "quasar";
import { axiosApp } from "boot/axiosapp";
import Constants from "../../utils/constants";

const SCHOOL_CREATE = "/school/create-one";
const SCHOOL_DELETE = "/school/soft-delete";
const SCHOOL_FIND_ALL = "/school/find-all";
const SCHOOL_PATCH = "/school/update-one";

function headersAxios() {
  const token = LocalStorage.getItem("token"); // Obtener token user
  axiosApp.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export async function schoolFindAll(state) {
  headersAxios();
  
  const result = await axiosApp.get(SCHOOL_FIND_ALL);
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

export async function saveSchool(state, data) {
  headersAxios();

  const req = {
  esc_nombre: data.esc_nombre,
  id_facultad: data.id_facultad,
  // esc_estado: data.esc_estado,
};


  // const result = await axiosApp.post(SCHOOL_CREATE, req);
  try {
    const result = await axiosApp.post(SCHOOL_CREATE, req);
    if (result.status == Constants.HTTP_Status_Codes.CREATED) {
      
      return { status: result.data.status, data: result.data.data };
    } else {
      return { status: false, data: null };
    }
  } catch (err) {
    return { status: false, data: null, error: err };
  }
}


export async function updateSchool(state, data) {
  headersAxios();

  const req = {
    esc_nombre: data.esc_nombre,
    id_facultad: data.id_facultad,  
    // esc_estado: data.esc_estado,
  };

  // const result = await axiosApp.patch(
  //   `${SCHOOL_PATCH}/${data.id_escuela}`,
  //   req
  // );
  
  try {
    const result = await axiosApp.patch(
      `${SCHOOL_PATCH}/${data.id_escuela}`,
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



export async function softdeleteSchool(state, data) {
  headersAxios();

  const req = {
    esc_nombre: data.esc_nombre,
    id_facultad: data.id_facultad,  
    esc_estado: data.esc_estado,
  };

  // const result = await axiosApp.patch(
  //   `${SCHOOL_PATCH}/${data.id_escuela}`,
  //   req
  // );
  
  try {
    const result = await axiosApp.patch(
      `${SCHOOL_DELETE}/${data.id_escuela}`,
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
