import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiCallsService {
  private apiUrl = '/api/';

  constructor(private http: HttpClient) {}

  postCredentials(credentials: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<any>(this.apiUrl, credentials, { headers: headers })
      .pipe(
        catchError((error) => {
          console.error('Error in postCredentials:', error);
          throw error;
        })
      );
  }
}
