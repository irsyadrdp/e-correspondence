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
    public class GetReadInbox
    {
        public List<InboxModel> data { get; set; }
        public int total { get; set; }
    }


    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class CRUDController : ApiController
    {

        private CRUDDataContext context = null;
        public CRUDController()
        {
            context = new CRUDDataContext();
        }

        //read all data
        [HttpPost]
        public GetReadInbox ReadAll()
        {
            var query = from Baca in context.inbox_tables
                        select new InboxModel
                        {
                            IdSuratMasuk = Baca.id_surat_masuk,
                            IdUser = Baca.id_user,
                            Pengirim = Baca.pengirim,
                            Perihal = Baca.perihal,
                            Tipe = Baca.tipe,
                            WaktuMasuk = Baca.waktu_masuk,
                            AlamatFile = Baca.alamat_file,
                        };

            GetReadInbox getdata = new GetReadInbox
            {
                data = query.ToList(),
                total = query.ToList().Count
            };

            return getdata;
        }

        //delete data
        [HttpPost]
        public IHttpActionResult DeleteData(int Id)
        {
            try
            {
                if (Id != null)
                {
                    using (var dc = new CRUDDataContext())
                    {

                        var data = dc.inbox_tables.FirstOrDefault(o => o.id_surat_masuk == Id);
                        dc.inbox_tables.DeleteOnSubmit(data);
                        dc.SubmitChanges();

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

        //create data
        //[HttpPost]
        //public IHttpActionResult Create([FromBody] Biodata req)
        //{
        //    var result = new List<InboxModel>();
        //    using (var dc = new CRUDDataContext())
        //    {
        //        var data = new Biodata()
        //        {
        //            Username = req.Username,
        //            Password = req.Password,
        //            Firstname = req.Firstname,
        //            Lastname = req.Lastname
        //        };

        //        dc.Biodatas.InsertOnSubmit(data);
        //        dc.SubmitChanges();
        //    }
        //    return Ok(result);
        //}


        //update data
        //public IHttpActionResult UpdateData([FromBody] Biodata req)
        //{
        //    try
        //    {
        //        if (req != null)
        //        {
        //            using (var dc = new CRUDDataContext())
        //            {

        //                var data = dc.Biodatas.FirstOrDefault(o => o.Id == req.Id);
        //                data.Username = req.Username;
        //                data.Password = req.Password;
        //                data.Firstname = req.Firstname;
        //                data.Lastname = req.Lastname;
        //                dc.SubmitChanges();

        //                return Ok(data);

        //            }

        //        }
        //        else
        //        {
        //            return Unauthorized();
        //        }

        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}


        //contoh iquqeryable
        //get user id_divisi
        //[HttpPost]
        //public IQueryable<int> getDivisi(int Id)
        //{
        //    IQueryable<int> item = from UserData in context.user_tables
        //                           where UserData.id_user == Id
        //                           select UserData.id_divisi;

        //    return item;
        //}

    }
}
