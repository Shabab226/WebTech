window.onload = function () {
 
    const requiredFields = [
        "First Name",
        "Last Name",
        "Address 1",
        "City",
        "Zip Code",
        "Email"
    ];
 
    const form = document.querySelector("body");
 
    const continueBtn = document.querySelector(".buttons button:last-child");
 
    continueBtn.addEventListener("click", function (event) {
        event.preventDefault();
 
        let inputs = document.querySelectorAll("input[type='text'], select");
        let valid = true;
        let missing = [];
 
        inputs.forEach(input => {
            if (input.hasAttribute("required") && input.value.trim() === "") {
                valid = false;
                missing.push(input.previousElementSibling?.innerText || "Field");
            }
        });
 
        if (!valid) {
            alert("Please fill all required fields:\n\n" + missing.join("\n"));
            return;
        }
 
 
        let email = document.querySelector("input[type='text'][required]:nth-of-type(6)");
        let emailValue = email.value.trim();
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 
        if (!emailPattern.test(emailValue)) {
            alert("Please enter a valid email address.");
            return;
        }
 
        alert("Form Submitted Successfully!");
    });
 
 
 
    const amountRadios = document.querySelectorAll("input[name='amount']");
    const otherAmountInput = document.querySelectorAll("input[type='text']")[10];
 
    amountRadios.forEach(radio => {
        radio.addEventListener("change", function () {
            if (radio.nextSibling.textContent.includes("Other")) {
                otherAmountInput.style.display = "inline-block";
            } else {
                otherAmountInput.style.display = "none";
                otherAmountInput.value = "";
            }
        });
    });
 
 
 
    const recurringCheck = document.getElementById("recurring-donation");
    const ccSection = document.querySelector(".cc");
 
    ccSection.style.display = "none";
 
    recurringCheck.addEventListener("change", () => {
        ccSection.style.display = recurringCheck.checked ? "block" : "none";
    });
 
 
    document.getElementById("state").value = "Dhaka";
    document.getElementById("country").value = "Bangladesh";
 
 
 
 
    const emailField = document.querySelector("input[type='text'][required]:nth-of-type(6)");
    emailField.insertAdjacentElement("afterend", confirmPass);
    emailField.insertAdjacentElement("afterend", password);
 
    continueBtn.addEventListener("click", () => {
        if (password.value !== confirmPass.value) {
            alert("Password and Confirm Password do not match!");
            return;
        }
    });
 
 
    const resetBtn = document.querySelector(".buttons button:first-child");
 
    resetBtn.addEventListener("click", function (e) {
        let ok = confirm("Are you sure you want to reset the form?");
        if (!ok) e.preventDefault();
    });
 
 
   
    const donationTypeRadios = document.querySelectorAll("input[name='donation-type']");
    const acknowledgeFields = document.querySelectorAll(".donation-info input[type='text']:nth-of-type(2), .donation-info input[type='text']:nth-of-type(3)");
 
    donationTypeRadios.forEach(radio => {
        radio.addEventListener("change", () => {
            acknowledgeFields.forEach(field => {
                field.style.display = radio.checked ? "block" : "none";
            });
        });
    });
 
 
 
 
    const comments = document.querySelector("textarea");
    const maxChars = 200;
 
    comments.addEventListener("input", () => {
        if (comments.value.length > maxChars) {
            comments.value = comments.value.substring(0, maxChars);
            alert("Comment limit is 200 characters!");
        }
    });
 
 
    const ccAmount = document.querySelector(".cc input:nth-of-type(1)");
    const ccMonths = document.querySelector(".cc input:nth-of-type(2)");
 
    const totalDiv = document.createElement("p");
    totalDiv.style.marginLeft = "190px";
    totalDiv.style.fontWeight = "bold";
    ccSection.appendChild(totalDiv);
 
    function updateTotal() {
        if (ccAmount.value && ccMonths.value) {
            let total = Number(ccAmount.value) * Number(ccMonths.value);
            totalDiv.innerHTML = "Total Recurring Donation: $" + total;
        } else {
            totalDiv.innerHTML = "";
        }
    }
 
    ccAmount.addEventListener("input", updateTotal);
    ccMonths.addEventListener("input", updateTotal);
 
};
 
 