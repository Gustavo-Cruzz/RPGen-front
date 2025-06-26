const DownloadButton = ({ url, className = "download-btn" }) => {
    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = url;
        link.download = "character-image.png"; // You can customize the filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <button className={className} onClick={handleDownload}>
            Download Image
        </button>
    );
};

export default DownloadButton;