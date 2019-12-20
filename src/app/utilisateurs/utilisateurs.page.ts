import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthService} from '../services/auth.service';
import {CreditService} from '../services/credit.service';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.page.html',
  styleUrls: ['./utilisateurs.page.scss'],
})
export class UtilisateursPage implements OnInit {

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private authService: AuthService, private creditService: CreditService) { }

  findAll;
  key;
  errors;
  amount;
  id;
  userInfo;
  showModal : boolean;
  showModal2 : boolean;
  UserId    : string;
  Name : string;


  ngOnInit() {
    this.getFindAll();
  }

  getFindAll() {
    this.userService.getFindAll()
      .subscribe(data => {this.findAll = data;
                          data.forEach(element => {
        console.log('  Nom: ' + element.name + '  Prénom: ' + element.firstname);
      })
      ; });
    this.userService.getFindAll()
      .subscribe(data => this.findAll = data);

    if (this.authService.getToken() !== null) {
      this.userInfo = this.authService.getUserInfo(this.authService.getToken());
    }
  }
  
  onClick(event)
  {
      this.showModal = true; // Show-Hide Modal Check
      this.UserId = event.target.id;
      this.Name = document.getElementById("firstname"+this.UserId).innerHTML;
  }

  onClick2(event)
  {
      this.showModal2 = true; // Show-Hide Modal Check
      this.UserId = event.target.id;
      this.Name = document.getElementById("firstname"+this.UserId).innerHTML;

  }

 

  //Bootstrap Modal Close event
  hide()
  {
    this.showModal = false;
    this.showModal2 = false;
  }


  credit(amount) {
    console.log(this.UserId);
    amount = amount.form.value.amount;
    console.log(amount);

    this.creditService.credit(this.UserId,amount)

      .subscribe(data => {
        this.amount = data[this.UserId]; 
        console.log(amount);
      },
      error => {this.errors = error; },
      () => {
        this.router.navigate(['/user/credit/' + this.UserId + '/'+ amount]); 
      }
      );
  }

  // delete(id) {
  //   console.log(this.UserId);
  //   id = this.UserId;
  //   console.log(id);

  //   this.creditService.delete(this.UserId)

  //     .subscribe(data => {
  //       this.id = data[this.UserId]; 
  //       console.log(id);
  //     },
  //     error => {this.errors = error; },
  //     () => {
  //       this.router.navigate(['/user/delete/'+id]); 
  //     }
  //     );
  // }

}
