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
        return !errorMessage;
    }

    var formElement = document.querySelector(options.form);
    if (formElement) { 
        // Khi submit form
        formElement.onsubmit = function(e) {
            e.preventDefault();

            var isFormValid = true;
            // Lặp qua từng rule và validate
            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector)
                var isValid = validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }
            });
            if (isFormValid) {
                formElement.submit();
            }
        }

        // Lặp qua mỗi rule
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
Validator.checkUpperLimit = function(selector, lowvalue, message) {
    return {
        selector: selector,
        test: function(value) {
            var reg = /^\d+$/;
            if (reg.test(value)) {
                if (value > parseInt(lowvalue)) { 
                    return undefined
                } else { return  message}
            }
            return "Please enter a valid number";
        }
    }
}

Validator.checkLowerLimit = function(selector, highvalue, message) {
    return {
        selector: selector,
        test: function(value) {
            var reg = /^\d+$/;
            if (reg.test(value)) {
                if (value < parseInt(highvalue)) {
                    return undefined
                } else { return  message}
            }
            return "Please enter a valid number";
        }
    }
}