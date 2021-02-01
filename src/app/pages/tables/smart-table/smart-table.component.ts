import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/data/smart-table';


@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class SmartTableComponent {


  // settings = {
  //   add: {
  //     addButtonContent: '<i class="nb-plus"></i>',
  //     createButtonContent: '<i class="nb-checkmark"></i>',
  //     cancelButtonContent: '<i class="nb-close"></i>',
  //   },
  //   edit: {
  //     editButtonContent: '<i class="nb-edit"></i>',
  //     saveButtonContent: '<i class="nb-checkmark"></i>',
  //     cancelButtonContent: '<i class="nb-close"></i>',
  //   },
  //   delete: {
  //     deleteButtonContent: '<i class="nb-trash"></i>',
  //     confirmDelete: true,
  //   },
  //   columns: {
  //     id: {
  //       title: 'ID',
  //       type: 'number',
  //     },
  //     firstName: {
  //       title: 'First Name',
  //       type: 'string',
  //     },
  //     lastName: {
  //       title: 'Last Name',
  //       type: 'string',
  //     },
  //     username: {
  //       title: 'Username',
  //       type: 'string',
  //     },
  //     email: {
  //       title: 'E-mail',
  //       type: 'string',
  //     },
  //     age: {
  //       title: 'Age',
  //       type: 'number',
  //     },
  //   },
  // };

  data = [
    {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret'
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette'
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      username: 'Samantha'
    },
    {
      id: 4,
      name: 'Patricia Lebsack',
      username: 'Karianne'
    },
  ];



  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number'
      },
      name: {
        title: 'First Name',
        type: 'string',
      },
      username: {
        title: 'User Name',
        type: 'string',
      },
      link: {
        filter: false,
        title: 'Link',
        type: 'html',
      }
    }
  };

  addLink() {
    for (let index = 0; index < this.data.length; index++) {
      const element = this.data[index];
      element['link'] = `<a href="http://www.google.com/${element.id}">More</a>`;
    }
  }


  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData) {
    // const data = this.service.getData();
    this.addLink();
    console.log(this.data);
    this.source.load(this.data);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
