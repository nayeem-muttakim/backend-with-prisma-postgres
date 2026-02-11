import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const userId = "b2cd47f0-fcc0-4bff-b5d1-48f9dc291b27";

const books = [
  {
    title: "The Last Ember of Orion",
    overview:
      "A disgraced astronomer uncovers a signal from a dying star that may hold the key to humanity's survival.",
    releaseYear: 2021,
    genres: ["Science Fiction", "Adventure"],
    author: "Elena Voss",
    soldBy: userId,
  },
  {
    title: "Whispers in the Cedar Forest",
    overview:
      "A young journalist returns to her hometown to investigate a decades-old disappearance tied to local folklore.",
    releaseYear: 2018,
    genres: ["Mystery", "Thriller"],
    author: "Marcus Hale",
    soldBy: userId,
  },
  {
    title: "The Art of Silent Waves",
    overview:
      "A reflective exploration of resilience and identity set in a small coastal village in Japan.",
    releaseYear: 2020,
    genres: ["Literary Fiction", "Drama"],
    author: "Naomi Takeda",
    soldBy: userId,
  },
  {
    title: "Kingdom of Shattered Crowns",
    overview:
      "Three rival heirs must unite against an ancient force threatening to consume their fractured empire.",
    releaseYear: 2022,
    genres: ["Fantasy", "Epic"],
    author: "Darian Blackwood",
    soldBy: userId,
  },
  {
    title: "Beneath the Marble Sky",
    overview:
      "An ambitious architect navigates political intrigue and forbidden love in Renaissance Florence.",
    releaseYear: 2019,
    genres: ["Historical Fiction", "Romance"],
    author: "Isabella Moretti",
    soldBy: userId,
  },
  {
    title: "The Algorithm of Us",
    overview:
      "Two rival AI researchers are forced to collaborate on a groundbreaking project that challenges their beliefs about consciousness.",
    releaseYear: 2023,
    genres: ["Science Fiction", "Techno-Thriller"],
    author: "Caleb Reinhardt",
    soldBy: userId,
  },
  {
    title: "Shadows Over Red Hollow",
    overview:
      "A retired detective is drawn back into a chilling case when a copycat killer resurfaces.",
    releaseYear: 2017,
    genres: ["Crime", "Thriller"],
    author: "Lydia Cross",
    soldBy: userId,
  },
  {
    title: "Gardens of the Forgotten Moon",
    overview:
      "In a world where memories can be traded, a young gardener discovers a secret that could rewrite history.",
    releaseYear: 2024,
    genres: ["Fantasy", "Speculative Fiction"],
    author: "Arjun Malhotra",
    soldBy: userId,
  },
];

const main = async () => {
  console.log("Seeding books....");

  for (const book of books) {
    await prisma.book.create({
      data: book,
    });
    console.log(`Created book: ${book.title}`);
  }
  console.log("seeding completed");
};

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
