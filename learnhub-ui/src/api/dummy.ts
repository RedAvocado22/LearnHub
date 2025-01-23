import axios from "axios";
import Swal from "sweetalert2";
import { requestWithToken } from "./base";

export const dummy = async () => {
    try {
        const resp = await requestWithToken("/dummy", "GET");
        if (resp.status === 200) {
            return resp.data;
        } else {
            throw new Error("Cannot get resource");
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            Swal.fire({
                icon: "error",
                title: "Fetch resource failed",
                text: err.response?.data?.message || "An error occurred while fetching resource."
            });
        }
        console.error(err);
        return null;
    }
};
