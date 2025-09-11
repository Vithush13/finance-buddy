import { API_PATHS } from "./apiPath";
import axiosInstance from "./axios";

const uploadImage = async (imageFile) =>{
    const formData = new FormData();
    formData.append('image', imageFile);

     try {
            const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData,{
                headers:{
                    "Content-Type": "multipart/form-data"    //set header for fileupload
                }
            });

            return response.data;
         } catch(error){
             throw error;
         }

}

export default uploadImage;