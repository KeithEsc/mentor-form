const form = document.querySelector("form");


function validateField (field) {

    const errorElement = field.closest('.field-parent').querySelector('.error-message')
        

    if (!field.validity.valid) {
        console.log("field is invalid:", field);
        errorElement.textContent = field.dataset.error || "This field is required";
        return false;
    }

     errorElement.textContent = "";
    return true;
}

form.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener("blur", () => {
        validateField(input);
    });
})

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;

    const fields = form.querySelectorAll('input:not([type="radio"]), textarea, input[type="radio"]:first-of-type');;

    fields.forEach(field => {
        console.log(`Checking ${field.name}`)
        const fieldValid = validateField(field);
        if (!fieldValid) {
            isValid = false;
        }
    })

    if (isValid) {
        const toast = document.getElementById('success-toast');
        toast.classList.add('show');
        setTimeout(() => {
    toast.classList.remove('show');
}, 5000); 
        console.log("submitting");
        form.reset();
    }
        else {
            console.log("error");
            form.querySelector(':invalid').focus();
        }
    }
);