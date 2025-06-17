import Column from "../Column/Column";
import { useDroppable } from "@dnd-kit/core";
import {
	SortableContext,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React, { useMemo } from "react";

import { ColumnType } from "@/types";

interface ColumnProps {
    columns: ColumnType;
}


const DroppableColumn = React.memo(({ columns }: ColumnProps) => {
	const { isOver, setNodeRef } = useDroppable({ id:`${columns.id_column}` });

	const items = useMemo(() => columns?.tasks?.map((task) => task.id_task) || [], [columns]);

	return (
		<SortableContext
			items={items}
			strategy={verticalListSortingStrategy}
			id={`${columns.id_column}`}
		>
			<div ref={setNodeRef}>
                <Column columns={columns} isOver={isOver} />
			</div>
		</SortableContext>
	);
});

export default DroppableColumn;