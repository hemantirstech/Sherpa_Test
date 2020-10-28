import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Logger } from '@app/@core';
import * as _ from 'lodash-es';
import { MasterDesignationService } from './masterDesignation-service';
import { MasterDesignationUser } from './masterDesignation.model';

const log = new Logger('MasterDesignation Component');

@Component({
  selector: 'app-master-designation',
  templateUrl: './masterDesignation.component.html',
  styleUrls: ['./masterDesignation.component.scss'],
})
export class MasterDesignationComponent implements OnInit {
    // bread crumb items
  breadCrumbItems: Array<{}>;


  
  mastreDesignations: MasterDesignationUser[];
  mastreDesignationsDetails: any;

  formData: FormGroup;

  // mastreDesignationsData Form submit
  mastreDesignationsSubmit: boolean;

  name: string;
  mobile: string;

  showCreateForm: boolean = false;
  showMessage: boolean = false;
  showMessageDelete: boolean = false;

  constructor(public formBuilder: FormBuilder, public mastreDesignationsService: MasterDesignationService) {}
  
    ngOnInit() {
         this.breadCrumbItems = [{ label: 'Home' }, { label: 'Admin Master Designation', active: true }];
    
         this.contactForm();
    
         this._fetchData();
      }



  // Search mastreDesignationsData
  filterMastreDesignation(query: string) {
    if (!query) {
      this._fetchData();
    }

    this.mastreDesignations = this.mastreDesignations.filter((t) => t.designationTitle.toLowerCase().indexOf(query.toLowerCase()) > -1);
  }

  // Create new mastreDesignationsData
  store() {
    const mastreDesignationsData = this.formData.value;

    if (mastreDesignationsData.masterDesignationId != '' && mastreDesignationsData.masterDesignationId != null) {
      this.update(mastreDesignationsData);
      return true;
    }

    delete mastreDesignationsData?.masterDesignationId;

    // delete mastreDesignationsData.mobile;
    // delete mastreDesignationsData.alternateMobile;

    this.mastreDesignationsService.create(mastreDesignationsData).subscribe(
      (response) => {
        log.debug('response: ', response);

        this.mastreDesignations.push(response);

        // Set Form Data Reset
        this.formData.reset();

        // Fetch data from api
        this._getContacts();

        this.showCreateForm = false;
        this.showMessage = true;
      },
      (error) => {
        log.error(error);
        log.debug('not saved', mastreDesignationsData);
      }
    );

    setTimeout(() => {
      this.showMessage = false;
    }, 3000);

    this.mastreDesignationsSubmit = true;
  }



  

  // Open edit form
  editMasterDesignation(mastreDesignationsData: any) {
    this.showCreateForm = true;

    this.formData.patchValue(mastreDesignationsData);
  }

  // Update mastreDesignationsData
  update(mastreDesignationsData: any) {
    // const mastreDesignationsData = this.formData.value;

    // delete mastreDesignationsData.mobile;
    // delete mastreDesignationsData.alternateMobile;

    this.mastreDesignationsService.update(mastreDesignationsData.masterDesignationId, mastreDesignationsData).subscribe(
      (response) => {
        log.debug('response: ', response);

        this.mastreDesignations.push(response);

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
        log.debug('not updated', mastreDesignationsData);
      }
    );

    this.mastreDesignationsSubmit = true;
  }






  // Show selected mastreDesignationsData details
  showMasterDesignation(masterDesignationId: number) {
    this.mastreDesignationsDetails = _.find(this.mastreDesignations, { masterDesignationId: masterDesignationId });
  }

  deleteMasterDesignation(mastreDesignationsData: any) {
    if (window.confirm('Are you sure to delete?')) {
      this.mastreDesignationsService.delete(mastreDesignationsData.masterDesignationId).subscribe((data) => {
        log.info('Master Designation deleted');
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

  // MasterDesignation Form Builder
  private contactForm() {
    this.formData = this.formBuilder.group({
      masterDesignationId: ['', [Validators.nullValidator]],
      designationTitle: ['', [Validators.required]],
      designationCode: ['', [Validators.required]],
      designationDescription: ['', [Validators.nullValidator]],
      masterDeparmentId: ['', [Validators.nullValidator]],
      designationType: ['', [Validators.required]],
      
    });
  }

  // Fetch data form JSON/Server
  private _fetchData() {
    this._getContacts();
  }

  private _getContacts() {
    const filters = new Map();

    this.mastreDesignationsService.getAll(filters).subscribe(
      (data) => {
        this.mastreDesignations = data;

        // Show first MasterDesignation details as per result
        if (this.mastreDesignations.length > 0) {
          this.showMasterDesignation(this.mastreDesignations[0]?.masterDesignationId);
        }
      },
      (error: string) => {
        log.error('Master Designation:', error);
      }
    );
  }




}