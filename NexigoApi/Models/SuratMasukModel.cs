using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace NexigoApi.Models
{
    public class SuratMasukModel
    {
        public int IdSuratMasuk { get; set; }
        public string Tempat { get; set; }
        public DateTime Tanggal{ get; set; }
        public string Nomor { get; set; }
        public string Pengirim { get; set; }
        public int Penerima { get; set; }   //foreign key
        public string StatusPenerima { get; set; }
        public string KodeSimpan { get; set; }
        public int KodeBagianOrganisasi { get; set; } //foreign key
        public string Perihal { get; set; }
        public string Prioritas { get; set; }
        public string KlasifikasiSurat{ get; set; }
        public DateTime MasaRetensi { get; set; }
        public string AlamatFile { get; set; }
        public string AlamatFileLampiran { get; set; }
        public string Status { get; set; }
    }
}