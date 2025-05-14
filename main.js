const books = [
  {
    id: "001",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    image: "images/1.jpg",
  },
  {
    id: "002",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    image: "images/2.png",
  },
  {
    id: "003",
    title: "Atomic Habits",
    author: "James Clear",
    image: "images/3.jpeg",
  },
  {
    id: "004",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    image: "images/download.png",
  },
];

const bookGrid = document.getElementById("bookGrid");

books.forEach((book) => {
  const card = document.createElement("div");
  card.className = "book-card";
  card.innerHTML = `
    <img src="${book.image}" alt="${book.title}">
    <div class="book-title">${book.title}</div>
    <div class="book-author">by ${book.author}</div>
    <a href="book.html?id=${book.id}">View Details</a>
  `;
  bookGrid.appendChild(card);
});
