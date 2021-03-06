import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { authService } from '../../service/auth.service';

import { NgbPopover, NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../../service/notification.service';
import { Notification } from '../../model/Notification';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { UserService } from '../../service/user.service';
import { User } from '../../model/User';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  
})
export class LayoutComponent implements OnInit {

  @ViewChild('modalImage') modalImage: ElementRef;

  profilename: string;

  notifications: Notification[];
  requests: Notification[];
  showRequests: boolean;
  requestQuantity: number;
  clickedImageId: number;
  imageRef: NgbModalRef;

  searchResult: User[];
  toSearch: string;
  showSearch: boolean;
  amountFound: number;

  constructor(private router: Router, public authenticationService: authService, private notificationService: NotificationService,
    private modalService: NgbModal, private userService: UserService) { 
  }

  ngOnInit() {
    this.requestQuantity = 0;
    if (this.authenticationService.logUser) {
      this.profilename = this.authenticationService.logUser.username;
      this.getNotifications();
      this.getRequest();
      this.showRequests = false;
    } else {
      this.profilename = null;
    }
    this.showSearch = false;
    this.amountFound = 0;
  }


  

  private getNotifications() {
    this.notificationService.getNotification(this.authenticationService.logUser.id).subscribe(
      load => {
        this.notifications = load;
        this.notifications = this.notifications.slice().reverse()
        this.formatDate(this.notifications);
        console.log("Notifications loaded: " + load);
      }
    )
  }
  private getRequest(){
    this.notificationService.getRequest(this.authenticationService.logUser.id).subscribe(
      load => {
        this.requests = load;
        this.requests = this.requests.slice().reverse()
        this.requestQuantity = this.requests.length;
        console.log("Requests loaded: " + load);
        console.log(load)
      }
    )
  }


  formatDate(list: Notification[]){
    for(let notification of list){
      const time = (new Date).getTime();
      const time_diff = (time - notification.createdAt)/1000;
      if(time_diff < 6000){
        notification.createdString = (Math.floor(time_diff/60) + "m");
      }else if(time_diff < 144000){
        notification.createdString = (Math.floor(time_diff/1440) + "h");
      }else if(time_diff < 720000){
        notification.createdString = (Math.floor(time_diff/7200) + "d");
      }else{
        notification.createdString = (Math.floor(time_diff/50400) + "w");
      }  
    } 
  }
  
  loadUsersSearch() {
    this.userService.searchUsers(this.toSearch).subscribe(val => {
      this.searchResult = val;
      this.amountFound = this.searchResult.length;
    });
  }

  changeUser(usuario: string) {
    this.toSearch = '';
    this.router.navigate([usuario]);
  }

  buscadorFocus() {
    this.showSearch = true;
  }
  buscadorFree() {
    this.showSearch = false;
  }


  toggleRequests(){
    this.showRequests = !this.showRequests;
  }

  acceptFollow(id: number){
    this.notificationService.accept(id).subscribe(
      result=> {
        this.getRequest();
      }
    );
    
  }

  hideFollow(id: number){
    this.notificationService.hide(id).subscribe(
      result=> {
        this.getRequest();
      }
    );
  }

  imagePopUp(id_image: number) {
    this.clickedImageId = id_image;
    this.imageRef = this.modalService.open(this.modalImage, { centered: true, size: 'lg', windowClass: 'modal-img' });
  }
}
