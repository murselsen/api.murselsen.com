import fs from 'fs';
import path from 'path';

const getPhotos = async () => {

    let dbPhotos = await fs.readdirSync(
        path.join(process.cwd(), 'photos'),
    )
    const photos = [];
    dbPhotos.forEach((photo) => {
        const photoPath = path.join(process.cwd(), 'photos', photo);
        const stats = fs.statSync(photoPath);
        const fileSizeInBytes = stats.size;
        const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024); // Convert to MB
        photos.push({
            name: photo,
            path: photoPath,
            size: fileSizeInMegabytes.toFixed(2) + ' MB',
            createdAt: stats.birthtime,
            updatedAt: stats.mtime,
        });
    });

    const data = {
        dbPhotos: photos,
        totalPhotosCount: dbPhotos.length,
    }
    console.log(data);
    return data;
};

export default getPhotos;