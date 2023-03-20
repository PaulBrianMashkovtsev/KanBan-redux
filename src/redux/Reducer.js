const initialState = {
    tasks: [
        {
            "_id": "6408d733cb38b9830bb3640b",
            "name": "Create new Task",
            "description": "It's taking a few hours!",
            "status": "in progress",
            "priority": "6",
        },
        {
            "_id": "6408d77dcb38b9830bb3640e",
            "name": "Repeat Kanban",
            "description": "It take a few hours!",
            "status": "todo",
            "priority": "7",
        },
        {
            "_id": "6408d79326c06d63587a12bc",
            "name": "qqqq",
            "description": "aaaaa",
            "status": "done",
            "priority": "1",
        },
        {
            "_id": "6408d79e26c06d63587a12bf",
            "name": "Create a new task!",
            "description": "Make a practice",
            "status": "in progress",
            "priority": "7",
        },
        {
            "_id": "6408d7c826c06d63587a12c8",
            "name": "www",
            "description": "sss",
            "status": "review",
            "priority": "1",
        },
    ],
    statuses: [
        {
            "_id": "63961cc83be09ca981162e5f",
            "title": "todo",
            "status": "todo",
            "__v": 0
        },
        {
            "_id": "63961d16edc05edbb0d97476",
            "title": "in progress",
            "status": "in progress",
            "__v": 0
        },
        {
            "_id": "63961d28edc05edbb0d97478",
            "title": "review",
            "status": "review",
            "__v": 0
        },
        {
            "_id": "63961d2fedc05edbb0d9747a",
            "title": "done",
            "status": "done",
            "__v": 0
        }
    ],
    priorities: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    appName: 'Kanban Board',
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_TASK':
            return {...state, tasks: [...state.tasks, action.payload]};
        case 'CHANGE_PRIORITY':
            const newTasks = state.tasks.map((el) =>
                el._id === action.payload.id
                    ?
                    {...el, priority: +el.priority + action.payload.direction}
                    : el
            )
            return {...state, tasks: newTasks}
        case 'MOVE_TASK':
            const statusesString = state.statuses.map(el => el.title)
            const oldIndex = statusesString.indexOf(action.payload.oldStatus)
            const newIndex = oldIndex + action.payload.direction
            const newStatus = statusesString[newIndex]
            const movedTasks = state.tasks.map(task =>
                task._id === action.payload.id
                    ?
                    {...task, status: newStatus}
                    : task
            )
            return {...state, tasks: movedTasks}
        case 'UPDATE_TASK':
            const updatedTasks = state.tasks.map(task =>
                task._id === action.payload.id
                    ?
                    {...task, ...action.payload.updateTask}
                    : task
            )
            return {...state, tasks: updatedTasks}
        case 'DELETE_TASK':
            const deletedTasks = state.tasks.filter(task => task._id !== action.payload)
            return {...state, tasks: deletedTasks}
        default:
            return state;
    }
}
export default reducer;