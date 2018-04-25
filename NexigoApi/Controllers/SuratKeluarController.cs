using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using NexigoApi.Models;

namespace NexigoApi.Controllers
{
    public class GetSuratKeluarData
    {
        public int Id_Surat_Keluar { get; set; }
        public string Tanggal { get; set; }
        public string Nomor_Surat { get; set; }
        public string Perihal { get; set; }
        public int IdPengirim { get; set; }
        public string Pengirim { get; set; }
        public string Penerima { get; set; }
        public int IdReviewer { get; set; }
        public string Reviewer { get; set; }
        public int IdTembusan { get; set; }
        public string Tembusan { get; set; }
        public string Status { get; set; }
    }
    public class GetReadSuratKeluar
    {
        public List<GetSuratKeluarData> data { get; set; }
        public int total { get; set; }
    }
    public class GetArchiveData_SK
    {
        public SuratKeluarModel data { get; set; }
        public string nama_pengirim { get; set; }
        public string nama_reviewer { get; set; }
        public string nama_tembusan { get; set; }
        public string kode_divisi { get; set; }
    }

    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class SuratKeluarController : ApiController
    {
        //connect to db data context
        private CRUDDataContext context = null;
        public SuratKeluarController()
        {
            context = new CRUDDataContext();
        }

        //check data existance by id
        [HttpPost]
        public bool DataCheck(int Id)
        {
            var count = context.surat_keluar_tables.Count(x => x.id_surat_keluar == Id);
            if (count == 1) return true;
            else return false;
        }

        //insert new data Surat Keluar
        [HttpPost]
        public IHttpActionResult Insert([FromBody] SuratKeluarModel req)
        {
            var data = new surat_keluar_table();
            using (var db = new CRUDDataContext())
            {
                data = new surat_keluar_table()
                {
                    bahasa = req.Bahasa,
                    tempat = req.Tempat,
                    tanggal = req.Tanggal,
                    nomor = req.Nomor,
                    pengirim = req.Pengirim,
                    direktorat = req.Direktorat,
                    penerima = req.Penerima,
                    kode_simpan = req.KodeSimpan,
                    kode_bagian_organisasi = req.KodeBagianOrganisasi,
                    perihal = req.Perihal,
                    prioritas = req.Prioritas,
                    klasifikasi_surat = req.KlasifikasiSurat,
                    masa_retensi = req.MasaRetensi,
                    tembusan = req.Tembusan,
                    isi_surat = req.IsiSurat,
                    alamat_file_lampiran = req.AlamatFileLampiran,
                    reviewer = req.Reviewer,
                    status = req.Status,
                };

                db.surat_keluar_tables.InsertOnSubmit(data);
                db.SubmitChanges();
            }

            var res = "Data berhasil disimpan ke database";
            return Ok(res);
        }

        //get surat keluar data by only 1 status
        [HttpPost]
        public IHttpActionResult ReadAllByStatus(string Status)
        {
            var query = from Baca in context.surat_keluar_tables
                        where Baca.status == Status
                        select new GetSuratKeluarData
                        {
                            Id_Surat_Keluar = Baca.id_surat_keluar,
                            Tanggal = Baca.tanggal.ToString(),
                            Nomor_Surat = Baca.nomor,
                            Perihal = Baca.perihal,
                            IdPengirim = Baca.pengirim,
                            Penerima = Baca.penerima,
                            IdReviewer = Baca.reviewer,
                            IdTembusan = Baca.tembusan,
                            Pengirim = "",
                            Reviewer = "",
                            Tembusan = "",
                        };

            var data = query.ToArray();
            UserController user = new UserController();
            for (var i = 0; i < query.ToList().Count; i++)
            {
                //pengirim
                int id_pengirim = data[i].IdPengirim;
                var nama_pengirim = user.getName(id_pengirim);
                data[i].Pengirim = nama_pengirim;

                //reviewer
                int id_reviewer = data[i].IdReviewer;
                var nama_reviewer = user.getName(id_reviewer);
                data[i].Reviewer = nama_reviewer;

                //tembusan
                int id_tembusan = data[i].IdTembusan;
                var nama_tembusan = user.getName(id_tembusan);
                data[i].Tembusan = nama_tembusan;
            }

            GetReadSuratKeluar getdata = new GetReadSuratKeluar
            {
                data = data.ToList(),
                total = query.ToList().Count
            };

            return Ok(getdata);
        }

        //get surat keluar data by 2 status
        [HttpPost]
        public IHttpActionResult ReadAllBy2Status(string Status1, string Status2)
        {
            var query = from Baca in context.surat_keluar_tables
                        where Baca.status == Status1 || Baca.status == Status2
                        select new GetSuratKeluarData
                        {
                            Id_Surat_Keluar = Baca.id_surat_keluar,
                            Tanggal = Baca.tanggal.ToString(),
                            Nomor_Surat = Baca.nomor,
                            Perihal = Baca.perihal,
                            IdPengirim = Baca.pengirim,
                            Penerima = Baca.penerima,
                            IdReviewer = Baca.reviewer,
                            IdTembusan = Baca.tembusan,
                            Pengirim = "",
                            Reviewer = "",
                            Tembusan = "",
                            Status = Baca.status
                        };

            var data = query.ToArray();
            UserController user = new UserController();
            for (var i = 0; i < query.ToList().Count; i++)
            {
                //pengirim
                int id_pengirim = data[i].IdPengirim;
                var nama_pengirim = user.getName(id_pengirim);
                data[i].Pengirim = nama_pengirim;

                //reviewer
                int id_reviewer = data[i].IdReviewer;
                var nama_reviewer = user.getName(id_reviewer);
                data[i].Reviewer = nama_reviewer;

                //tembusan
                int id_tembusan = data[i].IdTembusan;
                var nama_tembusan = user.getName(id_tembusan);
                data[i].Tembusan = nama_tembusan;
            }

            GetReadSuratKeluar getdata = new GetReadSuratKeluar
            {
                data = data.ToList(),
                total = query.ToList().Count
            };

            return Ok(getdata);
        }

        //read data by Id
        [HttpPost]
        public IHttpActionResult ReadDataById(int Id)
        {
            var data = (from Baca in context.surat_keluar_tables
                        where Baca.id_surat_keluar == Id
                        select new SuratKeluarModel
                        {
                            IdSuratKeluar = Baca.id_surat_keluar,
                            Bahasa = Baca.bahasa,
                            Tempat = Baca.tempat,
                            Tanggal = Baca.tanggal,
                            Nomor = Baca.nomor,
                            Pengirim = Baca.pengirim,
                            Penerima = Baca.penerima,
                            Direktorat = Baca.direktorat,
                            KodeSimpan = Baca.kode_simpan,
                            KodeBagianOrganisasi = Baca.kode_bagian_organisasi,
                            Perihal = Baca.perihal,
                            Prioritas = Baca.prioritas,
                            KlasifikasiSurat = Baca.klasifikasi_surat,
                            MasaRetensi = Baca.masa_retensi,
                            Tembusan = Baca.tembusan,
                            IsiSurat = Baca.isi_surat,
                            AlamatFileLampiran = Baca.alamat_file_lampiran,
                            Reviewer = Baca.reviewer,
                            Approver = Baca.approver,
                        }).FirstOrDefault();

            OrganisasiController organisasi = new OrganisasiController();
            string kodeDivisi = organisasi.getKodeDivisi(data.KodeBagianOrganisasi);

            UserController user = new UserController();
            string namaPengirim = user.getName(data.Pengirim);
            string namaReviewer = user.getName(data.Reviewer);
            string namaTembusan = user.getName(data.Tembusan);

            GetArchiveData_SK getdata = new GetArchiveData_SK
            {
                data = data,
                kode_divisi = kodeDivisi,
                nama_pengirim = namaPengirim,
                nama_reviewer = namaReviewer,
                nama_tembusan = namaTembusan
            };

            return Ok(getdata);
        }

        //delete data surat keluar
        [HttpPost]
        public IHttpActionResult Delete(int Id)
        {
            try
            {
                if (Id != null)
                {
                    using (var db = new CRUDDataContext())
                    {

                        var data = db.surat_keluar_tables.FirstOrDefault(o => o.id_surat_keluar == Id);
                        db.surat_keluar_tables.DeleteOnSubmit(data);
                        db.SubmitChanges();

                        var res = "Data berhasil dihapus";
                        return Ok(res);
                    }

                }
                else
                {
                    return Unauthorized();
                }

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //update data surat keluar
        public IHttpActionResult Update([FromBody] SuratKeluarModel req)
        {
            try
            {
                if (req != null)
                {
                    using (var db = new CRUDDataContext())
                    {

                        var data = db.surat_keluar_tables.FirstOrDefault(o => o.id_surat_keluar == req.IdSuratKeluar);
                        data.bahasa = req.Bahasa;
                        data.tempat = req.Tempat;
                        data.tanggal = req.Tanggal;
                        data.nomor = req.Nomor;
                        data.pengirim = req.Pengirim;
                        data.direktorat= req.Direktorat;
                        data.penerima = req.Penerima;
                        data.kode_simpan = req.KodeSimpan;
                        data.kode_bagian_organisasi = req.KodeBagianOrganisasi;
                        data.perihal = req.Perihal;
                        data.prioritas = req.Prioritas;
                        data.klasifikasi_surat = req.KlasifikasiSurat;
                        data.masa_retensi = req.MasaRetensi;
                        data.tembusan = req.Tembusan;
                        data.isi_surat = req.IsiSurat;
                        data.alamat_file_lampiran = req.AlamatFileLampiran;
                        data.reviewer = req.Reviewer;
                        data.approver = req.Approver;
                        data.status = req.Status;

                        db.SubmitChanges();

                        var res = "Data berhasil diupdate";
                        return Ok(res);
                    }
                }
                else
                {
                    return Unauthorized();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}