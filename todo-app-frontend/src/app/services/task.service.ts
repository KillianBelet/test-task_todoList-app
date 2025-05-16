import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Task} from "../models/task";
import {API_URL} from "../app.component";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class TaskService {

  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get<Task[]>(API_URL + '/tasks');
  }

  createTask(title: string, deadline: string) {
    return this.http.post<Task>(API_URL + '/task', { title, deadline });
  }


  updateTask(id: string, patch: { completed: boolean }): Observable<Task> {
    return this.http.patch<Task>(`${API_URL}/task/${id}`, patch);
  }

  deleteTask(id: string) {
    return this.http.delete(`${API_URL}/task/${id}`);
  }
}
