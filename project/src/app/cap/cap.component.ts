import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {Router, NavigationEnd} from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cap',
  templateUrl: './cap.component.html',
  styleUrls: ['./cap.component.css']
})
export class CapComponent implements OnInit {
  search: string;
  router: Router;
  constructor(_router: Router, private userService: UserService,private location: Location) {
    this.router = _router;
  }
  onSubmit() {
    this.userService.getUsers().subscribe((users) => {
      let foundUsers = users.filter((item) => {
        let note = `${item.firstName} ${item.lastName}`;
        let position = note.toUpperCase().indexOf(this.search.toUpperCase());
        if(position >= 0) {
          return item.id;
        }
      });
        if(foundUsers.length !== 0) {
          this.router.navigateByUrl(`/detail/${foundUsers[0].id}`);
        } else {
          //TODO: if users are not found
        }
        this.search = "";
    });
  }
  checkChangeOfUrl(): void {
    this.router.events.subscribe(val => {
      if(val instanceof NavigationEnd && val.url !== '/users') {
        this.changeActiveLink(val.url);
        console.log(val.url);
      }
    });
  }
  changeActiveLink(url):void {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach((value) => {
      value.classList.remove('active');
      if(value.pathname === url) {
        value.classList.add('active');
      }
    });
  }
  ngOnInit() {
    this.checkChangeOfUrl();
  }

}
