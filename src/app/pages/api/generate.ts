import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

type Data = {
    imageUrl?: string;
    error?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        
        const response = await axios.post(
            'https://api.openai.com/v1/images/generations',
            { prompt, n: 1, size: '512x512' },
            {
                headers: {
                    Authorization: `Bearer YOUR_OPENAI_API_KEY`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const imageUrl = response.data.data[0].url;
        res.status(200).json({ imageUrl });
    } catch (error) {
        console.error('Error generating image:', error);
        res.status(500).json({ error: 'Failed to generate image' });
    }
}
