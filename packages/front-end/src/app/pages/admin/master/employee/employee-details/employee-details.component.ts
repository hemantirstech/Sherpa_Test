import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { employeeUser } from '../employee.model';
import { employeeService } from '../employee.service';
import { Logger } from '@app/@core';

const log = new Logger('Contact Component');

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss'],
})
export class EmployeeDetailsComponent implements OnInit {
  statData = [
    {
      icon: 'bx bx-copy-alt',
      title: 'Reference',
      value: '1,235',
    },
    {
      icon: 'bx bx-archive-in',
      title: 'Revenue',
      value: 'INR 35,723',
    },
    {
      icon: 'bx bx-purchase-tag-alt',
      title: 'Average Price',
      value: 'INR 10,340',
    },
  ];

  empId: any;
  empDetails: employeeUser;
  private sub: any;

  constructor(private route: ActivatedRoute, private empService: employeeService) {}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.empId = +params['id'];
    });

    this.getById(this.empId);
  }

  getById(id: any) {
    const filters = new Map();

    this.empService.getEmployeeId(id).subscribe(
      (data) => {
        this.empDetails = data;
        console.log(this.empDetails);
      },
      (error: string) => {
        log.error('contacts:', error);
      }
    );
  }
}
