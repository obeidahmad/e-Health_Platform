import { Component } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'E-Dispensary';

  constructor(private _auth: AngularFireAuth) {
  // const token = "eyJhbGciOiAiUlMyNTYiLCAidHlwIjogIkpXVCIsICJraWQiOiAiYzMxNjJmNDRkN2IwMjUzOWY3NzZhMWYyMDNlNTQwODJmYjAzNjcwNyJ9.eyJpc3MiOiAiZmlyZWJhc2UtYWRtaW5zZGsteng4ZnlAZS1kaXNwZW5zYXJ5LmlhbS5nc2VydmljZWFjY291bnQuY29tIiwgInN1YiI6ICJmaXJlYmFzZS1hZG1pbnNkay16eDhmeUBlLWRpc3BlbnNhcnkuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCAiYXVkIjogImh0dHBzOi8vaWRlbnRpdHl0b29sa2l0Lmdvb2dsZWFwaXMuY29tL2dvb2dsZS5pZGVudGl0eS5pZGVudGl0eXRvb2xraXQudjEuSWRlbnRpdHlUb29sa2l0IiwgInVpZCI6ICJzb21lLXVpZC1zdXV1dXVwcyIsICJpYXQiOiAxNjg0NzYwODQ2LCAiZXhwIjogMTY4NDc2NDQ0NiwgImNsYWltcyI6IHsicm9sZSI6ICJwYXRpZW50In19.Iucw25TEVE194AlvMMTLa0xV6RqFffz3NIOBsHv7SP-nCrr4XbTwInEBGsVvNsbv4021hhyP-h_Dttz4pdDccMqDhkC0pvniCVbzE21S8hY6xsJjrxBHABjSp87X4QSfHccf_DBV2POeHV4Lx38ocGazsBET_cLAqJF5UY0CebcwndXAd5Oyj-vU0snHU45WkWfYO-OsWoqdtJCOUUgWrKvUjVCYNY88Wy0y31rXy5ra8Yc9p2zAO1BNNZJZwGZQnB1eLvB6jZ_7cX5eMQZnS8cab2Ivc-jPFiWgwI2q8t5QL6M1t0Fg42XyPBlaDkYb2_UDuh0pTUNM0Aa4fvJHgg";
  //   _auth.signInWithCustomToken(token)
  //     .then((userCredential) => {
  //       const user = userCredential.user;
  //       console.log(user);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  }
}
