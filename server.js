import express, { application, json } from "express";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

open({
  filename: "tasks.db",
  driver: sqlite3.Database,
}).then(async (db) => {
  /*await db.migrate({
    migrationsPath: `${path.join(process.cwd(), "migrations")}`,
  });*/

  app.get("/tasks", async (_, res) => {
    console.log("GET: /tasks");
    const result = await db.all("select * from tasks");

    return res.json(result);
  });

  app.post("/tasks", async (req, res) => {
    const body = req.body;
    console.log(`POST: /tasks BODY: ${JSON.stringify(body)}`);
    const { description } = body;

    if (!description) {
      return res
        .status(400)
        .json({ message: "Você precisa passar uma description" });
    }

    await db.run(
      "insert into tasks(description, completed) values(?, ?)",
      description,
      0
    );

    return res.json({ ok: true });
  });

  app.put("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    console.log(`PUT: /tasks/${id}`);
    await db.run("update tasks set completed = 1 where id = ?", id);

    return res.json({ ok: true });
  });

  app.delete("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    console.log(`DELETE: /tasks/${id}`);
    await db.run("delete from tasks where id = ?", id);

    return res.json({ ok: true });
  });

  app.get("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    const task = await db.get("select * from tasks where id = ?", id);

    if (!task) {
      return res.status(404).json({ message: "A task não existe" });
    }

    return res.json(task);
  });

  app.listen(3333, () => console.log("Server UP to date!"));
});
