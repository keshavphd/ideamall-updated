import Swal from "sweetalert2"
const sweetAlert = ({title,text})=>{
    const alert = Swal.fire({
        title: title||"Submitted",
        text: text||"Data submitted successfully",
        icon: "success",
        confirmButtonColor:"darkorange"
      });
      return alert
}
export default sweetAlert 

