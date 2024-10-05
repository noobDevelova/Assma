import { Tugas } from "../models/Tugas.js";

export const buatTugas = async (req, res) => {
  try {
    const { judul_tugas, deskripsi_tugas, tanggal, waktu } = req.body;
    const kode_kelas = req.params.key;

    const formData = {
      kode_kelas: kode_kelas,
      judul_tugas: judul_tugas,
      deskripsi_tugas: deskripsi_tugas,
      tanggal_deadline: `${tanggal} ${waktu}`,
    };

    const tugas = new Tugas(
      null,
      formData.kode_kelas,
      formData.judul_tugas,
      formData.deskripsi_tugas,
      formData.tanggal_deadline,
      null,
      null,
      null
    );

    await tugas.create();

    res.redirect("/pengajar/halaman-kelas");
  } catch (error) {
    console.log(error);
  }
};
