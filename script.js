document.addEventListener('DOMContentLoaded', function() {
    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448')
        .then(response => response.json())
        .then(data => {
            // Populate product details
            document.getElementById('marmeto').innerText = data.product.vendor;
            document.getElementById('embrace').innerText = data.product.title;
            document.getElementById('dis-price').innerText = data.product.price;
            document.getElementById('org-price').innerText = data.product.compare_at_price;
            document.getElementById('description').innerHTML = data.product.description;

            // Populate main image
            const mainImageElement = document.getElementById('main-image');
            if (mainImageElement) {
                mainImageElement.src = data.product.images[0].src;
                
                mainImageElement.alt = data.product.title;
            }

            

            // Populate color options
            const colorOptionsContainer = document.getElementById('container-box');
            const colorOption = data.product.options.find(option => option.name === 'Color');
            if (colorOption) {
                colorOption.values.forEach(color => {
                    const colorBox = document.createElement('div');
                    colorBox.classList.add('color-box');
                    colorBox.style.backgroundColor = Object.values(color)[0]; // Get the color value from the object
                    colorOptionsContainer.appendChild(colorBox);
                });
            }
            const discountedPrice = parseFloat(data.product.price.replace('$', ''));
            const originalPrice = parseFloat(data.product.compare_at_price.replace('$', ''));
            const discountPercentage = Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
            const disPriceElement = document.getElementById('dis-price');
            disPriceElement.innerText = `$${discountedPrice.toFixed(2)}`;
            const compareElement = document.getElementById('compare');
            compareElement.innerText = `${discountPercentage}% OFF`;

            // Populate size options
            const sizeOptionsContainer = document.getElementById('size-options');
            const sizeOption = data.product.options.find(option => option.name === 'Size');
            if (sizeOption) {
                sizeOption.values.forEach(size => {
                    const sizeButton = document.createElement('button');
                    sizeButton.classList.add('radio-button');
                    const input = document.createElement('input');
                    input.type = 'radio';
                    input.name = 'size';
                    input.value = size.toLowerCase().replace(' ', '-');
                    input.id = size.toLowerCase().replace(' ', '-');
                    const label = document.createElement('label');
                    label.setAttribute('for', input.id);
                    label.textContent = size;
                    sizeButton.appendChild(input);
                    sizeButton.appendChild(label);
                    sizeOptionsContainer.appendChild(sizeButton);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    document.getElementById('add-to-cart-button').onclick = function() {
        alert("Item added to the cart!");
       
    }
});
