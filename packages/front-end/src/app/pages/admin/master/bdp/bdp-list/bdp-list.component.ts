import { Component, OnInit } from '@angular/core';
import { Logger } from '@app/@core';
import { bdpUser } from '../bdp.model';
import { BdpService } from '../bdp.service';

const log = new Logger('Contact Component');

@Component({
  selector: 'app-bdp-list',
  templateUrl: './bdp-list.component.html',
  styleUrls: ['./bdp-list.component.scss'],
})
export class BdpListComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  bdpList: bdpUser[];

  constructor(private bdpService: BdpService) {}

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

    this.bdpService.getAll(filters).subscribe(
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
