import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Logger } from '@app/@core';
import * as _ from 'lodash-es';

import { ContactService } from './contact-service';
import { ContactUser } from './contact.model';

const log = new Logger('Contact Component');

@Component({
  selector: 'app-contacts',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;

  contacts: ContactUser[];
  contactDetails: any;

  formData: FormGroup;

  // Contact Form submit
  contactSubmit: boolean;

  name: string;
  mobile: string;

  showCreateForm: boolean = false;
  showMessage: boolean = false;
  showMessageDelete: boolean = false;

  constructor(public formBuilder: FormBuilder, public contactService: ContactService) {}

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Home' }, { label: 'Contacts', active: true }];

    this.contactForm();

    this._fetchData();
  }


  
  // Search Contact
  filterContact(query: string) {
    if (!query) {
      this._fetchData();
    }

    this.contacts = this.contacts.filter((t) => t.name.toLowerCase().indexOf(query.toLowerCase()) > -1);
  }

  // Create new contact
  store() {
    const contactData = this.formData.value;

    if (contactData.id != '' && contactData.id != null) {
      this.update(contactData);
      return true;
    }

    delete contactData?.id;

    // delete contactData.mobile;
    // delete contactData.alternateMobile;

    this.contactService.create(contactData).subscribe(
      (response) => {
        log.debug('response: ', response);

        this.contacts.push(response);

        // Set Form Data Reset
        this.formData.reset();

        // Fetch data from api
        this._getContacts();

        this.showCreateForm = false;
        this.showMessage = true;
      },
      (error) => {
        log.error(error);
        log.debug('not updated', contactData);
      }
    );

    setTimeout(() => {
      this.showMessage = false;
    }, 3000);

    this.contactSubmit = true;
  }



  

  // Open edit form
  editContact(contactData: any) {
    this.showCreateForm = true;

    this.formData.patchValue(contactData);
  }

  // Update contact
  update(contactData: any) {
    // const contactData = this.formData.value;

    // delete contactData.mobile;
    // delete contactData.alternateMobile;

    this.contactService.update(contactData.id, contactData).subscribe(
      (response) => {
        log.debug('response: ', response);

        this.contacts.push(response);

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

    this.contactSubmit = true;
  }






  // Show selected contact details
  showContact(id: number) {
    this.contactDetails = _.find(this.contacts, { id: id });
  }

  deleteContact(contactData: any) {
    if (window.confirm('Are you sure to delete?')) {
      this.contactService.delete(contactData.id).subscribe((data) => {
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

  // Contact Form Builder
  private contactForm() {
    this.formData = this.formBuilder.group({
      id: ['', [Validators.nullValidator]],
      name: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      alternateMobile: ['', [Validators.nullValidator]],
      designation: ['', [Validators.nullValidator]],
      primaryEmail: ['', [Validators.required]],
      secondaryEmail: ['', [Validators.nullValidator]],
      addressLine1: ['', [Validators.nullValidator]],
      addressLine2: ['', [Validators.nullValidator]],
      city: ['', [Validators.nullValidator]],
      state: ['', [Validators.nullValidator]],
      country: ['', [Validators.nullValidator]],
      zipCode: ['', [Validators.nullValidator]],
    });
  }

  // Fetch data form JSON/Server
  private _fetchData() {
    this._getContacts();
  }

  private _getContacts() {
    const filters = new Map();

    this.contactService.getAll(filters).subscribe(
      (data) => {
        this.contacts = data;

        // Show first contact details as per result
        if (this.contacts.length > 0) {
          this.showContact(this.contacts[0]?.id);
        }
      },
      (error: string) => {
        log.error('contacts:', error);
      }
    );
  }
}
