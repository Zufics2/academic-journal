(function email() {
    emailjs.init("INk2EVvYFFITsRRBo");
})();

document.getElementById("submissionForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const params = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        age: document.getElementById("age").value,
        school: document.getElementById("school").value,
        pathway: document.getElementById("pathway").value,
        email: document.getElementById("email").value,
        affiliations: document.getElementById("affiliations").value,
        googleDoc: document.getElementById("googleDoc").value,
        comments: document.getElementById("comments").value
    };

    emailjs.send("service_kgfw1sp", "template_pjp09lc", params)
        .then(() => {
            alert("Form successfully submited!");
        }, (err) => {
            alert("Sending error: " + JSON.stringify(err));
        });
});