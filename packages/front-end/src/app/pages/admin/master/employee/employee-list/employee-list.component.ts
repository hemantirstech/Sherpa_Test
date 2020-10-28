import { Component, OnInit } from '@angular/core';
import { Logger } from '@app/@core';
import { employeeUser } from '../employee.model';
import { employeeService } from '../employee.service';

const log = new Logger('Contact Component');

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  bdpList: employeeUser[];

  constructor(private empService: employeeService) {}

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Home' }, { label: 'Contacts', active: true }];

    this._fetchData();

    console.log('this is bdp list' + this.bdpList);
  }

  // Fetch data form JSON/Server
  private _fetchData() {
    this._getContacts();
  }

  private _getContacts() {
    const filters = new Map();

    this.empService.getAll(filters).subscribe(
      (data) => {
        this.bdpList = data;
        console.log('this is bdp list via data' + data);
      },
      (error: string) => {
        log.error('contacts:', error);
      }
    );
    console.log('this is bdp list' + this.bdpList);
  }
}
