import express from "express";
import {
  registerPengajar,
  loginPengajar,
  logoutPengajar,
} from "../controllers/authControllers.js";
import {
  buatKelas,
  halamanKelas,
  listKelas,
} from "../controllers/kelasController.js";
import { requireLoginPengajar } from "../middleware/userAuthMiddleware.js";
import { pengajarData } from "../middleware/userMiddleware.js";

const router = express.Router();

router.use(pengajarData);

router.post("/registrasi", registerPengajar);
router.post("/login", loginPengajar);
router.get("/logout", requireLoginPengajar, logoutPengajar);

router.post("/buat-kelas", requireLoginPengajar, buatKelas);

router.get("/sign-form", (req, res) => {
  res.render("pengajar/sign-form");
});

router.get("/dashboard", requireLoginPengajar, (req, res) => {
  res.render("pengajar/dashboard");
  console.log(res.locals);
});

router.get("/list-mengajar", requireLoginPengajar, listKelas);

router.get("/halaman-kelas/:key", requireLoginPengajar, halamanKelas);

export { router };
