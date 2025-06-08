document.addEventListener('DOMContentLoaded', () => {
	const form = document.getElementById('user-form')
	const nameInput = document.getElementById('name')
	const surnameInput = document.getElementById('surname')
	const emailInput = document.getElementById('email')
	const ageInput = document.getElementById('age')
	const dateBirthInput = document.getElementById('date_birth')
	const userTableBody = document.getElementById('user-table-body')

	// 🧠 Rejestracja Service Workera
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker
			.register('../service_worker.js')
			.then(reg => console.log('✅ Service Worker zarejestrowany:', reg.scope))
			.catch(err => console.error('❌ Błąd przy rejestracji Service Workera:', err))
	}

	// ➕ Obsługa formularza - dodawanie użytkownika
	form.addEventListener('submit', async e => {
		e.preventDefault()

		const name = nameInput.value.trim()
		const surname = surnameInput.value.trim()
		const email = emailInput.value.trim()
		const age = ageInput.value.trim()
		const date_birth = dateBirthInput.value.trim()

		if (!name || !email) {
			alert('❗ Uzupełnij wszystkie pola.')
			return
		}

		try {
			const response = await fetch('../api/add_user.php', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ name, surname, email, age, date_birth }),
			})

			const result = await response.json()

			if (response.ok) {
				alert('✅ Dodano użytkownika!')
				form.reset()
				loadUsers()
			} else {
				alert('❌ Błąd dodawania: ' + (result.error || 'Nieznany błąd'))
			}
		} catch (error) {
			alert('❌ Błąd połączenia: ' + error.message)
		}
	})

	// 🔄 Ładowanie użytkowników do tabeli
	async function loadUsers() {
		try {
			const response = await fetch('../api/get_users.php')
			const users = await response.json()

			userTableBody.innerHTML = ''
			users.forEach(user => {
				const row = document.createElement('tr')
				row.innerHTML = `
					<td>${user.name}</td>
					<td>${user.surname}</td>
					<td>${user.email}</td>
					<td>${user.age || ''}</td>
					<td>${user.date_birth || ''}</td>
				`
				userTableBody.appendChild(row)
			})
		} catch (error) {
			console.error('❌ Błąd ładowania użytkowników:', error)
		}
	}

	loadUsers()
})
