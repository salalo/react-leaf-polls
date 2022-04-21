import { RefObject } from 'react'
import { Result } from '../../types/result'
import styles from './BinaryPoll.module.css'

function manageVote(
  results: Result[],
  item: Result,
  index: number,
  refs: RefObject<HTMLDivElement>[]
): void {
  item.votes++
  countPercentage(results)
  animateAnswers(index, results, refs)
}

function animateAnswers(
  index: number,
  results: Result[],
  refs: RefObject<HTMLDivElement>[]
): void {
  const answer: HTMLElement | null = refs[index].current
  // get not clicked answer element
  const oppositeIndex: number = index === 0 ? 1 : 0
  const anotherAnswer: HTMLElement | null = refs[oppositeIndex].current
  const percentage: number | undefined = results[index].percentage

  if (answer && anotherAnswer && percentage) {
    // animate background width
    answer.animate(
      [
        { width: '50%', easing: 'ease-out' },
        { width: `${percentage}%`, easing: 'ease-out' }
      ],
      500
    )
    anotherAnswer.animate(
      [
        { width: '50%', easing: 'ease-out' },
        { width: `${100 - percentage}%`, easing: 'ease-out' }
      ],
      500
    )
    answer.style.width = `${percentage}%`
    anotherAnswer.style.width = `${100 - percentage}%`

    // animate background color
    answer.animate(
      [{ backgroundColor: 'white' }, { backgroundColor: '#efefef' }],
      200
    )
    answer.style.backgroundColor = '#EFEFEF'

    // set height to the same value before and after the vote
    const height: number = answer.offsetHeight
    answer.style.padding = '0'
    anotherAnswer.style.padding = '0'

    // disable hovering after the animation
    answer.classList.remove(styles.answer_hover)
    anotherAnswer.classList.remove(styles.answer_hover)

    const inner: HTMLElement | null = refs[0].current
    if (inner) inner.style.height = `${height}px`
  }
}

function countPercentage(results: Result[]): void {
  const sum: number = results[0].votes + results[1].votes

  results[0].percentage = Math.round((results[0].votes / sum) * 100)
  results[1].percentage = Math.round((results[1].votes / sum) * 100)
}

export { manageVote, countPercentage, animateAnswers }
