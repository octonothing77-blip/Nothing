var ACCOUNT = {
  email: "octo.nothing77@gmail.com",
  password: "12345678",
  name: "Nothing"
};

// Нэвтэрсэн хэрэглэгчийн имэйлийг хөтөчийн санах ойноос авна.
// Нэвтрээгүй бол null буцаана.
function getUser() {
  return localStorage.getItem("cb_user");
}

// Профайлын мэдээллийг хөтөчийн санах ойноос авна.
// Хэрэглэгч засаагүй бол анхны утгуудыг буцаана.
function getProfile() {
  var saved = localStorage.getItem("cb_profile");
  if (saved === null) {
    return { name: ACCOUNT.name, position: "", phone: "", bio: "" };
  }
  return JSON.parse(saved);   // хадгалсан текстийг буцаагаад объект болгоно
}

// Нэвтэрсэн хэрэглэгчийн эрх (Ажилтан, HR, Хэрэглэгч)
function getRole() {
  return localStorage.getItem("cb_role");
}

// Гарах: хадгалсан мэдээллийг устгаад нүүр хуудас руу очно
function logout() {
  localStorage.removeItem("cb_user");
  localStorage.removeItem("cb_role");
  window.location.href = "index.html";
}

// Нэвтэрсэн бол "Нэвтрэх" товчийг арилгаж, оронд нь профайл харуулна
function updateHeader() {
  if (getUser() === null) {
    return;   // нэвтрээгүй бол юу ч өөрчлөхгүй
  }

  var name = getProfile().name;
  // "Нэвтрэх" товч болон аль хэдийн профайл болсон товчийг хоёуланг нь авна
  var links = document.querySelectorAll('a[href="login.html"], a.profile-link');
  for (var i = 0; i < links.length; i++) {
    var link = links[i];

    if (link.closest("nav")) {
      // Дээд цэс дэх "Нэвтрэх" товч -> профайл болно
      link.href = "profile.html";
      link.className = "button small profile-link";
      link.innerHTML = '<span class="mini-avatar">' + name.charAt(0).toUpperCase() + '</span>' + name;
    } else {
      // Бусад газар байгаа "Нэвтрэх", "Одоо эхлэх" товчийг нууна
      link.style.display = "none";
    }
  }
}

updateHeader();


// ---------- Утасны цэс (hamburger) ----------
function setupMenu() {
  var header = document.querySelector("header");
  var nav = document.querySelector("nav");
  if (!header || !nav) { return; }

  var btn = document.createElement("button");
  btn.type = "button";
  btn.className = "menu-toggle";
  btn.setAttribute("aria-label", "Цэс нээх");
  btn.textContent = "☰";
  btn.onclick = function () {
    var open = nav.classList.toggle("open");
    btn.textContent = open ? "✕" : "☰";
  };
  header.insertBefore(btn, nav);

  // Одоо байгаа хуудасны холбоосыг тодруулна
  var page = location.pathname.split("/").pop() || "index.html";
  var links = nav.querySelectorAll("a:not(.button)");
  for (var i = 0; i < links.length; i++) {
    if (links[i].getAttribute("href") === page) { links[i].classList.add("active"); }
  }
}
setupMenu();
