import { Component, OnInit } from '@angular/core';
import {UsersServiceService} from "../../../../domain/admin/services/users-service.service";
import {PatientsServiceService} from "../../../../domain/admin/services/patients-service.service";
import {Patient, Staff} from "../../../../domain/admin/models/users";
import {AuthService} from "../../../../domain/authentication/services/auth.service";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  radioValue: "patient" | "staff" = "patient";
  loading: boolean = true;
  patients: Patient[] = [];
  staff: Staff[] = [];
  role!: string;
  constructor(private _userService: UsersServiceService,
              private _auth: AuthService,
              private _patientsService: PatientsServiceService) { }

  ngOnInit(): void {
    this.loadPatients();
    this.role = this._auth.getCurrentUserRole();
  }

  loadPatients() {
    this.loading = true;
    this._patientsService.getAll()
      .ref.get().then(c => {
      this.patients = c.docs.map(data => {
        return {
          ...data.data(),
          uid: data.id
        }
      })
      this.loading = false
    })
  }

  loadStaff() {
    this.loading = true;
    this._userService.getAll()
      .ref.get().then(c => {
      this.staff = c.docs.map(data => {
        console.log(data.data())
        return {
          ...data.data(),
          uid: data.id
        }
      })
      this.loading = false
    })
  }

  load() {
    if (this.radioValue == 'patient') this.loadPatients();
    else this.loadStaff();
  }
}
