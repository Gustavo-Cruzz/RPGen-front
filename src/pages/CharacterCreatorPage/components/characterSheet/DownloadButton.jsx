const DownloadButton = ({ url, className = "download-btn" }) => {
    return (
      <button
        className={className}
        onClick={() => window.open(url, "_blank")}
      >
        Download Image
      </button>
    );
  };

export default DownloadButton;