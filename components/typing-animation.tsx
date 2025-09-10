"use client"

import { useState, useEffect } from "react"

export function TypingAnimation() {
  const [currentWord, setCurrentWord] = useState("Mobile")
  const [displayWord, setDisplayWord] = useState("Mobile")
  const [isDeleting, setIsDeleting] = useState(false)
  const [charIndex, setCharIndex] = useState("Mobile".length)

  const words = ["Mobile", "Website"]

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (charIndex === currentWord.length) {
            setTimeout(() => {
              setIsDeleting(true)
            }, 2000)
            return
          }
        } else {
          if (charIndex > 0) {
            setDisplayWord(currentWord.substring(0, charIndex - 1))
            setCharIndex(charIndex - 1)
          } else {
            const nextWord = currentWord === "Mobile" ? "Website" : "Mobile"
            setCurrentWord(nextWord)
            setIsDeleting(false)
            setCharIndex(0)
            setDisplayWord("")
          }
        }

        if (!isDeleting && charIndex < currentWord.length) {
          setDisplayWord(currentWord.substring(0, charIndex + 1))
          setCharIndex(charIndex + 1)
        }
      },
      isDeleting ? 100 : 150,
    )

    return () => clearTimeout(timeout)
  }, [currentWord, displayWord, isDeleting, charIndex, words])

  return <span className="text-2xl sm:text-3xl font-medium text-primary">{displayWord} Developer</span>
}
