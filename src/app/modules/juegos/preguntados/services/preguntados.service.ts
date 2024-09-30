import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Cca3Code } from '../interfaces/cca3.interface';
import { CountryFlag } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root'
})

export class PreguntadosService {
  private baseUrl: string = "https://restcountries.com/v3.1/";

  constructor(private _httpClient: HttpClient) { }

  public obtenerCodigosDePaises(): Promise<Cca3Code[]> {
    const url = this.baseUrl + "all?fields=cca3,name";
    return firstValueFrom(this._httpClient.get<Cca3Code[]>(url));
  }

  public obtenerSimulado(): Promise<Cca3Code[]> {
    const data: Cca3Code[] = 
    [
      {
        "name": {
          "common": "Colombia",
          "official": "Republic of Colombia",
          "nativeName": {
            "spa": {
              "official": "República de Colombia",
              "common": "Colombia"
            }
          }
        },
        "cca3": "COL"
      },
      {
        "name": {
          "common": "Honduras",
          "official": "Republic of Honduras",
          "nativeName": {
            "spa": {
              "official": "República de Honduras",
              "common": "Honduras"
            }
          }
        },
        "cca3": "HND"
      },
      {
        "name": {
          "common": "Guam",
          "official": "Guam",
          "nativeName": {
            "cha": {
              "official": "Guåhån",
              "common": "Guåhån"
            },
            "eng": {
              "official": "Guam",
              "common": "Guam"
            },
            "spa": {
              "official": "Guam",
              "common": "Guam"
            }
          }
        },
        "cca3": "GUM"
      },
      {
        "name": {
          "common": "Puerto Rico",
          "official": "Commonwealth of Puerto Rico",
          "nativeName": {
            "eng": {
              "official": "Commonwealth of Puerto Rico",
              "common": "Puerto Rico"
            },
            "spa": {
              "official": "Estado Libre Asociado de Puerto Rico",
              "common": "Puerto Rico"
            }
          }
        },
        "cca3": "PRI"
      },
      {
        "name": {
          "common": "Cuba",
          "official": "Republic of Cuba",
          "nativeName": {
            "spa": {
              "official": "República de Cuba",
              "common": "Cuba"
            }
          }
        },
        "cca3": "CUB"
      },
      {
        "name": {
          "common": "Uruguay",
          "official": "Oriental Republic of Uruguay",
          "nativeName": {
            "spa": {
              "official": "República Oriental del Uruguay",
              "common": "Uruguay"
            }
          }
        },
        "cca3": "URY"
      },
      {
        "name": {
          "common": "Equatorial Guinea",
          "official": "Republic of Equatorial Guinea",
          "nativeName": {
            "fra": {
              "official": "République de la Guinée Équatoriale",
              "common": "Guinée équatoriale"
            },
            "por": {
              "official": "República da Guiné Equatorial",
              "common": "Guiné Equatorial"
            },
            "spa": {
              "official": "República de Guinea Ecuatorial",
              "common": "Guinea Ecuatorial"
            }
          }
        },
        "cca3": "GNQ"
      },
      {
        "name": {
          "common": "Paraguay",
          "official": "Republic of Paraguay",
          "nativeName": {
            "grn": {
              "official": "Tetã Paraguái",
              "common": "Paraguái"
            },
            "spa": {
              "official": "República de Paraguay",
              "common": "Paraguay"
            }
          }
        },
        "cca3": "PRY"
      },
      {
        "name": {
          "common": "Bolivia",
          "official": "Plurinational State of Bolivia",
          "nativeName": {
            "aym": {
              "official": "Wuliwya Suyu",
              "common": "Wuliwya"
            },
            "grn": {
              "official": "Tetã Volívia",
              "common": "Volívia"
            },
            "que": {
              "official": "Buliwya Mamallaqta",
              "common": "Buliwya"
            },
            "spa": {
              "official": "Estado Plurinacional de Bolivia",
              "common": "Bolivia"
            }
          }
        },
        "cca3": "BOL"
      },
      {
        "name": {
          "common": "Chile",
          "official": "Republic of Chile",
          "nativeName": {
            "spa": {
              "official": "República de Chile",
              "common": "Chile"
            }
          }
        },
        "cca3": "CHL"
      },
      {
        "name": {
          "common": "Argentina",
          "official": "Argentine Republic",
          "nativeName": {
            "grn": {
              "official": "Argentine Republic",
              "common": "Argentina"
            },
            "spa": {
              "official": "República Argentina",
              "common": "Argentina"
            }
          }
        },
        "cca3": "ARG"
      },
      {
        "name": {
          "common": "Mexico",
          "official": "United Mexican States",
          "nativeName": {
            "spa": {
              "official": "Estados Unidos Mexicanos",
              "common": "México"
            }
          }
        },
        "cca3": "MEX"
      },
      {
        "name": {
          "common": "Belize",
          "official": "Belize",
          "nativeName": {
            "bjz": {
              "official": "Belize",
              "common": "Belize"
            },
            "eng": {
              "official": "Belize",
              "common": "Belize"
            },
            "spa": {
              "official": "Belice",
              "common": "Belice"
            }
          }
        },
        "cca3": "BLZ"
      },
      {
        "name": {
          "common": "Venezuela",
          "official": "Bolivarian Republic of Venezuela",
          "nativeName": {
            "spa": {
              "official": "República Bolivariana de Venezuela",
              "common": "Venezuela"
            }
          }
        },
        "cca3": "VEN"
      },
      {
        "name": {
          "common": "El Salvador",
          "official": "Republic of El Salvador",
          "nativeName": {
            "spa": {
              "official": "República de El Salvador",
              "common": "El Salvador"
            }
          }
        },
        "cca3": "SLV"
      },
      {
        "name": {
          "common": "Peru",
          "official": "Republic of Peru",
          "nativeName": {
            "aym": {
              "official": "Piruw Suyu",
              "common": "Piruw"
            },
            "que": {
              "official": "Piruw Ripuwlika",
              "common": "Piruw"
            },
            "spa": {
              "official": "República del Perú",
              "common": "Perú"
            }
          }
        },
        "cca3": "PER"
      },
      {
        "name": {
          "common": "Dominican Republic",
          "official": "Dominican Republic",
          "nativeName": {
            "spa": {
              "official": "República Dominicana",
              "common": "República Dominicana"
            }
          }
        },
        "cca3": "DOM"
      },
      {
        "name": {
          "common": "Western Sahara",
          "official": "Sahrawi Arab Democratic Republic",
          "nativeName": {
            "ber": {
              "official": "Sahrawi Arab Democratic Republic",
              "common": "Western Sahara"
            },
            "mey": {
              "official": "الجمهورية العربية الصحراوية الديمقراطية",
              "common": "الصحراء الغربية"
            },
            "spa": {
              "official": "República Árabe Saharaui Democrática",
              "common": "Sahara Occidental"
            }
          }
        },
        "cca3": "ESH"
      },
      {
        "name": {
          "common": "Guatemala",
          "official": "Republic of Guatemala",
          "nativeName": {
            "spa": {
              "official": "República de Guatemala",
              "common": "Guatemala"
            }
          }
        },
        "cca3": "GTM"
      },
      {
        "name": {
          "common": "Ecuador",
          "official": "Republic of Ecuador",
          "nativeName": {
            "spa": {
              "official": "República del Ecuador",
              "common": "Ecuador"
            }
          }
        },
        "cca3": "ECU"
      },
      {
        "name": {
          "common": "Spain",
          "official": "Kingdom of Spain",
          "nativeName": {
            "spa": {
              "official": "Reino de España",
              "common": "España"
            }
          }
        },
        "cca3": "ESP"
      },
      {
        "name": {
          "common": "Panama",
          "official": "Republic of Panama",
          "nativeName": {
            "spa": {
              "official": "República de Panamá",
              "common": "Panamá"
            }
          }
        },
        "cca3": "PAN"
      },
      {
        "name": {
          "common": "Costa Rica",
          "official": "Republic of Costa Rica",
          "nativeName": {
            "spa": {
              "official": "República de Costa Rica",
              "common": "Costa Rica"
            }
          }
        },
        "cca3": "CRI"
      },
      {
        "name": {
          "common": "Nicaragua",
          "official": "Republic of Nicaragua",
          "nativeName": {
            "spa": {
              "official": "República de Nicaragua",
              "common": "Nicaragua"
            }
          }
        },
        "cca3": "NIC"
      }
    ];

    // Simula un retraso de 1 segundo antes de devolver los datos
    return new Promise<Cca3Code[]>(resolve => {
      setTimeout(() => {
        resolve(data);
      }, 500);
    });
  }

  public obtenerBanderaPais(codigoPais: string): Promise<CountryFlag> {
    const url = this.baseUrl + "alpha/" +  codigoPais + "?fields=flags";
    return firstValueFrom(this._httpClient.get<CountryFlag>(url));
  }
}
