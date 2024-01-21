import { Siswa } from "../models/Siswa.js";
import { Pengajar } from "../models/Pengajar.js";

export const registerSiswa = async (req, res) => {
  try {
    const { nama_siswa, email, password } = req.body;

    const siswa = new Siswa(null, nama_siswa, email, password, null);

    await siswa.save();

    res.status(201).json({
      userId: siswa.id,
      message: "Akun siswa telah berhasil dibuat!",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const loginSiswa = async (req, res) => {
  try {
    const { email, password } = req.body;

    const siswa = await Siswa.getByEmail(email);

    if (siswa && (await siswa.comparePassword(password))) {
      req.session.userId = siswa.nps;

      res.redirect("/siswa/dashboard");
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logoutSiswa = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
      } else {
        res.redirect("/siswa/sign-form");
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const registerPengajar = async (req, res) => {
  try {
    const { nama_pengajar, email, password } = req.body;

    const pengajar = new Pengajar(null, nama_pengajar, email, password, null);

    await pengajar.save();

    res.redirect("/pengajar/sign-form");
  } catch (error) {
    console.error(error);
    req.status(500).json({ message: "Internal Server Error" });
  }
};

export const loginPengajar = async (req, res) => {
  try {
    const { email, password } = req.body;

    const pengajar = await Pengajar.getByEmail(email);

    if (pengajar && (await pengajar.comparePassword(password))) {
      req.session.userId = pengajar.npp;

      res.redirect("/pengajar/dashboard");
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logoutPengajar = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        res.status(401).json({ message: "Failed to Logging Out" });
      } else {
        res.redirect("/pengajar/sign-form");
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
