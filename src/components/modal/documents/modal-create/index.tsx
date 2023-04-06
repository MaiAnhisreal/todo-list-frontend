import cls from 'classnames';
import {FC, useEffect} from 'react';

import Button from '@/core-ui/button';
import Input from '@/core-ui/input';
import {Modal} from '@/core-ui/modal';
import iosAutoFocus from '@/utils/ios-autofocus';

import useModalCreateDocument from '../../documents/modal-create/hook';
import {IProps} from '../../list/types-create-update';
import styles from '../style-create-upate.module.scss';

const ModalCreateDocument: FC<IProps> = props => {
  const {open, onClose} = props;
  const {isSubmitting, errors, onSubmit, register, setFocus} = useModalCreateDocument(props);

  useEffect(() => {
    setFocus('name');
    iosAutoFocus();
  }, [setFocus]);

  return (
    <>
      {open && (
        <Modal
          className={cls(styles['com-modal-todo-add-edit'], 'max-w-xl')}
          variant="center"
          open={open}
          onClose={onClose}
        >
          <form onSubmit={onSubmit}>
            <Modal.Header>
              <h3 className="title">Create New Document</h3>
            </Modal.Header>
            <Modal.Body>
              <Input
                autoFocus={true}
                error={errors.name?.message}
                placeholder={'Enter your document name'}
                {...register('name')}
              />
              <Input
                className="mt-4"
                placeholder={'Enter your content'}
                {...register('content')}
                error={errors.content?.message}
              />
            </Modal.Body>
            <Modal.Footer>
              <div className="content">
                <Button
                  className="w-full"
                  variant="outlined"
                  color="primary"
                  text="Cancel"
                  onClick={onClose}
                  type="button"
                />
                <Button
                  className="w-full"
                  variant="contained"
                  color="primary"
                  text="Create"
                  type="submit"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                />
              </div>
            </Modal.Footer>
          </form>
        </Modal>
      )}
    </>
  );
};

export default ModalCreateDocument;
