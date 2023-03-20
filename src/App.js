import './App.css';
import {connect} from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import Column from "./components/Column";
import ModalDeleteCreateEdit from "./components/ModalDeleteCreateEdit";

function App(props) {
    return (
        <div className="App">
            <h1>{props.appName}</h1>

            <ModalDeleteCreateEdit
                buttonLabel= 'Create task'
                buttonStyle="btn btn-outline-info"
                modalTitle="Create Task"
            />
            <div className="container">
                <div className="row align-items-start">
                    {props.statuses.map(status =>
                        <Column
                            key={status._id}
                            status={status}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    appName: state.appName,
    statuses: state.statuses
})


export default connect(mapStateToProps)(App);
