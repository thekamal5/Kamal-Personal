import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

export interface ImageProcessingOptions {
    width?: number;
    height?: number;
    format?: 'webp' | 'avif' | 'jpeg' | 'png';
    quality?: number;
}

export class MediaService {
    /**
     * Processes a single image into multiple responsive sizes and formats.
     */
    static async processImage(
        inputPath: string,
        outputDir: string,
        filename: string
    ) {
        const sizes = {
            thumbnail: { width: 150, height: 150 },
            small: { width: 400 },
            medium: { width: 800 },
            large: { width: 1200 },
            hero: { width: 1920 },
        };

        const formats: Array<'webp' | 'avif' | 'jpeg'> = ['webp', 'avif', 'jpeg'];
        const results: any = {};

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        for (const [sizeName, config] of Object.entries(sizes)) {
            results[sizeName] = {};

            for (const format of formats) {
                const outName = `${filename}-${sizeName}.${format}`;
                const outPath = path.join(outputDir, outName);

                const conf = config as { width: number; height?: number };
                let pipeline = sharp(inputPath).resize(conf.width, conf.height, {
                    fit: 'cover',
                    position: 'centre',
                });

                // Convert to selected format
                if (format === 'webp') pipeline = pipeline.webp({ quality: 80 });
                if (format === 'avif') pipeline = pipeline.avif({ quality: 60 });
                if (format === 'jpeg') pipeline = pipeline.jpeg({ quality: 85, mozjpeg: true });

                // Strip metadata for privacy & size
                await pipeline.withMetadata().toFile(outPath);

                results[sizeName][format] = `/uploads/${outName}`;
            }
        }

        return results;
    }

    /**
     * Generates a blurring placeholder (LQIP)
     */
    static async generatePlaceholder(inputPath: string) {
        const buffer = await sharp(inputPath)
            .resize(10, 10, { fit: 'inside' })
            .blur()
            .toBuffer();

        return `data:image/png;base64,${buffer.toString('base64')}`;
    }
}
