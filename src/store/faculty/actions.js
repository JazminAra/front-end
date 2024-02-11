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
			console.log("Resultados pe. ", result);
			console.log("Resultados datos ", result.data);
			return { status: result.data.status, data: result.data };
		} else {
			return { status: false, data: null };
		}
	} catch (err) {
		return { status: false, data: null, error: err };
	}
}

export async function saveFaculty(state, data) {
	try {
		console.log("Iniciando solicitud para guardar sede");
		headersAxios();
		const requestData = {
			fac_nombre: data.fac_nombre,
		};
		const response = await axiosApp.post(FACULTY_CREATE, requestData);
		if (response.status === Constants.HTTP_Status_Codes.CREATED) {
			// Devolver un objeto con información sobre el resultado exitoso
			return { status: true, data: response.data };
		} else {
			// Devolver un objeto con información sobre el resultado fallido
			return {
				status: false,
				data: null,
				message: "Error al guardar el campus",
			};
		}
	} catch (error) {
		// Devolver un objeto con información sobre el error
		return {
			status: false,
			data: null,
			error: error,
			message: "Error desconocido al guardar el campus",
		};
	}
}

export async function updateFaculty(state, data) {
	try {
		console.log("Iniciando solicitud para actualizar campus");
		headersAxios();
		const requestData = {
			fac_nombre: data.fac_nombre,
		};
		const response = await axiosApp.patch(
			`${FACULTY_PATCH}/${data.id_facultad}`,
			requestData
		);
		if (response.status === Constants.HTTP_Status_Codes.OK) {
			// Devolver un objeto con información sobre el resultado exitoso
			return { status: true, data: response.data };
		} else {
			// Devolver un objeto con información sobre el resultado fallido
			return {
				status: false,
				data: null,
				message: "Error al actualizar el campus",
			};
		}
	} catch (error) {
		// Devolver un objeto con información sobre el error
		return {
			status: false,
			data: null,
			error: error,
			message: "Error desconocido al actualizar el campus",
		};
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
