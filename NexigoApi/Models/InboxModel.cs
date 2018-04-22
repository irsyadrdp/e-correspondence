using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NexigoApi.Models
{
    public class InboxModel
    {
        public int IdSuratMasuk { get; set; }
        public int IdUser { get; set; }
        public string Pengirim { get; set; }
        public string Penerima { get; set; }
        public string Perihal { get; set; }
        public string Tipe { get; set; }
        public DateTime WaktuMasuk { get; set; }
        public string AlamatFile { get; set; }
    }
}