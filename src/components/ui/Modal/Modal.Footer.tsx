const ModalFooter: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-center justify-end gap-4 border-t border-neutral-200 p-4">
    {children}
  </div>
);

export default ModalFooter;
