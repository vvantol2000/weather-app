import { Component, OnInit } from '@angular/core';

import { IWeather } from '../iweather'
import {WeatherService} from "./weather.service";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  currentWeather: IWeather
  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.getCurrentWeather('Kingston','Jamaica')
      .subscribe((data) => this.currentWeather = data)
  }
}
