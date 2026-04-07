let totalOrders = 0;

function buyCube(cube, button) {
    totalOrders++;
    
    showNotification(cube + " sifariş edildi!");
    
    updateOrderCount();
    animateButton(button);
}

function showNotification(message) {
    const container = document.getElementById("notification-container");
    
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.innerText = "✅ " + message;
    
    container.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add("fade-out");
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

function updateOrderCount() {
    let counter = document.getElementById("orderCount");
    if(counter) { // Error verməməsi üçün yoxlayırıq
        counter.innerText = "Ümumi sifariş: " + totalOrders;
    }
}

function animateButton(button) {
    button.style.transform = "scale(0.9)";
    setTimeout(function() {
        button.style.transform = "scale(1)";
    }, 200);
}
let cart = [];
let totalAmount = 0;

function buyCube(cubeName, button) {
    let price = 0;
    if(cubeName.includes("VANIL")) price = 3.5;
    else if(cubeName.includes("KAKAO")) price = 4;
    else if(cubeName.includes("CIYELEK")) price = 4.5;

    cart.push({ name: cubeName, price: price });
    totalAmount += price;

    updateCartUI();
    showNotification("✅ " + cubeName + " səbətə əlavə edildi!");
    animateButton(button);
}

function updateCartUI() {
    const list = document.getElementById("cart-items");
    const countLabel = document.getElementById("cart-count"); // Sayğac elementi
    const totalLabel = document.getElementById("total-price"); // Cəmi məbləğ elementi
    
    list.innerHTML = "";
    
    cart.forEach((item, index) => {
        list.innerHTML += `
            <li style="display:flex; justify-content:space-between; margin-bottom:10px;">
                <span>${item.name} - ${item.price} AZN</span>
                <button onclick="removeFromCart(${index})" style="color:red; background:none; border:none; cursor:pointer;">✕</button>
            </li>`;
    });
    
    if (countLabel) {
        countLabel.innerText = cart.length; // Səbətdəki massivdə neçə element varsa, sayı o olacaq
    }
    
    if (totalLabel) {
        totalLabel.innerText = totalAmount;
    }
}

function removeFromCart(index) {
    totalAmount -= cart[index].price;
    cart.splice(index, 1);
    updateCartUI();
}

function toggleCart() {
    const panel = document.getElementById("cart-panel");
    panel.style.display = (panel.style.display === "block") ? "none" : "block";
}

function openCheckout() {
    if(cart.length === 0) return alert("Səbətiniz boşdur!");
    document.getElementById("checkout-modal").style.display = "flex";
}

function closeCheckout() {
    document.getElementById("checkout-modal").style.display = "none";
}

// lab2.js faylının ən aşağısına və ya köhnə funksiyanın yerinə qoy:
function completeOrder() {
    // 1. HTML-dəki xanaları tapırıq
    const nameInput = document.getElementById("cust-name");
    const cardInput = document.getElementById("card-num");
    const expInput = document.getElementById("card-date");
    const cvvInput = document.getElementById("card-cvv");
    // 2. Yoxlayırıq: Əgər bu xanalardan biri belə yoxdursa, kod dayansın
    if (!nameInput || !cardInput || !expInput || !cvvInput) {
        alert("Səhv: HTML-də bəzi ID-lər tapılmadı! lab2.html faylını yoxlayın.");
        return;
    }

    // 3. Məhsulları və toplam qiyməti hazırlayırıq
    const orderData = {
        name: nameInput.value.trim(),
        items: cart.map(item => item.name).join(", "),
        total: totalAmount,
        card_number: cardInput.value.trim(),
        expiry_date: expInput.value.trim(),
        cvv: cvvInput.value.trim()
    };

    // 4. Boş buraxılan yer varmı?
    if (!orderData.name || !orderData.card_number || !orderData.expiry_date || !orderData.cvv) {
        alert("Zəhmət olmasa bütün məlumatları doldurun!");
        return;
    }

    // 5. Serverə (PHP-yə) göndəririk
   fetch('save_order.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === "success") {
            alert("✅ Sifariş uğurla tamamlandı!");
            
            cart = [];             // 1. Səbəti boşalt
            updateCartUI();        // 2. Ekrandakı səbət görüntüsünü yenilə
            closeCheckout();       // 3. Ödəmə pəncərəsini (modalı) bağla
            
        } else {
            alert("❌ Xəta: " + data.message);
        }
    })
    .catch(err => {
        console.error("Xəta:", err);
        alert("Server bağlantı xətası!");
    });
}

function showNotification(msg) {
    const container = document.getElementById("notification-container");
    const note = document.createElement("div");
    note.className = "notification";
    note.innerText = msg;
    container.appendChild(note);
    setTimeout(() => note.remove(), 3000);
}

function animateButton(btn) {
    btn.style.transform = "scale(0.9)";
    setTimeout(() => btn.style.transform = "scale(1)", 200);
}