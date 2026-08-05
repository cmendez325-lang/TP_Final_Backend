import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const carpetaUploads = path.join(__dirname, '..', 'uploads');

// Crea la carpeta uploads si no existe todavía
if (!fs.existsSync(carpetaUploads)) {
    fs.mkdirSync(carpetaUploads, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, carpetaUploads);
    },
    filename: (req, file, cb) => {
        const sufijoUnico = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const extension = path.extname(file.originalname);
        cb(null, `producto-${sufijoUnico}${extension}`);
    }
});

const filtroArchivos = (req, file, cb) => {
    const tiposPermitidos = /jpeg|jpg|png|webp|gif/;
    const extensionValida = tiposPermitidos.test(path.extname(file.originalname).toLowerCase());
    const mimeValido = tiposPermitidos.test(file.mimetype);

    if (extensionValida && mimeValido) {
        cb(null, true);
    } else {
        cb(new Error('Solo se permiten imágenes (jpg, jpeg, png, webp, gif).'));
    }
};

const upload = multer({
    storage,
    fileFilter: filtroArchivos,
    limits: { fileSize: 5 * 1024 * 1024 } // 5 MB máximo
});

export default upload;
