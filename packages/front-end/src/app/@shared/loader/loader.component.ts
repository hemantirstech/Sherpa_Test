import { Component, OnInit, Input } from '@angular/core';
import { LoaderService } from '@app/@core/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  @Input() isLoading = false;
  @Input() message: string | undefined;

  loading: boolean;
  constructor(private loaderService: LoaderService) {
    const v = this.loaderService.isLoading.subscribe((v) => {
      this.loading = v;
    });
  }

  ngOnInit() {}
}
