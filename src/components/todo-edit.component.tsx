import {Component, ChangeEvent} from "react";
import {RouteComponentProps} from 'react-router-dom';

import TodoDataService from "../services/todo.service";
import ITodoData from "../types/todo";

interface RouterProps { // type for `match.params`
    id: string; // must be type `string` since value comes from the URL
}

type Props = RouteComponentProps<RouterProps>;

type State = {
    currentTodo: ITodoData;
    message: string;
}

export default class Todo extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.getTodo = this.getTodo.bind(this);
        this.updateTodo = this.updateTodo.bind(this);

        this.state = {
            currentTodo: {
                id: null,
                title: "",
                description: "",
                status: ""
            },
            message: "",
        };
    }

    componentDidMount() {
        this.getTodo(this.props.match.params.id);
    }

    onChangeStatus(e: ChangeEvent<HTMLSelectElement>) {
        const status = e.target.value;

        this.setState((prevState) => ({
            currentTodo: {
                ...prevState.currentTodo,
                status: status,
            },
        }));
    }

    onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
        const title = e.target.value;

        this.setState((prevState) => ({
            currentTodo: {
                ...prevState.currentTodo,
                title: title,
            },
        }));
    }

    onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
        const description = e.target.value;

        this.setState((prevState) => ({
            currentTodo: {
                ...prevState.currentTodo,
                description: description,
            },
        }));
    }

    getTodo(id: string) {
        TodoDataService.get(id)
            .then((response: any) => {
                this.setState({
                    currentTodo: response.data,
                });
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    updateTodo() {
        TodoDataService.update(
            this.state.currentTodo
        )
            .then((response: any) => {
                    console.log(response.data);
                    this.setState({
                        currentTodo: response.data,
                        message: "",
                    });
                    alert("Todo has been updated successfully")
                    this.props.history.push("/todos");
                    window.location.reload();
                },
                e => {
                    this.setState({
                        message: e.response.data.message
                    });
                    console.log(e);
                });
    }

    render() {
        const {currentTodo} = this.state;

        return (
            <div>
                {currentTodo ? (
                    <div className="edit-form">
                        <h4>Todo Edit</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Title : </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    required
                                    value={currentTodo.title}
                                    onChange={this.onChangeTitle}
                                    name="title"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description : </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    required
                                    value={currentTodo.description}
                                    onChange={this.onChangeDescription}
                                    name="description"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="status">Status</label>
                                <div>
                                    <select id="status" onChange={this.onChangeStatus}
                                            value={this.state.currentTodo.status}>
                                        <option value="NEW">NEW</option>
                                        <option value="IN_PROGRESS">IN_PROGRESS</option>
                                        <option value="DONE">DONE</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                        {" "}
                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updateTodo}
                        >
                            UPDATE
                        </button>
                        <p style={{color: 'red'}}>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br/>
                        <p>Please Contact Support Team. Edit Functionality not working ...</p>
                    </div>
                )}
            </div>
        );
    }
}
