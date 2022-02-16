/** @format */

class Form {
	constructor() {
		this.form = document.querySelector('form')

		const submitButton = this.form.querySelector(
			'.actions input[type="submit"]',
		)
		const otherActivities = this.form.querySelector(
			'.checkboxWrapper input[name="activities-others"]',
		)

		otherActivities.addEventListener('change', () => {
			const textarea = this.form.querySelector('.checkboxWrapper textarea')
			textarea.classList.toggle('active')
		})

		submitButton.addEventListener('click', e => {
			e.preventDefault()
			if (
				this.isEmpty('clubName') &&
				this.isEmpty('foundationDate') &&
				this.isEmpty('lname') &&
				this.isEmpty('fname') &&
				this.isEmpty('email') &&
				this.isEmpty('password') &&
				this.isEmpty('confirmPassword') &&
				this.isFirstLetterUpper('lname') &&
				this.isFirstLetterUpper('fname') &&
				this.isEspritEmail('email') &&
				this.isValidPassword('password') &&
				this.isConfirmedPassword('password', 'confirmPassword') &&
				this.isValidDate('foundationDate') &&
				this.isValidMemberCount('membersNum') &&
				this.isValidActivities('.checkboxWrapper input')
			) {
				this.displaySuccess()
			}
		})
	}

	isFirstLetterUpper(name) {
		const input = this.form.querySelector(`input[name=${name}]`).value

		if (/^[A-Z]/.test(input)) return true
		return this.displayError(
			'The first letter of first name and Last Name should be capitalized',
		)
	}

	isEmpty(name) {
		const input = this.form.querySelector(`input[name=${name}]`).value

		if (input != '') return true
		return this.displayError('Empty fields')
	}

	isEspritEmail(name) {
		const input = this.form.querySelector(`input[name=${name}]`).value

		if (input.search(/@esprit.tn/i) != -1) return true
		return this.displayError('Email should belong to esprit.tn')
	}

	isValidPassword(name) {
		const input = this.form.querySelector(`input[name=${name}]`).value
		const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/

		if (pattern.test(input)) return true
		return this.displayError(
			'Password must be eight characters minimum with at least one upperCase and one digit',
		)
	}

	isConfirmedPassword(name, confirmName) {
		const input = this.form.querySelector(`input[name=${name}]`).value
		const ConfirmInput = this.form.querySelector(
			`input[name=${confirmName}]`,
		).value

		if (input === ConfirmInput) return true
		return this.displayError("Passwords don't match")
	}

	isValidDate(name) {
		const input = this.form.querySelector(`input[name=${name}]`).value
		const date = new Date(input)

		if (date.getTime() < new Date().getTime()) return true
		return this.displayError('Date is not valid')
	}

	isValidMemberCount(name) {
		const input = +this.form.querySelector(`input[name=${name}]`).value
		if (input >= 10 && input <= 100) return true
		return this.displayError('Member count have to be between 10 and 100')
	}

	isValidActivities(query) {
		const inputs = this.form.querySelectorAll(query)
		let isOneChecked = false
		for (let input of inputs) isOneChecked |= input.checked

		if (isOneChecked) return true
		return this.displayError('At least one Activities should be checked')
	}

	displayError(error) {
		const messageElement = this.form.querySelector('.message')
		messageElement.innerHTML = `<p><i class="fa-solid fa-xmark"></i>${error}</p>`
		messageElement.classList.add('activeError')

		setTimeout(() => {
			messageElement.classList.remove('activeError')
		}, 7000)

		return false
	}

	displaySuccess() {
		const messageElement = this.form.querySelector('.message')
		messageElement.innerHTML = `<p><i class="fa-solid fa-check"></i>Submit Sucess</p>`
		messageElement.classList.add('activeSuccess')

		setTimeout(() => {
			messageElement.classList.remove('activeSuccess')
		}, 7000)
	}
}

export default Form
