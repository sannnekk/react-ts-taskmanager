import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import './App.css';
import Column from './components/Column';
import Button from './components/primitives/Button';
import Input from './components/primitives/Input';
import state from './state';

function App(): React.ReactElement {
	function onDragEnd(result: DropResult) {
        const { source, destination } = result;

        if (!destination) return;

        if (source.droppableId == destination.droppableId) {
			state.columns[+destination.droppableId].updateList(
				source.index,
				destination.index
			);
        } else {
			let tmp = state.columns[+source.droppableId].list[source.index];
			state.columns[+source.droppableId].removeTask(source.index);
			state.columns[+destination.droppableId].addTask(tmp, destination.index);
		}
    };
	return (
		<>
			<header className="teal lighten-">
				<div className="container">
				<div className="row">
					<div className="col s1">
						<img className="logo" alt="" src="https://upload.wikimedia.org/wikipedia/commons/0/07/VisualEditor_-_Icon_-_Indent-list-ltr_-_white.svg"/>
					</div>
					<div className="col s11">
					<h2 className="header-text white-text">
						Task manager
					</h2>
					</div>
				</div>
				</div>
			</header>
			<div className="container">
				<div className="row wrappable">
					<DragDropContext onDragEnd={ (result) => onDragEnd(result) }>
					{
						state.columns.map(column => (
							<div className="col s4 h-100p">
								<Column list={ column.list }
										header={ column.header }
										newTask={ column.newTask }
										itemId={ column.getId() }
										onColumnRemove={ (id) => state.removeColumn(id) } 
										onTaskAdd={ (task) => column.addTask(task) } 
										onTaskRemove={ (id) => column.removeTask(id) }
										onNewTaskChange={ (task) => column.newTaskChanged(task) }/>
							</div>)
						)
					}
					</DragDropContext>
					<div className="col s4">
						<h5>Add Column</h5>
						<Input placeholder="Column name"
							value={ state.addColumnForm.name }
							onChange={ (text) => state.addColumnForm.setColumnForm(text) }/>
						<Button text="Add column"
								classes=""
								onClick={ state.addColumnForm.addSection }/>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;