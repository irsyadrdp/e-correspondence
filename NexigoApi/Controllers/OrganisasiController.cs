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
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class OrganisasiController : ApiController
    {
        //connect to db data context
        private CRUDDataContext context = null;
        public OrganisasiController()
        {
            context = new CRUDDataContext();
        }

        //get kode divisi by id
        [HttpPost]
        public string getKodeDivisi(int Id)
        {
            string item = (from DivisiData in context.divisi_tables
                           where DivisiData.id_divisi == Id
                           select DivisiData.kode_divisi).Single();
            return item;
        }

        //get nama direktorat by id
        [HttpPost]
        public string getNamaDirektorat(int Id)
        {
            string item = (from dir in context.direktorat_tables
                           join div in context.divisi_tables
                           on dir.id_direktorat equals div.id_direktorat
                           where div.id_divisi == Id
                           select dir.nama_direktorat).Single();
            return item;
        }
    }
}