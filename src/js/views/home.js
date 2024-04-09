import React, { useContext, useEffect, useState } from "react";
import React, { useContext, useEffect, useState } from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { Context } from "../store/appContext";

export const Home = () => {

	const { store, actions } = useContext(Context)
	const [task, setTask] = useState("")

	useEffect(() => {
		actions.getTodos()
		// actions.getTodosPromesas()
	}, [])

	const handleSubmit = e => {
		e.preventDefault()
		actions.addTask(task)
	}

	const handleEdit = (e, el, method) => {
		e.preventDefault()
		console.log(el, method)
		//método como prop dice cual función se va a ejecutar
		method == "put" ? actions.updateTask(el) : actions.deleteTask(el.id)
	}

	return (
		<div className="text-center mt-5">
			<div className="container">
				<form className="form-control bg-secondary text-white" onSubmit={e => handleSubmit(e)}>
					{/* el usuario de la lista de tareas */}
					<p className="text-end my-0 ">user: @{store.user && store.user}</p>
					<h1>Todos</h1>
					<input type="text" className="form-control my-3" onChange={e => setTask(e.target.value)} />
					<input type="submit" hidden value={"Add"} className="form-control" />

					{store.todos?.length > 0 ?
					// solo se puede devolver un hijo, por eso utilizamos un fragmento <></>
						(<>
							{store.todos?.map(el =>
							// la clase "input-group" nos permite agrupar en el input más elementos html
								<div key={el.id} className="input-group flex-nowrap d-flex mt-1">
									<input type="text" className="form-control border-0" defaultValue={el.label} onChange={(e) => el.label = e.target.value} />
									<button className="btn btn-light " onClick={e => handleEdit(e, el, "put")} ><span className="fa-regular fa-pen-to-square text-success"></span></button>
									<button className="btn btn-light " onClick={e => handleEdit(e, el, "delete")}><span className="fa-regular fa-trash-can text-danger"></span></button>
								</div>
							)}
							{/* contador de tareas */}
							<p className="text-start mt-3">Tasks count: {store.todos?.length}</p>
						</>
						)
						:
						<div className="container text-bg-light">

							<p className="fs-5">No tasks... add something!</p>
						</div>
					}
				</form>
			</div>
		</div>
	);
}