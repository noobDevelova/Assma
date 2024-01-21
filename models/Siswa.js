import db from "../config/connection.js";
import bcrypt from "bcrypt";

class Siswa {
  constructor(nps, nama_siswa, email, password, foto_profil) {
    this.nps = nps;
    this.nama_siswa = nama_siswa;
    this.email = email;
    this.password = password;
    this.foto_profil = foto_profil;
  }

  async save() {
    const [result] = await db.execute("SELECT generate_nps()");
    const nps = result[0]["generate_nps()"];

    const hashed_password = await bcrypt.hash(this.password, 10);

    const query =
      "INSERT INTO siswa (nps, nama_siswa, email, password, foto_profil) VALUES (?, ?, ?, ?, ?)";
    const [rows] = await db.execute(query, [
      nps,
      this.nama_siswa,
      this.email,
      hashed_password,
      this.foto_profil,
    ]);

    this.id = rows.insertId;
  }

  async isAlreadyJoined(nps, kode_kelas) {
    try {
      const query =
        "SELECT COUNT(*) AS count FROM mengikuti WHERE nps = ? AND kode_kelas = ?";
      const [rows] = await db.execute(query, [nps, kode_kelas]);
      const count = rows[0].count;
      return count > 0;
    } catch (error) {
      console.error(error);
      throw new Error("Failed check anggota kelas");
    }
  }

  async joinKelas(kode_kelas) {
    try {
      const isJoined = await this.isAlreadyJoined(this.nps, kode_kelas);

      if (!isJoined) {
        const query = "INSERT INTO mengikuti (nps, kode_kelas) VALUES (?, ?)";
        await db.execute(query, [this.nps, kode_kelas]);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error Failed");
    }
  }

  async getDataMengikuti() {
    try {
      const query = `
        SELECT k.*, p.nama_pengajar, p.foto_profil
        FROM kelas k
        JOIN mengikuti m ON k.kode_kelas = m.kode_kelas
        JOIN pengajar p ON k.npp = p.npp
        WHERE m.nps = ?`;
      const [rows] = await db.execute(query, [this.nps]);

      return rows;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to get data mengikuti");
    }
  }

  static async getData(nps) {
    const query = "SELECT * FROM siswa WHERE nps = ?";
    const [rows] = await db.execute(query, [nps]);
    return rows[0]
      ? new Siswa(
          rows[0].nps,
          rows[0].nama_siswa,
          rows[0].email,
          rows[0].foto_profil
        )
      : null;
  }

  static async getByEmail(email) {
    const query = "SELECT * FROM siswa WHERE email = ?";
    const [rows] = await db.execute(query, [email]);
    return rows[0]
      ? new Siswa(
          rows[0].nps,
          rows[0].nama_siswa,
          rows[0].email,
          rows[0].password,
          rows[0].foto_profil
        )
      : null;
  }

  async comparePassword(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  }
}

export { Siswa };
