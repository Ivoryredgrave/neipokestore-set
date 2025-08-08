function FolderView({ collections, onFolderClick }) {
  return (
    <div className="folder-view">
      <h2 className="section-title">Set</h2>
      <div className="folders">
        {Object.keys(collections).map((folder) => (
          <div
            key={folder}
            className="folder-card"
            onClick={() => onFolderClick(folder)}
          >
            <div className="folder-icon">📁</div>
            <div className="folder-name">{folder}</div>
            <div className="folder-count">{collections[folder].length} imágenes</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FolderView;
