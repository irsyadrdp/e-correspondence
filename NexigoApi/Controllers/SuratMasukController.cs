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
    public class GetSuratMasukData
    {
        public int Id_Surat_Masuk { get; set; }
        public string Nomor_Surat { get; set; }
        public string Tanggal { get; set; }
        public string Perihal { get; set; }
        public string Pengirim { get; set; }
        public int IdPenerima { get; set; }
        public string Penerima { get; set; }
    }
    public class GetReadSuratMasuk
    {
        public List<GetSuratMasukData> data { get; set; }
        public int total { get; set; }
    }

    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class SuratMasukController : ApiController
    {
        //connect to db data context
        private CRUDDataContext context = null;
        public SuratMasukController()
        {
            context = new CRUDDataContext();
        }

        //check data existance by id
        [HttpPost]
        public bool DataCheck(int Id)
        {
            var count = context.surat_masuk_tables.Count(x => x.id_surat_masuk == Id);
            if(count==1) return true;
            else return false;
        }

        //insert new data Surat Masuk
        [HttpPost]
        public IHttpActionResult Insert([FromBody] SuratMasukModel req)
        {
            var data = new surat_masuk_table();
            using (var db = new CRUDDataContext())
            {
                data = new surat_masuk_table()
                {
                    tempat = req.Tempat,
                    tanggal = req.Tanggal,
                    nomor = req.Nomor,
                    pengirim = req.Pengirim,
                    penerima = req.Penerima,
                    status_penerima = req.StatusPenerima,
                    kode_simpan = req.KodeSimpan,
                    kode_bagian_organisasi = req.KodeBagianOrganisasi,
                    perihal = req.Perihal,
                    prioritas = req.Prioritas,
                    klasifikasi_surat = req.KlasifikasiSurat,
                    masa_retensi = req.MasaRetensi,
                    alamat_file = req.AlamatFile,
                    alamat_file_lampiran = req.AlamatFileLampiran,
                    status = req.Status,
                };
                Console.WriteLine(data);
                db.surat_masuk_tables.InsertOnSubmit(data);
                db.SubmitChanges();
            }

            var res = "Data berhasil disimpan ke database";
            return Ok(res);
        }

        //get draft data
        [HttpPost]
        public IHttpActionResult ReadAllDraft()
        {
            var query = from Baca in context.surat_masuk_tables
                       where Baca.status == "Draft"
                       select new GetSuratMasukData
                        {
                            Id_Surat_Masuk = Baca.id_surat_masuk,
                            Nomor_Surat = Baca.nomor,
                            Tanggal = Baca.tanggal.ToString(),
                            Perihal = Baca.perihal,
                            Pengirim = Baca.pengirim,
                            IdPenerima = Baca.penerima,
                            Penerima = "",
                        };

            var data = query.ToArray();
            UserController user = new UserController();
            for (var i = 0; i < query.ToList().Count; i++) {
                int id = data[i].IdPenerima;
                var nama = user.getName(id);
                data[i].Penerima = nama;
            }

            GetReadSuratMasuk getdata = new GetReadSuratMasuk
            {
                data = data.ToList(),
                total = query.ToList().Count
            };

            return Ok(getdata);
        }

        //get finish data
        [HttpPost]
        public IHttpActionResult ReadAllFinish()
        {
            var query = from Baca in context.surat_masuk_tables
                        where Baca.status == "Finish"
                        select new GetSuratMasukData
                        {
                            Id_Surat_Masuk = Baca.id_surat_masuk,
                            Nomor_Surat = Baca.nomor,
                            Tanggal = Baca.tanggal.ToString(),
                            Perihal = Baca.perihal,
                            Pengirim = Baca.pengirim,
                            IdPenerima = Baca.penerima,
                            Penerima = "",
                        };

            var data = query.ToArray();
            UserController user = new UserController();
            for (var i = 0; i < query.ToList().Count; i++)
            {
                int id = data[i].IdPenerima;
                var nama = user.getName(id);
                data[i].Penerima = nama;
            }

            GetReadSuratMasuk getdata = new GetReadSuratMasuk
            {
                data = data.ToList(),
                total = query.ToList().Count
            };

            return Ok(getdata);
        }

        //read draft data by Id
        [HttpPost]
        public IHttpActionResult ReadDraftById(int Id)
        {
            var data = from Baca in context.surat_masuk_tables
                        where Baca.id_surat_masuk == Id
                        select new SuratMasukModel
                        {
                            IdSuratMasuk = Baca.id_surat_masuk,
                            Tempat = Baca.tempat,
                            Tanggal = Baca.tanggal,
                            Nomor = Baca.nomor,
                            Pengirim = Baca.pengirim,
                            Penerima = Baca.penerima,
                            StatusPenerima = Baca.status_penerima,
                            KodeSimpan = Baca.kode_simpan,
                            KodeBagianOrganisasi = Baca.kode_bagian_organisasi,
                            Perihal = Baca.perihal,
                            Prioritas = Baca.prioritas,
                            KlasifikasiSurat = Baca.klasifikasi_surat,
                            MasaRetensi = Baca.masa_retensi,
                            AlamatFile = Baca.alamat_file,
                            AlamatFileLampiran = Baca.alamat_file_lampiran
                        };
            
            return Ok(data);
        }
                
        //delete data Surat Masuk
        [HttpPost]
        public IHttpActionResult Delete(int Id)
        {
            try
            {
                if (Id != null)
                {
                    using (var db = new CRUDDataContext())
                    {

                        var data = db.surat_masuk_tables.FirstOrDefault(o => o.id_surat_masuk == Id);
                        db.surat_masuk_tables.DeleteOnSubmit(data);
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

        //update data surat masuk
        public IHttpActionResult Update([FromBody] SuratMasukModel req)
        {
            try
            {
                if (req != null)
                {
                    using (var db = new CRUDDataContext())
                    {

                        var data = db.surat_masuk_tables.FirstOrDefault(o => o.id_surat_masuk == req.IdSuratMasuk);
                        data.tempat = req.Tempat;
                        data.tanggal = req.Tanggal;
                        data.nomor = req.Nomor;
                        data.pengirim = req.Pengirim;
                        data.penerima = req.Penerima;
                        data.status_penerima = req.StatusPenerima;
                        data.kode_simpan = req.KodeSimpan;
                        data.kode_bagian_organisasi = req.KodeBagianOrganisasi;
                        data.perihal = req.Perihal;
                        data.prioritas = req.Prioritas;
                        data.klasifikasi_surat = req.KlasifikasiSurat;
                        data.masa_retensi = req.MasaRetensi;
                        data.alamat_file = req.AlamatFile;
                        data.alamat_file_lampiran = req.AlamatFileLampiran;
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