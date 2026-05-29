const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
<<<<<<< HEAD
  let jsonResponse;
  
  try {
    // try to parse the response body as JSON
    jsonResponse = await res.json();
  } catch (error) {
    // if parsing fails, the server response is not valid JSON
    jsonResponse = { message: "Invalid JSON response from server!" };
  }

  // if request succeeded
  if (res.ok) {
    return jsonResponse;
  } else {
    // if request failed, throw structured error object
    throw { name: "servicesError", message: jsonResponse };
=======
  const jsonResponse = await res.json(); 
  
  if (res.ok) {
    return jsonResponse;
  } else {
    // console.log("Message from server:", jsonResponse);
    throw {name:"servicesError", message: jsonResponse };
>>>>>>> e88f3395ceb32a95b67ccb3ddca3448aa7c0b45b
  }
}

export default class ExternalServices {
<<<<<<< HEAD

=======
    
>>>>>>> e88f3395ceb32a95b67ccb3ddca3448aa7c0b45b
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const product = await convertToJson(response);
    return product.Result;
  }


<<<<<<< HEAD
  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    const response = await fetch(`${baseURL}checkout/`, options);
    const result = await convertToJson(response);
    
    console.log("SUCCESS RESULT: ", result); // temporary - for debugging
    
    return result;
  }
}
=======
    async checkout(payload) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        };
        return await fetch(`${baseURL}checkout/`, options).then(convertToJson);
    }
}
>>>>>>> e88f3395ceb32a95b67ccb3ddca3448aa7c0b45b
