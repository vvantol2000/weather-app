import { Observable } from 'rxjs';
import { IWeather } from "../iweather";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

interface ICurrentWeatherData {
  weather: [{
    description: string,
    icon: string
  }],
  main: {
    temp: number
  },
  sys: {
    country: string
  },
  dt: number,
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private httpClient: HttpClient) { }

  // Implement functions here
  getCurrentWeather(city: string, country: string): Observable<IWeather>{
    // this sets the params programmatically using the HttpParams from angular commons
    const uriParams = new HttpParams()
      .set('q', `${city},${country}`)
      .set('appid', environment.appId)

    return this.httpClient
      .get<ICurrentWeatherData>(
        `${environment.baseUrl}api.openweathermap.org/data/2.5/weather`, { params: uriParams }
      ).pipe(map(data => this.transformToICurrentWeather(data)))
  }
  private transformToICurrentWeather(data: ICurrentWeatherData): IWeather {
    return {
      city: data.name,
      country: data.sys.country,
      date: data.dt * 1000,
      image: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      temperature: this.convertKelvinToFahrenheit(data.main.temp),
      description: data.weather[0].description,
    }
  }
  private convertKelvinToFahrenheit(kelvin: number): number
  {
    return kelvin * 9 / 5 - 459.67
  }
}
