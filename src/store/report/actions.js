import { LocalStorage, SessionStorage } from "quasar";
import { axiosApp } from "boot/axiosapp";
import Constants from "../../utils/constants";

const FACULTY_CREATE = "/faculty/create-one";
const FACULTY_PATCH = "/faculty/update-one";
const FACULTY_DELETE = "/faculty/soft-delete";
const FACULTY_FIND_ALL = "/faculty/find-all";

function headersAxios() {
  const token = LocalStorage.getItem("token"); // Obtener token user
  axiosApp.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export async function facultyFindAll(state) {
  headersAxios();
  
  const result = await axiosApp.get(FACULTY_FIND_ALL);
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

export async function saveFaculty(state, data) {
  headersAxios();

  const req = {
  fac_nombre: data.fac_nombre,
  // fac_estado: data.fac_estado,
};


  // const result = await axiosApp.post(FACULTY_CREATE, req);
  try {
    const result = await axiosApp.post(FACULTY_CREATE, req);
    if (result.status == Constants.HTTP_Status_Codes.CREATED) {
      return { status: result.data.status, data: result.data.data };
    } else {
      return { status: false, data: null };
    }
  } catch (err) {
    return { status: false, data: null, error: err };
  }
}

export async function updateFaculty(state, data) {
  headersAxios();

  const req = {
    fac_nombre: data.fac_nombre,
    // fac_estado: data.fac_estado,
  };

  // const result = await axiosApp.patch(
  //   `${FACULTY_PATCH}/${data.id_facultad}`,
  //   req
  // );
  
  try {
    const result = await axiosApp.patch(
      `${FACULTY_PATCH}/${data.id_facultad}`,
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

export async function softdeleteFaculty(state, data) {
  headersAxios();

  const req = {
    fac_nombre: data.fac_nombre,
    fac_estado: data.fac_estado,
  };

  // const result = await axiosApp.patch(
  //   `${FACULTY_PATCH}/${data.id_facultad}`,
  //   req
  // );
  
  try {
    const result = await axiosApp.patch(
      `${FACULTY_DELETE}/${data.id_facultad}`,
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
