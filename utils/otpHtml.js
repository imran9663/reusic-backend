const otpHtml = (OTP) => {
    return `
    <div style="
margin: 0;
padding: 0;
box-sizing: border-box;
width: 100vw; height: 
100vh ;display:flex; 
justify-content: center;
align-items: center;
background:#42c83c;
">


    <div style="width:500px; height:500px;
    background: #f1f1f1;
    border-radius:12px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; 
    display:flex ;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    margin-top: 12px
    ">
        <img style="width:150px;height:auto; object-fit:contain "
            src="https://cdn.pixabay.com/photo/2013/04/01/09/02/read-only-98443_960_720.png" alt="">
        <p style="font-size:24px; color:#1e1e1e; font-family: Gill Sans, sans-serif; ">Hi </p>
        <p style="font-size:20px; color:#1e1e1e; font-family: Gill Sans, sans-serif; margin: unset; "> Here is your One
            Time Password
        </p>
        <p style="font-size:16px; color:#1e1e1e; font-family: Gill Sans, sans-serif; margin: unset;"> to verify your
            acccount</p>
        <h1 style="font-size:48px; letter-spacing:5px; color:#1e1e1e; font-family: Gill Sans, sans-serif; ">${OTP}</h1>
    </div>
</div>
    `
}
module.exports = { otpHtml }