import {Component, OnInit} from '@angular/core';
import {differenceInCalendarDays} from "date-fns";
import {DisabledTimeFn} from "ng-zorro-antd/date-picker";
import {AvailabilityService} from "../../../../domain/appointments/services/availability.service";
import {AvailabilityRequest} from "../../../../domain/appointments/models/availability-request";
import {AuthService} from "../../../../domain/authentication/services/auth.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-set-availability',
  templateUrl: './set-availability.component.html',
  styleUrls: ['./set-availability.component.css'],
})
export class SetAvailabilityComponent implements OnInit {
  loadingRequest: boolean = false;
  doctorTimeSlot: number = 15; // TODO
  today = new Date();
  date: Date[] = [];
  isVisible = false;

  selectedData: Array<{ day: any, startTime: string, endTime: string, stamp: Date }> = []
  excludeWholeMonth: boolean = false;

  constructor(private _availabilityService: AvailabilityService,
              private _nzMessage: NzMessageService,
              private _authService: AuthService) {
  }

  onChange(result: Date[]): void {
    const days = (a: Date, b: Date) => {
      const _MS_PER_DAY = 1000 * 60 * 60 * 24;
      const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
      const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
      return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }
    const first = {
      day: result[0].toLocaleDateString(),
      startTime: result[0].toLocaleTimeString('en-US', {hour12: false}),
      endTime: "17:00:00",
      stamp: new Date(result[0])
    }
    const last = {
      day: result[1].toLocaleDateString(),
      startTime: "09:00:00",
      endTime: result[1].toLocaleTimeString('en-US', {hour12: false}),
      stamp: new Date(result[1])
    }
    const firstDate = new Date(result[0]);
    const lastDate = new Date(result[1]);
    const diff = days(firstDate, lastDate)

    const selected = [first];
    if (diff > 1) {
      this.range(1, diff).forEach(rangeIndex => {
        let current = new Date(firstDate);
        current.setDate(firstDate.getDate() + rangeIndex)
        if (!(current.getDay() == 6 || current.getDay() == 0)) {
          selected.push({
            day: new Date(current).toLocaleDateString(),
            startTime: "09:00:00",
            endTime: "17:00:00",
            stamp: current
          })
        }
      })
    }
    selected.push(last);

    const next = new Date(lastDate);
    next.setDate(next.getDate() + 1);
    this.date = [next, next];

    this.selectedData = [...this.selectedData, ...selected]

    this.disabledWeekendsAndPrevious = (value: Date): boolean => {
      return this.disableUsed(value);
    };

  }

  disableWeekend = (value: Date): boolean => {
    const day = value.getDay();
    const weekend = (day === 6) || (day === 0);
    const old = differenceInCalendarDays(value, this.today) < 0;
    return weekend || old;
  }

  disabledWeekendsAndPrevious = (value: Date): boolean => {
    return this.disableWeekend(value);
  };

  range(start: number, end: number): number[] {
    const result: number[] = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  disabledDateTime: DisabledTimeFn = () => ({
    nzDisabledHours: () => {
      const disabled = this.range(0, 9)
      disabled.push(...this.range(18, 24));
      return disabled
    },
    nzDisabledMinutes: () => [],
    nzDisabledSeconds: () => this.range(1, 60)
  });

  ngOnInit(): void {
  }

  removeEntry(date: any) {
    this.selectedData = this.selectedData.filter(data => data != date);
  }

  // handleCancel(): void {
  //   console.log('Button cancel clicked!');
  //   this.isVisible = false;
  // }
  //
  // updateOne($event: any) {
  //
  // }
  //
  // onOk($event: any) {
  //
  // }

  dateRange(startDate: string, endDate: string) {
    let start = startDate.split('-');
    let end = endDate.split('-');
    let startYear = parseInt(start[0]);
    let endYear = parseInt(end[0]);
    let dates = [];

    for (let i = startYear; i <= endYear; i++) {
      let endMonth = i != endYear ? 11 : parseInt(end[1]) - 1;
      let startMon = i === startYear ? parseInt(start[1]) - 1 : 0;
      for (let j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j + 1) {
        let month = j + 1;
        let displayMonth = month < 10 ? '0' + month : month;
        dates.push([i, displayMonth, '01'].join('-'));
      }
    }
    return dates;
  }

  setAvailabilityForRange() {
    if (this.selectedData.length < 1) return;
    const selected = [...this.selectedData]
    selected.sort(function (a, b) {
      // @ts-ignore
      return new Date(b.stamp) - new Date(a.stamp);
    });
    let last = selected[0].stamp.toISOString().replace(/\//g, "T").split('T')[0];
    // @ts-ignore
    let first = selected.pop().stamp.toISOString().replace(/\//g, "-").split('T')[0];

    if (this.excludeWholeMonth) {
      const months = this.dateRange(first, last);
      first = months[0];
      // @ts-ignore
      let fullLast: any = months.pop();
      fullLast = fullLast.split("-");
      fullLast[fullLast.length -1] = '31'
      last = fullLast.join('-')
    }

    const request: AvailabilityRequest = {
      doctorId: this._authService.getCurrentUserId(),
      startDate: first,
      endDate: last,
      days: this.selectedData.map(item => {
        return {
          day: item.stamp.toISOString().replace(/\//g, "-").split("T")[0],
          startHour: item.startTime,
          endHour: item.endTime
        }
      })
    }
    this.loadingRequest = true;
    console.log(JSON.stringify(request));
    this._availabilityService.setDrAvailability(request).subscribe({
      next: (res) => {
        console.log(res);
        this.loadingRequest = false;
        // TODO navigate back
      },
      error: (err) => {
        this._nzMessage.error(err);
        this.loadingRequest = false;
      }
    })
  }

  private disableUsed = (value: Date): boolean => {
    const weekend = this.disableWeekend(value);
    let match = false;
    for (let date of this.selectedData) {
      const withoutTime = new Date(date.stamp);
      withoutTime.setHours(0, 0, 0, 0);
      if (withoutTime.getDate() == value.getDate()) {
        match = true;
        break;
      }
    }
    return weekend || match;
  }
}
