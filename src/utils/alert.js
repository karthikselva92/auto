import Swal from 'sweetalert2';


export default class alertmessage {
    static sweetalert(message) {
        let title = "Maintenance..!";
        let text = message;
        if(message=="UnAuthorized!"){
            title = "User Session Expired..!";
            text = "Re-Login Again";
        }
        Swal.fire({
            title: title,
            text: text,
            type: "danger"
        }).then(function () {
            localStorage.clear();
            window.location.reload(true);
        });
    }

}
