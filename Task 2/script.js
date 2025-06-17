  const BASE_URL = 'https://dummyison.com/products/search?q=';

    // Load default products on page load (e.g., 'phone')
    window.onload = () => {
      fetchProducts('phone');
    };

    async function fetchProducts(query) {
      try {
        const response = await fetch(BASE_URL + encodeURIComponent(query));
        const data = await response.json();

        // Use data.products if wrapped or just data if it's a direct array
        const products = Array.isArray(data) ? data : data.products || [];

        displayProducts(products);
      } catch (error) {
        console.error('Error:', error);
        document.getElementById('productList').innerHTML = '<p>Failed to fetch products.</p>';
      }
    }

    function displayProducts(products) {
      const container = document.getElementById('productList');
      container.innerHTML = '';

      if (products.length === 0) {
        container.innerHTML = '<p>No products found.</p>';
        return;
      }

      products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
          <img src="${product.image}" alt="${product.title}" />
          <h3>${product.title}</h3>
          <p>₹ ${product.price}</p>
        `;
        container.appendChild(card);
      });
    }

    function searchProducts() {
      const query = document.getElementById('searchInput').value.trim();
      if (!query) {
        alert('Search field cannot be empty!');
        return;
      }
      fetchProducts(query);
    }