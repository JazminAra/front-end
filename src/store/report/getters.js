import { LocalStorage, SessionStorage } from "quasar";
import XLSX from "sheetjs-style";
import { axiosApp } from "boot/axiosapp";
import Constants from "../../utils/constants";

// //Obtener token user
// const token = LocalStorage.getItem("token");
// axiosApp.defaults.headers.common["Authorization"] = `Bearer ${token}`;

// const DOCUMENT_TYPE_FIND_ALL = "/document-type/find-all";
// const DOCUMENT_HIERARCHY_FIND_ALL = "/document-hierarchy/find-all";
// const DOCUMENT_SUBTYPE_FIND_ALL = "/document-subtype/find-all";

// function headersAxios(){
//   const token = LocalStorage.getItem("token"); // Obtener token user
//   axiosApp.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// }

// export async function documentTypeFindAll(state, data) {
//   headersAxios();
//   const result = await axiosApp.get(DOCUMENT_TYPE_FIND_ALL);
//   try {
//     if (result.status == Constants.HTTP_Status_Codes.OK) {
//       return { status: result.data.status, data: result.data.data };
//     } else {
//       return { status: false, data: null };
//     }
//   } catch (err) {
//     return { status: false, data: null, error: err };
//   }
// }

// export async function documentHierarchyFindAll(state, data) {
//   headersAxios();
//   const result = await axiosApp.get(DOCUMENT_HIERARCHY_FIND_ALL);
//   try {
//     if (result.status == Constants.HTTP_Status_Codes.OK) {
//       return { status: result.data.status, data: result.data.data };
//     } else {
//       return { status: false, data: null };
//     }
//   } catch (err) {
//     return { status: false, data: null, error: err };
//   }
// }

// export async function documentSubtypeFindAll(state, data) {
//   headersAxios();
//   const result = await axiosApp.get(DOCUMENT_SUBTYPE_FIND_ALL);
//   try {
//     if (result.status == Constants.HTTP_Status_Codes.OK) {
//       return { status: result.data.status, data: result.data.data };
//     } else {
//       return { status: false, data: null };
//     }
//   } catch (err) {
//     return { status: false, data: null, error: err };
//   }
// }

// export function downloadRpteXLSX(data) {
export const downloadRpteXLSX = (state) => (data) => {
  const fileName = "list_faculty.xlsx";
  const list = data.map((o) => ({
    Id: o.id_facultad,
    NombreFacultad: o.fac_nombre,
    Estado: o.fac_estado,
  }));

  const ws = XLSX.utils.json_to_sheet(list);

  //Autofilter
  ws["!autofilter"] = { ref: "A1:C1" };

  //Ancho de columnas
  let wscols = [
    { wpx: 100 },
    { wpx: 170 },
    { wpx: 170 },
    { wpx: 190 },
    { wpx: 120 },
    { wpx: 100 },
    { wpx: 100 },
  ];
  ws["!cols"] = wscols;

  //Estilo para primera fila - cabecera
  let headerCellStyle = {
    font: {
      // name: 'Abadi',
      sz: 12,
      bold: true,
      color: { rgb: "ffffffff" },
    },
    fill: {
      patternType: "solid",
      fgColor: { rgb: "ff1f4e78" },
      bgColor: { rgb: "ff1f4e78" },
    },
    alignment: {
      vertical: "center",
      horizontal: "center",
      indent: 0,
      wrapText: true,
    },
    border: {
      top: { style: "thin", color: { auto: 1 } },
      right: { style: "thin", color: { auto: 1 } },
      bottom: { style: "thin", color: { auto: 1 } },
      left: { style: "thin", color: { auto: 1 } },
    },
  };

  //Estilo para demas fila - cuerpo
  let excelCell = {
    fill: {
      patternType: "none",
      fgColor: { rgb: "FF000000" },
      bgColor: { rgb: "FFFFFFFF" },
    },
    font: {
      name: "Calibri",
      sz: 12,
      color: { rgb: "#FF000000" },
      bold: false,
      italic: false,
      underline: false,
    },
    alignment: {
      vertical: "center",
      horizontal: "left",
      indent: 0,
      wrapText: false,
    },
    border: {
      top: { style: "thin", color: { auto: 1 } },
      right: { style: "thin", color: { auto: 1 } },
      bottom: { style: "thin", color: { auto: 1 } },
      left: { style: "thin", color: { auto: 1 } },
    },
  };

  //Obtener nro de filas y columnas que contienen datos
  let range = XLSX.utils.decode_range(ws["!ref"]);
  let noRows = range.e.r; // No.of rows
  let noCols = range.e.c; // No. of cols
  // console.log(noRows)
  // console.log(noCols)

  //Asignar estilo a las filas y columnas
  for (var R = 0; R <= noRows; ++R) {
    for (var C = 0; C <= noCols; ++C) {
      let cell_address = {
        c: C,
        r: R,
      };
      /* if an A1-style address is needed, encode the address */
      let cell_ref = XLSX.utils.encode_cell(cell_address);
      let cell = ws[cell_ref];
      if (R == 0) {
        cell.s = headerCellStyle;
      } else {
        ws[cell_ref]["s"] = excelCell;
      }
    }
  }

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "lista");

  return XLSX.writeFile(wb, fileName);
};
