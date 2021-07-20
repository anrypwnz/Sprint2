import './login.less'

const signInForm = document.forms.signIn;

signInForm.login.addEventListener('blur', (e) => {
  const val = e.target.value;
  const errMsg = e.target.parentNode.children[2];

  if(val.length < 2 || val.length > 16) {
    errMsg.style.display = 'block'
    e.target.parentNode.children[1].classList.add('form-input_error')
  } else {
    errMsg.style.display = 'none';
    e.target.parentNode.children[1].classList.remove('form-input_error')
  }
})

signInForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(signInForm.login.value, signInForm.password.value);

})
