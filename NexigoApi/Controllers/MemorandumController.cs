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
    public class GetMemorandumData
    {
        public int Id_Memorandum { get; set; }
        public string Tanggal { get; set; }
        public string Nomor_Surat { get; set; }
        public string Perihal { get; set; }
        public int IdPengirim { get; set; }
        public string Pengirim { get; set; }
        public int IdPenerima { get; set; }
        public string Penerima { get; set; }
        public int IdReviewer { get; set; }
        public string Reviewer { get; set; }
        public int IdTembusan { get; set; }
        public string Tembusan { get; set; }
        public string Status { get; set; }
    }
    public class GetReadMemorandum
    {
        public List<GetMemorandumData> data { get; set; }
        public int total { get; set; }
    }
    public class GetArchiveData_M
    {
        public MemorandumModel data { get; set; }
        public string nama_pengirim { get; set; }
        public string nama_penerima { get; set; }
        public string nama_reviewer { get; set; }
        public string nama_tembusan { get; set; }
        public string kode_divisi { get; set; }
    }

    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class MemorandumController : ApiController
    {
        //connect to db data context
        private CRUDDataContext context = null;
        public MemorandumController()
        {
            context = new CRUDDataContext();
        }

        //check data existance by id
        [HttpPost]
        public bool DataCheck(int Id)
        {
            var count = context.memorandum_tables.Count(x => x.id_memorandum == Id);
            if (count == 1) return true;
            else return false;
        }

        //insert new data Memorandum
        [HttpPost]
        public IHttpActionResult Insert([FromBody] MemorandumModel req)
        {
            var data = new memorandum_table();
            using (var db = new CRUDDataContext())
            {
                data = new memorandum_table()
                {
                    tempat = req.Tempat,
                    tanggal = req.Tanggal,
                    nomor = req.Nomor,
                    pengirim = req.Pengirim,
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

                db.memorandum_tables.InsertOnSubmit(data);
                db.SubmitChanges();
            }

            var res = "Data berhasil disimpan ke database";
            return Ok(res);
        }

        //get memorandum data by only 1 status
        [HttpPost]
        public IHttpActionResult ReadAllByStatus(string Status)
        {
            var query = from Baca in context.memorandum_tables
                        where Baca.status == Status
                        select new GetMemorandumData
                        {
                            Id_Memorandum = Baca.id_memorandum,
                            Tanggal = Baca.tanggal.ToString(),
                            Nomor_Surat = Baca.nomor,
                            Perihal = Baca.perihal,
                            IdPengirim = Baca.pengirim,
                            IdPenerima = Baca.penerima,
                            IdReviewer = Baca.reviewer,
                            IdTembusan = Baca.tembusan,
                            Pengirim = "",
                            Penerima = "",
                            Reviewer = "",
                            Tembusan = "",
                        };

            var data = query.ToArray();
            UserController user = new UserController();
            for (var i = 0; i < query.ToList().Count; i++)
            {
                //pengirim
                int id_pengirim= data[i].IdPengirim;
                var nama_pengirim= user.getName(id_pengirim);
                data[i].Pengirim = nama_pengirim;

                //penerima
                int id_penerima = data[i].IdPenerima;
                var nama_penerima = user.getName(id_penerima);
                data[i].Penerima = nama_penerima;

                //reviewer
                int id_reviewer= data[i].IdReviewer;
                var nama_reviewer= user.getName(id_reviewer);
                data[i].Reviewer= nama_reviewer;

                //tembusan
                int id_tembusan = data[i].IdTembusan;
                var nama_tembusan= user.getName(id_tembusan);
                data[i].Tembusan= nama_tembusan;
            }

            GetReadMemorandum getdata = new GetReadMemorandum
            {
                data = data.ToList(),
                total = query.ToList().Count
            };

            return Ok(getdata);
        }

        //get memorandum data by 2 status
        [HttpPost]
        public IHttpActionResult ReadAllBy2Status(string Status1, string Status2)
        {
            var query = from Baca in context.memorandum_tables
                        where Baca.status == Status1 || Baca.status == Status2
                        select new GetMemorandumData
                        {
                            Id_Memorandum = Baca.id_memorandum,
                            Tanggal = Baca.tanggal.ToString(),
                            Nomor_Surat = Baca.nomor,
                            Perihal = Baca.perihal,
                            IdPengirim = Baca.pengirim,
                            IdPenerima = Baca.penerima,
                            IdReviewer = Baca.reviewer,
                            IdTembusan = Baca.tembusan,
                            Pengirim = "",
                            Penerima = "",
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

                //penerima
                int id_penerima = data[i].IdPenerima;
                var nama_penerima = user.getName(id_penerima);
                data[i].Penerima = nama_penerima;

                //reviewer
                int id_reviewer = data[i].IdReviewer;
                var nama_reviewer = user.getName(id_reviewer);
                data[i].Reviewer = nama_reviewer;

                //tembusan
                int id_tembusan = data[i].IdTembusan;
                var nama_tembusan = user.getName(id_tembusan);
                data[i].Tembusan = nama_tembusan;
            }

            GetReadMemorandum getdata = new GetReadMemorandum
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
            var data = (from Baca in context.memorandum_tables
                        where Baca.id_memorandum == Id
                        select new MemorandumModel
                        {
                            IdMemorandum = Baca.id_memorandum,
                            Tempat = Baca.tempat,
                            Tanggal = Baca.tanggal,
                            Nomor = Baca.nomor,
                            Pengirim = Baca.pengirim,
                            Penerima = Baca.penerima,
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
            string namaPenerima = user.getName(data.Penerima);
            string namaReviewer = user.getName(data.Reviewer);
            string namaTembusan = user.getName(data.Tembusan);

            GetArchiveData_M getdata = new GetArchiveData_M
            {
                data = data,
                kode_divisi = kodeDivisi,
                nama_pengirim = namaPengirim,
                nama_penerima = namaPenerima,
                nama_reviewer = namaReviewer,
                nama_tembusan = namaTembusan
            };

            return Ok(getdata);
        }

        //delete data memorandum
        [HttpPost]
        public IHttpActionResult Delete(int Id)
        {
            try
            {
                if (Id != null)
                {
                    using (var db = new CRUDDataContext())
                    {

                        var data = db.memorandum_tables.FirstOrDefault(o => o.id_memorandum== Id);
                        db.memorandum_tables.DeleteOnSubmit(data);
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

        //update data memorandum
        public IHttpActionResult Update([FromBody] MemorandumModel req)
        {
            try
            {
                if (req != null)
                {
                    using (var db = new CRUDDataContext())
                    {

                        var data = db.memorandum_tables.FirstOrDefault(o => o.id_memorandum== req.IdMemorandum);
                        data.tempat = req.Tempat;
                        data.tanggal = req.Tanggal;
                        data.nomor = req.Nomor;
                        data.pengirim = req.Pengirim;
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