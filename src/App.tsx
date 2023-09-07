import {Component} from "react";
import {Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTodo from "./components/add-todo.component";
import Todo from "./components/todo-edit.component";
import TodosList from "./components/todo-list.component";
import Login from "./components/login.component";
import AuthService from "./services/auth.service";

type Props = {};
type State = {
    showBoard: boolean
}

class App extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            showBoard: false,
        };
    }

    componentDidMount() {
        const userToken = AuthService.getCurrentUserToken();
        if (userToken) {
            this.setState({
                showBoard: true,

            });
        }
    }

    logOut() {
        AuthService.logout();
        this.setState({
            showBoard: false,
        });
    }

    render() {
        const {showBoard} = this.state;
        return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    {showBoard && (<Link to={"/todos"} className="navbar-brand">
                            E-Todo
                        </Link>
                    )}
                    <div className="navbar-nav mr-auto">
                        {showBoard && (<li className="nav-item">
                                <Link to={"/todos"} className="nav-link">
                                    Todos
                                </Link>
                            </li>
                        )}
                        {showBoard && (<li className="nav-item">
                                <Link to={"/add"} className="nav-link">
                                    Add-Todo
                                </Link>
                            </li>
                        )}
                        {showBoard && (<li className="nav-item">
                                <a href="/login" className="nav-link" onClick={this.logOut}>
                                    LogOut
                                </a>
                            </li>
                        )}
                    </div>
                </nav>

                <div className="container mt-3">
                    <Switch>
                        {showBoard && (<Route exact path="/todos" component={TodosList}/>)}
                        {showBoard && (<Route exact path="/add" component={AddTodo}/>)}
                        {showBoard && (<Route path="/todos/:id" component={Todo}/>)}
                        <Route exact path={["/", "/login"]} component={Login}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
