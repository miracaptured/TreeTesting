import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { map } from 'rxjs/operators'; 
import { environment } from 'src/environments/environment';

 
@Injectable({ 
  providedIn: 'root' 
}) 
export class ApiService {

  private REST_API_SERVER = `http://${environment.apiHost}:8000/`; 
  constructor(private httpClient: HttpClient) { } 


  getTypeRequest(url, responseType = "json") {
    const requestOptions : any = {
      responseType: responseType
    }
    return this.httpClient.get(this.REST_API_SERVER+url, requestOptions).pipe(map(res => { 
      return res; 
    })); 
  } 
 
  postTypeRequest(url:string, payload: any, content_type = 'application/json') { 
    return this.httpClient.post(this.REST_API_SERVER+url, payload, { headers : {'Content-Type' : content_type } }).pipe(map(res => res)); 
  } 
 
  putTypeRequest(url, payload) { 
    return this.httpClient.put(this.REST_API_SERVER+url, payload).pipe(map(res => res)) 
  }

  deleteTypeRequest(url) {
    return this.httpClient.delete(this.REST_API_SERVER+url).pipe(map(res => res))
  }
}