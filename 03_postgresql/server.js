import express from "express";
import { db } from "./db.js";
import { cars } from "./schema.js";

const app = express();
const PORT = 3000;

// ⚠️ ESSENTIAL: This parses incoming JSON bodies in Express
app.use(express.json());

// Log incoming requests (optional)
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// POST Route
app.post("/api/v1/cars", async (req, res) => {
  const { make, model, year, price } = req.body || {};

  if (!make || !model || !year || !price) {
    return res.status(400).json({ error: "Please provide make, model, year, and price" });
  }

  try {
    const [newCar] = await db
      .insert(cars)
      .values({
        make: String(make),
        model: String(model),
        year: Number(year),
        price: String(price),
      })
      .returning();

    return res.status(201).json(newCar);
  } catch (error) {
    console.error("Database Error:", error);
    return res.status(500).json({
      error: "Something went wrong!",
      message: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});