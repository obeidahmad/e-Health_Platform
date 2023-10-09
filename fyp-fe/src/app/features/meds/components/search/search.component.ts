import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MedsService} from "../../../../domain/meds/services/meds.service";
import {NgModel} from "@angular/forms";
import {debounceTime, distinctUntilChanged, skip, Subject} from "rxjs";
import {MedsQuerySettings} from "../../../../domain/meds/models/meds-query-settings";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public drawerSettings: { visible: boolean } = {
    visible: false
  };
  @Output() query: EventEmitter<MedsQuerySettings> = new EventEmitter<MedsQuerySettings>();
  constructor(private _medService: MedsService) {
  }

  private _filterQuery = {
    medClass: '',
    medForm: '',
    requiresPrescription: false,
    isAvailable: true,
    quantity: [0, 5000],
    price: [0, 5000]
  }

  get filterQuery(): {
    medClass: string;
    isAvailable: boolean;
    medForm: string;
    quantity: number[];
    price: number[];
    requiresPrescription: boolean
  } {
    return this._filterQuery;
  }

  set filterQuery(value: {
    medClass: string;
    isAvailable: boolean;
    medForm: string;
    quantity: number[];
    price: number[];
    requiresPrescription: boolean
  }) {
    this._filterQuery = value;
    this.filter();

  }

  private _searchQuery?: string;
  medClasses: string[] = [];
  medForms: string[] = [];

  get searchQuery(): string | undefined {
    return this._searchQuery;
  }

  set searchQuery(value: string | undefined) {
    this._searchQuery = value;
    this.search();
  }

  public search() {
    // todo send with debounce
  }

  ngOnInit(): void {
    this._medService.getMedForms().subscribe(forms=>this.medForms = forms);
    this._medService.getMedClasses().subscribe(forms=>this.medClasses = forms);
    this.txtQueryChanged
      .pipe(debounceTime(1000))
      .pipe(distinctUntilChanged())
      .subscribe(model => {
        this.searchQuery = model;
        // @ts-ignore
        const query = {
          pageNumber: 1,
          pageSize: 9,
          searchText: model,
          // ...this.filterQuery
        }
        // if (query.medForm == '') { // @ts-ignore
        //   query.medForm=undefined;
        // }
        // if (query.medClass == '') { // @ts-ignore
        //   query.medClass=undefined;
        // }
        // @ts-ignore
        this.query.emit(query)


      });
    // .control.valueChanges
    //   .pipe(skip(1), debounceTime(200), distinctUntilChanged())
    //   .subscribe(value => console.log(value));
  }

  public openFilter() {
    this.drawerSettings.visible = true;
  }

  public closeFilter() {
    console.log(this.filterQuery)
    this.drawerSettings.visible = false;
  }

  private filter() {

  }
  txtQueryChanged: Subject<string> = new Subject<string>();

  updateModel($event: any) {
  this.txtQueryChanged.next($event);
  }
}
