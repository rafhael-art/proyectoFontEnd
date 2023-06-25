import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from 'src/app/interfaces/empleado';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SidebarService } from 'src/app/services/sidebar/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  public usuario!: Empleado;
  public menuItems !: any[];
  constructor(private sideBarService: SidebarService,
    private usuarioService: AuthService,
    private router: Router) {
    this.usuario = usuarioService.usuario;

    this.menuItems = sideBarService.menu




  }
  ngOnInit(): void {

  }



  logout() {
    this.usuarioService.logOut();
    this.router.navigateByUrl('/login')
  }
}
