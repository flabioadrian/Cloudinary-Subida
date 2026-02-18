const CLOUD_NAME = "dwj5tddye";
const UPLOAD_PRESET = "practica_preset";

const archivoASubir = document.getElementById('cajaArchivo');
const btnSubir = document.getElementById('btnSubir');
const mensaje = document.getElementById('Mensaje');
const previewContainer = document.getElementById('preview-container');

function subirImagen(){
    const archivo = archivoASubir.files[0];

    if (!archivo) {
        alert("Primero selecciona un archivo.");
        return;
    }

    const formData = new FormData();
    formData.append('file', archivo);
    formData.append('upload_preset', UPLOAD_PRESET);

    ayudaParaArchivo(true);

    fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) throw new Error("Error en la subida");
        return response.json();
    })
    .then(data => {
        const imageUrl = data.secure_url;
        previewContainer.innerHTML = `<img src="${imageUrl}" alt="Subida" style="width: 300px;">`;
    })
    .catch(err => {
        alert("Hubo un error al subir el archivo." + err.message);
    })
    .finally(() => {
        ayudaParaArchivo(false);
    });
}

function ayudaParaArchivo(cargando){
    if (cargando) {
        btnSubir.disabled = true;
        mensaje.style.display = 'block';
    } else {
        btnSubir.disabled = false;
        mensaje.style.display = 'none';
    }
}