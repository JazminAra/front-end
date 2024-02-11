import { LocalStorage, SessionStorage } from "quasar";
import { axiosApp } from "boot/axiosapp";
import Constants from "../../utils/constants";

const LOAN_CREATE = "/loan/create-one";
const LOAN_PATCH = "/loan/update-one";
const LOAN_FIND_ALL = "/loan/find-all-by";
const LOAN_DELETE = "/loan/soft-delete";

const LOAN_DETAIL_CREATE = "/loan-detail/create-one";
const LOAN_DETAIL_PATCH = "/loan-detail/update-one";
const LOAN_DETAIL_FIND_ALL = "/loan-detail/find-all-by";
const LOAN_DETAIL_DELETE = "/loan-detail/soft-delete";

const DEBTOR_CREATE = "/debtor/create-one";
const DEBTOR_PATCH = "/debtor/update-one";
const DEBTOR_FIND_ALL = "/debtor/find-all";
const DEBTOR_FIND_ONE = "/debtor/find-one-by";
const DEBTOR_DELETE = "/debtor/soft-delete";

const DEBTOR_TYPE_CREATE = "/debtor-type/create-one";
const DEBTOR_TYPE_PATCH = "/debtor-type/update-one";
const DEBTOR_TYPE_FIND_ALL = "/debtor-type/find-all";
const DEBTOR_TYPE_DELETE = "/debtor-type/soft-delete";


const OBJECTS_CREATE = "/objects/create-one";
const OBJECTS_PATCH = "/objects/update-one";
const OBJECTS_FIND_ALL = "/objects/find-all";
const OBJECTS_FIND_ALL_BY = "/objects/find-all-by";
const OBJECTS_DELETE = "/objects/soft-delete";

const OBJECTS_TYPE_CREATE = "/objects-type/create-one";
const OBJECTS_TYPE_PATCH = "/objects-type/update-one";
const OBJECTS_TYPE_FIND_ALL = "/objects-type/find-all";
const OBJECTS_TYPE_DELETE = "/objects-type/soft-delete";


function headersAxios() {
  const token = LocalStorage.getItem("token"); // Obtener token user
  axiosApp.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export async function loanFindAll(state, para) {
  
  headersAxios();
  const path = para.dni == ''?'?cod_mat='+ para.cod : '?num_doc=' + para.dni ;
  const result = await axiosApp.get(LOAN_FIND_ALL + path ) ;
  
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

export async function saveLoan(state, data) {
  headersAxios();

  const req = {
  // id_prestamos: data.id_prestamos,
  id_deudor: data.id_deudor,
          // tipo_deudor_nombre: loan.tipo_deudor_nombre,
            // org_nombre: loan.org_nombre,
            // esc_nombre: loan.esc_nombre,
            // fac_nombre: loan.fac_nombre,
            // sed_nombre: loan.sed_nombre,
            // tor_nombre: loan.tor_nombre,
  pre_tiempo_limite: data.pre_tiempo_limite,
  pre_fecha_devolucion: data.pre_fecha_devolucion,
  // pre_estado: data.pre_estado,
};


  // const result = await axiosApp.post(FACULTY_CREATE, req);
  try {
    const result = await axiosApp.post(LOAN_CREATE, req);
    if (result.status == Constants.HTTP_Status_Codes.CREATED) {
      return { status: result.data.status, data: result.data.data };
    } else {
      return { status: false, data: null };
    }
  } catch (err) {
    return { status: false, data: null, error: err };
  }
}

export async function updateLoan(state, data) {
  headersAxios();

  const req = {
    // id_prestamos: data.id_prestamos,
    id_deudor: data.id_deudor,
            // tipo_deudor_nombre: loan.tipo_deudor_nombre,
              // org_nombre: loan.org_nombre,
              // esc_nombre: loan.esc_nombre,
              // fac_nombre: loan.fac_nombre,
              // sed_nombre: loan.sed_nombre,
              // tor_nombre: loan.tor_nombre,
    pre_tiempo_limite: data.pre_tiempo_limite,
    pre_fecha_devolucion: data.pre_fecha_devolucion,
    // pre_estado: data.pre_estado,
  };

  // const result = await axiosApp.patch(
  //   `${FACULTY_PATCH}/${data.id_facultad}`,
  //   req
  // );
  
  try {
    const result = await axiosApp.patch(
      `${LOAN_PATCH}/${data.id_prestamo}`,
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


export async function softdeleteLoan(state, data) {
  headersAxios();

  const req = {
    id_prestamo: data.id_prestamo,
    id_deudor: data.id_deudor,
    // deu_cod_matricula: data.deu_cod_matricula,
    // deu_nombres: data.deu_nombres,
    // deu_genero:data.deu_genero,
            // tipo_deudor_nombre: loan.tipo_deudor_nombre,
              // org_nombre: loan.org_nombre,
              // esc_nombre: loan.esc_nombre,
              // fac_nombre: loan.fac_nombre,
              // sed_nombre: loan.sed_nombre,
              // tor_nombre: loan.tor_nombre,
    pre_tiempo_limite: data.pre_tiempo_limite,
    pre_fecha_devolucion: data.pre_fecha_devolucion,
    pre_estado: data.pre_estado,
  };

  // const result = await axiosApp.patch(
  //   `${FACULTY_PATCH}/${data.id_facultad}`,
  //   req
  // );
  
  try {
    const result = await axiosApp.patch(
      `${LOAN_DELETE}/${data.id_prestamo}`,
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
// LOAN DETAIL

export async function loandetailFindAll(state,par) {
  headersAxios();
  
  const result = await axiosApp.get(LOAN_DETAIL_FIND_ALL + '?id_prestamo=' + par);
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

export async function saveLoanDetail(state, data) {
  headersAxios();
  console.log(data);

  const req = {
    id_prestamo: data.id_prestamo,
    id_bien:data.id_bien,
    det_fecha_devolucion: data.det_fecha_devolucion,
    det_lugar_uso: data.det_lugar_uso,
    det_observacion: data.det_observacion,
    det_condicion: data.det_condicion,
};

console.log(req);
  // const result = await axiosApp.post(FACULTY_CREATE, req);
  try {
    const result = await axiosApp.post(LOAN_DETAIL_CREATE, req);
    if (result.status == Constants.HTTP_Status_Codes.CREATED) {
      return { status: result.data.status, data: result.data.data };
    } else {
      return { status: false, data: null };
    }
  } catch (err) {
    return { status: false, data: null, error: err };
  }
}

export async function updateLoanDetail(state, data) {
  headersAxios();

  const req = {
    id_prestamo: data.id_prestamo,
    id_bien:data.id_bien,
    det_fecha_devolucion: data.det_fecha_devolucion,
    det_lugar_uso: data.det_lugar_uso,
    det_observacion: data.det_observacion,
    det_condicion: data.det_condicion,
  };

  // const result = await axiosApp.patch(
  //   `${FACULTY_PATCH}/${data.id_facultad}`,
  //   req
  // );
  
  try {
    const result = await axiosApp.patch(
      `${LOAN_DETAIL_PATCH}/${data.id_detalle_prestamo}`,
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

export async function softdeleteLoanDetail(state, data) {
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
      `${LOAN_DETAIL_DELETE}/${data.id_facultad}`,
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
//DEBTOR

export async function debtorFindAll(state) {
  headersAxios();
  
  const result = await axiosApp.get(DEBTOR_FIND_ALL);
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

export async function debtorFindOneDni(state, dni) {
  headersAxios();
  
  const result = await axiosApp.get(DEBTOR_FIND_ONE + '?num_doc=' + dni ) ;
  
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

export async function debtorFindOne(state, parametros) {
  headersAxios();
  var param = '';
  if (parametros.busqueda == 1){
     param = '?num_doc='+ parametros.filtro;
  }else{
    param = '?cod_mat='+ parametros.filtro;
  }
  console.log(parametros.busqueda);
  console.log(parametros.filtro);
  const result = await axiosApp.get(DEBTOR_FIND_ONE + param ) ;
  
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

export async function saveDebtor(state, data) {
  headersAxios();

  const req = {
  fac_nombre: data.fac_nombre,
  fac_estado: data.fac_estado,
};


  // const result = await axiosApp.post(FACULTY_CREATE, req);
  try {
    const result = await axiosApp.post(DEBTOR_CREATE, req);
    if (result.status == Constants.HTTP_Status_Codes.CREATED) {
      return { status: result.data.status, data: result.data.data };
    } else {
      return { status: false, data: null };
    }
  } catch (err) {
    return { status: false, data: null, error: err };
  }
}

export async function updateDebtor(state, data) {
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
      `${DEBTOR_PATCH}/${data.id_facultad}`,
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


export async function softdeleteDebtor(state, data) {
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
      `${DEBTOR_DELETE}/${data.id_facultad}`,
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
//DEBTOR-TYPE

export async function debtortypeFindAll(state) {
  headersAxios();
  
  const result = await axiosApp.get(DEBTOR_TYPE_FIND_ALL);
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

export async function saveDebtorType(state, data) {
  headersAxios();

  const req = {
  fac_nombre: data.fac_nombre,
  fac_estado: data.fac_estado,
};


  // const result = await axiosApp.post(FACULTY_CREATE, req);
  try {
    const result = await axiosApp.post(DEBTOR_TYPE_CREATE, req);
    if (result.status == Constants.HTTP_Status_Codes.CREATED) {
      return { status: result.data.status, data: result.data.data };
    } else {
      return { status: false, data: null };
    }
  } catch (err) {
    return { status: false, data: null, error: err };
  }
}

export async function updateDebtorType(state, data) {
  headersAxios();

  const req = {
    fac_nombre: data.fac_nombre,
    fac_estado: data.fac_estado,
  };

  // const result = await axiosApp.patch(
  //   `${ebt_PATCH}/${data.id_facultad}`,
  //   req
  // );
  
  try {
    const result = await axiosApp.patch(
      `${DEBTOR_TYPE_PATCH}/${data.id_facultad}`,
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

export async function softdeleteDebtorType(state, data) {
  headersAxios();

  const req = {
    fac_nombre: data.fac_nombre,
    fac_estado: data.fac_estado,
  };

  // const result = await axiosApp.patch(
  //   `${ebt_PATCH}/${data.id_facultad}`,
  //   req
  // );
  
  try {
    const result = await axiosApp.patch(
      `${DEBTOR_TYPE_DELETE}/${data.id_facultad}`,
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


//OBJECTS

export async function objectsFindAllBy(state, parob) {
  headersAxios();
  
  const result = await axiosApp.get(OBJECTS_FIND_ALL_BY + '/' + parob ) ;
  
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

export async function objetcsFindAll(state) {
  headersAxios();
  
  const result = await axiosApp.get(OBJECTS_FIND_ALL);
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

export async function saveObjects(state, data) {
  headersAxios();

  const req = {
  fac_nombre: data.fac_nombre,
  fac_estado: data.fac_estado,
};


  // const result = await axiosApp.post(FACULTY_CREATE, req);
  try {
    const result = await axiosApp.post(OBJECTS_CREATE, req);
    if (result.status == Constants.HTTP_Status_Codes.CREATED) {
      return { status: result.data.status, data: result.data.data };
    } else {
      return { status: false, data: null };
    }
  } catch (err) {
    return { status: false, data: null, error: err };
  }
}

export async function updateObjects(state, data) {
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
      `${OBJECTS_PATCH}/${data.id_facultad}`,
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

export async function softdeleteObjects(state, data) {
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
      `${OBJECTS_DELETE}/${data.id_facultad}`,
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

//OBJECTS-TYPE

export async function objectstypeFindAll(state) {
  headersAxios();
  
  const result = await axiosApp.get(OBJECTS_TYPE_FIND_ALL);
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

export async function saveObjectsType(state, data) {
  headersAxios();

  const req = {
  fac_nombre: data.fac_nombre,
  fac_estado: data.fac_estado,
};


  // const result = await axiosApp.post(FACULTY_CREATE, req);
  try {
    const result = await axiosApp.post(OBJECTS_TYPE_CREATE, req);
    if (result.status == Constants.HTTP_Status_Codes.CREATED) {
      return { status: result.data.status, data: result.data.data };
    } else {
      return { status: false, data: null };
    }
  } catch (err) {
    return { status: false, data: null, error: err };
  }
}

export async function updateObjectsType(state, data) {
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
      `${OBJECTS_TYPE_PATCH}/${data.id_facultad}`,
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

export async function softdeleteObjectsType(state, data) {
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
      `${OBJECTS_TYPE_DELETE}/${data.id_facultad}`,
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