import { AlertMessage as AlertMessageComponent } from './alertMessage';
import { Button as ButtonComponent } from './button';
import { Input as InputComponent } from './input';
import { Modal as ModalComponent } from './modal';
import { Select as SelectComponent } from './select';
import { Table as TableComponent } from './table';

export namespace Element {
  export const Button = ButtonComponent;
  export const Select = SelectComponent;
  export const Input = InputComponent;
  export const Modal = ModalComponent;
  export const AlertMessage = AlertMessageComponent;
  export const Table = TableComponent;
}
