import { LocalStorage, SessionStorage } from "quasar";
import { axiosApp } from "boot/axiosapp";
import Constants from "../../utils/constants";
const CAMPUS_CREATE = "/campus/create-one";
const CAMPUS_PATCH = "/campus/update-one";
const CAMPUS_DELETE = "/campus/soft-delete";
const CAMPUS_FIND_ALL = "/campus/find-all";
function headersAxios() {
	const token = LocalStorage.getItem("token"); // Obtener token user
	axiosApp.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
export async function campusFindAll(state) {
	headersAxios();
	const result = await axiosApp.get(CAMPUS_FIND_ALL);
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
export async function saveCampus(state, data) {
	try {
		console.log("Iniciando solicitud para guardar sede");
		headersAxios();
		const requestData = {
			sed_nombre: data.sed_nombre,
			sed_ubigeo: data.sed_ubigeo,
		};
		const response = await axiosApp.post(CAMPUS_CREATE, requestData);
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
export async function updateCampus(state, data) {
	try {
		console.log("Iniciando solicitud para actualizar campus");
		headersAxios();
		const requestData = {
			sed_nombre: data.sed_nombre,
			sed_ubigeo: data.sed_ubigeo,
		};
		const response = await axiosApp.patch(
			`${CAMPUS_PATCH}/${data.id_sede}`,
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
export async function softdeleteCampus(state, data) {
	console.log("hola");
	headersAxios();
	console.log("hola1");
	const req = {
		sed_nombre: data.sed_nombre,
		sed_ubigeo: data.sed_ubigeo,
		sed_sga_id: data.sed_sga_id,
		sed_suv_id: data.sed_suv_id,
		sed_estado: data.sed_estado,
	};
	console.log(req);
	console.log("hola2");
	// const result = await axiosApp.patch(
	//   `${FACULTY_PATCH}/${data.id_sede}`,
	//   req
	// );
	try {
		console.log("hola3");
		const result = await axiosApp.patch(
			`${CAMPUS_DELETE}/${data.id_sede}`,
			req
		);
		if (result.status == Constants.HTTP_Status_Codes.OK) {
			console.log("hola4");
			return { status: result.data.status, data: result.data.data };
		} else {
			return { status: false, data: null };
		}
	} catch (err) {
		return { status: false, data: null, error: err };
	}
}
