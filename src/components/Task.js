import React from 'react';
import {connect} from "react-redux";
import ModalDeleteCreateEdit from "./ModalDeleteCreateEdit";

const Task = (props) => {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{props.task.name}</h5>
                <p className="card-text">{props.task.description}</p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Priority: {props.task.priority}
                    <button
                        onClick={() => props.changePriority(props.task._id, 1)}
                        type="button"
                        className="btn btn-outline-info"
                        disabled={props.task.priority == props.priorities[props.priorities.length - 1]}
                    >↑
                    </button>

                    <button
                        onClick={() => props.changePriority(props.task._id, -1)}
                        type="button" className="btn btn-outline-info"
                        disabled={props.task.priority == props.priorities[0]}
                    >
                        ↓
                    </button>
                </li>
                <li className="list-group-item">{props.task.status}</li>
            </ul>
            <div className="card-body">
                <button
                    disabled={props.task.status === props.stringArrayStatuses[0]}
                    onClick={() => props.moveTask(props.task._id, props.task.status, -1)}
                    type="button" className="btn btn-outline-info"
                >←
                </button>
                <ModalDeleteCreateEdit
                    buttonLabel='Delete'
                    buttonStyle="btn btn-outline-danger"
                    modalTitle='Delete Task'
                    task={props.task}
                />
                <ModalDeleteCreateEdit
                    buttonLabel='Edit'
                    buttonStyle="btn btn-outline-warning"
                    modalTitle='Edit Task'
                    task={props.task}
                />
                <button
                    disabled={props.task.status === props.stringArrayStatuses[props.stringArrayStatuses.length - 1]}
                    onClick={() => props.moveTask(props.task._id, props.task.status, 1)}
                    type="button" className="btn btn-outline-info"
                >→
                </button>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    priorities: state.priorities,
    stringArrayStatuses: state.statuses.map(el => el.title)
})
const mapDispatchToProps = (dispatch) => ({
    changePriority: (id, direction) => dispatch({type: 'CHANGE_PRIORITY', payload: {id, direction}}),
    moveTask: (id, oldStatus, direction) => dispatch({type: 'MOVE_TASK', payload: {id, oldStatus, direction}})
})

export default connect(mapStateToProps, mapDispatchToProps)(Task);