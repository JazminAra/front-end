import moment from "moment";

export function getFormatDateDDMMYYYY(date) {   
    return moment(date).format("DD/MM/YYYY");
}

export function getFormatDateDDMMYYYY_HHMM(date) {   
    return moment(date).format("DD/MM/YYYY HH:mm");
}

