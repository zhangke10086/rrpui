import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WarningService} from '../../../core/service/warning.service';
import {Warning} from '../../../core/entity/entity';

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.css']
})

export class WarningComponent implements OnInit {
  isVisible = false;
  isVisible1 = false;
  private warnings: Warning[];
  warning: Warning;
  warning1: Warning;

  constructor(
    private warningService: WarningService,
    private route: ActivatedRoute
  ) {
  }

  showModal1(): void {
    this.warning1 = null;
    this.isVisible1 = true;
  }

  add(): void {
    this.isVisible1 = false;
    this.warningService.addWarning(this.warning1)
      .subscribe((res) => {
        this.getWarnings();
        alert(res.msg);
      });
  }

  handleCancel1(): void {
    this.isVisible1 = false;
  }

  showModal(data: Warning): void {
    this.warning = data;
    this.isVisible = true;
  }

  update(): void {
    this.isVisible = false;
    this.warningService.updateWarning(this.warning)
      .subscribe((res) => {
        this.getWarnings();
        alert(res.msg);
      });
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  ngOnInit() {
    this.getWarnings();
  }

  getWarnings(): void {
    this.warningService.getWarnings()
      .subscribe(res => {
        this.warnings = res.data;
      });
  }

  delete(data: Warning | number): void {
    this.warningService.deleteWarning(data)
      .subscribe(res => {
        this.getWarnings();
        alert(res.msg);
      });
  }
}
