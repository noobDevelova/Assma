import { Kelas } from "../models/Kelas.js";
import { Pengajar } from "../models/Pengajar.js";
import { Tugas } from "../models/Tugas.js";

export const buatKelas = async (req, res) => {
  try {
    const { nama_kelas, mata_pelajaran, ruang_kelas } = req.body;

    const npp = req.session.userId;

    const kelas = new Kelas(null, npp, nama_kelas, mata_pelajaran, ruang_kelas);

    await kelas.create();

    // res.status(201).json({ message: "Kelas Berhasil dibuat" });'

    res.redirect("/pengajar/list-mengajar");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const halamanKelasPengajar = async (req, res) => {
  try {
    const kode_kelas = req.params.key;

    const kelas = await Kelas.getByCode(kode_kelas);

    const anggota_kelas = await Kelas.getAnggota(kode_kelas);

    const tugas_kelas = await Tugas.getTugas(kode_kelas);

    console.log("tugas kelas", tugas_kelas);
    res.render("pengajar/halaman-kelas", {
      data_kelas: kelas[0],
      anggota_kelas: anggota_kelas,
      tugas_kelas: tugas_kelas,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const listKelas = async (req, res) => {
  try {
    const list_kelas = await res.locals.user_data.getMengajar();

    console.log(list_kelas);

    res.render("pengajar/list-mengajar", { list_kelas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const joinKelas = async (req, res) => {
  try {
    const { kode_kelas } = req.body;
    const join_kelas = await res.locals.user_data.joinKelas(kode_kelas);
    console.log(kode_kelas);

    if (join_kelas) {
      res.status(200).json({ message: "Sucessfully Joined The Class" });
    } else {
      res.status(400).json({ message: "Failed Join The Class" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const listMengikuti = async (req, res) => {
  try {
    const mengikuti = await res.locals.user_data.getDataMengikuti();

    if (mengikuti) {
      res.render("siswa/list-mengikuti", { mengikuti });
      console.log(mengikuti);
    } else {
      res.status(400).json({ message: "Failed to get data mengikuti" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const halamanKelasSiswa = async (req, res) => {
  try {
    const kode_kelas = req.params.key;

    const data_kelas = await Kelas.getByCode(kode_kelas);

    const anggota_kelas = await Kelas.getAnggota(kode_kelas);

    const tugas_kelas = await Tugas.getTugas(kode_kelas);

    res.render("siswa/halaman-kelas", {
      data_kelas: data_kelas[0],
      anggota_kelas: anggota_kelas,
      tugas_kelas: tugas_kelas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
