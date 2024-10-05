import db from "../config/connection.js";
import { Pengajar } from "./Pengajar.js";

class Kelas {
  constructor(kode_kelas, npp, nama_kelas, mata_pelajaran, ruang_kelas) {
    this.kode_kelas = kode_kelas;
    this.npp = npp;
    this.nama_kelas = nama_kelas;
    this.mata_pelajaran = mata_pelajaran;
    this.ruang_kelas = ruang_kelas;
  }

  async create() {
    const [result] = await db.execute("SELECT GenerateKodeKelas()");
    const kode_kelas = result[0]["GenerateKodeKelas()"];

    const query =
      "INSERT INTO kelas (kode_kelas, npp, nama_kelas, mata_pelajaran, ruang_kelas) VALUES (?, ?, ?, ?, ?)";
    const [rows] = await db.execute(query, [
      kode_kelas,
      this.npp,
      this.nama_kelas,
      this.mata_pelajaran,
      this.ruang_kelas,
    ]);
    this.id = rows.insertId;

    const pengajar = new Pengajar(this.npp);
    await pengajar.addMengajar(kode_kelas);
  }

  static async getByCode(kode_kelas) {
    try {
      const query = `
        SELECT k.*, p.nama_pengajar
        FROM kelas k
        JOIN pengajar p ON k.npp = p.npp
        WHERE k.kode_kelas = ?`;
      const [rows] = await db.execute(query, [kode_kelas]);

      return rows;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to get class by code");
    }
  }

  // Untuk mendapatkan daftar siswa yang tergabung dalam kelas
  static async getAnggota(kode_kelas) {
    try {
      const query =
        "SELECT s.nps, s.nama_siswa FROM anggota_kelas ak JOIN siswa s ON ak.nps = s.nps WHERE ak.kode_kelas = ?";
      const [rows] = await db.execute(query, [kode_kelas]);
      return rows.map((row) => ({ nps: row.nps, nama_siswa: row.nama_siswa }));
    } catch (error) {
      console.error(error);
      throw new Error("Failed to get class members");
    }
  }
}

export { Kelas };
