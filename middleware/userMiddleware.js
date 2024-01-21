import { Pengajar } from "../models/Pengajar.js";
import { Siswa } from "../models/Siswa.js";

export const pengajarData = async (req, res, next) => {
  if (req.session && req.session.userId) {
    try {
      const user_data = await Pengajar.getData(req.session.userId);

      res.locals.user_data = user_data;

      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    next();
  }
};

export const siswaData = async (req, res, next) => {
  if (req.session && req.session.userId) {
    try {
      const user_data = await Siswa.getData(req.session.userId);

      res.locals.user_data = user_data;

      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    next();
  }
};
