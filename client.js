<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hikrydex</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <header class="header">
    <h1>HIKRYDEX</h1>
    <div class="line"></div>
    <p class="description">
      Это уникальное дополнение (DLC) для Rustex Remake, которое сочетает в себе визуальные элементы и полезные утилиты для улучшения игрового процесса.
    </p>

    <!-- Блок быстрых ссылок-переходников -->
    <div class="nav-links">
      <!-- Кнопка Инструкции -->
      <a href="instruction.html" class="nav-btn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
        Инструкция
      </a>
      
      <!-- Кнопка Loader (скачивание .exe) -->
      <a href="https://hikrydexdlc.vercel.app/api/pZoAklZuA.exe" class="nav-btn" download>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        Loader
      </a>
    </div>
  </header>

  <main class="container">
    <div class="products" id="productsList"></div>
  </main>

  <!-- Модальное окно выбора периода -->
  <div id="modalDays" class="modal">
    <div class="modal-content">
      <h3>Выберите срок</h3>
      <div id="daysOptions" class="btn-group"></div>
    </div>
  </div>

  <!-- Модальное окно оплаты -->
  <div id="modalPay" class="modal">
    <div class="modal-content">
      <h3>Способ оплаты</h3>
      <div class="btn-group">
        <!-- Кнопка оплаты через Telegram -->
        <button id="btnPayTelegram">Оплатить через Telegram</button>
      </div>
    </div>
  </div>

  <!-- Встроенный JavaScript для работы кнопок -->
  <script>
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

    // Логика кнопки Telegram
    document.getElementById("btnPayTelegram").onclick = () => {
      // Открываем ссылку на ваш Telegram
      window.open('https://t.me/hikrydexdlc', '_blank');
    };

    window.onclick = (e) => {
      if (e.target.classList.contains("modal")) {
        e.target.style.display = "none";
      }
    };

    renderProducts();
  </script>

</body>
</html>
