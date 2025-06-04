export function CustomModal({
  title,
  description,
  onConfirm,
  onCancel,
  confirmButtonText,
  customId,
}: {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmButtonText: string;
  customId: string;
}) {
  return (
    <div
      className="modal fade custom-modal"
      id={`${customId}`}
      tabIndex={-1}
      aria-labelledby={`custom-modal-label ${customId}-label`}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div
              className="modal-title"
              id={`custom-modal-label ${customId}-label`}
            >
              <h1>{title}</h1>
              {description ? <p>{description}</p> : null}
            </div>
            <button
              type="button"
              className="btn-close"
              id={`close-custom-modal-${customId}`}
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="button cancel"
              data-bs-dismiss="modal"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button type="submit" className="button create" onClick={onConfirm}>
              {confirmButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
