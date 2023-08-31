import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function uploadImage() {
    const imagePath = path.join(__dirname, 'avatar.png');

    const formData = new FormData();
    formData.append('image', await fs.readFile(imagePath));

    const uploadUrl = 'http://localhost:8080/auth/user/';

    try {
        const response = await axios.post(uploadUrl, formData);

        if (response.status === 200) {
            console.log('Image uploaded successfully!');
        } else {
            console.error('Failed to upload image.');
        }
    } catch (error) {
        console.error('Error uploading image:', error);
    }
}

uploadImage();
