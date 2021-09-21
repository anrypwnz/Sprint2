const isEmail = (email: string): string => {
    const reg = /^(?!.*(\.\.))[a-zA-Z0-9]+[-_\.\dA-Za-z]*@[a-zA-Z\d]+[-_\da-z]*\.[a-z]+$/;
    return reg.test(email) ? '' : 'Некорректный email.'
};

const isPhone = (phone: string): string => {
    const reg = /^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/gm;
    return reg.test(phone) ? '' : 'Некорректный номер телефона'
}

const isNotEmpty = (value: string): string => value ? '' : 'Заполните поля'

const isPassword = (password: string): string => {
    const reg = /(?=.*\d)(?=.*[a-z/а-я])(?=.*[A-Z/А-Я]).{8,}/;
    return reg.test(password) ? '' : 'Некорректный пароль'
}

const isPasswordSame = (repeatedPassword: string): string => {
    const pass = (<HTMLInputElement>(document.querySelector(`input[name="password"]`))).value;
    return repeatedPassword === pass ? '' : 'Пароли не совпадают'
}

export {
    isEmail,
    isPhone,
    isNotEmpty,
    isPassword,
    isPasswordSame
}