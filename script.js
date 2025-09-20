async function addToOrder(id) {
  const res = await fetch("/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id })
  });
  const data = await res.json();
  loadOrder();
}

async function loadOrder() {
  const res = await fetch("/order");
  const data = await res.json();
  let html = "";
  data.order.forEach((item, i) => {
    html += `<p>${i+1}. ${item.name} - $${item.price}</p>`;
  });
  html += `<p><b>Total: $${data.total}</b></p>`;
  document.getElementById("order").innerHTML = html;
}

async function checkout() {
  const res = await fetch("/order");
  const data = await res.json();

  if (data.order.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  let details = "You have ordered:\n";
  data.order.forEach((item, i) => {
    details += `${i+1}. ${item.name} - $${item.price}\n`;
  });
  details += `\nTotal: $${data.total}`;

  document.getElementById("checkoutDetails").innerText = details;

  // Show modal
  document.getElementById("checkoutModal").style.display = "block";
}

function closeModal() {
  document.getElementById("checkoutModal").style.display = "none";
}

async function confirmCheckout() {
  const res = await fetch("/checkout", { method: "POST" });
  const data = await res.json();
  alert(data.message);
  closeModal();
  loadOrder();
}

// Load order when page starts
loadOrder();
