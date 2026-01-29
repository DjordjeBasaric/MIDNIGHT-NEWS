type ModalProps = {
  open: boolean;
  children: React.ReactNode;
};

export function Modal({ open, children }: ModalProps) {
  if (!open) {
    return null;
  }
  return (
    <div className="modal-overlay">
      <div className="modal-panel">{children}</div>
    </div>
  );
}
