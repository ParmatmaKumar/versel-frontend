import toast from "react-hot-toast"
import { apiConnector } from "../apiconnector";
import { catalogData } from "../apis";

export const getCatalogPageData = async (categoryId) =>{
    const toastId = toast.loading("Loading...")
    let result = null;
    try {
        const response = await apiConnector("POST",catalogData.CATALOGPAGEDATA_API,{categoryId:categoryId});

        if(!response?.data?.success && response?.status !== 200) {
            throw new Error(response?.data?.message || "Could not fetch category page");
        }

        result = response?.data;

    } catch (error) {
        console.log("CATOLOG PAGE DATA API ERROR",error);
        const errorMessage = error?.response?.data?.message || error?.message || "Could not fetch category page";
        toast.error(errorMessage);
        result = error?.response?.data || { success: false, message: errorMessage };
    }
    toast.dismiss(toastId)
    return result
}