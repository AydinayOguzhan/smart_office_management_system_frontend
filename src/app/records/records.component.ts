import { RecordsService } from 'src/services/records/records.service';
import { NavbarService } from './../../services/navbar/navbar.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RecordModel } from 'src/models/record/recordModel';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';
import { Messages } from 'src/constants/messages';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {
  records: RecordModel[]
  groups: any
  groupDatas: any
  isGroups: boolean = false;
  selectedDay: any
  selectedDayValue: any

  constructor(private navbarService: NavbarService, private recordService: RecordsService, private toastrService: ToastrService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.navbarService.changeActive(3);
    this.getLastTwoDays();
  }


  getData(startDate: string, endDate: string) {
    if (startDate === "" || endDate === "") {
      this.toastrService.error(Messages.pleaseFillTheBlanks);
    }else{
      this.recordService.getAllDateRange(startDate, endDate).subscribe((response) => {
        if (response.success === false) {
          this.toastrService.error(response.message);
          this.isGroups = false;
        } else {
          this.groups = this.groupByDate(response.data)
          this.groupDatas = this.makeArray(this.groups)
          this.isGroups = true;
        }
      });
    }
  }

  getLastTwoDays() {
    this.recordService.getLastTwoDays().subscribe((response) => {
      if (response.success === false) {
        this.toastrService.error(response.message);
        this.isGroups = false;
      } else {
        this.groups = this.groupByDate(response.data)
        this.groupDatas = this.makeArray(this.groups)
        this.isGroups = true;
        this.selectDay(0);
      }
    });
  }

  setVideoSource(path: string) {
    let newPath = this.sanitizer.bypassSecurityTrustUrl(`http://localhost:5000/${path}`);
    console.log(newPath)
    return newPath;
  }


  groupByDate(data: any[]) {
    return data.reduce((groups, obj) => {
      const date = new Date(obj.timestamp);
      const day = date.toISOString().split('T')[0]; // yalnızca tarih kısmını al
      if (!groups[day]) {
        groups[day] = [];
      }
      groups[day].push(obj);
      return groups;
    }, {});
  }

  makeArray(obj: any) {
    const dizi = Object.entries(obj).map(([key, value]) => ({
      date: key,
      values: value,
    }));
    return dizi;
  }

  selectDay(index: number) {
    this.selectedDay = this.groupDatas[index];
    this.selectedDayValue = this.selectedDay.values[0];
  }

  changeSelectedDayValue(item: number) {
    this.selectedDayValue = item;
  }

}
