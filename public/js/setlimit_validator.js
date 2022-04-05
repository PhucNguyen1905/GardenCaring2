// 
function Validator(options) {

    function validate(inputElement, rule) {
        var errorMessage = rule.test(inputElement.value);
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
        if (errorMessage) {
            errorElement.innerHTML = errorMessage;
        } else { 
            errorElement.innerHTML = '';
        }
    }

    var formElement = document.querySelector(options.form);
    if (formElement) { 
        options.rules.forEach(function (rule) {
            var inputElement = formElement.querySelector(rule.selector)
            if (inputElement) {
                // Xử lý blur khỏi input
                inputElement.onblur = function () {
                    validate(inputElement, rule);
                }
                // Xử lý mỗi khi người dùng nhập
                inputElement.onclick = function () {
                    var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                    errorElement.innerText = '';
                }
            }
        })
    }
}

// Rules define
Validator.isValid = function(selector) {
    return {
        selector: selector,
        test: function(value) {
            var reg = /^\d+$/;
            return reg.test(value) ? undefined : "Vui long nhap so vao day";
        }
    }
}