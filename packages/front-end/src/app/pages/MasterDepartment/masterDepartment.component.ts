import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Logger } from '@app/@core';
import * as _ from 'lodash-es';

import { MasterDepartmentService } from './masterDepartment-service';
import { MasterDepartmentUser } from './masterDepartment.model';

const log = new Logger('MasterDepartment Component');

@Component({
  selector: 'app-master-department',
  templateUrl: './masterDepartment.component.html',
  styleUrls: ['./masterDepartment.component.scss'],
})
export class MasterDepartmentComponent implements OnInit {
    // bread crumb items
  breadCrumbItems: Array<{}>;
  
 
    masterDepartments: MasterDepartmentUser[];
  masterDepartmentDetails: any;

  formData: FormGroup;

  // masterDepartment Form submit  
  masterDepartmentSubmit: boolean;

  name: string;
  mobile: string;

  showCreateForm: boolean = false;
  showMessage: boolean = false;
  showMessageDelete: boolean = false;

  
  constructor(public formBuilder: FormBuilder, public masterDepartmentService: MasterDepartmentService) {}


    ngOnInit() {
         this.breadCrumbItems = [{ label: 'Home' }, { label: 'Admin Master Department', active: true }];
    
         this.contactForm();
    
         this._fetchData();
      }

      // Search masterDepartment
      filterMasterDepartment(query: string) {
    if (!query) {
      this._fetchData();
    }

    this.masterDepartments = this.masterDepartments.filter((t) => t.deparmentTitle.toLowerCase().indexOf(query.toLowerCase()) > -1);
  }



  // Create new masterDepartment
  store() {
    const masterDepartmentData = this.formData.value;

    if (masterDepartmentData.masterDeparmentId != '' && masterDepartmentData.masterDeparmentId != null) {
      this.update(masterDepartmentData);
      return true;
    }

    delete masterDepartmentData?.masterDeparmentId;

    // delete masterDepartmentData.mobile;
    // delete masterDepartmentData.alternateMobile;

    this.masterDepartmentService.create(masterDepartmentData).subscribe(
      (response) => {
        log.debug('response: ', response);

        this.masterDepartments.push(response);

        // Set Form Data Reset
        this.formData.reset();

        // Fetch data from api
        this._getContacts();

        this.showCreateForm = false;
        this.showMessage = true;
      },
      (error) => {
        log.error(error);
        log.debug('not Saved', masterDepartmentData);
      }
    );

    setTimeout(() => {
      this.showMessage = false;
    }, 3000);

    this.masterDepartmentSubmit = true;
  }




  
  // Open edit form
  editMasterDepartment(masterDepartmentData: any) {
    this.showCreateForm = true;

    this.formData.patchValue(masterDepartmentData);
  }



 // Update masterDepartment
 update(masterDepartmentData: any) {
  // const masterDepartmentData = this.formData.value;

  // delete masterDepartmentData.mobile;
  // delete masterDepartmentData.alternateMobile;

  this.masterDepartmentService.update(masterDepartmentData.masterDeparmentId, masterDepartmentData).subscribe(
    (response) => {
      log.debug('response: ', response);

      this.masterDepartments.push(response);

      // Set Form Data Reset
      this.formData.reset();

      // Fetch data from api
      this._getContacts();

      this.showCreateForm = false;
      this.showMessage = true;

      setTimeout(() => {
        this.showMessage = false;
      }, 3000);
    },
    (error) => {
      log.error(error);
      log.debug('not updated', masterDepartmentData);
    }
  );

  this.masterDepartmentSubmit = true;
}





  // Show selected masterDepartment details
  showMasterDepartment(masterDeparmentId: number) {
    this.masterDepartmentDetails = _.find(this.masterDepartments, { masterDeparmentId: masterDeparmentId });
  }



  deleteMasterDepartment(masterDepartmentData: any) {
    if (window.confirm('Are you sure to delete?')) {
      this.masterDepartmentService.delete(masterDepartmentData.masterDeparmentId).subscribe((data) => {
        log.info('Contact deleted');
        this.showMessageDelete = true;
        this._fetchData();

        setTimeout(() => {
          this.showMessageDelete = false;
        }, 3000);
      }),
        (error) => {
          this.showMessageDelete = false;
          log.error(error);
        };
    }
  }



  // Returns form
  get cf() {
    return this.formData.controls;
  }



  // masterDepartment Form Builder
  private contactForm() {
    this.formData = this.formBuilder.group({
      masterDeparmentId: ['', [Validators.nullValidator]],
      deparmentTitle: ['', [Validators.required]],
      departmentCode: ['', [Validators.required]],      
      departmentDescription: ['', [Validators.required]],      
    });
  }


  // Fetch data form JSON/Server
  private _fetchData() {
    this._getContacts();
  }



  
  private _getContacts() {
    const filters = new Map();

    this.masterDepartmentService.getAll(filters).subscribe(
      (data) => {
        this.masterDepartments = data;

        // Show first masterDepartment details as per result
        if (this.masterDepartments.length > 0) {
          this.showMasterDepartment(this.masterDepartments[0]?.masterDeparmentId);
        }
      },
      (error: string) => {
        log.error('masterDepartments:', error);
      }
    );
  }






}