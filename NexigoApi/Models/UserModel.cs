using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NexigoApi.Models
{
    public class UserModel
    {
        public int IdUser { get; set; }
        public string NamaUser { get; set; }
        public string EmailUser { get; set; }
        public string Token { get; set; }
        public string Role { get; set; }

        //foreign key
        public int IdDivisi { get; set; }
    }
    
}