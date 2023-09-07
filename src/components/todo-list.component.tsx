import {Component} from "react";
import TodoDataService from "../services/todo.service";
import {Link} from "react-router-dom";
import ITodoData from '../types/todo';

type Props = {};

type State = {
    todos: Array<ITodoData>,
    currentTodo: ITodoData | null,
    currentIndex: number,
};

export default class TodosList extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.retrieveTodos = this.retrieveTodos.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveTodo = this.setActiveTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);


        this.state = {
            todos: [],
            currentTodo: null,
            currentIndex: -1,
        };
    }

    componentDidMount() {
        this.retrieveTodos();
    }

    retrieveTodos() {
        TodoDataService.getAll()
            .then((response: any) => {
                this.setState({
                    todos: response.data
                });
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    deleteTodo() {
        TodoDataService.delete(this.state.currentTodo?.id)
            .then((response: any) => {
                console.log(response.data);
                this.refreshList();
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveTodos();
        this.setState({
            currentTodo: null,
            currentIndex: -1
        });
    }

    setActiveTodo(todo: ITodoData, index: number) {
        this.setState({
            currentTodo: todo,
            currentIndex: index
        });
    }

    render() {
        const {todos, currentTodo, currentIndex} = this.state;

        return (
            <div className="list row">
                <div className="col-md-8">
                </div>
                <div className="col-md-6">
                    <h4>Todo List</h4>

                    <ul className="list-group">
                        {todos &&
                            todos.map((todo: ITodoData, index: number) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveTodo(todo, index)}
                                    key={index}
                                >
                                    {todo.title}
                                </li>
                            ))}
                    </ul>
                </div>
                <div className="col-md-6">
                    {currentTodo ? (
                        <div>
                            <h4>Todo</h4>
                            <div>
                                <label>
                                    <strong>Title:</strong>
                                </label>{" "}
                                {currentTodo.title}
                            </div>
                            <div>
                                <label>
                                    <strong>Description:</strong>
                                </label>{" "}
                                {currentTodo.description}
                            </div>
                            <div>
                                <label>
                                    <strong>Status:</strong>
                                </label>{" "}
                                {currentTodo.status}
                            </div>

                            <Link
                                to={"/todos/" + currentTodo.id}
                                className="badge badge-warning"
                            >
                                UPDATE
                            </Link>
                            {" "}
                            <button
                                className="badge badge-success"
                                onClick={this.deleteTodo}
                            >
                                DELETE
                            </button>


                        </div>
                    ) : (
                        <div>
                            <br/>
                            <p>Please click on a Todo Item for more details...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
