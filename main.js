// Import our custom CSS
import '/style.scss'
import '/_map.scss'

import { Application } from '@hotwired/stimulus'
import { registerControllers } from 'stimulus-vite-helpers'

const application = Application.start()
const controllers = import.meta.globEager('/controllers/*_controller.js')
registerControllers(application, controllers)
