var db = {
    menu: [

        {//home
            text: '<img src="assets/img/logo2.png" width="50px" style="margin-top:15px; margin-left:20px;">',
            link: 'home'
        },

        {//inbox
            text: 'Kotak Masuk',
            icon: 'fa fa-folder',
            link: 'kotak_masuk/kotak_masuk',
            clas: 'KOTAKMASUK',
        },

        {//surat masuk
          text: 'Surat Masuk',
          icon: 'fa fa-file-text-o',
          clas: 'SURATMASUK',
          menus: [
              {
                  link: 'surat_masuk/buat_surat_masuk',
                  text: 'Input Surat Masuk Baru',
                  icon: 'fa fa-genderless',
              }, {
                  link: 'surat_masuk/draft',
                  text: 'Draft',
                  icon: 'fa fa-genderless',
              }, {
                  link: 'surat_masuk/archive',
                  text: 'Arsip',
                  icon: 'fa fa-genderless',
              }
          ]
        },
        
        {//surat keluar konseptor
            text: 'Surat Keluar [k]',
            icon: 'fa fa-file-text-o',
            clas: 'SK_Konseptor',
            menus: [
                {
                    link: 'surat_keluar/buat_surat_keluar',
                    text: 'Buat Surat Keluar',
                    icon: 'fa fa-genderless',
                }, {
                    link: 'surat_keluar/pending',
                    text: 'Pending',
                    icon: 'fa fa-genderless',
                }, {
                    link: 'surat_keluar/draft',
                    text: 'Draft',
                    icon: 'fa fa-genderless',
                }, {
                    link: 'surat_keluar/revisi',
                    text: 'Revisi',
                    icon: 'fa fa-genderless',
                }, {
                    link: 'surat_keluar/archive',
                    text: 'Arsip',
                    icon: 'fa fa-genderless',
                },
            ]
        },

        {//Memorandum konseptor
            text: 'Memorandum [k]',
            icon: 'fa fa-file-o',
            clas: 'M_Konseptor',
            menus: [
                {
                    link: 'memorandum/buat_memorandum',
                    text: 'Buat Memorandum',
                    icon: 'fa fa-genderless',
                }, {
                    link: 'memorandum/pending',
                    text: 'Pending',
                    icon: 'fa fa-genderless',
                }, {
                    link: 'memorandum/draft',
                    text: 'Draft',
                    icon: 'fa fa-genderless',
                }, {
                    link: 'memorandum/revisi',
                    text: 'Revisi',
                    icon: 'fa fa-genderless',
                }, {
                    link: 'memorandum/archive',
                    text: 'Arsip',
                    icon: 'fa fa-genderless',
                },
            ]
        },



        {//surat keluar reviewer
            text: 'Surat Keluar [r]',
            icon: 'fa fa-file-text-o',
            clas: 'SK_Reviewer',
            menus: [
                {
                    link: 'surat_keluar/review_surat_keluar',
                    text: 'Review Surat Keluar',
                    icon: 'fa fa-genderless',
                }, {
                    link: 'surat_keluar/reviewed',
                    text: 'Reviewed',
                    icon: 'fa fa-genderless',
                }, {
                    link: 'surat_keluar/revised',
                    text: 'Revised',
                    icon: 'fa fa-genderless',
                }, {
                    link: 'surat_keluar/archive',
                    text: 'Arsip',
                    icon: 'fa fa-genderless',
                },
            ]
        },

        {//Memorandum reviewer
            text: 'Memorandum [r]',
            icon: 'fa fa-file-o',
            clas: 'M_Reviewer',
            menus: [
                {
                    link: 'memorandum/review_memorandum',
                    text: 'Review Memorandum',
                    icon: 'fa fa-genderless',
                }, {
                    link: 'memorandum/reviewed',
                    text: 'Reviewed',
                    icon: 'fa fa-genderless',
                }, {
                    link: 'memorandum/revised',
                    text: 'Revised',
                    icon: 'fa fa-genderless',
                }, {
                    link: 'memorandum/archive',
                    text: 'Arsip',
                    icon: 'fa fa-genderless',
                },
            ]
        },


        {//surat keluar approver
            text: 'Surat Keluar [a]',
            icon: 'fa fa-file-text-o',
            clas: 'SK_Approver',
            menus: [
                {
                    link: 'surat_keluar/approve_surat_keluar',
                    text: 'Approve Surat Keluar',
                    icon: 'fa fa-genderless',
                }, {
                    link: 'surat_keluar/archive',
                    text: 'Arsip',
                    icon: 'fa fa-genderless',
                },
            ]
        },

        {//Memorandum approver
            text: 'Memorandum [a]',
            icon: 'fa fa-file-o',
            clas: 'M_Approver',
            menus: [
                {
                    link: 'memorandum/approve_memorandum',
                    text: 'Approve Surat Keluar',
                    icon: 'fa fa-genderless',
                }, {
                    link: 'memorandum/archive',
                    text: 'Arsip',
                    icon: 'fa fa-genderless',
                },
            ]
        },


        {//logout
            text: '<span style="color:#292F33;">LOGOUT</span>',
            icon: 'fa fa-sign-out',
            link: 'logout',
            clas: 'LOGOUT'
        },












        //{//biodata
        //    text: 'Biodata',
        //    icon: 'fa fa-user',
        //    link: 'home/biodata2',
        //    clas: 'biodata'
        //},

        //{
        //  text: 'Layout',
        //  icon: 'fa-columns',
        //  menus: [
        //      {
        //        link: 'demo/panel',
        //        text: 'Panel'
        //      }
        //  ]
        //},
        
        //{
        //  text: 'Text',
        //  icon: 'fa-edit',
        //  menus: [
        //      {
        //        link: 'demo/text',
        //        text: 'Text Input'
        //      }, {
        //        link: 'demo/email',
        //        text: 'Text Email'
        //      }, {
        //        link: 'demo/password',
        //        text: 'Text Password'
        //      }, {
        //        link: 'demo/textarea',
        //        text: 'Text Area'
        //      }, {
        //        link: 'demo/numeric',
        //        text: 'Text Numeric'
        //      }, {
        //        link: 'demo/tooltip',
        //        text: 'Text Tooltip and Info'
        //      }
        //  ]
        //}, {
        //  text: 'Picker',
        //  icon: 'fa-calendar',
        //  menus: [
        //      {
        //        link: 'demo/datepicker',
        //        text: 'Datepicker'
        //      }
        //  ]
        //}, {
        //  text: 'Check & Radio',
        //  icon: 'fa-check',
        //  menus: [
        //      {
        //        link: 'demo/checkbox',
        //        text: 'Checkbox'
        //      }, {
        //        link: 'demo/radio',
        //        text: 'Radio'
        //      }
        //  ]
        //}, {
        //  text: 'Collection',
        //  icon: 'fa-list',
        //  menus: [
        //      {
        //        link: 'demo/select',
        //        text: 'Select'
        //      }, {
        //        link: 'demo/list',
        //        text: 'List'
        //      }, {
        //        link: 'demo/autocomplete',
        //        text: 'Auto Complete'
        //      }
        //  ]
        //}, {
        //  text: 'Grid',
        //  icon: 'fa-table',
        //  menus: [
        //      {
        //        link: 'demo/grid/grid_basic',
        //        text: 'Basic'
        //      },
        //      {
        //        link: 'demo/grid/table',
        //        text: 'Table'
        //      }
        //  ]
        //}, {
        //  text: 'Tools',
        //  icon: 'fa-wrench',
        //  menus: [
        //      {
        //        link: 'demo/popup',
        //        text: 'Modal popup'
        //      }, {
        //        link: 'demo/dialog',
        //        text: 'Message Dialog'
        //      }, {
        //        link: 'demo/content',
        //        text: 'Hide Show Content'
        //      }, {
        //        link: 'demo/tab',
        //        text: 'Tab'
        //      }, {
        //        link: 'demo/toolbar',
        //        text: 'Toolbar'
        //      },
        //      {
        //        link: 'demo/file',
        //        text: 'File Upload'
        //      }, {
        //        link: 'demo/approvalflow',
        //        text: 'Approval Flow'
        //      }
        //  ]
        //}, {
        //  text: 'Labs',
        //  icon: 'fa-edit',
        //  menus: [
        //      {
        //        link: 'demo/labs/lab1',
        //        text: 'Lab 01'
        //      }, {
        //        link: 'demo/labs/lab2',
        //        text: 'Lab 02'
        //      }, {
        //        link: 'demo/labs/lab3',
        //        text: 'Lab 03'
        //      }, {
        //        link: 'demo/labs/lab4',
        //        text: 'Lab 04'
        //      }
        //  ]
        //},


        //{
        //    link: 'showcode',
        //    hidelink: true,
        //    text: 'Show Code',
        //    //clas: 'right',
        //    icon: 'fa-code'
        //}
  ]
};

(function () {
  nexigo.config.widgetView = '[data-name=content]';
  nexigo.config.toolbarView = '#side-toolbar';
  nexigo.config.kendolibbase = 'libs/kendo/';
  nexigo.config.viewBasePath = '';
  nexigo.config.viewDefault = 'home';
  nexigo.config.errorMessage = {
    required: 'This Field Cannot be Empty'
  };
  nexigo.menu('[class="sg-header-menu"]',
  {
    theme: 'ccai',
    data: db.menu,
    onClick: function (name, link) {
      if (link === 'showcode') {
        var url = window.location.hash.substr(1) || 'text';
        $("#code-title").html("");
        $('.content-editor-wrapper').show();
        $.ajax({
          url: 'js/views/' + url + '.js',
          success: function (r) {
            $('#code-title').html(url);
            ace.edit('code-editor').getSession().setValue(r);
          },
          error: function (r, errStatus) {
            if (errStatus === 'parsererror') { //ignore javascript parse error
              $('#code-title').html(url);
              ace.edit('code-editor').getSession().setValue(r.responseText);
            }
          }
        });
      } else {
        xg.navigate(link);
      }
    }
  });

  nexigo.loading
      .template =
      '<div class="ccai-loading"><div class="spinner"><img class="logo"  src="images/spinner-logo.png"/></div></div>';

  nexigo.on('widgetInit',
      function (a) {
        nexigo.extension.navigator.init('#side-navigation');
        $('.m-toolbar-icon').off();
        $('.m-toolbar-icon, .xg-toolbar').removeClass('active');
        $('.m-toolbar-icon')
            .on('click',
                function () {
                  $('.m-toolbar-icon, .xg-toolbar').toggleClass('active');
                });
        $('.xg-toolbar button')
            .on('click',
                function () {
                  $('.m-toolbar-icon, .xg-toolbar').removeClass('active');
                });
      });

  var url = window.location.hash.substr(1) || nexigo.config.viewDefault || 'home';
  //if (url !== 'showcode') {
  //    if (window.location.hash.substr(1) === url) xg.loadPage(url);
  //    else xg.navigate(url);
  //};

}());