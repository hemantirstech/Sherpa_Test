import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CompanyTypeService } from '@app/@core/services/company-type.service';
import { SalesLeadService } from '@app/@core/services/sales-lead.service';
import { SalesLeadContactService } from '@app/@core/services/sales-lead-contact.service';
import { UserService } from '@app/@core/services/user.service';

import { companyType, leadSourceArray, coutryArray, stateArray, stageStatus } from '../data';
import { Country, CompanyType, Users, Stages, LeadSource } from '../default.model';
import { SalesLead } from '../salesLead.model';
import { SalesLeadContact } from '../salesLeadContact.model';

@Component({
  selector: 'app-create-lead',
  templateUrl: './create-lead.component.html',
  styleUrls: ['./create-lead.component.scss'],
})
export class CreateLeadComponent implements OnInit {
  // bread crum data
  breadCrumbItems: Array<{}>;
  leadForm!: FormGroup;
  companyType: CompanyType[];
  leadSourceArray: LeadSource[];
  coutryArray: Country[];
  stateArray: Array<{}>;
  usersArray: Users[];
  stageStatus: Stages[];
  salesLeadData: SalesLead;
  salesLeadContact: SalesLeadContact;
  id: number;
  pageTitle: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private companyTypeService: CompanyTypeService,
    private userService: UserService,
    private salesLeadService: SalesLeadService,
    private salesLeadContactService: SalesLeadContactService,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Dashboard', path: 'dashboard', redirectTo: '/dashboard' },
      { label: 'Sales', active: true },
    ];
    this._fetchData();
  }

  /**
   * Cart data fetch
   */
  private _fetchData() {
    this.leadSourceArray = leadSourceArray;
    this.coutryArray = coutryArray;
    this.stateArray = stateArray;
    this.stageStatus = stageStatus;
    this.getUsers();
    this.getComapnyTypes();
    this.pageTitle = 'CREATE A NEW LEAD';
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    debugger;
    if (this.id) {
      this.pageTitle = 'UPDATE LEAD';
      //GetData
      this.getSalesLeadById(this.id);
    }
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
        this.createForm1();
      },
      (error: any) => {}
    );
  }

  private createForm() {
    this.leadForm = this.formBuilder.group({
      companyName: ['', [Validators.required]],
      companyType: ['', [Validators.required]],
      contactNo: [''],
      email: [''],
      fax: [''],
      address: [''],
      city: [''],
      state: [''],
      contry: [''],
      zipCode: [''],
      leadStatus: [''],
      labels: [''],
      assigneeId: ['', [Validators.required]],
      salesOwner: [''],
      leadSource: [''],
      leadReference: [null],
      leadContactId: [''],
      leadContactGroup: this.formBuilder.group({
        name: [''],
        primaryEmail: [''],
        mobileNumber: [''],
        alternateNumber: [''],
        designation: [''],
        notes: [''],
      }),
    });
  }
  private createForm1() {
    this.leadForm = this.formBuilder.group({
      ...this.salesLeadData,
      leadContactGroup: this.formBuilder.group({
        ...this.salesLeadContact,
      }),
    });
  }
  submitData() {
    const leadContactGroup = this.leadForm.value.leadContactGroup;
    //ParseInt
    this.leadForm.value.assigneeId = parseInt(this.leadForm.value.assigneeId);
    this.leadForm.value.companyType = parseInt(this.leadForm.value.companyType);
    this.leadForm.value.leadStatus = parseInt(this.leadForm.value.leadStatus);
    this.leadForm.value.leadSource = parseInt(this.leadForm.value.leadSource);
    this.leadForm.value.leadReference = this.leadForm.value.leadReference
      ? parseInt(this.leadForm.value.leadReference)
      : this.leadForm.value.leadReference;
    Object.keys(this.leadForm.value).forEach(
      (key) => this.leadForm.value[key] == null && delete this.leadForm.value[key]
    );
    delete this.leadForm.value.leadContactGroup;
    console.log('Your form data : ', leadContactGroup);
    console.log('Your form data : ', this.leadForm.value);

    let leadContactSubmit$;
    if (this.id) {
      //Update service call
      Object.keys(leadContactGroup).forEach((key) => leadContactGroup[key] == null && delete leadContactGroup[key]);
      leadContactSubmit$ = this.salesLeadContactService.update(this.id, leadContactGroup);
    } else {
      //Create new lead
      leadContactSubmit$ = this.salesLeadContactService.create(leadContactGroup);
    }
    leadContactSubmit$.subscribe(
      (data: any) => {
        console.log('Lead Contact saved successfully');
        //Submit Lead details
        let leadSubmit$;
        if (this.id) {
          //Update service call
          this.leadForm.value.leadContactId = parseInt(this.leadForm.value.leadContactId);
          leadSubmit$ = this.salesLeadService.updateLeadById(this.id, this.leadForm.value);
        } else {
          //Create new lead
          this.leadForm.value.leadContactId = data.id;
          leadSubmit$ = this.salesLeadService.createNewLead(this.leadForm.value);
        }
        leadSubmit$.subscribe(
          (data: any) => {
            console.log('Lead saved successfully');
            this.router.navigate(['/sales-board']);
          },
          (error: any) => {
            console.log(`Create Lead error: ${error}`, error);
          }
        );
      },
      (error: any) => {
        console.log(`Login error: ${error}`, error);
      }
    );
  }
  cancelForm() {
    this.router.navigate(['/sales-board']);
  }
}
