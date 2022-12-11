

function escapeHtml(text) {
        console.log(text)
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
} 


function stripslashes(text){
        return   text.replace(new RegExp("\\\\", "g"), "")
}


export {escapeHtml,stripslashes};

