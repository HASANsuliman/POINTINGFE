import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  UserName: string | null = ""
  Role: string | null = ""
  constructor(private user: UserService, private router: Router) { }


  ngOnInit(): void {
    this.UserName = this.user.getName()
    this.Role = this.user.getIsAuthed()

  }

}
