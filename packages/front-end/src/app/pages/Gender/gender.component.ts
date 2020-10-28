import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Logger } from '@app/@core';
import * as _ from 'lodash-es';
import { GenderService } from './gender-service';
import { GenderUser } from './gender.model';

const log = new Logger('Gender Component');

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrls: ['./gender.component.scss'],
})
export class GenderComponent implements OnInit {
    // bread crumb items
  breadCrumbItems: Array<{}>;


  
  gender: GenderUser[];
  genderDetails: any;

  formData: FormGroup;

  // genderdata Form submit
 gendersSubmit: boolean;

  name: string;
  mobile: string;

  showCreateForm: boolean = false;
  showMessage: boolean = false;
  showMessageDelete: boolean = false;

  constructor(public formBuilder: FormBuilder, public genderService: GenderService) {}
  
    ngOnInit() {
         this.breadCrumbItems = [{ label: 'Home' }, { label: 'Gender', active: true }];
    
         this.contactForm();
    
         this._fetchData();
      }


      
  
  // Search gender
  filterGender(query: string) {
    if (!query) {
      this._fetchData();
    }

    this.gender = this.gender.filter((t) => t.genderTitle.toLowerCase().indexOf(query.toLowerCase()) > -1);
  }

  // Create new gender
  store() {
    const contactData = this.formData.value;

    if (contactData.id != '' && contactData.id != null) {
      this.update(contactData);
      return true;
    }

    delete contactData?.id;

    // delete genderData.mobile;
    // delete genderData.alternateMobile;

    this.genderService.create(contactData).subscribe(
      (response) => {
        log.debug('response: ', response);

        this.gender.push(response);

        // Set Form Data Reset
        this.formData.reset();

        // Fetch data from api
        this._getContacts();

        this.showCreateForm = false;
        this.showMessage = true;
      },
      (error) => {
        log.error(error);
        log.debug('not saved', contactData);
      }
    );

    setTimeout(() => {
      this.showMessage = false;
    }, 3000);

    this.gendersSubmit = true;
  }



  

  // Open edit form
  editGGender(contactData: any) {
    this.showCreateForm = true;

    this.formData.patchValue(contactData);
  }

  // Update gender
  update(contactData: any) {
    // const genderData = this.formData.value;

    // delete genderData.mobile;
    // delete genderData.alternateMobile;

    this.genderService.update(contactData.id, contactData).subscribe(
      (response) => {
        log.debug('response: ', response);

        this.gender.push(response);

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
        log.debug('not updated', contactData);
      }
    );

    this.gendersSubmit = true;
  }






  // Show selected gender details
  showGender(id: number) {
    this.genderDetails = _.find(this.gender, { id: id });
  }

  deleteGender(contactData: any) {
    if (window.confirm('Are you sure to delete?')) {
      this.genderService.delete(contactData.id).subscribe((data) => {
        log.info('Gender deleted');
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

  // gender Form Builder
  private contactForm() {
    this.formData = this.formBuilder.group({
      id: ['', [Validators.nullValidator]],
      genderTitle: ['', [Validators.required]],
      genderCode: ['', [Validators.required]],
      genderIcon: ['', [Validators.nullValidator]],

    });
  }

  // Fetch data form JSON/Server
  private _fetchData() {
    this._getContacts();
  }

  private _getContacts() {
    const filters = new Map();

    this.genderService.getAll(filters).subscribe(
      (data) => {
        this.gender = data;

        // Show first gender details as per result
        if (this.gender.length > 0) {
          this.showGender(this.gender[0]?.id);
        }
      },
      (error: string) => {
        log.error('gender:', error);
      }
    );
  }

    }