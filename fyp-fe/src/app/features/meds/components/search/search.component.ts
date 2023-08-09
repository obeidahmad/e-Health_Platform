import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public form!: FormGroup;

  public drawerSettings: { visible: boolean } = {
    visible: false
  };

  constructor(private formBuilder: FormBuilder) {
    this.form = formBuilder.group({

    })
  }

  private _searchQuery?: string;

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
  }

  public openFilter() {
    this.drawerSettings.visible = true;
  }

  public closeFilter() {
    this.drawerSettings.visible = false;

  }
}
