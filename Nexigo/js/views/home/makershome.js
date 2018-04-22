nexigo.widget({
  text: 'HOME',
  toolbar: [
    {
      text: 'Profile',
      action: 'goToProfile'
    },
    {
      text: 'Sign Out',
      action: 'signOut'
    }
  ],
  views: [
    {
      text: 'Undefined',
      type: 'fieldRow',
      name: 'undefinedRow',
      fields: [
        {
          name: 'undefined',
          text: 'Text',
          type: 'text'
        }
      ]
    },
    {
      type: 'fieldRow',
      fields: [
        {
          type: 'button',
          text: 'Hide Row',
          action: 'hideRow',
        },
        {
          type: 'button',
          text: 'Show Row',
          action: 'showRow',
        }
      ]
    },

    {
      type: 'panel',
      inline: true,
      text: 'Panel',
      fields: [
        {
          name: 'inline',
          text: 'Inline Text',
          type: 'text',
        }
      ]
    },

    {
      type: 'panel',
      text: 'Grid Panel',
      fields:[
        {
          type: 'grid',
          text: 'Grid',
          name: 'gridCustomer',
          dblClick: 'doubleClick',
          fields: [
            {
              name: 'Name',
              text: 'Nama',
              type: 'text',
            },
            {
              name: 'Address',
              text: 'Alamat',
              type: 'text',
            }
          ],
          url: 'http://localhost:31602/api/Example/GetGridData',
          //data: [
          //  {
          //    Name: 'Alfa',
          //    Address: 'Jalan-jalan'
          //  },
          //  {
          //    Name: 'Indo',
          //    Address: 'Kuda-kuda'
          //  }
          //]
        },
        {
          type: 'button',
          text: 'Hide',
          action: 'hideGrid'
        },
        {
          type: 'button',
          text: 'Show',
          action: 'showGrid'
        }
      ]
    },

    {
      type: 'fieldRow',
      fields: [
        {
          name: 'dropdown',
          text: 'Select Media',
          type: 'select',
          cols: 6,
          tooltip: 'Media list',
          //data: 'http://localhost:31602/api/Example/GetDropdownList',
          data: [
            {
              value: 'value1',
              text: 'text1'
            },
            {
              value: 'value2',
              text: 'text2'
            }
          ],
          onChange: function (val, text) {
            alert('changed to val: ' + val + ', text: ' + text);
          }
        }
      ]
    }
  ],
  functions: {
    init: function () {
      xg.ajax({
        url: 'http://localhost:31602/api/Example/GetText',
        type: 'GET',
        data: 'text'
      }).done(function (resp, status, xhr) {
        //console.log('resp', resp, 'status', status, 'xhr', xhr);
        xg.populate({
          undefined: resp
        })
      }).fail(function (err) {
        console.error(err);
      });      
    },
    goToProfile: function () {

    },
    signOut: function () {

    },
    doubleClick: function(row){
      alert(row);
    },
    hideGrid: function () {
      $('[xg-field="gridCustomer"]').hide();
    },
    showGrid: function () {
      $('[xg-field="gridCustomer"]').show();
    },
    hideRow: function () {
      xg.hideRow('undefinedRow');
    },
    showRow: function () {
      xg.showRow('undefinedRow');
    }
  }
});