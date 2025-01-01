import apiClient from ".";
import toast from "react-hot-toast";



const getReq = async (path) => {
    try {
        const response = await apiClient.get(path)
        return response?.data.data;
    } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
    }
}

const postReq = async (path , data) => {
    try {
        const response = await apiClient.post(path , data)
        toast.success(response?.data.message)
        return response?.data.data;
    } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
        toast.error(error.response.data.message);
    }
}

const deletReq = async (path) => {
    try {
        const response = await apiClient.delete(path)
        toast.success(response?.data.message)
        return response?.data.data ;
    } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
        toast.error(error?.message)
    }
}

const putReq = async (path , data) => {
    try {
        const response = await apiClient.put(path , data)
        toast.success(response?.data.message)
        return response?.data.data;
    } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
        toast.error(error?.message)
    }
}


export { getReq , postReq , deletReq , putReq };