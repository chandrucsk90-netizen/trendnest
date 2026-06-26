// ===========================================
// TrendNest - script.js
// ===========================================

const productContainer = document.getElementById("product-container");
const searchBox = document.getElementById("searchBox");

// Convert rating number to stars
function getStars(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    let stars = "";

    for (let i = 0; i < full; i++) {
        stars += "⭐";
    }

    if (half) {
        stars += "✨";
    }

    return stars;
}

// Display products
function displayProducts(productList) {

    productContainer.innerHTML = "";

    if (productList.length === 0) {

        productContainer.innerHTML = `
            <div style="grid-column:1/-1;text-align:center;padding:40px;">
                <h2>No products found</h2>
                <p>Please try another search.</p>
            </div>
        `;

        return;
    }

    productList.forEach(product => {

        productContainer.innerHTML += `

        <div class="product-card">

            <img src="${product.image}"
                 alt="${product.name}"
                 loading="lazy"
                 onerror="this.src='images/no-image.png'">

            <div class="product-content">

                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <p><strong>Category:</strong> ${product.category}</p>

                <p>${getStars(product.rating)}
                (${product.rating})</p>

                <div class="price">${product.price}</div>

                <a href="${product.affiliate}"
                   target="_blank"
                   rel="noopener noreferrer"
                   class="buy-btn">

                   View on Amazon

                </a>

            </div>

        </div>

        `;
    });

}

// Live Search
searchBox.addEventListener("keyup", function () {

    const keyword = this.value.toLowerCase();

    const filteredProducts = products.filter(product =>

        product.name.toLowerCase().includes(keyword) ||

        product.category.toLowerCase().includes(keyword) ||

        product.description.toLowerCase().includes(keyword)

    );

    displayProducts(filteredProducts);

});

// Load all products when page opens
displayProducts(products);

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});

// Newsletter form
const newsletterForm = document.querySelector(".newsletter form");

if (newsletterForm) {

    newsletterForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = this.querySelector("input").value.trim();

        if (!email) {
            alert("Please enter your email address.");
            return;
        }

        alert("Thank you for subscribing to TrendNest!");

        this.reset();

    });

}

// Show current year automatically
const footer = document.querySelector("footer p");

if (footer) {
    footer.innerHTML = `© ${new Date().getFullYear()} TrendNest`;
}