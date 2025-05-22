import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Task} from "../models/task";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment.prod";

@Injectable({ providedIn: 'root' })
export class TaskService {

    private baseUrl = environment.apiBase;  

  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get<Task[]>(this.baseUrl + '/tasks');
  }

  createTask(title: string, deadline: string) {
    return this.http.post<Task>(this.baseUrl + '/task', { title, deadline });
  }


  updateTask(id: string, patch: Partial<Pick<Task,'completed'|'favorite'>>): Observable<Task> {
    return this.http.patch<Task>(`${this.baseUrl}/task/${id}`, patch);
  }

  deleteTask(id: string) {
    return this.http.delete(`${this.baseUrl}/task/${id}`);
  }
}
