import db from "../config/connection.js";

class Tugas {
  constructor(
    id_tugas,
    kode_kelas,
    judul_tugas,
    deskripsi_tugas,
    tanggal_deadline,
    nilai,
    created_at
  ) {
    this.id_tugas = id_tugas;
    this.kode_kelas = kode_kelas;
    this.judul_tugas = judul_tugas;
    this.deskripsi_tugas = deskripsi_tugas;
    this.tanggal_deadline = tanggal_deadline;
    this.nilai = nilai;
    this.created_at = created_at;
  }

  async create() {
    try {
      const query =
        "INSERT INTO tugas (kode_kelas, judul_tugas, deskripsi_tugas, tanggal_deadline, nilai, created_at) VALUES (?, ?, ?, ?, ?, ?)";
      const [rows] = await db.execute(query, [
        this.kode_kelas,
        this.judul_tugas,
        this.deskripsi_tugas,
        this.tanggal_deadline,
        this.nilai,
        this.created_at,
      ]);
      this.id_tugas = rows.insertId;
    } catch (error) {
      console.error(error);
      throw Error("Failed to create Tugas");
    }
  }

  static async getTugas(kode_kelas) {
    try {
      const query = "SELECT * FROM tugas WHERE kode_kelas = ?";
      const [rows] = await db.execute(query, [kode_kelas]);

      return rows;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to get tugas");
    }
  }
}

export { Tugas };
