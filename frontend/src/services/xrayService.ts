import { getMyXrays, uploadXray }
    from "../api/xrayApi";

export const fetchMyXrays =
    async () => {

        return await getMyXrays();
    };

export const uploadXrayFile =
    async (
        file: File
    ) => {

        return await uploadXray(
            file
        );
    };