import { Component, OnInit } from '@angular/core';
import { Logger } from '@app/@core';
import { SalesLeadContactService } from '@app/@core/services/sales-lead-contact.service';
import { SalesLeadService } from '@app/@core/services/sales-lead.service';
import { UserService } from '@app/@core/services/user.service';
import { SalesLead } from '@app/pages/sales/salesLead.model';
import { SalesLeadContact } from '@app/pages/sales/salesLeadContact.model';
import { Users } from '../../sales/default.model';
import Swal from 'sweetalert2';

import { kanbanList } from './data';

import { Kanban } from './kanban.model';

const pluck = (key: string | number) => {
  // Pass Key and Array/Object
  return (array: any[]) => {
    return Array.from(new Set(array.map((obj) => obj[key])));
  };
};

const log = new Logger('app-kanbanboard');

@Component({
  selector: 'app-kanbanboard',
  templateUrl: './kanbanboard.component.html',
  styleUrls: ['./kanbanboard.component.scss'],
})

/**
 * Kanbanboard Component
 */
export class KanbanboardComponent implements OnInit {
  contactedTasks: SalesLead[];
  interestedTasks: SalesLead[];
  inprogressTasks: SalesLead[];
  managedBy: Kanban[];
  usersArray: Users[];
  salesLeadContactData: SalesLeadContact[];
  salesLeadData: SalesLead[];

  kanbanModel: any = {};

  // bread crumb items
  breadCrumbItems: Array<{}>;

  constructor(
    private userService: UserService,
    private salesLeadService: SalesLeadService,
    private salesLeadContactService: SalesLeadContactService
  ) {}

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Kanban' }, { label: 'Kanban Board', active: true }];

    this._fetchData();
  }

  // Pass the name to get the joined intials
  getNameInitials(name: string) {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('');
  }

  filterResults(query: any) {
    log.debug('filterResults: ', this.kanbanModel);
    if (query != null) {
      this.contactedTasks = this.salesLeadData.filter((t) => t.salesLeadContact.name.toLowerCase().indexOf(query) > -1);
      this.interestedTasks = this.salesLeadData.filter(
        (t) => t.salesLeadContact.name.toLowerCase().indexOf(query) > -1
      );
      this.inprogressTasks = this.salesLeadData.filter(
        (t) => t.salesLeadContact.name.toLowerCase().indexOf(query) > -1
      );
    } else {
      log.debug('filterResults: is null -- ', query);
      this._fetchData();
    }
  }

  private _fetchData() {
    // all kanban list
    //this.contactedTasks = kanbanList.filter((t) => t.status === 'contacted');
    //this.interestedTasks = kanbanList.filter((t) => t.status === 'interested');
    //this.inprogressTasks = kanbanList.filter((t) => t.status === 'inprogress');
    this.managedBy = pluck('managed_by')(kanbanList);
    this.getUsers();
    this.getSalesLeadsByStage();
  }
  getUsers() {
    this.userService.getUsers().subscribe(
      (userArray: any) => {
        this.usersArray = userArray;
      },
      (error: any) => {}
    );
  }
  getSalesLeadsByStage() {
    this.salesLeadService.getAllLeads().subscribe(
      (salesLeadData: SalesLead[]) => {
        this.getSalesLeadsContacts(salesLeadData);
      },
      (error: any) => {}
    );
  }
  getSalesLeadsContacts(salesLeadData) {
    this.salesLeadContactService.getAll().subscribe(
      (salesLeadContactData: SalesLeadContact[]) => {
        this.salesLeadContactData = salesLeadContactData;
        this.mixRelayionalData(salesLeadData, salesLeadContactData);
      },
      (error: any) => {}
    );
  }
  mixRelayionalData(salesLeadData, salesLeadContactData) {
    for (const index in salesLeadData) {
      for (const leadContact of salesLeadContactData) {
        if (parseInt(salesLeadData[index].leadContactId) === leadContact.id) {
          salesLeadData[index].salesLeadContact = leadContact;
        }
      }
    }
    //this.service.tableDataInput = salesLeadData; //Set data for table\

    this.salesLeadData = salesLeadData;
    this.contactedTasks = salesLeadData.filter((t) => t.leadStatus === 1);
    this.interestedTasks = salesLeadData.filter((t) => t.leadStatus === 2);
    this.inprogressTasks = salesLeadData.filter((t) => t.leadStatus === 3);
  }

  getUserName(id: number) {
    if (this.usersArray) {
      return this.usersArray.find((x) => x.id.toString() === id.toString()).username;
    }
  }

  deleteLead(id: number, leadContactId: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ml-2',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: 'Delete Lead?',
        icon: 'warning',
        confirmButtonText: 'Change',
        cancelButtonText: 'No, cancel!',
        showCancelButton: true,
      })
      .then((result) => {
        if (result.value) {
          const leadUpdateSubmit$ = this.salesLeadService.deleteLeadById(id);
          leadUpdateSubmit$.subscribe(
            (data: any) => {
              console.log();
              //swalWithBootstrapButtons.fire('Success!', 'Lead deleted successfully.', 'success');
              //this.router.navigate(['/sales/lead-details/' + this.id]);
              const leadContactDelete$ = this.salesLeadContactService.delete(leadContactId);
              leadContactDelete$.subscribe(
                (data: any) => {
                  swalWithBootstrapButtons.fire('Success!', 'Lead deleted successfully.', 'success');
                  //this.router.navigate(['/sales/lead-details/' + this.id]);
                  this.getSalesLeadsByStage();
                },
                (error: any) => {
                  //swalWithBootstrapButtons.fire('Warning', 'Lead not deleted', 'error');
                }
              );
            },
            (error: any) => {
              swalWithBootstrapButtons.fire('Warning', 'Lead not deleted', 'error');
            }
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire('Cancelled', 'Lead not deleted', 'error');
        }
      });
  }
}
