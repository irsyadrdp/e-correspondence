﻿using System;
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
    public class GetReadUser
    {
        public List<UserModel> data { get; set; }
        public int total { get; set; }
    }
    public class LoginData
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
    public class dataSelect
    {
        public int value { get; set; }
        public string text { get; set; }
    }

    public class getDivDir {
        public int IdDivisi { get; set; }
        public string KodeDivisi { get; set; }
        public string NamaDirektorat {get; set;}
    }

    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UserController : ApiController
    {
        //connect to db data context
        private CRUDDataContext context = null;
        public UserController()
        {
            context = new CRUDDataContext();
        }

        //get all user data
        [HttpPost]
        public GetReadUser ReadAll()
        {
            var query = from UserData in context.user_tables
                        select new UserModel
                        {
                            IdUser = UserData.id_user,
                            NamaUser = UserData.nama_user,
                            EmailUser = UserData.email_user,
                            Token = UserData.token,
                            Role = UserData.role,
                            IdDivisi = UserData.id_divisi
                        };

            GetReadUser getdata = new GetReadUser
            {
                data = query.ToList(),
                total = query.ToList().Count
            };

            return getdata;
        }

        //get all user data by role
        [HttpPost]
        public List<dataSelect> ReadAllByRole(string Role)
        {
            var query = from UserData in context.user_tables
                        where UserData.role == Role
                        select new dataSelect
                        {
                            value = UserData.id_user,
                            text = UserData.nama_user,
                        };

            List<dataSelect> data = query.ToList();

            return data;
        }

        //get all user data 
        [HttpPost]
        public List<dataSelect> GetPenerima()
        {
            var query = from UserData in context.user_tables
                        select new dataSelect
                        {
                            value = UserData.id_user,
                            text = UserData.nama_user,
                        };

            List<dataSelect> data = query.ToList();

            return data;
        }

        //login process
        [HttpPost]
        public IHttpActionResult Login([FromBody] LoginData req)
        {
            try
            {
                if (req != null)
                {
                    using (var db = new CRUDDataContext())
                    {
                        var user = db.user_tables.SingleOrDefault(x => x.email_user == req.Email);

                        if (user == null)
                        {
                            var res = "User dengan email tersebut tidak ditemukan";
                            return Ok(res);
                        }

                        if (user.password == req.Password)
                        {
                            var query = from UserData in context.user_tables
                                        where UserData.email_user == req.Email && UserData.password == req.Password
                                        select new UserModel
                                        {
                                            IdUser = UserData.id_user,
                                            NamaUser = UserData.nama_user,
                                            EmailUser = UserData.email_user,
                                            Token = UserData.token,
                                            Role = UserData.role
                                        };

                            GetReadUser getdata = new GetReadUser
                            {
                                data = query.ToList(),
                                total = query.ToList().Count
                            };
                            
                            return Ok(getdata);
                        }
                        else
                        {
                            var res = "Password salah";
                            return Ok(res);
                        }

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

        //get nama_user by id
        [HttpPost]
        public string getName(int Id)
        {
            string item = (from UserData in context.user_tables
                           where UserData.id_user == Id
                           select UserData.nama_user).Single();
            return item;
        }

        //get user id_divisi
        [HttpPost]
        public IHttpActionResult getDivisi(int Id)
        {
            int idDivisi = (from UserData in context.user_tables
                                   where UserData.id_user == Id
                                   select UserData.id_divisi).Single();

            OrganisasiController organisasi = new OrganisasiController();
            string kodeDivisi = organisasi.getKodeDivisi(idDivisi);
            string namaDirektorat = organisasi.getNamaDirektorat(idDivisi);

            getDivDir getdata = new getDivDir
            {
                IdDivisi = idDivisi,
                KodeDivisi = kodeDivisi,
                NamaDirektorat = namaDirektorat,
            };

            return Ok(getdata);
        }

    }
}
