import express from "express";
import {
  registerSiswa,
  loginSiswa,
  logoutSiswa,
} from "../controllers/authControllers.js";
import { requireLoginSiswa } from "../middleware/userAuthMiddleware.js";
import { siswaData } from "../middleware/userMiddleware.js";
import { joinKelas, listMengikuti } from "../controllers/kelasController.js";

const router = express.Router();

router.use(siswaData);

// Auth
router.post("/registrasi", registerSiswa);
router.post("/login", loginSiswa);
router.get("/logout", requireLoginSiswa, logoutSiswa);

router.get("/sign-form", (req, res) => {
  res.render("siswa/sign-form");
});

router.get("/dashboard", requireLoginSiswa, (req, res) => {
  res.render("siswa/dashboard");
  console.log(res.locals);
});

router.get("/list-mengikuti", requireLoginSiswa, listMengikuti);
router.post("/join-kelas", requireLoginSiswa, joinKelas);

export { router };
