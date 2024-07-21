import { ChangeDetectorRef, Component, computed, DestroyRef, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import {
  AvatarComponent,
  BadgeComponent,
  BreadcrumbRouterComponent,
  ColorModeService,
  ContainerComponent,
  DropdownComponent,
  DropdownDividerDirective,
  DropdownHeaderDirective,
  DropdownItemDirective,
  DropdownMenuDirective,
  DropdownToggleDirective,
  HeaderComponent,
  HeaderNavComponent,
  HeaderTogglerDirective,
  NavItemComponent,
  NavLinkDirective,
  ProgressBarDirective,
  ProgressComponent,
  SidebarToggleDirective,
  TextColorDirective,
  ThemeDirective,

} from '@coreui/angular';
import { NgStyle, NgTemplateOutlet, CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IconDirective } from '@coreui/icons-angular';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { delay, filter, map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/Auth/service/auth.service';
import { PhotographeService } from 'src/app/Photographe/service/photographe.service';
import { Photographe } from 'src/app/model/photographe/photographe';
import { environment } from 'src/environments/environment.development';
import { SearchService } from 'src/app/views/dashboard-client/search/service/search.service';
import { FormsModule } from '@angular/forms';
import { LoginClientComponent } from 'src/app/views/dashboard-client/login-client/login-client.component';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrl: './default-header.component.scss',
  standalone: true,
  imports: [
    FormsModule,
    ContainerComponent,
    HeaderTogglerDirective,
    SidebarToggleDirective,
    IconDirective,
    HeaderNavComponent,
    NavItemComponent,
    NavLinkDirective,
    RouterLink,
    RouterLinkActive,
    NgTemplateOutlet,
    BreadcrumbRouterComponent,
    ThemeDirective,
    DropdownComponent,
    DropdownToggleDirective,
    TextColorDirective,
    AvatarComponent,
    DropdownMenuDirective,
    DropdownHeaderDirective,
    DropdownItemDirective,
    BadgeComponent,
    DropdownDividerDirective,
    ProgressBarDirective,
    ProgressComponent,
    NgStyle,
    CommonModule,
    LoginClientComponent
  ]
})

export class DefaultHeaderComponent extends HeaderComponent implements OnInit {
  @ViewChild(LoginClientComponent) loginC! : LoginClientComponent;

  readonly #activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  readonly #colorModeService = inject(ColorModeService);
  readonly colorMode = this.#colorModeService.colorMode;
  readonly #destroyRef: DestroyRef = inject(DestroyRef);

  readonly colorModes = [
    { name: 'light', text: 'Light', icon: 'cilSun' },
    { name: 'dark', text: 'Dark', icon: 'cilMoon' },
    { name: 'auto', text: 'Auto', icon: 'cilContrast' }
  ];

  readonly icons = computed(() => {
    const currentMode = this.colorMode();
    return this.colorModes.find(mode=> mode.name === currentMode)?.icon ?? 'cilSun';
  });


  isAuthenticated: boolean = true;
  isClient : boolean = true

  // roles: string | null = this.service.getRole();
  constructor(
    private service: AuthService,
    private service1: PhotographeService,
    private router: Router,
    private serviceSearch: SearchService,
    private cdr: ChangeDetectorRef
  ) {
    super();

    this.#colorModeService.localStorageItemName.set('coreui-free-angular-admin-template-theme-default');
    this.#colorModeService.eventName.set('ColorSchemeChange');

    this.#activatedRoute.queryParams
      .pipe(
        delay(1),
        map(params => <string>params['theme']?.match(/^[A-Za-z0-9\s]+/)?.[0]),
        filter(theme => ['dark', 'light', 'auto'].includes(theme)),
        tap(theme => {
          this.colorMode.set(theme);
        }),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe();
  }

  photographe = new Photographe


  @ViewChild('fileInput') fileInput!: ElementRef;

  userFile: File | null = null;
  imgURL: any;
  message: string = '';


  id: any;
  data:any;
  public imgPath: any;


  userEmail: string | null = '';
  userInitials: string = '';

  ngOnInit(): void {

    this.id = localStorage.getItem('user_id');
    console.log(this.id);
    this.getData();
    this.service.currentState.subscribe(state => this.isAuthenticated = state);

    this.service.currentEmail.subscribe(state => this.isClient = state);

    this.service1.currentImage.subscribe(image => this.imgURL = image);

    this.userEmail = localStorage.getItem('client_email');
    if (this.userEmail) {
      this.userInitials = this.userEmail.slice(0, 2).toUpperCase();
    }

  }

  logoutClient(){
    localStorage.removeItem("client_email")
    localStorage.removeItem("client_id")
    localStorage.removeItem("client_name")
    this.service.changeEmail(false);
    this.cdr.detectChanges()

    window.location.href = '/dashbord';
  }
  //Recuperation des information sur les photographe
  getData() {
    this.service1.getPhotographeById(this.id).subscribe(res => {
        this.data = res;
        this.photographe = this.data;

        // Construire l'URL de l'image
        if (this.photographe.photo) {
            // Utiliser une URL relative en supposant que les images sont dans le dossier 'assets'
            this.imgURL = `${environment.baseUrl}/${this.photographe.photo}`;

            // this.imgURL = 'assets/account.png';
            console.log('la photo du photographe est : ', this.photographe.photo)
        } else {
            this.imgURL = 'assets/account.png'; // Chemin de l'image par défaut
        }
    });
  }







  @Input() sidebarId: string = 'sidebar1';

  inputSearch : any
  onSubmit(){

    this.serviceSearch.setValue(this.inputSearch)
    console.log(this.inputSearch);

    // this.search.onSearch(this.inputSearch);
    this.router.navigate(['/search'])

  }

  openModall(){
    this.loginC.openModall()
  }

  logout(){
    this.service.logout();
  }

  goToUserGuide(){
    this.router.navigate(['/user-guide'])
  }


}
