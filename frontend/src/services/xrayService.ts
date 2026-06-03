import { getMyXrays }
    from "../api/xrayApi";

export const fetchMyXrays =
    async () => {

        return await getMyXrays();
    };