import { Component, OnInit } from '@angular/core';
import {IWeather} from "../iweather";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  currentWeather: IWeather
  constructor() {
    this.currentWeather = {
      city: 'Basthes',
      country: 'Unite',
      date: new Date(),
      image: 'asses',
      temperature: 'sunny'
    }
  }

  ngOnInit(): void {
  }

}
