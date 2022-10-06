/* eslint-disable @typescript-eslint/no-shadow */
import {DndContext, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors} from '@dnd-kit/core';
import {SortableContext, arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy} from '@dnd-kit/sortable';
import React, {useState} from 'react';

import SortableItem from './SortableItem';

const data = [
  {
    id: 'e592eade-e102-49a3-8d48-74e8b8aec3dc',
    name: 'Build ok',
    createdDate: '2022-10-06T04:35:44.725Z',
    updatedDate: '2022-10-06T04:47:52.597Z',
    isDone: true,
    isActive: true,
    status: 0,
    todoListId: 'z858z',
    userId: '3ff5a821-7c3a-4f75-b9ac-1598fd282059',
    index: 345000
  },
  {
    id: '87902f97-3ef6-432c-98f3-63c27f7521df',
    name: 'SSR Use OK',
    createdDate: '2022-10-06T04:47:42.620Z',
    updatedDate: '2022-10-06T04:47:44.062Z',
    isDone: true,
    isActive: true,
    status: 0,
    todoListId: 'z858z',
    userId: '3ff5a821-7c3a-4f75-b9ac-1598fd282059',
    index: 346000
  },
  {
    id: 'f42dd4ef-2c20-498a-aeef-5475d9ca12df',
    name: 'fwqfwq',
    createdDate: '2022-10-06T08:17:43.875Z',
    updatedDate: '2022-10-06T08:17:43.875Z',
    isDone: false,
    isActive: true,
    status: 0,
    todoListId: 'z858z',
    userId: '3ff5a821-7c3a-4f75-b9ac-1598fd282059',
    index: 347000
  },
  {
    id: '9b7b4c29-f324-45c3-8a3d-6ec15e05d284',
    name: 'fwqfq',
    createdDate: '2022-10-06T08:17:45.384Z',
    updatedDate: '2022-10-06T08:17:45.384Z',
    isDone: false,
    isActive: true,
    status: 0,
    todoListId: 'z858z',
    userId: '3ff5a821-7c3a-4f75-b9ac-1598fd282059',
    index: 348000
  },
  {
    id: '6a905aa0-a697-496e-9416-f3bb05a6a745',
    name: 'gwqg',
    createdDate: '2022-10-06T08:17:46.659Z',
    updatedDate: '2022-10-06T08:17:46.659Z',
    isDone: false,
    isActive: true,
    status: 0,
    todoListId: 'z858z',
    userId: '3ff5a821-7c3a-4f75-b9ac-1598fd282059',
    index: 349000
  },
  {
    id: 'fd11f469-6803-4cfe-8dda-942b0d6303ff',
    name: 'gewgew',
    createdDate: '2022-10-06T08:18:53.794Z',
    updatedDate: '2022-10-06T08:18:53.794Z',
    isDone: false,
    isActive: true,
    status: 0,
    todoListId: 'z858z',
    userId: '3ff5a821-7c3a-4f75-b9ac-1598fd282059',
    index: 350000
  },
  {
    id: '1e6136a9-0c63-4bf8-8825-51ac3e76fbda',
    name: 'gewgwe',
    createdDate: '2022-10-06T08:18:55.137Z',
    updatedDate: '2022-10-06T08:18:55.137Z',
    isDone: false,
    isActive: true,
    status: 0,
    todoListId: 'z858z',
    userId: '3ff5a821-7c3a-4f75-b9ac-1598fd282059',
    index: 351000
  },
  {
    id: 'df2f4adf-606a-4a67-9e3e-5f00aecd2a18',
    name: 'y423y',
    createdDate: '2022-10-06T08:18:56.485Z',
    updatedDate: '2022-10-06T08:18:56.485Z',
    isDone: false,
    isActive: true,
    status: 0,
    todoListId: 'z858z',
    userId: '3ff5a821-7c3a-4f75-b9ac-1598fd282059',
    index: 352000
  },
  {
    id: '9b5edb22-9baf-4bea-8ce7-e9647459b5d7',
    name: 'y4r3',
    createdDate: '2022-10-06T08:18:57.747Z',
    updatedDate: '2022-10-06T08:18:57.747Z',
    isDone: false,
    isActive: true,
    status: 0,
    todoListId: 'z858z',
    userId: '3ff5a821-7c3a-4f75-b9ac-1598fd282059',
    index: 353000
  },
  {
    id: '12f611d8-dc79-4385-a7cd-3c3f350bc28b',
    name: 'hreher',
    createdDate: '2022-10-06T08:18:59.145Z',
    updatedDate: '2022-10-06T08:18:59.145Z',
    isDone: false,
    isActive: true,
    status: 0,
    todoListId: 'z858z',
    userId: '3ff5a821-7c3a-4f75-b9ac-1598fd282059',
    index: 354000
  },
  {
    id: '65461b4a-2c75-4d8f-9ef6-b37ad2748671',
    name: 'herh',
    createdDate: '2022-10-06T08:19:00.331Z',
    updatedDate: '2022-10-06T08:19:00.331Z',
    isDone: false,
    isActive: true,
    status: 0,
    todoListId: 'z858z',
    userId: '3ff5a821-7c3a-4f75-b9ac-1598fd282059',
    index: 355000
  },
  {
    id: 'da6f23ac-0a86-4cd9-87dd-2204679caf2f',
    name: 'qwfgq',
    createdDate: '2022-10-06T08:20:43.222Z',
    updatedDate: '2022-10-06T08:20:43.222Z',
    isDone: false,
    isActive: true,
    status: 0,
    todoListId: 'z858z',
    userId: '3ff5a821-7c3a-4f75-b9ac-1598fd282059',
    index: 356000
  }
];

export default function App() {
  const [items, setItems] = useState(data);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  return (
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map(item => (
          <SortableItem key={item.id} id={item.id} data={item.name} />
        ))}
      </SortableContext>
    </DndContext>
  );

  function handleDragEnd(event: any) {
    const {active, over} = event;

    if (active.id !== over.id) {
      setItems(items => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
}
