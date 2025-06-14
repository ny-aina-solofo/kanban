import { useDispatch } from "react-redux";
import {
	CollisionDetection,
	KeyboardSensor,    	
	DragEndEvent,
	DragOverEvent,
	DragStartEvent,
	PointerSensor,
	MouseSensor,
	TouchSensor,
	UniqueIdentifier,
	closestCenter,
	getFirstCollision,
	pointerWithin,
	rectIntersection,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BoardType } from "@/types";
import { moveTask } from "@/redux/boardSlice";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";


export const useDnd = (board: BoardType) => {
	const dispatch = useDispatch();

	const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
	const lastOverId = useRef<UniqueIdentifier | null>(null);
	const recentlyMovedToNewContainer = useRef(false);

	const sensors = useSensors(
		useSensor(MouseSensor, {
		  activationConstraint: {
			distance: 8,
		  },
		}),
		useSensor(TouchSensor, {
		  activationConstraint: {
			delay: 200,
			tolerance: 6,
		  },
		}),
		useSensor(KeyboardSensor, {
		  coordinateGetter: sortableKeyboardCoordinates,
		}),
	);
	
	const collisionDetectionStrategy: CollisionDetection = useCallback(
		(args) => {
			if (
				activeId &&
				board.column.map((col) => col.id_column.toString()).includes(activeId.toString())
			) {
				return closestCenter({
					...args,
					droppableContainers: args.droppableContainers.filter(
						(container) => container.id === activeId
					),
				});
			}

			// Start by finding any intersecting droppable
			const pointerIntersections = pointerWithin(args);
			const intersections =
				pointerIntersections.length > 0
					? // If there are droppables intersecting with the pointer, return those
					  pointerIntersections
					: rectIntersection(args);
			let overId = getFirstCollision(intersections, "id");

			if (overId != null) {
				if (board.column.map((col) => col.id_column.toString()).includes(overId.toString())) {
					//const containerItems = items[overId];
					const containerItems = board.column
						.find((col) => col.id_column.toString() === overId)
						?.tasks?.map((task) => task.id_task.toString()) || [];
					// If a container is matched and it contains items (column 'A', 'B', 'C')
					if (containerItems && containerItems.length > 0) {
						// Return the closest droppable within that container
						overId = closestCenter({
							...args,
							droppableContainers: args.droppableContainers.filter(
								(container) =>
									container.id !== overId &&
									containerItems.includes(container.id.toString())
							),
						})[0]?.id;
					}
				}

				lastOverId.current = overId;

				return [{ id: overId }];
			}

			// When a draggable item moves to a new container, the layout may shift
			// and the `overId` may become `null`. We manually set the cached `lastOverId`
			// to the id of the draggable item that was moved to the new container, otherwise
			// the previous `overId` will be returned which can cause items to incorrectly shift positions
			if (recentlyMovedToNewContainer.current) {
				lastOverId.current = activeId;
			}
			
			
			// If no droppable is matched, return the last match
			return lastOverId.current ? [{ id: lastOverId.current }] : [];
		},
		[activeId, board.column]
	);

	const activeTask = useMemo(
		() =>
			board.column
				.find((col) => col?.tasks?.some((task) => task.id_task.toString() === activeId))
				?.tasks.find((task) => task.id_task.toString() === activeId) || null,
		[activeId, board.column]
	);


	useEffect(() => {
		requestAnimationFrame(() => {
			recentlyMovedToNewContainer.current = false;
		});
	}, [board.column]);
	
	function findContainer(id: string) {
		return board.column.find(
			(column) =>
				column.id_column.toString() === id || (column?.tasks || []).some((task) => task.id_task.toString() === id)
		);
	}

	function handleDragStart(event: DragStartEvent) {
		setActiveId(event.active.id);
	}


	function handleDragOver(event: DragOverEvent) {
		const { over, active } = event;
		if (!over) return;
		if (!board) return;

		const taskId = active.id.toString();
		const overId = over.id.toString();

		const oldColumn = findContainer(taskId);
		const overColumn = findContainer(overId);

		if (!oldColumn || !overColumn || oldColumn === overColumn) return;

		const overIndex = overColumn?.tasks?.map((task) => task.id_task.toString()).indexOf(overId) || [];

		const isBelowOverItem =
			over &&
			active.rect.current.translated &&
			active.rect.current.translated.top > over.rect.top + over.rect.height;

		const modifier = isBelowOverItem ? 1 : 0;

		// const newIndex = overIndex >= 0 ? overIndex + modifier : undefined;
		const newIndex = overIndex === 0 ? overIndex + modifier : undefined;
		recentlyMovedToNewContainer.current = true;

		dispatch(
			moveTask({
				boardId: board.id_board.toString(),
				oldColumnId: oldColumn.id_column.toString(),
				nextColumnId: overColumn.id_column.toString(),
				taskId,
				index: overId !== overColumn.id_column.toString() ? newIndex : undefined,
			})
		);
	}
	
	function handleDragEnd(event: DragEndEvent) {
		const { over, active } = event;
		if (!over) {
			setActiveId(null);
			return;
		}

		const taskId = active.id.toString();
		const overId = over.id.toString();

		const oldColumn = findContainer(taskId);
		const overColumn = findContainer(overId);

		if (!oldColumn || !overColumn || oldColumn !== overColumn) {
			setActiveId(null);
			return;
		}

		const oldIndex = oldColumn?.tasks?.map((task) => task.id_task.toString()).indexOf(taskId) || [];
		const overIndex = overColumn?.tasks?.map((task) => task.id_task.toString()).indexOf(overId) || [];

		if (oldIndex === overIndex) {
			setActiveId(null);
			return;
		}


		dispatch(
			moveTask({
				boardId: board.id_board.toString(),
				oldColumnId: oldColumn.id_column.toString(),
				nextColumnId: overColumn.id_column.toString(),
				taskId,
				index: overId !== overColumn.id_column.toString() ? overIndex : undefined,
			})
		);
		setActiveId(null);
	}

	return {
		activeTask,
		sensors,
		onDragStart: handleDragStart,
		onDragOver: handleDragOver,
		onDragEnd: handleDragEnd,
		collisionDetection: collisionDetectionStrategy,
	} as const;
};
