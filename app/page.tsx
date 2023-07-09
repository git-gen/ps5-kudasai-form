'use client'

import { useState, ChangeEvent } from 'react'
import Image from 'next/image'
import styles from './page.module.scss'
import Button from '@/components/Button'
import SelectHard from '@/components/SelectHard'

export default function Home() {
  // 0: 申請前
  // 1: 確認画面
  // 2: 申請完了
  const stages = [0, 1, 2]

  const [isError, setIsError] = useState(false)
  const [currentStage, setCurrentStage] = useState(0)
  const [hard, setHard] = useState({
    id: 0,
    name: '',
    image: ''
  })
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')

  const handleStage = (stage: number) => {
    if (hard && name && comment) {
      setIsError(false)
      setCurrentStage(stage)
    } else {
      setIsError(true)
    }
  }

  const handleHard = (hard: {id: number, name: string, image: string}) => {
    setHard(hard)
  }

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleComment = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value)
  }

  function ConfirmStage() {
    return (
      <div className={styles.form}>
        <div className={styles.inputLabel}>欲しいハードを選択</div>
        <div>{hard.name}</div>
        <div className={styles.inputLabel}>名前</div>
        <div>{name}</div>
        <div className={styles.inputLabel}>ご要望</div>
        <div>{comment}</div>
      </div>
    )
  }

  function CompleteStage() {
    return (
      <div className={styles.submitComplete}>
        <div>申請が完了しました</div>
        <Image
          src='/check.svg'
          alt='complete'
          width={256}
          height={256}
        />
      </div>
    )
  }

  function ConfirmForm() {
    if (currentStage === stages[1]) {
      return <ConfirmStage />
    } else {
      return <CompleteStage />
    }
  }

  function Buttons() {
    if (currentStage === stages[0]) {
      return (
        <div className={styles.buttons}>
          <Button text="内容を確認する" onClick={() => handleStage(stages[1])} />
        </div>
      )
    } else if (currentStage === stages[1])  {
      return (
        <div className={styles.buttons}>
          <Button text="内容を編集する" onClick={() => handleStage(stages[0])} />
          <Button text="内容を送信する" onClick={() => handleStage(stages[2])} />
        </div>
      )
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.header}>PS5くださいフォーム</div>
      <div className={styles.container}>
        {currentStage === stages[0] ?
          <div className={styles.form}>
            <div className={styles.inputLabel}>欲しいハードを選択</div>
            <SelectHard select={hard} onChange={handleHard} />
            <label htmlFor="name" className={styles.inputLabel}>名前</label>
            <input id="name" type="text" value={name} onChange={handleName} className={styles.textInput} />
            <label htmlFor="comment" className={styles.inputLabel}>ご要望</label>
            <input id="comment" type="text" value={comment} onChange={handleComment} className={styles.textInput} />
          </div>
        : <ConfirmForm />}
        <Buttons />
        {isError && <div className={styles.errorMessage}>全ての項目を入力してください</div>}
      </div>
    </main>
  )
}
