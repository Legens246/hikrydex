const CATALOG = {
  norecoil: {
    title: "NORECOIL",
    features: ["✔ Андетект", "✔ Низкая цена"],
    minPrice: 750,
    plans: {
      "3DAY": 750,
      "7DAY": 1550,
	  "30DAY": 5500,
    }
  }
};

let activeProduct = null;
let activePlan = null;

const productsContainer = document.getElementById("productsList");
const modalDays = document.getElementById("modalDays");
const modalPay = document.getElementById("modalPay");
const daysContainer = document.getElementById("daysOptions");

function renderProducts() {
  Object.keys(CATALOG).forEach(key => {
    const item = CATALOG[key];
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${item.title}</h3>
      <div class="price">от ${item.minPrice} руб</div>
      <ul>
        ${item.features.map(f => `<li>${f}</li>`).join('')}
      </ul>
      <button class="btn-primary" data-id="${key}">Приобрести</button>
    `;
    productsContainer.appendChild(card);
  });
}

productsContainer.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-id]");
  if (!btn) return;
  
  activeProduct = btn.dataset.id;
  renderDaysModal(activeProduct);
});

function renderDaysModal(productKey) {
  const plans = CATALOG[productKey].plans;
  daysContainer.innerHTML = "";

  Object.keys(plans).forEach(planKey => {
    const btn = document.createElement("button");
    btn.textContent = `${planKey} - ${plans[planKey]} руб`;
    btn.onclick = () => {
      activePlan = planKey;
      modalDays.style.display = "none";
      modalPay.style.display = "flex";
    };
    daysContainer.appendChild(btn);
  });

  modalDays.style.display = "flex";
}

async function requestPaymentLink(method) {
  try {
    const res = await fetch('/api/buy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        product: activeProduct,
        plan: activePlan,
        method: method
      })
    });

    const data = await res.json();
    if (data.url) {
      window.open(data.url, '_blank');
    } else {
      alert(data.error || 'Ошибка при получении ссылки');
    }
  } catch (err) {
    alert('Ошибка соединения с сервером');
  }
}

document.getElementById("btnPayFunpay").onclick = () => requestPaymentLink('funpay');

window.onclick = (e) => {
  if (e.target.classList.contains("modal")) {
    e.target.style.display = "none";
  }
};

renderProducts();