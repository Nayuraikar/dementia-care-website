document.addEventListener("DOMContentLoaded", () => {
    const quotes = [
        "The future belongs to those who believe in the beauty of their dreams. – Eleanor Roosevelt",
        "Your time is limited, don't waste it living someone else's life. – Steve Jobs",
        "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill",
        "Happiness is not something ready made. It comes from your own actions. – Dalai Lama",
        "You must be the change you wish to see in the world. – Mahatma Gandhi",
        "When meditation is mastered, the mind is unwavering like the flame of a lamp in a windless place. – Bhagavad Gita",
        "You have the right to work, but never to the fruit of work. – Bhagavad Gita",
        "The soul is neither born, and nor does it die. – Bhagavad Gita",
        "Set your heart upon your work, but never on its reward. – Bhagavad Gita"
    ];

 
 
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quoteElement = document.getElementById("quote");
    quoteElement.innerText = quotes[randomIndex];
 });

 