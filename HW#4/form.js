const  validateParams = {
    name:{
            pattern:/^[a-zа-яё]+$/i,
            error:'Имя должно содержать только буквы'
    },
    phone:{
            pattern:/^\+7\(\d{3}\)\d{3}-\d{4}$/,
            error:'Телефон должын быть в форме "+7(000)000-0000"'
    },
    email:{
        pattern:/^[\w\.-]+@\w+\.[a-z]{2,4}$/i,
        error:'Email должен выглядеть как email@gmail.com'
    }
};

class Validator{
    static errorClass = 'error-msg';
    form =null;
    params = null;
    valid = false;

    constructor(form,params){
        this.form =document.querySelector(form);
        this.params = params;
        this._init();
    }
    _init(){
        this.form.addEventListener('submit', e =>{
            this._validateForm();
            if(!this.valid){
                e.preventDefault();
            }
        })
    }
    _validateForm(){
        this.valid = false;
        const errors = [...this.form.querySelectorAll(`.${Validator.errorClass}`)];
        for(let error of errors){
            error.remove();
        }
        const formFields = [...this.form.querySelectorAll('input')];

        for(let field of formFields){
            this._validate(field);
        }

        if(![this.form.querySelectorAll(`.invalid`)].length){
            this.valid = true;
        }

    }
    _validate(field){
        if(!this.params[field.name]){
            return;
        }
        const {pattern,error} = this.params[field.name];

        if(!pattern.test(field.value)){
            field.classList.add('invalid');
            this._addErrorMsg(field,error);
            this.watchField(field,pattern,error);
        }
    }
    _addErrorMsg(field,error){
        const errorBlock = `<div class ="${Validator.errorClass}">${error}</div>`;
        field.parentNode.insertAdjacentHTML('beforeend',errorBlock);
    }
    watchField(field,pattern,error){
        field.addEventListener('input',() =>{
            const errorBlock = field.parentNode.querySelector(`${Validator.errorClass}`);
            if(pattern.test(field.value)){
                field.classList.remove('invalid');
                field.classList.add('valid');
                if(errorBlock){
                    errorBlock.remove();
                }
            }else{
                field.classList.remove('valid');
                field.classList.add('invalid');
                if(!errorBlock){
                    this._addErrorMsg(field,error);
                }
            }
        })
    }
}

window.onload = () =>{
    new Validator(`#myform`,validateParams)
}