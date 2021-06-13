import React, { useRef } from 'react'
import styles from './Answer.module.css'

import type { Result } from '../../types/result'
import type { Theme } from '../../types/theme'

import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd'
import { XYCoord } from 'dnd-core'

interface AnswerProps {
  id: any
  index: number
  result: Result
  genBgColor: string
  moveCard: (dragIndex: number, hoverIndex: number) => void
  theme?: Theme
  onVote?(item: Result, results: Result[]): void
}

interface DragItem {
  index: number
  id: string
  type: string
}

const ItemTypes = {
  CARD: 'card'
}

const Answer = ({ id, index, moveCard, theme, result, genBgColor }: AnswerProps) => {
  const ref = useRef<HTMLDivElement>(null)
  // @ts-ignore
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,

    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      }
    },

    hover(item: DragItem, monitor: DropTargetMonitor) {
      // just for warning elimination and future use
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      item.index = hoverIndex
      moveCard(dragIndex, hoverIndex)

      //console.log(parseInt(item.id) - 1, hoverIndex)
      //if (parseInt(item.id) -1 !== hoverIndex) {
      //ref.current.style.backgroundColor = "black"

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
    }
  })
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging()
    })
  })

  const opacity = isDragging ? 0 : 1

  drag(drop(ref))

  return (
    <div
      ref={ref}
      className={styles.answer}
      style={{ alignItems: theme?.alignment, backgroundColor: genBgColor, opacity }}
    >
      <div className={styles.answerInner}>
        <p style={{color: theme?.textColor}}>{result.text}</p>
      </div>
      <span style={{color: theme?.textColor}}>{result.votes?.[0]}</span>
    </div>
  )
}

export { Answer, AnswerProps }
