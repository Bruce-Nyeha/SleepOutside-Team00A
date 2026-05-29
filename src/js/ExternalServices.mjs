const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const jsonResponse = await res.json(); // Read answer of the server as JSON
  
  if (res.ok) {
    return jsonResponse;
  } else {
      // If the response is not ok, throw a custom error with the JSON response as the msg
      throw {
          name: "servicesError",
          message: jsonResponse
      };;
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
        return await fetch(`${baseURL}checkout/`, options).then(convertToJson);
    }
}
