import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import Swal from 'sweetalert2';
import { Table } from '../sales-board/advanced.model';
import { tableData } from '../sales-board/data';
import { stageStatusDisplay } from '../sales/data';
import { AdvancedService } from '../sales-board/advanced.service';

import { CompanyTypeService } from '@app/@core/services/company-type.service';
import { SalesLeadService } from '@app/@core/services/sales-lead.service';
import { SalesLeadContactService } from '@app/@core/services/sales-lead-contact.service';
import { UserService } from '@app/@core/services/user.service';

import { CompanyType, Users } from '../sales/default.model';
import { SalesLead } from '../sales/salesLead.model';
import { SalesLeadContact } from '../sales/salesLeadContact.model';

@Component({
  selector: 'app-sales-board',
  templateUrl: './sales-board.component.html',
  styleUrls: ['./sales-board.component.scss'],
  providers: [AdvancedService, DecimalPipe],
})
export class SalesBoardComponent implements OnInit {
  // bread crum data
  breadCrumbItems: Array<{}>;
  // Table data
  tableData: Table[];
  public selected: any;
  hideme: boolean[] = [];
  tables$: Observable<SalesLead[]>;
  total$: Observable<number>;
  public isCollapsed = true;
  usersArray: Users[];
  companyType: CompanyType[];
  stage: number;
  salesLeadData: SalesLead[];
  salesLeadContactData: SalesLeadContact[];
  stageStatusDisplay: string[];

  constructor(
    public service: AdvancedService,
    private companyTypeService: CompanyTypeService,
    private userService: UserService,
    private salesLeadService: SalesLeadService,
    private salesLeadContactService: SalesLeadContactService
  ) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Dashboard', path: 'dashboard', redirectTo: '/dashboard' },
      { label: 'Sales', active: true },
    ];
    this.service.tableDataInput = []; //Set data for table\
    this._fetchData();
  }

  changeValue(i: any) {
    this.hideme[i] = !this.hideme[i];
  }
  /**
   * fetches the table value
   */
  async _fetchData() {
    this.stage = 5;
    //this.getComapnyTypes();
    this.stageStatusDisplay = stageStatusDisplay;
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
  getComapnyTypes() {
    this.companyTypeService.getAll().subscribe(
      (companyTypes: any) => {
        this.companyType = companyTypes;
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
    // const tableDataFilter = tableData.filter(function (table) {
    //   return table.stage === 'Interested';
    // });
    this.service.tableDataInput = salesLeadData; //Set data for table\

    this.salesLeadData = salesLeadData;
    console.log(salesLeadData);
  }
  getNameInitials(name: string) {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('');
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
