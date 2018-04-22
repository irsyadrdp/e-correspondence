xg.widget({
    text: 'BIODATA',
    views: [{
        fields: [
            { name: 'Id', text: 'Id', cols: 5, hide: true, },
            { name: 'Username', text: 'Usename', cols: 5, required: true, },
            { name: 'Firstname', text: 'Firstname', cols: 5, required: true, },
            { name: 'Lastname', text: 'Lastname', cols: 5, required: true, },
            { name: 'Password', text: 'Password', type: 'password', cols: 5, required: true, },
            {
                type: 'buttons',
                buttons: [
                    { name: 'save', text: 'Create', icon: 'fa-save', cssClass: 'xg-btn-info', action: 'save' },
                    { name: 'update', text: 'Update', icon: 'fa-save', cssClass: 'xg-btn-success', action: 'update' },
                ]
            },
            {
                type: 'panel',
                text: 'List Biodata',
                fields: [
                    {
                        type: 'grid',
                        text: 'Table',
                        name: 'gridCustomer',
                        onDblClick: 'doubleClick',
                        options: {
                            sortable: false,
                            editable: false,
                            filterable: true,
                            pageable: true,
                            selectable: 'single',
                        },
                        data: [
                            {
                                Id: '0',
                                Username: 'asd',
                                Firstname: "ASD1",
                                Lastname: 'Jalan-jalan',
                                Password: 'Alfa', 
                            },
                            {
                                Firstname: "ASD1",
                                Lastname: 'Jalan-jalan',
                            }
                        ],
                        //url: 'http://localhost:31602/api/CRUD/ReadAll',
                        fields: [
                            {
                                name: 'Id',
                                text: 'Id',
                                type: 'text',
                            },
                            {
                                name: 'Username',
                                text: 'Username',
                                type: 'text',
                            },
                            {
                                name: 'Firstname',
                                text: 'Firstname',
                                type: 'text',
                            },
                            {
                                name: 'Lastname',
                                text: 'Lastname',
                                type: 'text',
                            },
                            {
                                name: 'Password',
                                text: 'Password',
                                type: 'password',
                                //hide: 'true',
                                icon: 'fa-key',
                            },
                            {
                                name: 'Update',
                                text: 'Update',
                                template: '<button onclick="xg.call(\'edit\', #:Id#)">Edit</button>',
                            },
                            {
                                name: 'Delete',
                                text: 'Delete',
                                template: '<button onclick="xg.call(\'delete\', #:Id#)">Delete</button>',
                            },

                        ],
                    }
                ]
            },
        ]
    }],
    functions: {
        init: function (xg, cb) {
            cb()
        },

        save: function () {
            var ser = xg.serialize()
            var data = {
                Username: ser.Username,
                Firstname: ser.Firstname,
                Lastname: ser.Lastname,
                Password: ser.Password
            };

            xg.ajax({
                url: 'http://localhost:31602/api/CRUD/Create',
                method: 'POST',
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    xg.grid.refresh('gridCustomer');
                    console.log(result);
                },
                error: function (err) {
                    console.log(err);
                },
                complete: function () {
                    console.log("complete");
                }
            });
            xg.call('populateData');
            //console.log(data)
        },
        
        delete: function (Id) {
            console.log(Id)
            xg.ajax({
                url: 'http://localhost:31602/api/CRUD/DeleteData?Id=' + Id,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    xg.grid.refresh('gridCustomer');
                },
                complete: function () {
                    console.log("complete");
                }
            });
        },

        edit: function (Id) {
            console.log(Id)
            var data = xg.grid.getAllRow('gridCustomer');
            for (var i = 0; i < data.length ; i++) {
                if (data[i].Id === Id) {
                    xg.populate(data[i]);                }
            }
        },
        update: function () {
            var ser = xg.serialize();
            var data = {
                Id: ser.Id,
                Username: ser.Username,
                Firstname: ser.Firstname,
                Lastname: ser.Lastname,
                Password: ser.Password
            };
            console.log(data)
            xg.ajax({
                url: 'http://localhost:31602/api/CRUD/UpdateData',
                type: 'POST',
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    xg.grid.refresh('gridCustomer');
                    console.log("sukses");
                },
                complete: function () {
                    console.log("complete");
                }
            });
        },

        populateData: function () {
            var data = {
                Username: '',
                Firstname: '',
                Lastname: '',
                Password: ''
            };
            xg.populate(data);
        }
    }
})