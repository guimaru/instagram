import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppTestModule } from '../../../test/test.module';
import { LayoutComponent } from './layout.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { authService } from '../../service/auth.service';
import { of } from 'rxjs';
import { UserService } from '../../service/user.service';
import { User } from '../../model/User';
import { NotificationService } from '../../service/notification.service';
import { NgbPopover, NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let router: Router;
  let AuthService: authService;
  let userService: UserService;
  let notificationService: NotificationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [NgbPopover, NgbPopoverConfig],
      declarations: [LayoutComponent],
      imports: [AppTestModule, NgbModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    router = fixture.debugElement.injector.get(Router);
    AuthService = fixture.debugElement.injector.get(authService);
    userService = fixture.debugElement.injector.get(UserService);
    notificationService = fixture.debugElement.injector.get(NotificationService);
    fixture.detectChanges();
  });

  it('should not show buttons if not logged in', () => {
    expect(component).toBeTruthy();
    AuthService.logUser = null;
    component.ngOnInit();
    expect(component.profilename).toEqual(null);
  });

  it('should send a text and receive a list of users', () => {
    expect(component).toBeTruthy();
    const arrayOfUsers = [new User()];
    spyOn(userService, 'searchUsers').and.returnValue(of(arrayOfUsers));
    component.loadUsersSearch();
    expect(userService.searchUsers).toHaveBeenCalled();
    expect(component.searchResult).toEqual(arrayOfUsers);
    expect(component.amountFound).toEqual(1);
  });

  it('should empty a variable and reroute to another location', () => {
    expect(component).toBeTruthy();
    component.toSearch = 'ssss';
    const usuario = 'qwe';
    spyOn(router, 'navigate');
    component.changeUser(usuario);
    expect(component.toSearch).toEqual('');
    expect(router.navigate).toHaveBeenCalled();

  });

  it('should set a boolean to true', () => {
    expect(component).toBeTruthy();
    component.showSearch = false;
    component.buscadorFocus();
    expect(component.showSearch).toEqual(true);
  });
  it('should set a boolean to false', () => {
    expect(component).toBeTruthy();
    component.showSearch = true;
    component.buscadorFree();
    expect(component.showSearch).toEqual(false);
  });

});
