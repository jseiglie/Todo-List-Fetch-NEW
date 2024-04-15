const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			todos: null,
			user: null,
			todos: null,
			user: null
		},
		actions: {
			// Use getActions to call a function within a fuction
			getTodosPromesas: () => {
				fetch("https://playground.4geeks.com/todo/users/Aelf86")
					.then(resp => resp.json())
					.then(data => {
						setStore({ newTodos: data })
						console.log("traido por promesas ---> ", data)
					})
					.catch(error => console.log(error))
			},
			createUser: async () => {
				const opt = {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					}
				}
				try {
					const resp = await fetch("https://playground.4geeks.com/todo/users/seiglie", opt)
					//verificamos si respuesta diferente a 200
					if (resp.status != 200) {
						console.log("error creando usuario")
					}
					const data = await resp.json()
					console.log("se creo el usuario ---> ", data)
					//se crea el usuario y se llama la funcion para traerse los todos
					return getActions().getTodos()
				} catch (error) {
					console.log("error ---> ", error)
				}
			},
			getTodos: async () => {
				try {
					const resp = await fetch("https://playground.4geeks.com/todo/users/seiglie")
					//verificamos que exista el usuario, si no existe, se llama la funcion createUser para crearlo
					if (resp.status == 404) {
						return getActions().createUser()
					};
					const data = await resp.json()
					console.log("se ejecutó del flux ---> ", data)
					setStore({ todos: data.todos, user: data.name })
				} catch (error) {
					console.log("error ---> ", error)
				}
			},
			addTask: async (task) => {
				if (task.trim().length > 3) {
					//creamos variable auxiliar para trabajar con el todos del store
					const aux = getStore().todos
					aux.push({ label: task.trim(), is_done: false })
					setStore({ todos: aux })
					try {
						const opt = {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							//al API solo se le envía la tarea a añadir, NO la lista entera
							body: JSON.stringify({ label: task.trim(), is_done: false })
						}
						const resp = await fetch("https://playground.4geeks.com/todo/todos/seiglie", opt)
						const data = await resp.json()
						console.log("new task added ---> ", data)
						//no necesitamos traernos las tareas de nuevo
						return true
					} catch (error) {
						console.log("error ---> ", error);
						return false
					}
				}
				//si tarea nueva es menor a 3 en largo, se lanza alerta
				alert("Task shouln't be less than 4 characters")
				return false
			},
			updateTask: async el => {
				if (el.label.trim().length > 3) {
				try {
					const opt = {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
						// se envia la tarea a modificar solamente
						body: JSON.stringify(el)
					}
					//se pasa el id de la tarea que se va a modificar en el endpoint
					const resp = await fetch("https://playground.4geeks.com/todo/todos/" + el.id, opt)
					const data = await resp.json()
					console.log("updated task --> ", await data)
					return true
				} catch (error) {
					console.log("error ---> ", error);
					return false
				}
			}
				//si nuevo valor de la tarea es menor a 3 en largo, se lanza alerta
			alert("Task shouln't be less than 4 characters")
				return false
			},
			deleteTask: async (id) => {
				try {
					//guardamos en un variable auxiliar la lista de tareas sin la tarea que se elimina y la guardamos en el store
					const aux = getStore().todos.filter(el => el.id != id)
					setStore({ todos: aux })
					const opt = {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
						},
					}
					//se envía el id de la tarea a eliminar
					const resp = await fetch("https://playground.4geeks.com/todo/todos/" + id, opt)
					const data = await resp.json()
					console.log("deleted task ---> ", await data)
					return true
				} catch (error) {
					console.log("error ---> ", error);
					return false
				}
			}
		}
	};
};

export default getState;
