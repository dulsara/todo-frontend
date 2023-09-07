import http from "../http-common";
import ITodoData from "../types/todo"

class TodoDataService {
    getAll() {
        return http.get<Array<ITodoData>>("/todos");
    }

    get(id: string) {
        return http.get<ITodoData>(`/todos/${id}`);
    }

    create(data: ITodoData) {
        return http.post<ITodoData>("/todos", data);
    }

    update(data: ITodoData) {
        return http.put<ITodoData>("/todos", data);
    }

    delete(id: string) {
        return http.delete<any>(`/todos/${id}`);
    }
}

export default new TodoDataService();