import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();

const app = express();

//Middlewares
app.use(express.json());

//Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//signin
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.profesor.findUnique({
    where: {
      email: email,
    },
  });
  if (user) {
    if (user.password === password) {
      res.json(user);
    } else {
      res.status(400).json("Wrong password");
    }
  } else {
    res.status(400).json("User not found");
  }
});
//signup
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const user = await prisma.profesor.findUnique({
    where: {
      email: email,
    },
  });
  if (user) {
    res.status(400).json("User already exists");
  } else {
    const newUser = await prisma.profesor.create({
      data: {
        username: username,
        email: email,
        password: password,
      },
    });
    res.json(newUser);
  }
});

//muestra todos los usuarios
app.get("/users", async (req, res) => {
  const users = await prisma.profesor.findMany();
  res.json(users);
});

//usuarios por id
app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  const user = await prisma.profesor.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json(user);
});

//update
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;
  const user = await prisma.profesor.update({
    where: {
      id: Number(id),
    },
    data: {
      username: username,
      email: email,
      password: password,
    },
  });
  res.json(user);
});

//delete
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  const user = await prisma.profesor.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(user);
});

// Setting
app.use((req, res, next) => {
  res.status(404);
  return res.json({
    success: false,
    payload: null,
    message: `API SAYS: Endpoint not found for path: ${req.path}`,
  });
});

app.listen(process.env.PORT || 8000, () =>
  console.log(`🚀 Example app listening on port 8000`)
);
