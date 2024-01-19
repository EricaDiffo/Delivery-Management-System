const form=document.querySelector("form");
const fullName=document.getElementById("name");
const email=document.getElementById("email");
const phone=document.getElementById("phone");
const subject=document.getElementById("subject");
const mess=document.getElementById("message");

function sendEmail(){
  const bodyMessage=`Full Name: ${fullName.value}<br> Email: ${email.
    value}<br> Phone Number: ${phone.value}<br> Message: ${mess.value}`;

    Email.send({
    Host : "smtp.elasticemail.com",
    Username : "dorianrick2@gmail.com",
    Password : "0E7C9E3ED69093F6EDDB7EC380C060DD0ACD",
    To : 'dorianrick2@gmail.com',
    From : "dorianrick2@gmail.com",
    Subject : subject.value,
    Body : bodyMessage
}).then(
  message => alert(message)
);
}

form.addEventListener("submit",(e)=>{
  e.preventDefault();

  sendEmail();
});