// Select the button and product list container
const fetchButton = document.getElementById("button-fetch");
const productList = document.getElementById("products-list");

// Add a click event listener to the button
fetchButton.addEventListener("click", async () => {
  try {
    // Fetch products from the API
    const response = await fetch("/api/v1/products");

    // Parse the JSON data
    const products = await response.json();

    // Clear the product list container
    productList.innerHTML = "";

    // Generate element for each product and append it to the container
    products.forEach((product) => {
      const productElement = document.createElement("p");
      productElement.innerHTML = `ID: ${product.id}, Name: <strong>${product.name}</strong>, price: ${product.price}`;
      productList.appendChild(productElement);
    });
  } catch (error) {
    productList.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
  }
});
