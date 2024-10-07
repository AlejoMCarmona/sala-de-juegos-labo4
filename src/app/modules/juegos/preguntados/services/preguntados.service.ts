import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';
import { Cca3Code } from '../interfaces/cca3.interface';
import { CountryFlag } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root'
})

export class PreguntadosService {
  private baseUrl: string = "https://restcountries.com/v3.1/";

  constructor(private _httpClient: HttpClient) { }

  public obtenerCodigosDePaises(): Promise<Cca3Code[]> {
    const url = this.baseUrl + "all?fields=cca3,translations";
    return firstValueFrom(
      this._httpClient.get<any[]>(url).pipe(
        map(data => data.map(item => ({
          cca3: item.cca3,
          name: item.translations.spa.common
        })))
      )
    );
  }

  public obtenerBanderaPais(codigoPais: string): Promise<CountryFlag> {
    const url = this.baseUrl + "alpha/" +  codigoPais + "?fields=flags";
    return firstValueFrom(this._httpClient.get<CountryFlag>(url));
  }
}
