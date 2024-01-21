import express from "express";
import session from "express-session";
import { router as siswaRoutes } from "./routes/siswaRoutes.js";
import { router as pengajarRoutes } from "./routes/pengajarRoutes.js";

const app = express();
const base_route = 3000;

// Middleware Session
app.use(
  session({
    secret: "assma-project",
    resave: true,
    saveUninitialized: true,
  })
);

app.set("view engine", "ejs");
app.use(express.static("views"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/siswa/", siswaRoutes);
app.use("/pengajar/", pengajarRoutes);

app.listen(base_route, () => {
  console.log(`Server ready at port ${base_route}`);
});
