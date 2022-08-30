import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';

import ModalCreateList from '@/components/modal-create-list';
import ModalShare from '@/components/modal-share';
import Button from '@/core-ui/button';
import IconButton from '@/core-ui/ico-button';
import Icon from '@/core-ui/icon';

import useList from '@/hooks/useList';

import Auth from '../auth';
import styles from './style.module.scss';
import {IUser} from '@/api/network/user';

const List: React.FC = () => {
  const router = useRouter();
  const {list, fetchData} = useList();

  const [createListOpen, setCreateListOpen] = useState<boolean>(true);
  const [currentListID, setCurrentListID] = useState<string>('');
  const [shareOpen, setShareOpen] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);

  const handleCloseCreateListOpen = () => {
    setCreateListOpen(false);
  };

  const handleShare = () => {
    setShareOpen(false);
  };

  useEffect(() => {
    const checkLocal = localStorage.getItem('user');
    const object = checkLocal ? JSON.parse(checkLocal) : null;

    setUser(object);
  }, []);

  useEffect(() => {
    const open = localStorage.getItem('modalCreateList');
    if (open === 'open') {
      setCreateListOpen(false);
    }
  }, []);

  if (!list) return null;

  return (
    <Auth>
      <div className={styles['create-list-section']}>
        <div className="container">
          <div className="banner-list">
            <div className="list-user">
              <Icon name="ico-user" />
              <h4 className="title-user">{user?.userName}</h4>
            </div>
            <div className="list-content">
              <div className="list-left">
                <div
                  className="icon-arrow-left"
                  onClick={() => {
                    router.push('/action');
                  }}
                >
                  <Icon size={28} name="ico-arrow-left-circle" />
                </div>
                <div className="title-left">
                  <h3 className="title-todo">TO DO</h3>
                  <h3 className="title-todo">YOUR LIST</h3>
                </div>
              </div>
              <Button
                variant="contained"
                color="primary"
                className="list-right"
                startIcon={<Icon name="ico-plus-circle" />}
                onClick={() => {
                  setCreateListOpen(true);
                }}
              >
                <h3 className="title-right">New List</h3>
              </Button>
            </div>
          </div>
          <div className="list-group">
            {list.map(item => (
              <div className="text-group" key={item.id}>
                <p className="title-group">{item.listName}</p>
                <div className="actions">
                  <IconButton
                    icon="ico-share"
                    onClick={() => {
                      setShareOpen(true);
                      setCurrentListID(item.id);
                    }}
                  />
                  <IconButton
                    icon="ico-arrow-right"
                    onClick={() => {
                      router.push(`/list/${item.id}`);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ModalCreateList open={createListOpen} onClose={handleCloseCreateListOpen} fetchData={fetchData} />
      <ModalShare open={shareOpen} onClose={handleShare} id={currentListID} />
    </Auth>
  );
};
export default List;
