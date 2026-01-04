export interface ModalProps {
  id: string;
  title?: string;
  description?: string;
  children: React.ReactNode;
  staticBackdrop?: boolean;
  disableKeyboard?: boolean;
  size?: 'sm' | 'md' | 'lg';
}
