export const requireLoginPengajar = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect("/pengajar/sign-form");
  }
  next();
};

export const requireLoginSiswa = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect("/siswa/sign-form");
  }
  next();
};
