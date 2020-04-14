import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {JsglService} from '../service/jsgl.service';
declare var $: any;

@Component({
  selector: 'app-jsgl',
  templateUrl: './jsgl.component.html',
  styleUrls: ['./jsgl.component.css']
})
export class JsglComponent implements OnInit {

  isVisible = false;
  deleteVisible = false;
  private role: any;
  private toAddRole: any;
  private roles: [];
  private operation: any;
  private operations: [];
  private dynamicMenus: [];
  // private tableData: { [key: string]: any[]; };
  private menus: [];
  private toAddRolesMenus: any[] = [];
  private menuOperations: any[] = [];
  private authorityArray: any[] = [];

  constructor(
    private jsglService: JsglService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.getOperations();
    this.getRoles();
    this.getAllDynamicMenus();
    this.getMenus();
    // this.tableData = {
    //   dataRoles : this.roles,
    //   dataOperations : this.operations
    // };
    console.log(this.roles);
  }

  search(): void {
    const sstxt = $('#filterName').val();
    $('tr').hide().filter(':contains(\'' + sstxt + '\')').show();
    $('#show').show();
  }

  joinMenus(menu: any, operation: any, isChecked: boolean): void {
    const eachMenuOperation = { eMenu: menu.id, eOperation: operation.id};
    if (isChecked) {
      if (!this.toAddRolesMenus.includes(menu)) {
        // @ts-ignore
        this.toAddRolesMenus.push(menu);
      }
      // if (!this.menuOperations.includes(eachMenuOperation))
      this.menuOperations.push(eachMenuOperation);
    } else {
      console.log(this.menuOperations.includes(eachMenuOperation));
      // tslint:disable-next-line:max-line-length
      this.menuOperations = this.menuOperations.filter(item => !(item.eMenu === eachMenuOperation.eMenu && item.eOperation === eachMenuOperation.eOperation));
      // 删除toAddRolesMenu数组中国呢的指定元素
      this.toAddRolesMenus = this.toAddRolesMenus.filter(item => item !== menu);
    }
    console.log(this.toAddRolesMenus);
    console.log(this.menuOperations);
  }

  add(description: any): void {
    this.authorityArray = [];
    // this.getRolesMaxId();
    console.log(this.roles);
    let maxId = 0;
    // tslint:disable-next-line:only-arrow-functions
    this.roles.forEach(function(e) {
      if (e['id'] > maxId) {
        maxId = e['id'];
      }
    });
    this.isVisible = false;

    this.toAddRole = {
      id: ++maxId, description: description.value, menus: this.toAddRolesMenus
    };

    console.log(this.toAddRole);
    alert(JSON.stringify(this.toAddRole));
    this.jsglService.addRole(this.toAddRole).subscribe((res: any) => {
      this.getRoles();
      alert(res.msg);
    });

    for (const sliced of this.menuOperations) {
      this.authorityArray.push({role: maxId, menu: Number(sliced['eMenu']), operation: Number(sliced['eOperation'])});
    }

    console.log(this.authorityArray);

    this.jsglService.addAuthority(this.authorityArray).subscribe((res: any) => {
      this.getRoles();
      alert(res.msg);
    });

    // this.getRoles();
  }

  showModal(): void {
    this.isVisible = true;
    // console.log(this.operations);
    // this.getUser(1);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  delete(id: number): void {
    this.deleteVisible = false;
    this.jsglService.deleteRole(id)
      .subscribe((res: any) => {
        this.getRoles();
        alert(res.msg);
        console.log(id);
      });
  }
  delete2(role: any): void {
    console.log(role);
  }

  getRoles(): void {
    this.jsglService.getRoles()
      .subscribe((res: any) => {
        this.roles = res.data;
        // @ts-ignore
        // this.role = this.roles[0];
      });
  }

  getOperations(): void {
    this.jsglService.getOperations()
      .subscribe((res: any) => {
        this.operations = res.data;
        // @ts-ignore
        // this.role = this.roles[0];
      });
  }

  getMenus(): void {
    this.jsglService.getMenus()
      .subscribe((res: any) => {
        this.menus = res.data;
        // @ts-ignore
        // this.role = this.roles[0];
      });
  }


  getAllDynamicMenus(): void {
    this.jsglService.getAllDynamicMenus()
      .subscribe((res: any) => {
        this.dynamicMenus = res.data;
        // @ts-ignore
        // this.role = this.roles[0];
      });
  }

  // getRole(id: number): void {
  //   this.jsglService.getRole(id)
  //     .subscribe((res: any) => {
  //       this.role = res.data;
  //       console.log(this.role);
  //       // console.log(res.data);
  //     });
  // }

  getInfo(data: any, data2: any, data3: any): void {
    console.log(data);
    console.log(data2);
    console.log(data3);
    console.log(this.menus);
    console.log(this.roles);
    // console.log(this.operations);
  }

  showDeleteModal(): void {
    this.deleteVisible = true;
    // this.getUser(1);
  }

  onClick($event) {
    console.log($event.target.value());
    console.log(this);
  }

  handleDeleteCancel(): void {
    this.deleteVisible = false;
  }
}
