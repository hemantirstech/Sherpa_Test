import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { employeeUser } from './employee.model';
import { employeeService } from './employee.service';
import { companyType, leadSourceArray, coutryArray, stateArray, stageStatus } from '../../../sales/data';
import { Country } from '@app/pages/sales/default.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  // bread crum data
  breadCrumbItems: Array<{}>;
  leadForm!: FormGroup;
  coutryArray: Country[];
  stateArray: Array<{}>;
  employeeData: employeeUser;
  constructor(
    private formBuilder: FormBuilder,
    private employeeService: employeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.createForm();
  }
  id: number;
  pageTitle: string;
  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Dashboard', path: 'dashboard', redirectTo: '/dashboard' },
      { label: 'Sales', active: true },
    ];

    this.pageTitle = 'ADD EMPLOYEE';
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    debugger;
    if (this.id) {
      this.pageTitle = 'UPDATE EMPLOYEE';
      //GetData
      this.getEMployeeById(this.id);
    }
  }
  getEMployeeById(id: number) {
    this.employeeService.getEmployeeId(id).subscribe(
      (employeeData: employeeUser) => {
        this.employeeData = employeeData;
        this.createForm1();
      },
      (error: any) => {}
    );
  }
  private createForm() {
    this.leadForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      designation: [0, [Validators.required]],
      contactNo: [''],
      email: [''],
      status: [''],
      type: [''],
      alternateMobile: [''],
      addressLine1: [''],
      addressLine2: [''],
      city: [''],
      state: [''],
      country: [''],
      zipCode: [''],
      pan: [''],
      aadharCardNo: [''],
      accType: [''],
      accNumber: [''],
      bankName: [''],
      branchName: [''],
      ifscCode: [''],
      shiftCode: [''],
    });
  }

  private createForm1() {
    this.leadForm = this.formBuilder.group({
      ...this.employeeData,
    });
  }

  submitData() {
    debugger;
    //const leadContactGroup = this.leadForm.value.leadContactGroup;
    let leadSubmit$;
    this.leadForm.value.designation = parseInt(this.leadForm.value.designation);
    this.leadForm.value.userId = 1;
    this.leadForm.value.image = '';
    if (this.id) {
      //Update service call
      leadSubmit$ = this.employeeService.update(this.id, this.leadForm.value);
    } else {
      //Create new lead
      leadSubmit$ = this.employeeService.create(this.leadForm.value);
    }
    leadSubmit$.subscribe(
      (data: any) => {
        console.log('Employee saved successfully');
        this.router.navigate(['/admin/employee']);
      },
      (error: any) => {
        console.log(`Create Employee error: ${error}`, error);
      }
    );
  }
  cancelForm() {
    this.router.navigate(['/admin/employee']);
  }
}
