import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd-next';
import { FileType } from '../Editor/type';
import { api } from '@/lib/trpc';

type DraggableFileGridProps = {
  files: FileType[];
  preview?: boolean;
  columns?: number;
  onReorder?: (newFiles: FileType[]) => void;
  type: 'image' | 'other';
  className?: string;
  renderItem?: (file: FileType) => React.ReactNode;
};

export const DraggableFileGrid = ({
  files,
  preview = false,
  onReorder,
  type,
  className,
  renderItem
}: DraggableFileGridProps) => {
  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;
    
    const { source, destination } = result;
    const filteredFiles = files.filter(i => i.previewType === type);
    const allFiles = Array.from(files);
    
    const [reorderedItem] = filteredFiles.splice(source.index, 1);
    if (reorderedItem) {
      filteredFiles.splice(destination.index, 0, reorderedItem);
      
      const newFiles = allFiles.map(file => {
        if (file.previewType === type) {
          return filteredFiles.shift() || file;
        }
        return file;
      });

      onReorder?.(newFiles);

      try {
        await api.notes.updateAttachmentsOrder.mutate({
          attachments: newFiles.map((file, index) => ({
            name: file.name,
            sortOrder: index
          }))
        });
      } catch (error) {
        console.error('Failed to update attachments order:', error);
      }
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId={type} direction="horizontal">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`${className} ${snapshot.isDraggingOver ? 'bg-hover/50' : ''}`}
          >
            {files.filter(i => i.previewType === type).map((file, index) => (
              <Draggable
                key={`${file.name}-${index}`}
                draggableId={`${file.name}-${index}`}
                index={index}
                isDragDisabled={preview}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      opacity: snapshot.isDragging ? 0.5 : 1,
                    }}
                  >
                    {renderItem?.(file)}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}; 