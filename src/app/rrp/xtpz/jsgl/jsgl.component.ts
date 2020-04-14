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
  updateVisible = false;
  private role: any;
  private toAddRole: any;
  private roles: [];
  private operation: any;
  private operations: [];
  private dynamicMenus: [];
  // private tableData: { [key: string]: any[]; };
  private menus: [];
  // add
  private toAddRolesMenus: any[] = [];
  private menuOperations: any[] = [];
  // update
  private toUpdateRoleMenus: any[] = [];
  private toUpdateMenuOperations: any[] = [];
  private authorityArray: any[] = [];

  constructor(
    private jsglService: JsglService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.getOperations();
    this.getRoles();
    // @ts-ignore
    // this.role = this.roles[0];
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

  /**
   * 这是一种不太好的办法，应该用[(ngModel)]绑定字典或者数组，使用下面update的方法，有空必须改
   */
  joinAddMenus(menu: any, operation: any, isChecked: boolean): void {
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
    this.getRoles();
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

    for (const sliced of this.menuOperations) {
      this.authorityArray.push({role: maxId, menu: Number(sliced['eMenu']), operation: Number(sliced['eOperation'])});
    }

    const completedAuthority: any = {toAddRole: this.toAddRole, authorityArray: this.authorityArray};

    this.jsglService.addAuthority(completedAuthority).subscribe((res: any) => {
      this.getRoles();
      alert(res.msg);
    });

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

        // this.roles = res.data;
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
  onClick() {
    console.log(this);
  }

  // // private checkedForm: any[] = [];
  initCheckedForm(): void {

  }

  initChecked(menuId: number, operationId: number): boolean {
    // console.log(this.roles);
    // if (Math.round(Math.random()) < 0.5) {
    //   return true;
    // } else { return false; }
    // this.getRole(1);
    // console.log(Math.round(Math.random()) < 0.5);
    return true;
  }
  private updateRoleMenuOperation: any[] = [];
  private checkDic: { [key: string]: boolean; } = {};
  showUpdateModal(role: any): void {
    this.updateVisible = true;

    this.role = role;

    console.log(this.role);

    this.jsglService.findAuthorityByRoleId(this.role.id)
      .subscribe((res: any) => {
        this.checkDic = {};
        console.log(res.data);
        this.updateRoleMenuOperation = res.data;
        // 最好使用filter，最后改
        for (const sliceMenu of this.menus) {
          for (const sliceOperation of this.operations) {
            let result = false;
            for (const eachRoleMenuOperation of this.updateRoleMenuOperation) {
              if (eachRoleMenuOperation.menu === sliceMenu['id'] && eachRoleMenuOperation.operation === sliceOperation['id']) {
                result = true;
                break;
              }
            }
            // 没有复合索引，只能字符串或者数字
            this.checkDic[sliceMenu['id'] + '  ' + sliceOperation['id']] = result;
          }
        }
        console.log(this.checkDic);
      });
    // this.getUser(1);
  }
  show() {
    console.log(this.checkDic);
  }
  update(description: any): void {
    // this.getRolesMaxId();

    this.isVisible = false;
    let toUpdateRoleMenus = [];
    // toUpdateRoleMenus = toUpdateRoleMenus.filter(item => item[] !== );
    // for (const key in this.checkDic) {
    //   if (this.checkDic[key] === true) {
    //     toUpdateRoleMenus.push(this.checkDic[key]);
    //   }
    // }
    this.toAddRole = {
      id: this.role.id, description: description.value, menus: this.toAddRolesMenus
    };

    for (const sliced of this.menuOperations) {
      this.authorityArray.push({role: this.role.id, menu: Number(sliced['eMenu']), operation: Number(sliced['eOperation'])});
    }

    const completedAuthority: any = {toAddRole: this.toAddRole, authorityArray: this.authorityArray};

    this.jsglService.addAuthority(completedAuthority).subscribe((res: any) => {
      this.getRoles();
      alert(res.msg);
    });

  }

  handleUpdateCancel(): void {
    this.updateVisible = false;
  }

  // getRole(id: number): void {
  //   this.jsglService.getRole(id)
  //     .subscribe((res: any) => {
  //       console.log(res.data)
  //       this.role = res.data;
  //       // return res.data;
  //       // @ts-ignore
  //       // this.role = this.roles[0];
  //     });
  // }
}
