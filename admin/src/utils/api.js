// import axios from "axios";

// export const fetchDataFromApi = async(url) => {
//     try{
//         const {data} = await axios.get("http://localhost:4000"+url)
//         return data;
//     }catch(error){
//         console.log(error);
//         return error;
//     }
// }

// export const postData = async (url, FormData) => {
//     const {res} = await axios.post("http://localhost:4000"+url,FormData)
//     return res;
// }

// export const deleteData = async (url) => {
//     const {res} = await axios.delete (`http://localhost:4000${url}`)
//     return res;
// }



import axios from "axios";

// Function to retrieve the token from localStorage
const getToken = () => {
    return localStorage.getItem('token'); // Adjust the key as necessary
};

export const fetchDataFromApi = async(url) => {
    try {
        const token = getToken(); // Get the token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the header
            },
        };
        const { data } = await axios.get("http://localhost:4000" + url, config); // Pass config as the second argument
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const postData = async (url, FormData) => {
    try {
        const token = getToken(); // Get the token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the header
            },
        };
        const { data } = await axios.post("http://localhost:4000" + url, FormData, config); // Pass config as the third argument
        return data; // Return data instead of res
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const deleteData = async (url) => {
    try {
        const token = getToken(); // Get the token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the header
            },
        };
        const { data } = await axios.delete("http://localhost:4000" + url, config); // Pass config as the second argument
        return data; // Return data instead of res
    } catch (error) {
        console.log(error);
        return error;
    }
};


