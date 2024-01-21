import db from "../config/connection.js";
import bcrypt from "bcrypt";

class Pengajar {
  constructor(npp, nama_pengajar, email, password) {
    this.npp = npp;
    this.nama_pengajar = nama_pengajar;
    this.email = email;
    this.password = password;
  }

  async save() {
    const [result] = await db.execute("SELECT generate_npp_pengajar()");
    const npp = result[0]["generate_npp_pengajar()"];

    const hashed_password = await bcrypt.hash(this.password, 10);

    const query =
      "INSERT INTO pengajar (npp, nama_pengajar, email, password) VALUES (?, ?, ?, ?)";
    const [rows] = await db.execute(query, [
      npp,
      this.nama_pengajar,
      this.email,
      hashed_password,
    ]);
    this.id = rows.insertId;
  }

  async addMengajar(kode_kelas) {
    const query = "INSERT INTO mengajar (npp, kode_kelas) VALUES (?, ?)";
    await db.execute(query, [this.npp, kode_kelas]);
  }

  async getMengajar() {
    const query =
      "SELECT k. * from kelas k JOIN mengajar m ON k.kode_kelas = m.kode_kelas WHERE m.npp = ?";
    const [rows] = await db.execute(query, [this.npp]);
    return rows;
  }

  static async getByEmail(email) {
    const query = "SELECT * FROM pengajar WHERE email = ?";
    const [rows] = await db.execute(query, [email]);

    return rows[0]
      ? new Pengajar(
          rows[0].npp,
          rows[0].nama_pengajar,
          rows[0].email,
          rows[0].password,
          rows[0].foto_profil
        )
      : null;
  }

  static async getData(npp) {
    const query = "SELECT * FROM pengajar WHERE npp = ?";
    const [rows] = await db.execute(query, [npp]);
    return rows[0]
      ? new Pengajar(
          rows[0].npp,
          rows[0].nama_pengajar,
          rows[0].email,
          rows[0].foto_profil
        )
      : null;
  }

  async comparePassword(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  }
}

export { Pengajar };
