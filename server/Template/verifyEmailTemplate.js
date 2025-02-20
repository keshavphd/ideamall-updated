const VerifyEmailTemplate = ({ name, url }) => {
  return `
  <div style="background-color:white">
  <p>Welcome ${name}</p>
     <p>Thankyou for registering <span style="font-size:22px">IdeaMall</span></p>
     <p>महाभारत युद्ध आरम्भ होने के ठीक पहले भगवान श्रीकृष्ण ने अर्जुन को जो उपदेश दिया वह श्रीमद्भगवद्गीता के नाम से प्रसिद्ध है। यह महाभारत के भीष्मपर्व का अंग है। गीता में 18 अध्याय और 700 श्लोक हैं। गीता की गणना प्रस्थानत्रयी में की जाती है, जिसमें उपनिषद् और ब्रह्मसूत्र भी सम्मिलित हैं।</p>
     <img src="https://i.pinimg.com/736x/7f/03/72/7f03720858d5cfca3bfad2f2384e8c1c.jpg"/>
     <a href=${url} style="margin-top:10px;text-decoration:underline">Verify Email</a>
  </div>
     
 `;
};

export default VerifyEmailTemplate;
