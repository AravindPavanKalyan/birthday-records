import {Component, Input, OnInit} from '@angular/core';
import {People} from '../app.component';

@Component({
  selector: 'birthday-records',
  templateUrl: './birthdayRecords.component.html',
  styleUrls: ['./birthdayRecords.component.scss']
})

export class BirthdayRecords implements OnInit {
  @Input() peopleList: People[];
 
  constructor() {
  }
  ngOnInit() {
  }

  changeSortBy(type: string){
    if(type === "name") {
      this.changeSortByName();
    } else if(type === "age") {
      this.changeSortByAge();
    }
  }

  changeSortByName() {
    this.peopleList.sort((a,b)=>(
      a.name > b.name
    )?1:-1);
  }

  changeSortByAge() {
    this.peopleList.forEach((obj,i)=>{
      let birth = new Date(obj.birth);
      let now = new Date();
      let ageInDays = Math.floor((<any>now - <any>birth)/86400000);
      obj["age"]=ageInDays;
    });
    this.peopleList.sort((a,b)=>(a["age"] != b["age"]?(a["age"] < b["age"]): (<any>a["name"] >= <any>b["name"]))?1:-1);
    this.peopleList.forEach((obj, i)=>{
      delete obj["age"];
    })
  }
}
