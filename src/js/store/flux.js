const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
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
					if (resp.status == 200) {
						console.log("se creo el usuario ---> ", data)
						return getActions().getTodos()
					}
					const data = await resp.json()
					console.log("data de usuario nuevo ---> ", data);

				} catch (error) {
					console.log("error ---> ", error)
				}
			},
			getTodos: async () => {
				try {
					const resp = await fetch("https://playground.4geeks.com/todo/users/seiglie")
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
					const aux = getStore().todos
					aux.push({ label: task.trim(), is_done: false })
					setStore({ todos: aux })
					try {
						const opt = {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({ label: task.trim(), is_done: false })
						}
						const resp = await fetch("https://playground.4geeks.com/todo/todos/seiglie", opt)
						const data = await resp.json()
						console.log(data)
						return true
					} catch (error) {
						console.log("error ---> ", error);
						return false
					}
				}
				alert("Task shouln't be less than 4 characters")
				return false
			},
			updateTask: async (el, i) => { 
				try {
					console.log(getStore().todos[i], el)

					const opt = {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(el)
					}
					const resp = await fetch("https://playground.4geeks.com/todo/todos/"+el.id, opt)
					const data = await resp.json()
					console.log("updated task ", await data)
					return true
				} catch (error) {
					console.log("error ---> ", error);
					return false
				}
			},
			deleteTask: async (id) => {
				try {
					const aux = getStore().todos.filter(el=> el.id != id)					
					setStore({ todos: aux })
					const opt = {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
						},
					}
					const resp = await fetch("https://playground.4geeks.com/todo/todos/"+id, opt)
					const data = await resp.json()
					console.log("deleted task ", await data)
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
