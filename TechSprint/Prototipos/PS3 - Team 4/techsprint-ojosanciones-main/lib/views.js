const fs = require('fs');
const crypto = require('crypto');
const pug = require('pug');

const db = require("./db");

const pugLocals = {
    baseurl: "/",
    fechaFormateada: function(dateString) {
        if (!dateString) return null;
        const fecha = new Date(dateString); // Aquí tendrías tu fecha específica
        if (fecha == "Invalid Date") {
            return dateString+".";
        }
        // Formatear la fecha
        const options = { year: 'numeric', month: '2-digit', day: '2-digit'};
        const fechaFormateada = fecha.toLocaleDateString('es-MX', options);

        return fechaFormateada

    },
    num: function(cifra,unidad) {
        let numero = Number(cifra);
        let uni = unidad ? unidad + " " : "";
        return uni+numero.toLocaleString("es-GT");
    },
    formatBytes(bytes, decimals = 2) {
        if (!+bytes) return '0 Bytes'
    
        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
    
        const i = Math.floor(Math.log(bytes) / Math.log(k))
    
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
    },
    icon(mimetype) {
        const mimetypes = {
            "application/pdf": '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>',
            
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>',
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" /></svg>',
            "application/vnd.openxmlformats-officedocument.presentationml.presentation": '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>',
            
            "application/msword": '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>',
            "application/vnd.ms-word.document.macroenabled.12": '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>',
                        
            "application/vnd.ms-excel": '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" /></svg>',
            "application/vnd.ms-excel.sheet.binary.macroenabled.12": '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" /></svg>',
                        
            "image/jpeg": '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>',
            "image/png": '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>',
            
            "text/csv": '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" /></svg>',
                        
            "application/illustrator": '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>',
            
            "application/x-rar-compressed": '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>',
            "application/zip": '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>',
            
            "application/vnd.google-earth.kml+xml": '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>',
            
            "text/html": '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>',
            "text/plain": '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>',
        }

        return mimetypes[mimetype] || "icon.png";
          
    },
    cut(string,length) {
        if (string.length > length) {
            return string.substring(0,length) + "<strong title='Sólo se muestran los primeros "+length+" caracteres'> ... </strong>"
        }
        else {
            return string;
        }
    },
    
    enc: encodeURIComponent,
    modifySearchParams(searchParams,param,value) {
        searchParams.set(param,value);
        return "?"+searchParams.toString();
        // return newSearchParams;
    },
    j: function(object) {
        return JSON.stringify(object)
    },
    jp: function(object) {
        return "<pre>"+JSON.stringify(object).replace(/(,)/g,"$1\n").replace(/([\{\}])/g,"\n$1\n")+"</pre>"
    },
    getOptionLabel: function(filter) {
        for (let o in filter.options) {
            let option = filter.options[o];
            if (option.value == filter.value) {
                return option.label;
            }

        }
        return filter.value+".";

    }
}




function errorPage(req,res) {
    let url = new URL(req.url, "http://localhost");

    console.log(new Date(), "404",url.pathname)
    return {
        status: 404,
        html: `<h1>La página solicitada ${url.pathname} no se encontró (404)</h1>`
    }
}

function return404(country,type, id) {
    console.log(new Date(), "404",country,type, id)
    let status = 404;
    html = `<h1>El item ${country} ${type} ${id} no se encontró (404)</h1>`;
    return {
        html: html,
        status: status
    }
}

async function itemPage  (req,type,rel) {
    let result = null;
    let html = null;
    let url = new URL(req.url, "http://localhost");
    let status;
    // console.log(url.pathname.split("/"));
    let id = url.pathname.split("/")[3];
    let country = url.pathname.split("/")[1];
    if (!id) { return return404(country,type, id)}
    result = await db.queryItem(type, id, country, rel);
    // console.log(result);
    if (result) {
        console.log(new Date(), type, "id",id)
        html = pug.renderFile("templates/"+type+".pug",{item: result, filters: filters, pages: result.pages, ... pugLocals});
        status = 200;
    }
    else {
        console.log(new Date(), "FORCED404", type, "id",id)
        html = pug.renderFile("templates/"+type+".pug",{item: {}, filters: filters, ... pugLocals});
        status = 200;
        // return return404(country,type, id)

    }
    return {
        html: html,
        status: status
    }
}

async function homePage(req,res) {
    // let result = await queryKeywords();
    let stats = await db.queryStats();
    console.log(new Date(), "home")

    return {
        html: pug.renderFile("templates/home.pug",{stats: stats, filters: filters, ... pugLocals} ),
        status: 200
    }
}

async function aboutPage(req,res) {
    // let result = await queryKeywords();
    console.log(new Date(), "about")

    return {
        html: pug.renderFile("templates/about.pug",{ ... pugLocals} ),
        status: 200
    }
}


async function empresaPage  (req,res) {
    return await itemPage(req,"sancion")
}



const filters = {
    "nombre_o_rfc" :{
        label: "Empresa o RFC",
        prompt: "Ingrese nombre o RFC de la empresa o entidad sancionada...",
        type: "hidden",
        field: ["nombre_razon_social", "rfc.keyword"]
    },
    "nombre" :{
        label: "Nombre",
        prompt: "Ingrese nombre de la empresa o entidad sancionada...",
        type: "text",
        field: "nombre_razon_social"
    }, 
    "rfc":{
        label: "RFC",
        prompt: "Ingrese RFC exacto...",
        type: "exact-string",
        field: "rfc.keyword"
    },         
    "estado":{
        label: "Estado",
        prompt: "Ingrese nombre del estado de la sanción...",
        type: "select",
        field: "entidad_federativa.keyword",
        options: [
            {
                "key": ""
            },
            {
              "key": "CIUDAD DE MEXICO"
            },
            {
              "key": "JALISCO"
            },
            {
              "key": "VERACRUZ DE IGNACIO DE LA LLAVE"
            },
            {
              "key": "NUEVO LEON"
            },
            {
              "key": "COAHUILA DE ZARAGOZA"
            },
            {
              "key": "MEXICO"
            },
            {
              "key": "BAJA CALIFORNIA"
            },
            {
              "key": "GUANAJUATO"
            },
            {
              "key": "DURANGO"
            },
            {
              "key": "TAMAULIPAS"
            },
            {
              "key": "GUERRERO"
            },
            {
              "key": "PUEBLA"
            },
            {
              "key": "SONORA"
            },
            {
              "key": "HIDALGO"
            },
            {
              "key": "QUERETARO"
            },
            {
              "key": "TABASCO"
            },
            {
              "key": "CHIAPAS"
            },
            {
              "key": "CHIHUAHUA"
            },
            {
              "key": "MICHOACAN DE OCAMPO"
            },
            {
              "key": "YUCATAN"
            },
            {
              "key": "OAXACA"
            },
            {
              "key": "QUINTANA ROO"
            },
            {
              "key": "SINALOA"
            },
            {
              "key": "AGUASCALIENTES"
            },
            {
              "key": "MORELOS"
            },
            {
              "key": "ZACATECAS"
            },
            {
              "key": "TLAXCALA"
            },
            {
              "key": "COLIMA"
            },
            {
              "key": "CAMPECHE"
            },
            {
              "key": "SAN LUIS POTOSI"
            },
            {
              "key": "BAJA CALIFORNIA SUR"
            },
            {
              "key": "NAYARIT"
            }
          ].map(o=> { return { value: o.key, label: o.key || "Todos"}})
    }, 


    "autoridad":{
        label: "Autoridad",
        type: "select",
        field: "sanciones.fuente.keyword",
        options: [
            { value: "", label: "Todas" },
            { value: "sfp", label: "Secretaría de la Función Pública (SFP, MX)"},
            { value: "sat-efos", label: "Secretaría de Administración Tributaria (SAT, MX)"},
            { value: "ofac", label: "Oficina de Control de Bienes Extranjeros (OFAC, EEUU)"},
        ]
    }, 
    "type": {
        label: "Tipo",
        prompt: "Ingrese nombre del sector gubernamental que aplica la sanción...",
        type: "hidden",
        options: Object.keys(db.type_indexes).map((t,i) => {
            return {
                "value": t, "label": db.type_indexes[t].label
            }
        }),
        defaultValue: "sancion"
    },
    "page":{
        type: "hidden",
        defaultValue: 1
    },
    "sort":{
        type: "hidden",
        options: [
            {value: "nombre_razon_social.keyword", label: "nombre"}
        ],
        defaultValue: "nombre_razon_social.keyword"
    },
    "sort-direction":{
        type: "hidden",
        defaultValue: "asc"
    },
    "count-field":{
        type: "hidden",
        defaultValue: "nombre_razon_social.keyword"
    }, 
}

async function buscadorPage(req,res) {
    let url = new URL(req.url, "http://localhost");


    //Initialize filters
    Object.keys(filters).map((name) => {
        //Get options for selects
        if (filters[name].type == "select") {
            //If they don't have default options
            if (!filters[name].hasOwnProperty("options")) {
                //TODO: Cached query to db
                filters[name].options = [
                    { value: "", label: "- Seleccionar -" }
                ]
            }
        }

        //Get current value from URL
        filters[name].value = url.searchParams.get(name)

        if (!filters[name].value && filters[name].defaultValue) {
            filters[name].value = filters[name].defaultValue;
        }
    } )
    
    console.log(new Date(), "buscadorPage")
    let result = await db.queryKeywords(filters);

    let result_count = result.total;
    if (result_count === 1) {
        return {
            status: 302,
            location: "/mx/empresa/"+result.hits[0]._source.id
        }
    }
    let locals = {
        filters: filters,
        pages: Math.ceil(result_count/db.pageSize),
        pageSize: db.pageSize,
        searchParams: url.searchParams,
        result_count: result_count, 
        currentPage: parseInt(filters.page.value)
    }

    // console.log(locals,result_count);

    return {
        html: pug.renderFile("templates/buscador.pug",{results: result.hits, ... locals, ... pugLocals} ),
        status: 200
    }

}


// async function countryPage(req,res) {
//     let url = new URL(req.url, "http://localhost");
//     let country = url.pathname.split("/")[1];

//     // let stats = await db.queryStats();
//     console.log(new Date(), "countryPage")

//     return {
//         html: pug.renderFile("templates/country.pug",{stats: {}, country: country, ... pugLocals} ),
//         status: 200
//     }

// }

function sendStatic(req,response) {
    let url = new URL(req.url, "http://localhost");
    let urlpoint = url.pathname.split(".");
    var extname = "."+urlpoint[urlpoint.length-1];
    console.log(new Date(), "static",url.pathname);

    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
        case '.svg':
            contentType = 'image/svg+xml';
            break;

        case '.ttf':
            contentType = 'application/x-font-truetype';
            break;
                
        case '.otf':
            contentType = 'application/x-font-opentype';
            break;

        case '.woff2':
            contentType = 'application/font-woff2';
            break;
                        
    }

    const filepath = __dirname + "/.." + url.pathname;
    fs.readFile(filepath, function(error, content) {
        const headers = { 
            'Content-Type': contentType,
            "Cache-Control": "no-cache"

        }
        // console.log("calculated Etag", headers);
        
        if (error) {
            if(error.code == 'ENOENT'){
                response.writeHead(200, headers);
                content = "Error 404"
                response.end(content, 'utf-8');
                console.log("Static not found",error.path);
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end();
                console.log("Static error",error);
            }
        }
        else {
            const etag = crypto.createHash('md5').update(content.slice(0, 100*1024)).digest("hex");
            const lastModified = fs.statSync(filepath).mtime;      

            headers["ETag"] = etag;
            headers["Last-Modified"] = lastModified;
    
            response.writeHead(200, headers);
            response.end(content, 'utf-8');
        }
    });
    return {status: 0};
}




const requestListener = async function (req, res) {
    let url = new URL(req.url, "http://localhost");
    let responseData = null;
    let route = null;
    // console.log(url);

    try {
        let routeLevel1 = url.pathname.split("/")[1];
        let routeLevel2 = null;
        // console.log(routeLevel1);
        let generationStartDate = new Date();
        if (routeLevel1!="static") {

            console.time("Page generation time "+url.pathname)
        }
    
        if (!routes.hasOwnProperty(routeLevel1)) {
            route="default";
        }

        if (typeof routes[routeLevel1] == "function") {
            responseData = await routes[routeLevel1](req, res);
        }
        else if (routes[routeLevel1]) {

            routeLevel2 = url.pathname.split("/")[2];
            if (typeof routes[routeLevel1][routeLevel2] == "function") {
                responseData = await routes[routeLevel1][routeLevel2](req, res);
            }
        } 
        else {
            responseData = errorPage(req,res);
        }


        // console.log(routeLevel1,routeLevel2);
        if (routeLevel1!="static") {

            console.timeEnd("Page generation time "+url.pathname)
        }
    
    
    }
    catch(e) {
        console.log(new Date(), "500",url.pathname,e);
        // res.setHeader("Content-Type", "text/html; charset=utf-8");
        responseData = {
            html: `<h1>La página solicitada tuvo un error al generarse</h1><p>${JSON.stringify(e)}</p>`,
            status: 500
        }

    }

    if (responseData) {
        if (responseData.status == 302) {
            res.setHeader("Location", responseData.location);
            res.writeHead(responseData.status);
            res.end();
        }

        else if (responseData.status !== 0) {
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.writeHead(responseData.status);
            res.end(responseData.html);
        }
        else {
            // if (res.writable) {
            //         console.error("Finished with writable response.",res);
            //         res.setHeader("Content-Type", "text/html; charset=utf-8");
            //         res.writeHead(502);
            //         res.end("Error 502");


            //     }
        }
    }
    else {
        console.error("No responseData 501");
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.writeHead(501);
        res.end("Error 501");
    }


    return false;
};

function staticPage(template) {
    return async function(req,res) {
        console.log(new Date(), "staticPage", template)
    
        return {
            html: pug.renderFile("templates/"+template+".pug",pugLocals),
            status: 200
        }
    }
    
}



const countryRoutes = {
    "": homePage,
    "empresa": empresaPage,    
};



const routes = {
    "": homePage,
    "static": sendStatic,
    "default": errorPage,
    "buscador": buscadorPage,
    "mx":countryRoutes,
    "acerca-de": staticPage("acercade"),
    "datos": staticPage("datos"),

}

module.exports = { routes, requestListener }