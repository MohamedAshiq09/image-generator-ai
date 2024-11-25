import { useState } from 'react';
import axios from 'axios';
import styles from '../styles/Home.module.css';
import ImageResult from './components/ImageResult';

export default function Home() {
    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const generateImage = async () => {
        if (!prompt.trim()) return;

        setLoading(true);
        setImageUrl(null);

        try {
            const response = await axios.post('/api/generate', { prompt });
            setImageUrl(response.data.imageUrl);
        } catch (error) {
            console.error('Error generating image:', error);
            alert('Failed to generate image. Try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>AI Image Generator</h1>
            <div className={styles.inputContainer}>
                <input
                    type="text"
                    className={styles.input}
                    placeholder="Enter a prompt..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
                <button
                    className={styles.button}
                    onClick={generateImage}
                    disabled={loading}
                >
                    {loading ? 'Generating...' : 'Generate'}
                </button>
            </div>
            {imageUrl && <ImageResult imageUrl={imageUrl} />}
        </div>
    );
}
