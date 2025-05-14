const categories = [
  { name: "Arts", count: 50, icon: "🎨" },
  { name: "Humanities", count: 200, icon: "📚" },
  { name: "Science", count: 500, icon: "🧪" },
  { name: "Health", count: 200, icon: "💗" },
  { name: "Psychology", count: 200, icon: "🧠" },
  { name: "History", count: 200, icon: "📜" },
  { name: "STEM", count: 200, icon: "🔬" },
];

const container = document.getElementById("categories");
const searchInput = document.getElementById("searchInput");

function displayCategories(filter = "") {
  container.innerHTML = "";

  categories
    .filter((c) => c.name.toLowerCase().includes(filter.toLowerCase()))
    .forEach((cat) => {
      const card = document.createElement("div");
      card.className = "category-card";
      card.innerHTML = `
          <div class="category-icon">${cat.icon}</div>
          <div class="category-title">${cat.name}</div>
          <div class="category-count">${cat.count} books</div>
        `;
      container.appendChild(card);
    });
}

searchInput.addEventListener("input", (e) => {
  displayCategories(e.target.value);
});

displayCategories(); // Initial render
