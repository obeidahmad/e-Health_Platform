import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {DispensaryEvent} from "../models/events";

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  public mockEvent: DispensaryEvent = {
    title: "Covid Campaign",
    date: "05-05-2023",
    hour: "03:00pm",
    structure: [
      {
        order: 1,
        type: "title",
        content: "Welcome!"
      },
      {
        order: 2,
        type: "paragraph",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
      },
      {
        order: 3,
        type: "image-with-caption",
        src: "https://media.istockphoto.com/id/1181250359/photo/business-people.jpg?s=612x612&w=0&k=20&c=1DFEPJdcvlhFdQYp-hzj2CYXXRn-b6qYoPgyOptZsck=",
        content: "Last year's event!"
      }
    ]
  }

  constructor(private _http: HttpClient) {
  }

  public getAllEvents(): Observable<DispensaryEvent[]> {
    return of([this.mockEvent]);
  }
}
