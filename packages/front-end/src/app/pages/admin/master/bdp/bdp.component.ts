import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Country } from '@app/pages/sales/default.model';
import { bdpUser } from './bdp.model';
import { BdpService } from './bdp.service';

@Component({
  selector: 'app-bdp',
  templateUrl: './bdp.component.html',
  styleUrls: ['./bdp.component.scss'],
})
export class BdpComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  leadForm!: FormGroup;
  coutryArray: Country[];
  stateArray: Array<{}>;
  bdpData: bdpUser;

  constructor(
    private formBuilder: FormBuilder,
    private bdpService: BdpService,
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
      { label: 'BDP', active: true },
    ];

    this.pageTitle = 'ADD BDP';
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    debugger;
    if (this.id) {
      this.pageTitle = 'UPDATE BDP';
      //GetData
      this.getById(this.id);
    }
  }
  getById(id: number) {
    this.bdpService.getById(id).subscribe(
      (bdpData: bdpUser) => {
        this.bdpData = bdpData;
        this.createForm1();
      },
      (error: any) => {}
    );
  }
  private createForm() {
    this.leadForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      employeeId: [0, [Validators.required]],
      userId: [0, [Validators.required]],
      contactNo: [''],
      email: [''],
      status: [''],
      type: [''],
      alternateMobile: [''],
      companyName: [''],
      designation: [''],
      addressLine1: [''],
      addressLine2: [''],
      city: [''],
      state: [''],
      country: [''],
      zipCode: [''],
      dateOfReg: [''],
      pan: [''],
      baseCurrency: [''],
      // aadharCardNo: [''],
      accType: [''],
      accNumber: [''],
      bankName: [''],
      branchName: [''],
      ifscCode: [''],
      shiftCode: [''],
      image: [''],
      notes: [''],
    });
  }

  private createForm1() {
    this.leadForm = this.formBuilder.group({
      ...this.bdpData,
    });
  }

  submitData() {
    debugger;
    //const leadContactGroup = this.leadForm.value.leadContactGroup;
    let leadSubmit$;
    this.leadForm.value.userId = 1;
    this.leadForm.value.image = '';
    this.leadForm.value.employeeId = 1;
    if (this.id) {
      //Update service call
      leadSubmit$ = this.bdpService.update(this.id, this.leadForm.value);
    } else {
      //Create new lead
      this.leadForm.value.dateOfReg = new Date();
      leadSubmit$ = this.bdpService.create(this.leadForm.value);
    }
    leadSubmit$.subscribe(
      (data: any) => {
        console.log('BDP saved successfully');
        this.router.navigate(['/admin/bdp']);
      },
      (error: any) => {
        console.log(`Create BDP error: ${error}`, error);
      }
    );
  }
  cancelForm() {
    this.router.navigate(['/admin/bdp']);
  }
}
