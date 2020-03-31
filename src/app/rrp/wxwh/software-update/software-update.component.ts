import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SoftwareUpdateService} from '../../../core/service/software-update.service';
import {SoftwareUpgrade} from '../../../core/entity/entity';

@Component({
  selector: 'app-software-update',
  templateUrl: './software-update.component.html',
  styleUrls: ['./software-update.component.css']
})

export class SoftwareUpdateComponent implements OnInit {
  isVisible = false;
  isVisible1 = false;
  des = '';
  private softwareUpgrades: SoftwareUpgrade[];
  softwareUpgrade: SoftwareUpgrade;

  constructor(
    private softwareUpdateService: SoftwareUpdateService,
    private route: ActivatedRoute
  ) {
  }

  showModal1(): void {
    this.isVisible1 = true;
  }

  add(): void {
    this.isVisible1 = false;
    const add = {description: this.des}
    this.softwareUpdateService.addSoftwareUpgrade(add)
      .subscribe((res) => {
        this.getSoftwareUpgrades();
        alert(res.msg);
      });
  }

  handleCancel1(): void {
    this.isVisible1 = false;
  }

  showModal(data: SoftwareUpgrade): void {
    this.softwareUpgrade = data;
    this.isVisible = true;
  }

  update(): void {
    this.isVisible = false;
    this.softwareUpdateService.updateSoftwareUpgrade(this.softwareUpgrade)
      .subscribe((res) => {
        this.getSoftwareUpgrades();
        alert(res.msg);
      });
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  ngOnInit() {
    this.getSoftwareUpgrades();
  }

  getSoftwareUpgrades(): void {
    this.softwareUpdateService.getSoftwareUpgrades()
      .subscribe(res => {
        this.softwareUpgrades = res.data;
      });
  }

  delete(data: SoftwareUpgrade | number): void {
    this.softwareUpdateService.deleteSoftwareUpgrade(data)
      .subscribe(res => {
        this.getSoftwareUpgrades();
        alert(res.msg);
      });
  }

  fresh(): void {
    window.location.reload();
  }
}
