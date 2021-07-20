import './chat-page.less'
import '../../src/styles/styles.less'
import '../../src/styles/general.less'


document.querySelector('.info-panel__menu-btn').addEventListener('mousedown', () => {
    document.querySelector('.info-panel__menu').classList.toggle('modal-options_show')
})

document.querySelector('.msg-panel__add-file').addEventListener('mousedown', () => {
    document.querySelector('.modal-options').classList.toggle('modal-options_show')
})

