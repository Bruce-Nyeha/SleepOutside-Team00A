const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
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
  }
}

export default class ExternalServices {

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