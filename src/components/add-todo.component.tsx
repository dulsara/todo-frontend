import {Component, ChangeEvent} from "react";
import TodoDataService from "../services/todo.service";
import ITodoData from '../types/todo';

type Props = {};

type State = ITodoData & {
    submitted: boolean
    message: string;
};

export default class AddTodo extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.saveTodo = this.saveTodo.bind(this);
        this.newTodo = this.newTodo.bind(this);
        this.handleSelect = this.handleSelect.bind(this);

        this.state = {
            id: null,
            title: "",
            description: "",
            status: "NEW",
            submitted: false,
            message: "",
        };

    }

    onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeStatus(e: ChangeEvent<HTMLSelectElement>) {
        this.setState({
            status: e.target.value
        });
    }

    handleSelect(e: ChangeEvent<HTMLSelectElement>) {
        this.setState({status: e.target.value});
    }

    saveTodo() {
        const data: ITodoData = {
            title: this.state.title,
            description: this.state.description,
            status: this.state.status
        };

        TodoDataService.create(data)
            .then((response: any) => {
                    this.setState({
                        id: response.data.id,
                        title: response.data.title,
                        description: response.data.description,
                        status: response.data.status,
                        submitted: true,
                        message: ""
                    });
                    console.log(response.data);
                },
                e => {
                    this.setState({
                        message: e.response.data.message
                    });
                    console.log(e);
                });
    }

    newTodo() {
        this.setState({
            id: null,
            title: "",
            description: "",
            status: "NEW",
            message: "",
            submitted: false
        });
    }

    render() {
        const {submitted, title, description, status} = this.state;

        return (
            <div className="submit-form">
                {submitted ? (
                    <div>
                        <h4>TODO Item has been added successfully!</h4>
                        <button className="btn btn-success" onClick={this.newTodo}>
                            Add
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                required
                                value={title}
                                onChange={this.onChangeTitle}
                                name="title"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                required
                                value={description}
                                onChange={this.onChangeDescription}
                                name="description"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="status">Status</label>
                            <div>
                                <select id="status" onChange={this.onChangeStatus} value={status}>
                                    <option value="NEW">NEW</option>
                                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                                    <option value="DONE">DONE</option>
                                </select>
                            </div>
                        </div>

                        <button onClick={this.saveTodo} className="btn btn-success">
                            Submit
                        </button>
                        <p style={{color: 'red'}}>{this.state.message}</p>
                    </div>
                )}
            </div>
        );
    }
}
