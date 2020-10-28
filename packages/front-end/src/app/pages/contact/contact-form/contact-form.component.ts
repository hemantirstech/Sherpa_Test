import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ContactUser } from '../contact.model';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;

  contacts: ContactUser[];
  contactDetails: any;

  formData: FormGroup;

  // Contact Form submit
  contactSubmit: boolean;

  constructor(public formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.contactForm();
  }

  // Save the contact details
  store() {
    const mobile = this.formData.get('mobile').value;

    if (this.formData.valid && mobile) {
      // Push data in object
      this.contacts.push({
        name: 'Henry Wells',
        mobile,
      });

      // Set Form Data Reset
      this.formData = this.formBuilder.group({
        mobile: null,
      });
    }

    this.contactSubmit = true;
  }

  // Returns form
  get cf() {
    return this.formData.controls;
  }

  // Contact Form Builder
  private contactForm() {
    this.formData = this.formBuilder.group({
      name: ['', [Validators.required]],
      designation: ['', [Validators.nullValidator]],
      mobile: ['', [Validators.required]],
      alternateMobile: ['', [Validators.nullValidator]],
      email: ['', [Validators.nullValidator]],
      secondaryEmail: ['', [Validators.nullValidator]],
      addressLine: ['', [Validators.nullValidator]],
      addressLine2: ['', [Validators.nullValidator]],
      city: ['', [Validators.nullValidator]],
      state: ['', [Validators.nullValidator]],
      country: ['', [Validators.nullValidator]],
      zipcode: ['', [Validators.nullValidator]],
    });
  }
}
