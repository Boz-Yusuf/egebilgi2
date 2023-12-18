import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/global/service/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiCallsService {
  private apiUrl = 'http://localhost:3500/sentence/';

  constructor(private http: HttpClient,
    private authService: AuthService,
    private router: Router) { }

  async getPosData(): Promise<any> {
    const getPosUrl = this.apiUrl + 'pos';
    const authToken = 'bearer ' + this.authService.getAccessToken();
    const headers = new HttpHeaders({

      'Content-Type': 'application/json',
      'Authorization': authToken,
    });
    return new Promise<any>((resolve, reject) => {
      this.http.get<any>(getPosUrl, { headers: headers }).subscribe(
        (response) => {
          // Asenkron işlem tamamlandığında response değerini resolve edin
   
          
          if (response.statues == 403)
          this.router.navigate(['/signIn']);


          resolve(response.data);  
        },
        (error) => {
          // Hata durumunda reject fonksiyonunu çağırabilirsiniz
        
          reject(error);
        }
      );
    });
  }

  async getNerData(): Promise<any> {
   
    const getNerUrl = this.apiUrl + 'ner';
    const authToken = 'bearer ' + this.authService.getAccessToken();
    const headers = new HttpHeaders({

      'Content-Type': 'application/json',
      'Authorization': authToken,
    });
    return new Promise<any>((resolve, reject) => {
      this.http.get<any>(getNerUrl, { headers: headers }).subscribe(
        (response) => {
          console.log(response.data)
          // Asenkron işlem tamamlandığında response değerini resolve edin
          resolve(response.data);
        },
        (error) => {

          // Hata durumunda reject fonksiyonunu çağırabilirsiniz
          reject(error);
        }
      );
    });
  }



  async sendPosData(answerData:any): Promise<any> {
    const sendPosUrl = this.apiUrl + 'posTest';
    const authToken = 'bearer ' + this.authService.getAccessToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': authToken,
    });
  
  
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>(sendPosUrl, answerData, { headers: headers }).subscribe(
        (response) => {
          // Asenkron işlem tamamlandığında response değerini resolve edin
          resolve(response.data);
          this.router.navigate(['/']);
        },
        (error) => {

 
          // Hata durumunda reject fonksiyonunu çağırabilirsiniz
          reject(error);
       
        }
      );
    });
  }


  async sendNerData(answerData:any): Promise<any> {
    const sendNerUrl = this.apiUrl + 'ner';
    const authToken = 'bearer ' + this.authService.getAccessToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': authToken,
    });
  
  
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>(sendNerUrl, answerData, { headers: headers }).subscribe(
        (response) => {
          // Asenkron işlem tamamlandığında response değerini resolve edin
          resolve(response.data);
          this.router.navigate(['/']);
        },
        (error) => {
          // Hata durumunda reject fonksiyonunu çağırabilirsiniz
          reject(error);
        }
      );
    });
  }
  




}
