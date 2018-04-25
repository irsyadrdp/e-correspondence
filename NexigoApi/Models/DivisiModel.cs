using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NexigoApi.Models
{
    public class DivisiModel
    {
        public int IdDivisi { get; set; }
        public int IdDirektorat { get; set; }
        public string KodeDivisi { get; set; }
        public string NamaDivisi { get; set; }
    }
}