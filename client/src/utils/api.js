// import axios from "axios";

// // Function to retrieve the token from localStorage
// const getToken = () => {
//     return localStorage.getItem('token'); // Adjust the key as necessary
// };

// export const fetchDataFromApi = async(url) => {
//     try {
//         const token = getToken(); // Get the token
//         const config = {
//             headers: {
//                 Authorization: `Bearer ${token}`, // Include the token in the header
//             },
//         };
//         const { data } = await axios.get("http://localhost:4000" + url, config); // Pass config as the second argument
//         return data;
//     } catch (error) {
//         console.log(error);
//         return error;
//     }
// };

// export const postData = async (url, FormData) => {
//     try {
//         const token = getToken(); // Get the token
//         const config = {
//             headers: {
//                 Authorization: `Bearer ${token}`, // Include the token in the header
//             },
//         };
//         const { data } = await axios.post("http://localhost:4000" + url, FormData, config); // Pass config as the third argument
//         return data; // Return data instead of res
//     } catch (error) {
//         console.log(error);
//         return error;
//     }
// };


// export const deleteData = async (url) => {
//     try {
//         if (!url) {
//             console.error("❌ API URL is missing!");
//             return;
//         }

//         const token = getToken();
//         const config = {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         };

//         console.log("🔗 Deleting from:", "http://localhost:4000" + url); // Debugging

//         const { data } = await axios.delete("http://localhost:4000" + url, config);
//         return data;
//     } catch (error) {
//         console.error("❌ Delete API Error:", error);
//         return error;
//     }
// };



//important

// import axios from "axios";

// const BASE_URL = "http://localhost:4000"; // ✅ API base URL

// // Function to retrieve the token from localStorage
// const getToken = () => localStorage.getItem("token");

// // ✅ Sign-in (No authentication required)
// export const signIn = async (formData) => {
//     try {
//         const { data } = await axios.post(`${BASE_URL}/api/user/signin`, formData);
//         return data;
//     } catch (error) {
//         console.error("❌ Sign-in Error:", error.response?.data?.message || error.message);
//         return { success: false, message: error.response?.data?.message || "Sign-in failed" };
//     }
// };

// // ✅ Sign-up (No authentication required)
// export const signUp = async (formData) => {
//     try {
//         const { data } = await axios.post(`${BASE_URL}/api/user/signup`, formData);
//         return data;
//     } catch (error) {
//         console.error("❌ Sign-up Error:", error.response?.data?.message || error.message);
//         return { success: false, message: error.response?.data?.message || "Sign-up failed" };
//     }
// };

// // ✅ Fetch Data (Requires authentication)
// export const fetchDataFromApi = async (url) => {
//     try {
//         const token = getToken(); // Get token from localStorage
//         console.log("📌 Sending Token:", token); // Debug token

//         if (!token) {
//             console.error("⚠️ No token found in localStorage!");
//             return { success: false, message: "User not authenticated" };
//         }

//         const config = {
//             headers: { Authorization: `Bearer ${token}` }, // Sending token
//         };

//         const response = await axios.get(`${BASE_URL}${url}`, config);
//         console.log("✅ API Response:", response.data); // Debug response

//         return response.data;
//     } catch (error) {
//         console.error("❌ API Fetch Error:", error.response?.data?.message || error.message);
//         return { success: false, message: error.response?.data?.message || "Failed to fetch data" };
//     }
// };


// // ✅ Send Data (Requires authentication)
// export const postData = async (url, data, tokenRequired = false) => {
//     try {
//         const headers = {
//             "Content-Type": "application/json",
//         };

//         if (tokenRequired) {
//             const token = localStorage.getItem("token");
//             if (token) {
//                 headers["Authorization"] = `Bearer ${token}`;
//             } else {
//                 console.error("⚠️ No token found in localStorage!");
//             }
//         }

//         const response = await fetch(`http://localhost:4000${url}`, {
//             method: "POST",
//             headers,
//             body: JSON.stringify(data),
//         });

//         const result = await response.json();
//         if (!response.ok) {
//             throw new Error(result.message || "Failed to post data");
//         }

//         return result;
//     } catch (error) {
//         console.error("❌ API Post Error:", error.message);
//         return { success: false, message: error.message };
//     }
// };


// // ✅ Delete Data (Requires authentication)
// export const deleteData = async (url) => {
//     try {
//         const token = getToken();
//         if (!token) throw new Error("User not authenticated");

//         const config = {
//             headers: { Authorization: `Bearer ${token}` },
//         };

//         const { data } = await axios.delete(`${BASE_URL}${url}`, config);
//         return data;
//     } catch (error) {
//         console.error("❌ API Delete Error:", error.response?.data?.message || error.message);
//         return { success: false, message: error.response?.data?.message || "Failed to delete data" };
//     }
// };



import axios from "axios";

const BASE_URL = "http://localhost:4000"; // ✅ API base URL

// ✅ Create Axios instance with default settings
const apiInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// ✅ Attach token to requests automatically
apiInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ✅ Generic function to handle API requests
// const apiRequest = async (method, url, data = null) => {
//     try {
//         const response = await apiInstance({
//             method,
//             url,
//             data,
//         });
//         return response.data;
//     } catch (error) {
//         console.error(`❌ API Error (${method.toUpperCase()} ${url}):`, error.response?.data?.message || error.message);
//         return { success: false, message: error.response?.data?.message || "API request failed" };
//     }
// };
const apiRequest = async (method, url, data = {}) => {
    try {
        const response = await apiInstance({
            method,
            url,
            ...(method !== "get" && { data }), // Only add `data` if method is not GET
        });
        return response.data;
    } catch (error) {
        console.error(`❌ API Error (${method.toUpperCase()} ${url}):`, error.response?.data?.message || error.message);
        return { success: false, message: error.response?.data?.message || "API request failed" };
    }
};



// ✅ Sign-in (No authentication required)
export const signIn = async (formData) => apiRequest("post", "/api/user/signin", formData);

// ✅ Sign-up (No authentication required)
export const signUp = async (formData) => apiRequest("post", "/api/user/signup", formData);

// ✅ Fetch Data (Requires authentication)
export const fetchDataFromApi = async (url) => apiRequest("get", url);

// ✅ Send Data (Requires authentication)
export const postData = async (url, data) => apiRequest("post", url, data);

// ✅ Delete Data (Requires authentication)
export const deleteData = async (url) => apiRequest("delete", url);
