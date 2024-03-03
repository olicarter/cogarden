'use client'

import TextInput from '@/components/TextInput'

export default function OTPInput() {
  return (
    <div className="flex gap-2">
      {new Array(4).fill(null).map((_, index) => (
        <TextInput
          className="caret-transparent grow h-24 text-4xl text-center w-0"
          key={index}
          maxLength={1}
          minLength={1}
          onChange={e => {
            // Only allow numerical input
            if (!/^\d*$/.test(e.target.value)) {
              return (e.target.value = '')
            }
            // Focus the next input when a digit is entered
            if (e.target.value.length === 1) {
              if (index === 3) {
                e.currentTarget.form?.requestSubmit()
              } else {
                e.target.nextElementSibling?.focus()
              }
            }
            // Focus the previous input when a digit is deleted
            if (e.target.value.length === 0) {
              e.target.previousElementSibling?.focus()
            }
          }}
          onClick={e => e.currentTarget.select()}
          onFocus={e => e.currentTarget.select()}
          onKeyDown={e => {
            // Focus the previous input when backspace is pressed
            if (e.key === 'Backspace' && e.target.value.length === 0) {
              e.preventDefault()
              e.target.previousElementSibling?.focus()
            }
          }}
        />
      ))}
    </div>
  )
}
