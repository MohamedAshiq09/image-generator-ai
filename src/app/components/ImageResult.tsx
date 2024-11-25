type Props = {
    imageUrl: string;
};

const ImageResult: React.FC<Props> = ({ imageUrl }) => {
    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h2>Generated Image</h2>
            <img src={imageUrl} alt="Generated AI Image" style={{ width: '512px', height: '512px' }} />
        </div>
    );
};

export default ImageResult;
