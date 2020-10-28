import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { incentiveChartData, stageStatusDisplay } from '../data';

import { CompanyTypeService } from '@app/@core/services/company-type.service';
import { SalesLeadService } from '@app/@core/services/sales-lead.service';
import { SalesLeadContactService } from '@app/@core/services/sales-lead-contact.service';
import { UserService } from '@app/@core/services/user.service';

import { SalesLead } from '../salesLead.model';
import { SalesLeadContact } from '../salesLeadContact.model';
import { ChartType, CompanyType, Stages, Users } from '../default.model';

@Component({
  selector: 'app-lead-details',
  templateUrl: './lead-details.component.html',
  styleUrls: ['./lead-details.component.scss'],
})
export class LeadDetailsComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  dummyData: SalesLead;
  salesLeadContact: SalesLeadContact;
  incentiveChartData: ChartType;
  id: number;
  salesLeadData: SalesLead;
  usersArray: Users[];
  companyType: CompanyType[];
  stageStatus: Stages[];
  public Editor = ClassicEditor;

  timelineCarousel: OwlOptions = {
    items: 1,
    loop: false,
    margin: 0,
    nav: true,
    navText: ["<i class='mdi mdi-chevron-left'></i>", "<i class='mdi mdi-chevron-right'></i>"],
    dots: false,
    responsive: {
      680: {
        items: 4,
      },
    },
  };
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private companyTypeService: CompanyTypeService,
    private userService: UserService,
    private salesLeadService: SalesLeadService,
    private salesLeadContactService: SalesLeadContactService
  ) {}

  ngOnInit() {
    this.breadCrumbItems = [
      { label: 'Dashboard', path: 'dashboard', redirectTo: '/dashboard' },
      { label: 'Sales', active: true },
    ];
    this.salesLeadContact = <SalesLeadContact>{};
    this.salesLeadData = <SalesLead>{};
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      //GetData
      this._fetchData();
    }
  }
  private _fetchData() {
    this.getUsers();
    this.getComapnyTypes();
    this.getSalesLeadById(this.id);
    //this.dummyData = dummyData;
    //this.salesLeadContact = salesLeadContactData;
    this.incentiveChartData = incentiveChartData;
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
  getSalesLeadById(id: number) {
    this.salesLeadService.getLeadById(id).subscribe(
      (salesLeadData: SalesLead) => {
        //this.getSalesLeadsContacts(salesLeadData);
        this.salesLeadData = salesLeadData;
        this.getSalesLeadContactById(salesLeadData.leadContactId);
      },
      (error: any) => {}
    );
  }
  getSalesLeadContactById(id: number) {
    this.salesLeadContactService.show(id).subscribe(
      (salesLeadContact: SalesLeadContact) => {
        this.salesLeadContact = salesLeadContact;
      },
      (error: any) => {}
    );
  }

  // Pass the name to get the joined intials
  getNameInitials(name: string) {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('');
  }
  getUserName(id: number) {
    return this.usersArray.find((x) => x.id.toString() === id.toString()).username;
  }

  getIncentiveType(id: number) {
    return id === 1 ? 'percentage' : 'fixed amount';
  }
  changeLeadStatus(changeLeadStatus) {
    if (this.salesLeadData.leadStatus >= changeLeadStatus) {
      Swal.fire('Cannot change');
    } else if (changeLeadStatus > 3) {
      Swal.fire('Not available for now');
    } else {
      this.confirm(changeLeadStatus);
    }
  }
  confirm(changeLeadStatus) {
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
        text: 'Change lead status to ' + stageStatusDisplay[changeLeadStatus],
        icon: 'warning',
        confirmButtonText: 'Change',
        cancelButtonText: 'No, cancel!',
        showCancelButton: true,
      })
      .then((result) => {
        if (result.value) {
          this.salesLeadData.assigneeId = parseInt(this.salesLeadData.assigneeId.toString());
          this.salesLeadData.companyType = parseInt(this.salesLeadData.companyType.toString());
          this.salesLeadData.leadStatus = parseInt(this.salesLeadData.leadStatus.toString());
          this.salesLeadData.leadSource = parseInt(this.salesLeadData.leadSource.toString());
          this.salesLeadData.leadContactId = parseInt(this.salesLeadData.leadContactId.toString());

          Object.keys(this.salesLeadData).forEach(
            (key) => this.salesLeadData[key] == null && delete this.salesLeadData[key]
          );
          this.salesLeadData.leadStatus = changeLeadStatus;
          const leadUpdateSubmit$ = this.salesLeadService.updateLeadById(this.id, this.salesLeadData);
          leadUpdateSubmit$.subscribe(
            (data: any) => {
              swalWithBootstrapButtons.fire('Updated!', 'Lead stage changed.', 'success');
              //this.router.navigate(['/sales/lead-details/' + this.id]);
              this.getSalesLeadById(this.id);
            },
            (error: any) => {
              swalWithBootstrapButtons.fire('Warning', 'Lead stage not changed', 'error');
            }
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire('Cancelled', 'Lead stage not changed', 'error');
        }
      });
  }
  deleteLead() {
    console.log('deleteLead');
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
          const leadUpdateSubmit$ = this.salesLeadService.deleteLeadById(this.id);
          leadUpdateSubmit$.subscribe(
            (data: any) => {
              console.log('Lead deleted');
              //swalWithBootstrapButtons.fire('Success!', 'Lead deleted successfully.', 'success');
              //this.router.navigate(['/sales/lead-details/' + this.id]);
              const leadContactDelete$ = this.salesLeadContactService.delete(this.salesLeadContact.id);
              leadContactDelete$.subscribe(
                (data: any) => {
                  swalWithBootstrapButtons.fire('Success!', 'Lead deleted successfully.', 'success');
                  this.router.navigate(['/sales-board']);
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
  getCompanyType(companyType) {
    return this.companyType.find((x) => x.id === companyType).type;
  }
}
