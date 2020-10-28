import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { bdpUser } from '../bdp.model';
import { BdpService } from '../bdp.service';
import { Logger } from '@app/@core';

const log = new Logger('Contact Component');

@Component({
  selector: 'app-bdp-details',
  templateUrl: './bdp-details.component.html',
  styleUrls: ['./bdp-details.component.scss'],
})
export class BdpDetailsComponent implements OnInit {
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

  bdpId: any;

  bdpDetails: bdpUser;

  private sub: any;
  constructor(private route: ActivatedRoute, private bdpService: BdpService) {}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.bdpId = +params['id'];
    });

    this.getById(this.bdpId);
  }

  getById(id: any) {
    const filters = new Map();

    this.bdpService.getById(id).subscribe(
      (data) => {
        this.bdpDetails = data;
      },
      (error: string) => {
        log.error('contacts:', error);
      }
    );
  }
}
